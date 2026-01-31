#!/usr/bin/env python3
"""
rank_mutators.py

Evaluate mutation templates by applying them to corpus files and ranking
them based on:
1. Correctness rate (how many mutations are valid)
2. Crash discovery rate (how many cause crashes)
3. Coverage increase potential
4. Diversity of mutations
"""

import os
import sys
import json
import random
import argparse
import subprocess
from pathlib import Path
from typing import Dict, List, Tuple, Optional
from dataclasses import dataclass, asdict
from collections import defaultdict
import tempfile
from multiprocessing import Pool, cpu_count
from functools import partial

# Import from the mutation script
sys.path.insert(0, os.path.dirname(__file__))
from apply_learned_mutators import (
    extract_declarations,
    apply_mutation_semantic,
    apply_mutations_batch,  # Added this
    validate_with_execution,
    JS_ENGINE_PATH,
    JS_ENGINE_CHECK_ARGS
)


@dataclass
class MutatorScore:
    """Score metrics for a mutation template"""
    template_id: int
    template: Dict
    
    # Application metrics
    total_attempts: int = 0
    successful_applications: int = 0
    failed_applications: int = 0
    
    # Validation metrics
    valid_syntax: int = 0
    syntax_errors: int = 0
    type_errors: int = 0
    crashes: int = 0  # Exit code > 1
    timeouts: int = 0
    
    # Quality metrics
    correctness_rate: float = 0.0  # successful_applications / total_attempts
    crash_rate: float = 0.0  # crashes / successful_applications
    error_rate: float = 0.0  # (syntax + type errors) / successful_applications
    diversity_score: float = 0.0  # Unique mutations / attempts
    
    # Fuzzing value
    fuzzing_score: float = 0.0  # Overall score for fuzzing
    
    def calculate_scores(self):
        """Calculate derived metrics"""
        if self.total_attempts > 0:
            self.correctness_rate = self.successful_applications / self.total_attempts
        
        if self.successful_applications > 0:
            self.crash_rate = self.crashes / self.successful_applications
            self.error_rate = (self.syntax_errors + self.type_errors) / self.successful_applications
        
        # Fuzzing score: balance between correctness and crash discovery
        # Higher crash rate is good (finds bugs)
        # Higher correctness rate is good (mutations apply successfully)
        # Lower error rate is good (mutations are semantically valid)
        
        self.fuzzing_score = (
            self.correctness_rate * 0.4 +  # 40% weight on applying successfully
            self.crash_rate * 0.4 +         # 40% weight on finding crashes
            (1 - self.error_rate) * 0.2     # 20% weight on semantic validity
        )
    
    def to_dict(self):
        """Convert to dictionary for JSON serialization"""
        d = asdict(self)
        # Don't include the full template in the dict, just reference
        d['template_preview'] = {
            'kind': self.template.get('kind'),
            'after': self.template.get('after', [])[:2],  # First 2 lines
            'gain': self.template.get('gain', 0)
        }
        del d['template']  # Remove full template
        return d


def select_random_corpus_files(corpus_dir: Path, num_files: int = 50) -> List[Path]:
    """Select random JS files from corpus"""
    js_files = list(corpus_dir.rglob('*.js'))
    
    if len(js_files) <= num_files:
        return js_files
    
    return random.sample(js_files, num_files)


def evaluate_template(
    template_id: int,
    template: Dict,
    corpus_files: List[Path],
    max_attempts_per_file: int = 3,
    verbose: bool = False
) -> MutatorScore:
    """Evaluate a single mutation template across corpus files using apply_mutations_batch"""
    score = MutatorScore(template_id=template_id, template=template)
    
    mutations_generated = set()  # Track unique mutations
    
    for file_path in corpus_files:
        try:
            code = file_path.read_text(errors='ignore')
        except:
            continue
        
        if not code.strip():
            continue
        
        # Use apply_mutations_batch with this single template
        try:
            mutations, stats = apply_mutations_batch(
                code=code,
                templates=[template],  # Single template
                num_mutations=max_attempts_per_file,  # Number of attempts
                strategy='random',
                filter_invalid=False,  # We want to see all results
                use_builtins=True,
                validation_method='v8',
                validate_execution=True,  # Full validation
                verbose=False  # Don't clutter output
            )
            
            # Update attempts from stats
            score.total_attempts += stats.get('total_attempts', 0)
            score.failed_applications += stats.get('total_attempts', 0) - stats.get('success', 0)
            score.successful_applications += stats.get('success', 0)
            
            # Now validate each successful mutation to classify it
            for mut in mutations:
                mutated_code = mut['mutated_code']
                
                # Track unique mutations
                mutations_generated.add(hash(mutated_code))
                
                # Validate to classify the result
                is_valid, exec_msg = validate_with_execution(mutated_code)
                
                if is_valid:
                    if 'Crashed' in exec_msg:
                        score.crashes += 1
                        if verbose:
                            print(f"    🎯 CRASH found with template {template_id}!")
                    elif 'Timeout' in exec_msg:
                        score.timeouts += 1
                    else:
                        score.valid_syntax += 1
                else:
                    if 'SyntaxError' in exec_msg:
                        score.syntax_errors += 1
                    elif 'TypeError' in exec_msg or 'ReferenceError' in exec_msg:
                        score.type_errors += 1
        
        except Exception as e:
            if verbose:
                print(f"    Exception processing {file_path.name}: {e}")
            continue
    
    # Calculate diversity
    if score.total_attempts > 0:
        score.diversity_score = len(mutations_generated) / score.total_attempts
    
    # Calculate final scores
    score.calculate_scores()
    
    return score


def evaluate_template_wrapper(args):
    """Wrapper function for parallel processing"""
    template_id, template, corpus_file_paths, max_attempts_per_file, verbose = args
    
    # Convert paths back to Path objects
    corpus_files = [Path(p) for p in corpus_file_paths]
    
    return evaluate_template(
        template_id=template_id,
        template=template,
        corpus_files=corpus_files,
        max_attempts_per_file=max_attempts_per_file,
        verbose=verbose
    )


def rank_templates(
    templates_file: Path,
    corpus_dir: Path,
    output_file: Path,
    num_corpus_files: int = 50,
    max_attempts_per_file: int = 3,
    min_gain: float = 0.0,
    random_per_template: bool = False,
    num_workers: int = None,  # NEW: number of parallel workers
    verbose: bool = False
):
    """Main function to evaluate and rank all templates"""
    
    print(f"[+] Loading templates from {templates_file}")
    with open(templates_file) as f:
        templates = json.load(f)
    
    # Filter by minimum gain
    templates = [t for t in templates if t.get('gain', 0) >= min_gain]
    print(f"[+] Evaluating {len(templates)} templates (min_gain={min_gain})")
    
    # Determine number of workers
    if num_workers is None:
        num_workers = max(1, cpu_count() - 1)  # Leave one CPU free
    print(f"[+] Using {num_workers} parallel workers")
    
    # Select corpus files (if using same files for all templates)
    corpus_files = None
    corpus_file_paths = None
    if not random_per_template:
        print(f"[+] Selecting {num_corpus_files} random files from {corpus_dir} (shared across all templates)")
        corpus_files = select_random_corpus_files(corpus_dir, num_corpus_files)
        print(f"[+] Selected {len(corpus_files)} corpus files")
        
        if not corpus_files:
            print("[!] No corpus files found!")
            return
        
        # Convert to strings for pickling (multiprocessing requirement)
        corpus_file_paths = [str(f) for f in corpus_files]
    else:
        print(f"[+] Will select {num_corpus_files} random files per template")
        print("[!] Warning: --random-per-template not compatible with parallelization")
        print("[!] Falling back to sequential processing")
        num_workers = 1
    
    # Prepare arguments for parallel processing
    if not random_per_template:
        # Create argument tuples for each template
        eval_args = [
            (idx, template, corpus_file_paths, max_attempts_per_file, False)  # verbose=False in parallel
            for idx, template in enumerate(templates)
        ]
    
    # Evaluate templates in parallel
    scores = []
    
    if num_workers > 1 and not random_per_template:
        print(f"[+] Starting parallel evaluation...")
        
        with Pool(processes=num_workers) as pool:
            # Use imap_unordered for progress tracking
            results = pool.imap_unordered(evaluate_template_wrapper, eval_args)
            
            for idx, score in enumerate(results, 1):
                scores.append(score)
                
                if idx % 10 == 0 or verbose:
                    print(f"  [{idx}/{len(templates)}] Completed template {score.template_id} "
                          f"(score: {score.fuzzing_score:.3f}, crashes: {score.crashes})")
    else:
        # Sequential processing (fallback for random_per_template or single worker)
        print(f"[+] Starting sequential evaluation...")
        
        for idx, template in enumerate(templates):
            if verbose or idx % 10 == 0:
                print(f"\n[{idx+1}/{len(templates)}] Evaluating template {idx}")
                if verbose:
                    after_preview = ' '.join(template.get('after', []))[:60]
                    print(f"  Pattern: {after_preview}...")
            
            # Select random files for this template if needed
            if random_per_template:
                corpus_files = select_random_corpus_files(corpus_dir, num_corpus_files)
                if not corpus_files:
                    print(f"  [!] No corpus files found for template {idx}")
                    continue
            
            score = evaluate_template(
                template_id=idx,
                template=template,
                corpus_files=corpus_files,
                max_attempts_per_file=max_attempts_per_file,
                verbose=verbose
            )
            
            scores.append(score)
            
            if verbose or idx % 10 == 0:
                print(f"  Correctness: {score.correctness_rate:.2%}")
                print(f"  Crashes: {score.crashes}")
                print(f"  Fuzzing score: {score.fuzzing_score:.3f}")
        
        if verbose or idx % 10 == 0:
            print(f"  Correctness: {score.correctness_rate:.2%}")
            print(f"  Crashes: {score.crashes}")
            print(f"  Fuzzing score: {score.fuzzing_score:.3f}")
    
    # Sort by fuzzing score (descending)
    scores.sort(key=lambda s: s.fuzzing_score, reverse=True)
    
    # Create ranked output
    ranked_templates = []
    for rank, score in enumerate(scores, 1):
        # Start with the original template (preserves ALL fields)
        template_with_rank = score.template.copy()
        
        # Add rank and evaluation metadata
        template_with_rank['rank'] = rank
        template_with_rank['evaluation'] = {
            'fuzzing_score': score.fuzzing_score,
            'correctness_rate': score.correctness_rate,
            'crash_rate': score.crash_rate,
            'error_rate': score.error_rate,
            'crashes_found': score.crashes,
            'valid_mutations': score.valid_syntax,
            'total_attempts': score.total_attempts,
            'successful_applications': score.successful_applications,
            'diversity_score': score.diversity_score,
            'syntax_errors': score.syntax_errors,
            'type_errors': score.type_errors,
            'timeouts': score.timeouts,
        }
        ranked_templates.append(template_with_rank)
    
    # Save results
    print(f"\n[+] Saving ranked templates to {output_file}")
    with open(output_file, 'w') as f:
        json.dump(ranked_templates, f, indent=2)
    
    # Save detailed statistics
    stats_file = output_file.parent / (output_file.stem + '_stats.json')
    print(f"[+] Saving detailed statistics to {stats_file}")
    
    stats = {
        'summary': {
            'total_templates': len(templates),
            'corpus_files': len(corpus_files),
            'attempts_per_file': max_attempts_per_file,
            'total_mutations_attempted': sum(s.total_attempts for s in scores),
            'total_crashes_found': sum(s.crashes for s in scores),
            'total_valid_mutations': sum(s.valid_syntax for s in scores),
        },
        'top_10_templates': [
            {
                'rank': i + 1,
                'template_id': s.template_id,
                'fuzzing_score': s.fuzzing_score,
                'crashes': s.crashes,
                'correctness_rate': s.correctness_rate,
                'pattern': ' '.join(s.template.get('after', []))[:80]
            }
            for i, s in enumerate(scores[:10])
        ],
        'detailed_scores': [s.to_dict() for s in scores]
    }
    
    with open(stats_file, 'w') as f:
        json.dump(stats, f, indent=2)
    
    # Print summary
    print("\n" + "="*70)
    print("EVALUATION SUMMARY")
    print("="*70)
    print(f"Total templates evaluated: {len(templates)}")
    print(f"Corpus files used: {len(corpus_files)}")
    print(f"Total mutation attempts: {sum(s.total_attempts for s in scores):,}")
    print(f"Successful mutations: {sum(s.successful_applications for s in scores):,}")
    print(f"Crashes found: {sum(s.crashes for s in scores)}")
    print(f"Valid mutations: {sum(s.valid_syntax for s in scores):,}")
    
    print("\n" + "="*70)
    print("TOP 10 MUTATION TEMPLATES")
    print("="*70)
    
    for i, score in enumerate(scores[:10], 1):
        after_preview = ' '.join(score.template.get('after', []))[:60]
        print(f"\n{i}. Template {score.template_id}")
        print(f"   Pattern: {after_preview}...")
        print(f"   Fuzzing score: {score.fuzzing_score:.3f}")
        print(f"   Correctness: {score.correctness_rate:.2%}")
        print(f"   Crashes: {score.crashes}")
        print(f"   Crash rate: {score.crash_rate:.2%}")
        print(f"   Original gain: {score.template.get('gain', 0):.3f}")
    
    print("\n" + "="*70)
    print(f"Results saved to: {output_file}")
    print(f"Statistics saved to: {stats_file}")
    print("="*70)


def main():
    parser = argparse.ArgumentParser(
        description='Evaluate and rank mutation templates for JS fuzzing'
    )
    parser.add_argument('--templates', required=True,
                       help='Input templates JSON file')
    parser.add_argument('--corpus', required=True,
                       help='Corpus directory with JS files')
    parser.add_argument('--output', required=True,
                       help='Output ranked templates JSON file')
    parser.add_argument('--num-files', type=int, default=50,
                       help='Number of corpus files to test on (default: 50)')
    parser.add_argument('--attempts-per-file', type=int, default=3,
                       help='Mutation attempts per file (default: 3)')
    parser.add_argument('--min-gain', type=float, default=0.0,
                       help='Minimum gain threshold for templates')
    parser.add_argument('--workers', type=int, default=None,
                       help='Number of parallel workers (default: CPU count - 1)')
    parser.add_argument('--random-per-template', action='store_true',
                       help='Select different random files for each template (slower but more diverse)')
    parser.add_argument('--verbose', action='store_true',
                       help='Verbose output')
    
    args = parser.parse_args()
    
    templates_file = Path(args.templates)
    corpus_dir = Path(args.corpus)
    output_file = Path(args.output)
    
    if not templates_file.exists():
        print(f"[!] Templates file not found: {templates_file}")
        return
    
    if not corpus_dir.exists():
        print(f"[!] Corpus directory not found: {corpus_dir}")
        return
    
    # Create output directory
    output_file.parent.mkdir(parents=True, exist_ok=True)
    
    rank_templates(
        templates_file=templates_file,
        corpus_dir=corpus_dir,
        output_file=output_file,
        num_corpus_files=args.num_files,
        max_attempts_per_file=args.attempts_per_file,
        min_gain=args.min_gain,
        random_per_template=args.random_per_template,
        num_workers=args.workers,
        verbose=args.verbose
    )


if __name__ == '__main__':
    main()