#!/usr/bin/env python3
"""
depth_first_fuzzer.py

JS Engine Fuzzer with Depth-First Template-Based Mutation

Strategy:
1. Pick random seed from corpus
2. Apply templates depth-first (mutate � test � mutate further)
3. Track crashes, coverage, execution stats
4. Move to explored/ when depth limit reached
5. Maintain fuzzing statistics
"""

import os
import sys
import json
import time
import shutil
import hashlib
import tempfile
import subprocess
import argparse
from pathlib import Path
from typing import Dict, List, Optional, Tuple, Set
from dataclasses import dataclass, field
from collections import defaultdict
import random

# Import your mutation applier
from apply_learned_mutators import (
    apply_mutation_semantic,
    extract_declarations,
    validate_with_execution,
    CodeContext
)

# ============================================================================
# CONFIGURATION
# ============================================================================

JS_ENGINE_PATH = os.environ.get("JS_ENGINE_PATH", "/home/kgangul/DataCentricFuzzJS/v8/out/fuzzbuild/d8")
JS_ENGINE_ARGS = ["--expose-gc", "--allow-natives-syntax", "--fuzzing"]

# Fuzzing parameters
DEFAULT_MAX_DEPTH = 10
DEFAULT_MUTATIONS_PER_DEPTH = 3
DEFAULT_TIMEOUT = 5.0

# ============================================================================
# STATISTICS TRACKING
# ============================================================================

@dataclass
class FuzzStats:
    """Track fuzzing statistics"""
    start_time: float = field(default_factory=time.time)
    total_executions: int = 0
    total_mutations: int = 0
    syntax_errors: int = 0
    timeouts: int = 0
    normal_exits: int = 0
    crashes: int = 0
    unique_crashes: int = 0
    seeds_explored: int = 0
    current_depth: int = 0
    max_depth_reached: int = 0
    
    # Performance tracking
    execs_per_second: float = 0.0
    
    # Crash tracking
    crash_hashes: Set[str] = field(default_factory=set)
    crash_details: List[Dict] = field(default_factory=list)
    
    def update_exec_rate(self):
        """Update executions per second"""
        elapsed = time.time() - self.start_time
        if elapsed > 0:
            self.execs_per_second = self.total_executions / elapsed
    
    def add_crash(self, code: str, stderr: str, exit_code: int, depth: int, lineage: List[str]):
        """Record a crash with deduplication"""
        # Hash stderr for deduplication
        crash_sig = hashlib.md5(stderr.encode()).hexdigest()
        
        is_new = crash_sig not in self.crash_hashes
        if is_new:
            self.crash_hashes.add(crash_sig)
            self.unique_crashes += 1
            
            self.crash_details.append({
                'crash_hash': crash_sig,
                'exit_code': exit_code,
                'stderr_snippet': stderr[:500],
                'depth': depth,
                'timestamp': time.time() - self.start_time,
                'lineage': lineage[-5:],  # Last 5 mutations
            })
        
        self.crashes += 1
        return is_new
    
    def print_status(self, prefix=""):
        """Print current status"""
        self.update_exec_rate()
        
        print(f"\r{prefix}Execs: {self.total_executions} | "
              f"Rate: {self.execs_per_second:.1f}/s | "
              f"Crashes: {self.crashes} ({self.unique_crashes} unique) | "
              f"Depth: {self.current_depth}/{self.max_depth_reached} | "
              f"Seeds: {self.seeds_explored}", 
              end='', flush=True)
    
    def print_summary(self):
        """Print final summary"""
        self.update_exec_rate()
        elapsed = time.time() - self.start_time
        
        print("\n" + "="*70)
        print("FUZZING SUMMARY")
        print("="*70)
        print(f"Runtime:              {elapsed:.1f}s")
        print(f"Total Executions:     {self.total_executions}")
        print(f"Execution Rate:       {self.execs_per_second:.2f}/s")
        print(f"Total Mutations:      {self.total_mutations}")
        print(f"Seeds Explored:       {self.seeds_explored}")
        print(f"Max Depth Reached:    {self.max_depth_reached}")
        print()
        print(f"Normal Exits:         {self.normal_exits} ({100*self.normal_exits/max(1,self.total_executions):.1f}%)")
        print(f"Syntax Errors:        {self.syntax_errors} ({100*self.syntax_errors/max(1,self.total_executions):.1f}%)")
        print(f"Timeouts:             {self.timeouts} ({100*self.timeouts/max(1,self.total_executions):.1f}%)")
        print(f"Crashes:              {self.crashes} ({100*self.crashes/max(1,self.total_executions):.1f}%)")
        print(f"Unique Crashes:       {self.unique_crashes}")
        print("="*70)
        
        if self.crash_details:
            print("\nTOP CRASHES:")
            for i, crash in enumerate(self.crash_details[:10]):
                print(f"\n[{i+1}] Hash: {crash['crash_hash'][:16]} | Depth: {crash['depth']} | Exit: {crash['exit_code']}")
                stderr_lines = crash['stderr_snippet'].split('\n')
                for line in stderr_lines[:3]:
                    if line.strip():
                        print(f"    {line.strip()}")


# ============================================================================
# EXECUTION & CRASH DETECTION
# ============================================================================

def execute_js(code: str, timeout: float = 5.0) -> Tuple[int, str, str]:
    """
    Execute JS code and return (exit_code, stdout, stderr)
    """
    tmp_path = None
    try:
        with tempfile.NamedTemporaryFile("w", suffix=".js", delete=False) as f:
            f.write(code)
            tmp_path = f.name
        
        proc = subprocess.run(
            [JS_ENGINE_PATH] + JS_ENGINE_ARGS + [tmp_path],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            timeout=timeout
        )
        
        return (
            proc.returncode,
            proc.stdout.decode('utf-8', errors='ignore'),
            proc.stderr.decode('utf-8', errors='ignore')
        )
    
    except subprocess.TimeoutExpired:
        return (-1, '', 'TIMEOUT')
    
    except Exception as e:
        return (-2, '', f'EXCEPTION: {e}')
    
    finally:
        if tmp_path and os.path.exists(tmp_path):
            os.unlink(tmp_path)


def classify_execution(exit_code: int, stderr: str) -> str:
    """Classify execution result"""
    if exit_code == -1:
        return 'timeout'
    elif exit_code == -2:
        return 'exception'
    elif exit_code == 0:
        return 'normal'
    elif exit_code == 1:
        # Check if it's a syntax/type error
        if 'SyntaxError' in stderr or 'TypeError' in stderr or 'ReferenceError' in stderr:
            return 'syntax_error'
        return 'runtime_error'
    else:
        # Exit codes > 1 are usually crashes
        return 'crash'


# ============================================================================
# DEPTH-FIRST FUZZING
# ============================================================================

class DepthFirstFuzzer:
    """Depth-first fuzzer with template-based mutations"""
    
    def __init__(
        self,
        templates: List[Dict],
        corpus_dir: Path,
        output_dir: Path,
        crashes_dir: Path,
        explored_dir: Path,
        max_depth: int = 10,
        mutations_per_depth: int = 3,
        timeout: float = 5.0,
        min_gain: float = 0.0,
        verbose: bool = False
    ):
        self.templates = [t for t in templates if t.get('gain', 0) >= min_gain]
        self.corpus_dir = Path(corpus_dir)
        self.output_dir = Path(output_dir)
        self.crashes_dir = Path(crashes_dir)
        self.explored_dir = Path(explored_dir)
        self.max_depth = max_depth
        self.mutations_per_depth = mutations_per_depth
        self.timeout = timeout
        self.verbose = verbose
        
        # Create directories
        self.crashes_dir.mkdir(parents=True, exist_ok=True)
        self.explored_dir.mkdir(parents=True, exist_ok=True)
        self.output_dir.mkdir(parents=True, exist_ok=True)
        
        # Statistics
        self.stats = FuzzStats()
        
        # Sort templates by gain (higher gain = more likely to crash)
        self.templates.sort(key=lambda t: t.get('gain', 0), reverse=True)
        
        if not self.templates:
            raise ValueError("No templates available!")
        
        print(f"[+] Loaded {len(self.templates)} templates")
        print(f"[+] Gain range: {self.templates[-1].get('gain', 0):.4f} to {self.templates[0].get('gain', 0):.4f}")
    
    def save_crash(self, code: str, crash_info: Dict, depth: int, lineage: List[str]):
        """Save crash to disk"""
        crash_hash = crash_info['crash_hash']
        crash_file = self.crashes_dir / f"crash_{crash_hash[:16]}_depth{depth}.js"
        
        # Save code
        crash_file.write_text(code)
        
        # Save metadata
        metadata_file = crash_file.with_suffix('.json')
        metadata = {
            'crash_hash': crash_hash,
            'exit_code': crash_info['exit_code'],
            'stderr': crash_info['stderr_snippet'],
            'depth': depth,
            'timestamp': crash_info['timestamp'],
            'lineage': lineage,
        }
        metadata_file.write_text(json.dumps(metadata, indent=2))
        
        return crash_file
    
    def mutate_once(self, code: str, context: CodeContext) -> Optional[Tuple[str, Dict]]:
        """
        Apply one mutation from templates.
        Returns (mutated_code, template_used) or None if failed.
        """
        # Weighted random selection (favor high-gain templates)
        # Use top 50% of templates
        template = random.choice(self.templates[:max(1, len(self.templates)//2)])
        
        # Apply mutation
        mutated, debug_msg = apply_mutation_semantic(
            code=code,
            template=template,
            context=context,
            strategy='random',
            use_builtins=True,
            validate_execution=False,  # We'll execute ourselves
            debug=False
        )
        
        if mutated is None:
            return None
        
        self.stats.total_mutations += 1
        return mutated, template
    
    def fuzz_depth_first(self, seed_code: str, seed_name: str, current_depth: int = 0, lineage: List[str] = None, timeout_budget: int = 10) -> int:
        """
        Depth-first fuzzing with timeout budget.
        Stops branch if too many timeouts encountered.
        """
        if lineage is None:
            lineage = [f"seed:{seed_name}"]
        
        if current_depth >= self.max_depth:
            return 0
        
        if timeout_budget <= 0:
            return 0  # Stop this branch
        
        # Update stats
        self.stats.current_depth = current_depth
        self.stats.max_depth_reached = max(self.stats.max_depth_reached, current_depth)
        
        # Extract context once for this seed
        context = extract_declarations(seed_code)
        
        crashes_found = 0
        local_timeout_count = 0
        
        # Generate mutations at this depth
        for mutation_idx in range(self.mutations_per_depth):
            # Check timeout budget
            if local_timeout_count >= 3:  # Max 3 timeouts per depth
                break
            
            # Mutate
            result = self.mutate_once(seed_code, context)
            
            if result is None:
                continue
            
            mutated_code, template = result
            
            # Update lineage
            new_lineage = lineage + [f"d{current_depth}m{mutation_idx}:{template.get('kind', 'unknown')}"]
            
            # Execute mutated code with REDUCED timeout
            exit_code, stdout, stderr = execute_js(mutated_code, self.timeout)
            self.stats.total_executions += 1
            
            # Classify result
            result_type = classify_execution(exit_code, stderr)
            
            if result_type == 'normal':
                self.stats.normal_exits += 1
            
            elif result_type == 'syntax_error':
                self.stats.syntax_errors += 1
                continue  # Don't go deeper on syntax errors
            
            elif result_type == 'timeout':
                self.stats.timeouts += 1
                local_timeout_count += 1
                continue  # Don't go deeper on timeouts
            
            elif result_type == 'crash':
                is_new = self.stats.add_crash(mutated_code, stderr, exit_code, current_depth, new_lineage)
                
                if is_new:
                    crash_file = self.save_crash(
                        mutated_code,
                        self.stats.crash_details[-1],
                        current_depth,
                        new_lineage
                    )
                    
                    if self.verbose:
                        print(f"\n[!] NEW CRASH at depth {current_depth}: {crash_file.name}")
                        print(f"    Exit code: {exit_code}")
                        print(f"    Stderr: {stderr.split(chr(10))[0][:80]}")
                
                crashes_found += 1
            
            # Print status periodically
            if self.stats.total_executions % 50 == 0:
                self.stats.print_status()
            
            # Only go deeper on NORMAL or CRASH
            if result_type in ('normal', 'crash'):
                crashes_found += self.fuzz_depth_first(
                    mutated_code,
                    seed_name,
                    current_depth + 1,
                    new_lineage,
                    timeout_budget - local_timeout_count  # Reduce budget
                )
        
        return crashes_found

    def fuzz_seed(self, seed_path: Path):
        """Fuzz a single seed file"""
        if self.verbose:
            print(f"\n[+] Fuzzing seed: {seed_path.name}")
        
        try:
            seed_code = seed_path.read_text(errors='ignore')
        except Exception as e:
            print(f"[!] Error reading {seed_path}: {e}")
            return
        
        # Depth-first fuzzing
        crashes = self.fuzz_depth_first(seed_code, seed_path.stem)
        
        # Move seed to explored
        explored_path = self.explored_dir / seed_path.name
        shutil.copy2(seed_path, explored_path)
        
        self.stats.seeds_explored += 1
        
        if self.verbose:
            print(f"\n[+] Seed {seed_path.name}: {crashes} crashes, moved to explored/")
    
    def run(self, max_seeds: Optional[int] = None):
        """Run the fuzzer"""
        # Get all seed files
        seed_files = list(self.corpus_dir.glob('*.js'))
        
        if not seed_files:
            print(f"[!] No seed files in {self.corpus_dir}")
            return
        
        print(f"[+] Found {len(seed_files)} seed files")
        
        # Shuffle for randomness
        random.shuffle(seed_files)
        
        if max_seeds:
            seed_files = seed_files[:max_seeds]
        
        print(f"[+] Fuzzing {len(seed_files)} seeds")
        print(f"[+] Max depth: {self.max_depth}, Mutations per depth: {self.mutations_per_depth}")
        print(f"[+] Timeout: {self.timeout}s")
        print(f"[+] Output: {self.crashes_dir}")
        print()
        
        try:
            for seed_path in seed_files:
                self.fuzz_seed(seed_path)
                
                # Print periodic summary
                if self.stats.seeds_explored % 10 == 0:
                    print()
                    self.stats.print_summary()
                    print()
        
        except KeyboardInterrupt:
            print("\n[!] Interrupted by user")
        
        finally:
            # Final summary
            print()
            self.stats.print_summary()
            
            # Save statistics
            stats_file = self.output_dir / 'fuzzing_stats.json'
            stats_data = {
                'total_executions': self.stats.total_executions,
                'total_mutations': self.stats.total_mutations,
                'crashes': self.stats.crashes,
                'unique_crashes': self.stats.unique_crashes,
                'seeds_explored': self.stats.seeds_explored,
                'execs_per_second': self.stats.execs_per_second,
                'crash_details': self.stats.crash_details,
            }
            stats_file.write_text(json.dumps(stats_data, indent=2))
            print(f"\n[+] Stats saved to {stats_file}")


# ============================================================================
# CLI
# ============================================================================

def main():
    parser = argparse.ArgumentParser(
        description='Depth-First JS Engine Fuzzer with Template Mutations',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Basic usage
  python depth_first_fuzzer.py \\
      --templates learned_mutators_gumtree.json \\
      --corpus corpus/ \\
      --output fuzzer_output/

  # Aggressive fuzzing
  python depth_first_fuzzer.py \\
      --templates learned_mutators_gumtree.json \\
      --corpus corpus/ \\
      --output fuzzer_output/ \\
      --max-depth 15 \\
      --mutations-per-depth 5 \\
      --min-gain 0.1 \\
      --verbose

  # Quick test run
  python depth_first_fuzzer.py \\
      --templates learned_mutators_gumtree.json \\
      --corpus corpus/ \\
      --output test_run/ \\
      --max-seeds 5 \\
      --max-depth 5
        """
    )
    
    parser.add_argument('--templates', required=True,
                       help='Path to learned_mutators JSON file')
    parser.add_argument('--corpus', required=True,
                       help='Directory with seed JS files')
    parser.add_argument('--output', required=True,
                       help='Output directory for fuzzing artifacts')
    
    parser.add_argument('--max-depth', type=int, default=DEFAULT_MAX_DEPTH,
                       help=f'Maximum mutation depth (default: {DEFAULT_MAX_DEPTH})')
    parser.add_argument('--mutations-per-depth', type=int, default=DEFAULT_MUTATIONS_PER_DEPTH,
                       help=f'Mutations to try at each depth (default: {DEFAULT_MUTATIONS_PER_DEPTH})')
    parser.add_argument('--timeout', type=float, default=DEFAULT_TIMEOUT,
                       help=f'Execution timeout in seconds (default: {DEFAULT_TIMEOUT})')
    parser.add_argument('--min-gain', type=float, default=0.0,
                       help='Minimum template gain to use (default: 0.0)')
    parser.add_argument('--max-seeds', type=int, default=None,
                       help='Maximum number of seeds to fuzz (default: all)')
    
    parser.add_argument('--verbose', action='store_true',
                       help='Verbose output')
    
    args = parser.parse_args()
    
    # Load templates
    print(f"[+] Loading templates from {args.templates}")
    try:
        with open(args.templates) as f:
            templates = json.load(f)
    except Exception as e:
        print(f"[!] Error loading templates: {e}")
        return 1
    
    if not templates:
        print("[!] No templates found!")
        return 1
    
    # Setup directories
    output_dir = Path(args.output)
    crashes_dir = output_dir / 'crashes'
    explored_dir = output_dir / 'explored'
    
    # Create fuzzer
    fuzzer = DepthFirstFuzzer(
        templates=templates,
        corpus_dir=Path(args.corpus),
        output_dir=output_dir,
        crashes_dir=crashes_dir,
        explored_dir=explored_dir,
        max_depth=args.max_depth,
        mutations_per_depth=args.mutations_per_depth,
        timeout=args.timeout,
        min_gain=args.min_gain,
        verbose=args.verbose
    )
    
    # Run fuzzer
    fuzzer.run(max_seeds=args.max_seeds)
    
    return 0


if __name__ == '__main__':
    sys.exit(main())