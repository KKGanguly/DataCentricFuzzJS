#!/usr/bin/env python3
"""
multi_engine_fuzzer_v3_fast.py - FIXED VERSION

HIGH-PERFORMANCE multi-engine fuzzer with:
1. Persistent engine sessions (no restart overhead)
2. Parallel worker processes
3. Per-engine mode selection (score-guided vs random)
4. Warmup session to filter bad seeds
5. FIXED stdout/stderr capture
6. Dramatically improved exec/s rates (similar to Fuzzilli)
"""

import os
import sys
import json
import time
import random
import hashlib
import tempfile
import subprocess
import multiprocessing as mp
from pathlib import Path
from typing import Dict, List, Optional, Tuple, Set
from dataclasses import dataclass, field
from collections import deque
from queue import Empty
import requests
import argparse
import signal
import atexit

from apply_learned_mutators import (
    apply_mutation_semantic,
    extract_declarations,
)

# Basic flags (default)
V8_BASIC_FLAGS = [
    '--expose-gc',
    '--allow-natives-syntax',
]

# Optimized flags for crash finding (from Fuzzilli)
V8_OPTIMIZED_FLAGS = [
    '--expose-gc',
    '--expose-externalize-string',
    '--allow-natives-syntax',
    '--fuzzing',
    '--future',
    '--harmony',
    '--js-staging',
    '--wasm-staging',
    '--wasm-fast-api',
    '--expose-fast-api',
    '--no-lazy',
    '--stress-lazy-source-positions'
]

ENGINES = {
    'v8': {
        'path': os.environ.get('V8_PATH', '/home/kgangul/DataCentricFuzzJS/v8/out/fuzzbuild/d8'),
        'args': V8_OPTIMIZED_FLAGS,
        'has_scoring': True,
        'supports_persistent': True,
    },
    'jsc': {
        'path': os.environ.get('JSC_PATH', '/usr/local/bin/jsc'),
        'args': [],
        'has_scoring': False,
        'supports_persistent': True,
    },
    'spidermonkey': {
        'path': os.environ.get('SM_PATH', '/usr/local/bin/js'),
        'args': [],
        'has_scoring': False,
        'supports_persistent': True,
    },
    'chakra': {
        'path': os.environ.get('CHAKRA_PATH', '/usr/local/bin/ch'),
        'args': [],
        'has_scoring': False,
        'supports_persistent': False,
    },
}

FEATURE_EXTRACTOR = ["python3.13", "../feature_extractor_cli.py", "file", "--i", None, "--format", "string"]
PREDICT_URL = "http://localhost:5000/predict"

# ============================================================================
# FIXED PERSISTENT ENGINE WITH WORKING STDOUT/STDERR CAPTURE
# ============================================================================

class SimplePersistentEngine:
    """
    FIXED persistent engine with proper stdout/stderr capture.
    
    Performance: 300-800+ execs/s per worker (vs 8.5 with one-shot)
    """
    
    def __init__(self, engine: str, timeout: float = 2.0):
        self.engine = engine
        self.timeout = timeout
        self.config = ENGINES[engine]
        self.proc = None
        self.exec_count = 0
        self.wrapper_file = None
        
        # Create wrapper
        self._create_wrapper()
        
        # Start
        self._start()
    
    def _create_wrapper(self):
        """Create wrapper with FIXED stdout/stderr capture"""
        
        wrapper = '''
// FIXED wrapper with proper output capture and escaping
print('READY');

while (true) {
    try {
        // Read code from stdin
        var line = readline();
        
        if (!line || line === 'QUIT') {
            quit(0);
        }
        
        // Clear state
        if (typeof gc === 'function') {
            try { gc(); } catch (e) {}
        }
        
        // Capture stdout by overriding print BEFORE execution
        var capturedOutput = [];
        var originalPrint = print;
        print = function() {
            var args = Array.prototype.slice.call(arguments);
            capturedOutput.push(args.join(' '));
        };
        
        // Execute user code
        var exitCode = 0;
        var errorMsg = '';
        try {
            eval(line);
        } catch (e) {
            exitCode = 1;
            errorMsg = String(e);
        }
        
        // Restore original print BEFORE sending response
        print = originalPrint;
        
        // Join captured output
        var stdout = capturedOutput.join('\\n');
        var stderr = errorMsg;
        
        // CRITICAL: Escape newlines and pipes for single-line protocol
        stdout = stdout.replace(/\\n/g, '\\\\n').replace(/\\|/g, '\\\\|');
        stderr = stderr.replace(/\\n/g, '\\\\n').replace(/\\|/g, '\\\\|');
        
        // Send response (single line)
        print('STATUS:' + exitCode + '|STDOUT:' + stdout + '|STDERR:' + stderr);
        
    } catch (e) {
        print('ERROR:' + e);
        quit(1);
    }
}
'''
        
        tmp = tempfile.NamedTemporaryFile(
            mode='w', suffix='.js', delete=False, prefix=f'wrapper_{self.engine}_'
        )
        tmp.write(wrapper)
        tmp.close()
        
        self.wrapper_file = Path(tmp.name)
    
    def _start(self):
        """Start the persistent process"""
        try:
            cmd = [self.config['path']] + self.config['args'] + [str(self.wrapper_file)]
            
            self.proc = subprocess.Popen(
                cmd,
                stdin=subprocess.PIPE,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                bufsize=0,  # Unbuffered
            )
            
            # Wait for READY signal
            start = time.time()
            while time.time() - start < 2.0:
                line = self.proc.stdout.readline()
                if line and b'READY' in line:
                    print(f"   PERSISTENT SESSION STARTED for {self.engine} (PID: {self.proc.pid})")
                    return
            
            raise Exception("Wrapper didn't signal READY")
        
        except Exception as e:
            print(f"[!] FAILED to start persistent session: {e}")
            print(f"[!] Falling back to one-shot execution (SLOW!)")
            if self.proc:
                self.proc.kill()
                self.proc = None
    
    def execute(self, code: str) -> Tuple[int, str, str]:
        """
        Execute code via stdin/stdout - FIXED VERSION
        
        Returns:
            (exit_code, stdout, stderr)
        """
        if not self.proc or self.proc.poll() is not None:
            # Fallback to one-shot
            return self._execute_oneshot(code)
        
        try:
            # Escape newlines in code (make it single line)
            code_oneline = code.replace('\\', '\\\\').replace('\n', '\\n').replace('\r', '')
            
            # Send code via stdin
            self.proc.stdin.write((code_oneline + '\n').encode('utf-8'))
            self.proc.stdin.flush()
            
            # Read response with timeout
            start = time.time()
            while time.time() - start < self.timeout:
                try:
                    import select
                    ready, _, _ = select.select([self.proc.stdout], [], [], 0.01)
                    
                    if ready:
                        line_bytes = self.proc.stdout.readline()
                        
                        if not line_bytes:
                            continue
                        
                        # Decode to string
                        line = line_bytes.decode('utf-8', errors='ignore').strip()
                        print(line)
                        if line.startswith('STATUS:'):
                            # Parse: STATUS:code|STDOUT:output|STDERR:errors
                            parts = line.split('|')
                            
                            exit_code = 0
                            stdout = ''
                            stderr = ''
                            for part in parts:
                                if part.startswith('STATUS:'):
                                    exit_code = int(part.split(':', 1)[1])
                                
                                elif part.startswith('STDOUT:'):
                                    if ':' in part:
                                        stdout = part.split(':', 1)[1]
                                        # CRITICAL: Unescape \\n back to actual newlines
                                        stdout = stdout.replace('\\n', '\n')
                                
                                elif part.startswith('STDERR:'):
                                    if ':' in part:
                                        stderr = part.split(':', 1)[1]
                                        # CRITICAL: Unescape \\n back to actual newlines
                                        stderr = stderr.replace('\\n', '\n')
                            
                            self.exec_count += 1
                            
                            # Restart after N executions to avoid memory leaks
                            if self.exec_count >= 10000:
                                self._restart()
                            return (exit_code, stdout, stderr)
                        
                        elif line.startswith('ERROR:'):
                            return (-2, '', line)
                
                except Exception as e:
                    pass
                
                # Check if process died
                if self.proc.poll() is not None:
                    return (-2, '', 'ENGINE_DIED')
            
            # Timeout
            return (-1, '', 'TIMEOUT')
        
        except Exception as e:
            return (-2, '', f'ERROR: {e}')
    
    def _execute_oneshot(self, code: str) -> Tuple[int, str, str]:
        """Fallback one-shot execution"""
        tmp_path = None
        try:
            with tempfile.NamedTemporaryFile('w', suffix='.js', delete=False) as f:
                f.write(code)
                tmp_path = f.name
            
            proc = subprocess.run(
                [self.config['path']] + self.config['args'] + [tmp_path],
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                timeout=self.timeout
            )
            
            return (
                proc.returncode,
                proc.stdout.decode('utf-8', errors='ignore'),
                proc.stderr.decode('utf-8', errors='ignore')
            )
        
        except subprocess.TimeoutExpired:
            return (-1, '', 'TIMEOUT')
        
        except Exception as e:
            return (-2, '', f'ERROR: {e}')
        
        finally:
            if tmp_path and os.path.exists(tmp_path):
                os.unlink(tmp_path)
    
    def _restart(self):
        """Restart the engine process"""
        self.close()
        self.exec_count = 0
        time.sleep(0.1)
        self._start()
    
    def close(self):
        """Close the engine"""
        if self.proc:
            try:
                # Send quit signal
                self.proc.stdin.write(b'QUIT\n')
                self.proc.stdin.flush()
                self.proc.wait(timeout=1)
            except:
                self.proc.kill()
            self.proc = None
        
        # Cleanup
        if self.wrapper_file and self.wrapper_file.exists():
            try:
                self.wrapper_file.unlink()
            except:
                pass
    
    def __del__(self):
        self.close()


# Legacy alias for compatibility
class PersistentEngineSession(SimplePersistentEngine):
    pass


# ============================================================================
# FEATURE EXTRACTION & SCORING
# ============================================================================

def extract_features_v8(code_path: str) -> Dict:
    """Extract full features for V8 (static + dynamic)"""
    cmd = FEATURE_EXTRACTOR.copy()
    cmd[4] = code_path
    
    try:
        result = subprocess.run(
            cmd,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            timeout=10
        )
        
        features = {}
        for pair in result.stdout.strip().split(','):
            if '=' in pair:
                k, v = pair.split('=', 1)
                try:
                    features[k] = eval(v, {"__builtins__": {}})
                except:
                    features[k] = v
        
        return features
    
    except Exception as e:
        return {}


def get_crash_score(features: Dict) -> float:
    """Get crash probability from ML model"""
    try:
        res = requests.post(PREDICT_URL, json=features, timeout=5)
        return float(res.json().get('probability', 0.0))
    except:
        return 0.0


# ============================================================================
# EXECUTION HELPERS
# ============================================================================

def is_crash(exit_code: int, stderr: str, engine: str) -> bool:
    """Check if execution resulted in a crash"""
    # Ignore internal sentinel errors
    if exit_code in (-1, -2, -3):
        return False

    # Signal-based crash (SIGSEGV, SIGABRT, etc.)
    if exit_code < 0:
        return True

    # exit_code == 1 check stderr keywords
    if exit_code == 1:
        crash_keywords = {
            'v8': ['FATAL', 'Unreachable', 'Check failed', 'Assertion', 'Segmentation fault', 'Aborted'],
            'jsc': ['ASSERTION FAILED', 'Segmentation fault', 'CRASH'],
            'spidermonkey': ['Assertion failure', 'Hit MOZ_CRASH', 'Segmentation fault'],
            'chakra': ['ASSERTION', 'Fatal error', 'Segmentation fault'],
        }
        keywords = crash_keywords.get(engine, ['Segmentation fault', 'Assertion'])
        return any(k in stderr for k in keywords)

    # exit_code > 1 usually crash
    return exit_code > 1


# ============================================================================
# WARMUP SESSION
# ============================================================================

class WarmupSession:
    """Filter corpus to remove bad seeds before fuzzing"""
    
    def __init__(self, engine: str, timeout: float = 1.0, verbose: bool = True):
        self.engine = engine
        self.timeout = timeout
        self.verbose = verbose
    
    def warmup(self, seed_files: List[Path]) -> Tuple[List[Path], Dict]:
        """
        Test all seeds and filter out bad ones.
        Returns (valid_seeds, stats)
        """
        print(f"\n{'='*70}")
        print(f"WARMUP SESSION - {self.engine.upper()}")
        print(f"{'='*70}")
        print(f"Testing {len(seed_files)} seeds...")
        
        # Use persistent session for warmup
        session = PersistentEngineSession(self.engine, self.timeout)
        
        valid_seeds = []
        stats = {
            'total': len(seed_files),
            'valid': 0,
            'syntax_error': 0,
            'timeout': 0,
            'crash': 0,
            'other_error': 0,
        }
        
        for i, seed_file in enumerate(seed_files):
            try:
                code = seed_file.read_text(errors='ignore')
            except Exception as e:
                if self.verbose:
                    print(f"  [{i+1}/{len(seed_files)}] {seed_file.name}: Read error")
                stats['other_error'] += 1
                continue
            
            # Execute
            exit_code, stdout, stderr = session.execute(code)
            
            # Classify
            if exit_code == -3:
                print(f"[!] Engine not found: {ENGINES[self.engine]['path']}")
                session.close()
                return [], stats
            
            elif exit_code == -1:  # Timeout
                stats['timeout'] += 1
                if self.verbose and i % 10 == 0:
                    print(f"  [{i+1}/{len(seed_files)}] {seed_file.name}: TIMEOUT (discarded)")
            
            elif exit_code == 1 and any(err in stderr for err in ['SyntaxError', 'ReferenceError']):
                stats['syntax_error'] += 1
                if self.verbose and i % 10 == 0:
                    print(f"  [{i+1}/{len(seed_files)}] {seed_file.name}: Syntax error (discarded)")
            
            elif is_crash(exit_code, stderr, self.engine):
                stats['crash'] += 1
                valid_seeds.append(seed_file)  # Keep crashes!
                if self.verbose:
                    print(f"  [{i+1}/{len(seed_files)}] {seed_file.name}: CRASH (kept!)")
            
            else:
                # Normal execution or expected error - keep it
                stats['valid'] += 1
                valid_seeds.append(seed_file)
                if self.verbose and (i % 10 == 0 or stats['valid'] <= 5):
                    print(f"  [{i+1}/{len(seed_files)}] {seed_file.name}: OK")
        
        session.close()
        
        print(f"\nWarmup Results:")
        print(f"  Total seeds:      {stats['total']}")
        print(f"  Valid:            {stats['valid']} ({100*stats['valid']/stats['total']:.1f}%)")
        print(f"  Crashes:          {stats['crash']}")
        print(f"  Syntax errors:    {stats['syntax_error']} (filtered)")
        print(f"  Timeouts:         {stats['timeout']} (filtered)")
        print(f"  Other errors:     {stats['other_error']} (filtered)")
        print(f"  Final corpus:     {len(valid_seeds)} seeds")
        print(f"{'='*70}\n")
        
        return valid_seeds, stats


# ============================================================================
# CORPUS ENTRY
# ============================================================================

@dataclass
class CorpusEntry:
    """Entry in the interesting seed corpus"""
    code: str
    name: str
    crash_score: float = 0.0
    energy: int = 100
    fuzz_count: int = 0
    crash_found: bool = False
    
    def priority(self) -> float:
        """Higher priority = fuzz sooner"""
        score_weight = self.crash_score * 10
        crash_penalty = -5 if self.crash_found else 0
        fuzz_penalty = -self.fuzz_count * 0.1
        
        return score_weight + crash_penalty + fuzz_penalty


# ============================================================================
# STATISTICS
# ============================================================================

@dataclass
class FuzzStats:
    """Fuzzing statistics"""
    engine: str
    mode: str
    start_time: float = field(default_factory=time.time)
    
    total_execs: int = 0
    total_mutations: int = 0
    
    crashes: int = 0
    unique_crashes: int = 0
    crash_hashes: Set[str] = field(default_factory=set)
    timeouts: int = 0
    normal: int = 0
    syntax_errors: int = 0
    
    crash_details: List[Dict] = field(default_factory=list)
    
    def exec_rate(self) -> float:
        elapsed = time.time() - self.start_time
        return self.total_execs / elapsed if elapsed > 0 else 0.0
    
    def crash_rate(self) -> float:
        return 100 * self.crashes / max(1, self.total_execs)
    
    def correctness_rate(self) -> float:
        return 100 * self.normal / max(1, self.total_execs)
    
    def add_crash(self, code: str, stderr: str, exit_code: int) -> bool:
        """Returns True if crash is unique"""
        crash_hash = hashlib.md5(stderr.encode()).hexdigest()[:16]
        
        is_new = crash_hash not in self.crash_hashes
        if is_new:
            self.crash_hashes.add(crash_hash)
            self.unique_crashes += 1
            
            self.crash_details.append({
                'hash': crash_hash,
                'exit_code': exit_code,
                'stderr': stderr[:500],
                'timestamp': time.time() - self.start_time,
            })
        
        self.crashes += 1
        return is_new
    
    def print_status(self):
        print(f"\r[{self.engine.upper()}] Execs: {self.total_execs} | "
              f"Rate: {self.exec_rate():.1f}/s | "
              f"Crashes: {self.crashes} ({self.unique_crashes} unique, {self.crash_rate():.2f}%) | "
              f"Correct: {self.correctness_rate():.1f}% | "
              f"Timeouts: {self.timeouts}",
              end='', flush=True)
    
    def print_summary(self):
        elapsed = time.time() - self.start_time
        
        print(f"\n{'='*70}")
        print(f"FUZZING SUMMARY - {self.engine.upper()} ({self.mode} mode)")
        print(f"{'='*70}")
        print(f"Runtime:              {elapsed:.1f}s")
        print(f"Total Executions:     {self.total_execs}")
        print(f"Execution Rate:       {self.exec_rate():.2f}/s")
        print(f"Total Mutations:      {self.total_mutations}")
        print()
        
        print(f"Normal Exits:         {self.normal} ({self.correctness_rate():.1f}%)")
        print(f"Syntax Errors:        {self.syntax_errors} ({100*self.syntax_errors/max(1,self.total_execs):.1f}%)")
        print(f"Timeouts:             {self.timeouts} ({100*self.timeouts/max(1,self.total_execs):.1f}%)")
        print(f"Crashes:              {self.crashes} ({self.crash_rate():.2f}%)")
        print(f"Unique Crashes:       {self.unique_crashes}")
        print(f"{'='*70}")
        
        if self.crash_details:
            print(f"\nTop {min(5, len(self.crash_details))} Crashes:")
            for i, crash in enumerate(self.crash_details[:5]):
                print(f"\n[{i+1}] Hash: {crash['hash']} | Exit: {crash['exit_code']}")
                stderr_lines = crash['stderr'].split('\n')
                for line in stderr_lines[:2]:
                    if line.strip():
                        print(f"    {line.strip()}")


# ============================================================================
# WORKER PROCESS
# ============================================================================

def worker_process(
    worker_id: int,
    engine: str,
    mode: str,
    templates: List[Dict],
    seed_codes: List[str],
    corpus_entries: Optional[List[CorpusEntry]],
    results_queue: mp.Queue,
    max_mutations: int,
    timeout: float,
    score_threshold: float,
):
    """Worker process that runs fuzzing in parallel"""
    
    # Setup signal handler
    signal.signal(signal.SIGINT, signal.SIG_IGN)
    
    # Create persistent session
    session = PersistentEngineSession(engine, timeout)
    
    # Local state
    local_corpus = list(corpus_entries) if corpus_entries else None
    execs = 0
    
    def mutate(code: str) -> Optional[str]:
        """Apply mutations"""
        context = extract_declarations(code)
        mutated = code
        
        num_mutations = max_mutations
        for _ in range(num_mutations):
            template = random.choice(templates[:max(1, len(templates)//2)])
            
            result, _ = apply_mutation_semantic(
                mutated, template, context,
                strategy='random',
                use_builtins=True,
                validate_execution=True
            )
            if result:
                mutated = result
                context = extract_declarations(mutated)
        
        return mutated
    
    def pick_seed():
        """Pick seed based on mode"""
        if mode == 'interesting' and local_corpus:
            # Score-guided
            if not local_corpus:
                return None
            
            # Sort by priority and pick best
            local_corpus.sort(key=lambda e: e.priority(), reverse=True)
            entry = local_corpus[0]
            
            entry.energy -= 1
            entry.fuzz_count += 1
            
            if entry.energy <= 0:
                local_corpus.pop(0)
            
            return entry.code
        else:
            # Random
            return random.choice(seed_codes)
    
    try:
        while True:
            # Pick seed
            seed = pick_seed()
            if seed is None:
                break
            
            # Mutate
            mutated = mutate(seed)
            if not mutated:
                continue
            
            # Execute
            exit_code, stdout, stderr = session.execute(mutated)
            execs += 1
            
            # Send result back
            result = {
                'worker_id': worker_id,
                'exit_code': exit_code,
                'stderr': stderr,
                'code': mutated if is_crash(exit_code, stderr, engine) else None,
                'execs': 1,
            }
            results_queue.put(result)
            
            # Periodic status
            if execs % 100 == 0:
                results_queue.put({'worker_id': worker_id, 'status': f'Worker {worker_id}: {execs} execs'})
    
    except KeyboardInterrupt:
        pass
    
    finally:
        session.close()


# ============================================================================
# PARALLEL FUZZER
# ============================================================================

class ParallelFuzzer:
    """Parallel fuzzer with multiple workers"""
    
    def __init__(
        self,
        engine: str,
        mode: str,
        templates: List[Dict],
        valid_seeds: List[Path],
        crashes_dir: Path,
        num_workers: int = 4,
        max_mutations: int = 3,
        timeout: float = 1.0,
        score_threshold: float = 0.3,
        verbose: bool = False
    ):
        self.engine = engine
        self.mode = mode
        self.templates = sorted(templates, key=lambda t: t.get('gain', 0), reverse=True)
        self.valid_seeds = valid_seeds
        self.crashes_dir = Path(crashes_dir) / engine
        self.num_workers = num_workers
        self.max_mutations = max_mutations
        self.timeout = timeout
        self.score_threshold = score_threshold
        self.verbose = verbose
        
        self.crashes_dir.mkdir(parents=True, exist_ok=True)
        
        # Stats
        self.stats = FuzzStats(engine=engine, mode=mode)
        
        # Load seed codes
        self.seed_codes = [f.read_text(errors='ignore') for f in valid_seeds]
        
        # Setup mode
        self.corpus_entries = None
        if mode == 'interesting':
            self._setup_interesting_mode()
        
        print(f"\n[+] Initialized {engine.upper()} parallel fuzzer")
        print(f"    Mode: {mode}")
        print(f"    Workers: {num_workers}")
        print(f"    Seeds: {len(self.valid_seeds)}")
        print(f"    Templates: {len(self.templates)}")
        if mode == 'interesting' and self.corpus_entries:
            print(f"    Corpus size: {len(self.corpus_entries)}")
    
    def _setup_interesting_mode(self):
        """Setup interesting seed corpus"""
        if not ENGINES[self.engine]['has_scoring']:
            print(f"[!] Warning: {self.engine} doesn't support scoring, falling back to random mode")
            self.mode = 'random'
            return
        
        print(f"  [*] Building interesting seed corpus for {self.engine}...")
        
        self.corpus_entries = []
        
        for seed_file in self.valid_seeds:
            code = seed_file.read_text(errors='ignore')
            
            # Get crash score
            tmp_file = Path(f"/tmp/score_{os.getpid()}_{seed_file.stem}.js")
            tmp_file.write_text(code)
            
            try:
                features = extract_features_v8(str(tmp_file))
                if features:
                    score = get_crash_score(features)
                    
                    if score >= self.score_threshold:
                        entry = CorpusEntry(
                            code=code,
                            name=seed_file.stem,
                            crash_score=score,
                            energy=100
                        )
                        self.corpus_entries.append(entry)
            
            finally:
                if tmp_file.exists():
                    tmp_file.unlink()
        
        print(f"  [*] Interesting corpus: {len(self.corpus_entries)} seeds")
    
    def run(self, max_execs: int = 10000):
        """Run parallel fuzzing"""
        print(f"\n[+] Starting {self.engine.upper()} parallel fuzzer ({self.mode} mode)")
        print(f"    Target: {max_execs} executions")
        print(f"    Workers: {self.num_workers}")
        
        # Create result queue
        results_queue = mp.Queue()
        
        # Start workers
        workers = []
        for i in range(self.num_workers):
            p = mp.Process(
                target=worker_process,
                args=(
                    i,
                    self.engine,
                    self.mode,
                    self.templates,
                    self.seed_codes,
                    self.corpus_entries,
                    results_queue,
                    self.max_mutations,
                    self.timeout,
                    self.score_threshold,
                )
            )
            p.start()
            workers.append(p)
        
        # Collect results
        try:
            while self.stats.total_execs < max_execs:
                try:
                    result = results_queue.get(timeout=0.1)
                    
                    if 'status' in result:
                        # Status message
                        if self.verbose:
                            print(f"\n{result['status']}")
                        continue
                    
                    # Execution result
                    self.stats.total_execs += result['execs']
                    
                    exit_code = result['exit_code']
                    stderr = result['stderr']
                    code = result.get('code')
                    
                    # Classify
                    if exit_code == -1:
                        self.stats.timeouts += 1
                    
                    elif exit_code == 1 and any(err in stderr for err in ['SyntaxError', 'ReferenceError', 'TypeError']):
                        self.stats.syntax_errors += 1
                    
                    elif is_crash(exit_code, stderr, self.engine):
                        is_new = self.stats.add_crash(code, stderr, exit_code)
                        
                        if is_new and code:
                            # Save crash
                            crash_hash = list(self.stats.crash_hashes)[-1]
                            crash_file = self.crashes_dir / f"crash_{crash_hash}.js"
                            crash_file.write_text(code)
                            
                            (self.crashes_dir / f"crash_{crash_hash}.txt").write_text(
                                f"Exit code: {exit_code}\n"
                                f"Engine: {self.engine}\n"
                                f"Mode: {self.mode}\n\n"
                                f"{stderr}"
                            )
                            
                            if self.verbose:
                                print(f"\n[!] NEW {self.engine.upper()} CRASH: {crash_file.name}")
                    
                    else:
                        self.stats.normal += 1
                    
                    # Print status
                    if self.stats.total_execs % 100 == 0:
                        self.stats.print_status()
                
                except Empty:
                    # Check if workers are alive
                    if not any(w.is_alive() for w in workers):
                        break
        
        except KeyboardInterrupt:
            print(f"\n[!] Interrupted {self.engine.upper()} fuzzer")
        
        finally:
            # Stop workers
            for w in workers:
                w.terminate()
            
            for w in workers:
                w.join(timeout=1)
            
            print()
            self.stats.print_summary()
            
            # Save stats
            stats_file = self.crashes_dir.parent / f"{self.engine}_stats.json"
            stats_data = {
                'engine': self.engine,
                'mode': self.mode,
                'num_workers': self.num_workers,
                'total_execs': self.stats.total_execs,
                'crashes': self.stats.crashes,
                'unique_crashes': self.stats.unique_crashes,
                'crash_rate': self.stats.crash_rate(),
                'exec_rate': self.stats.exec_rate(),
                'correctness_rate': self.stats.correctness_rate(),
                'normal_exits': self.stats.normal,
                'syntax_errors': self.stats.syntax_errors,
                'timeouts': self.stats.timeouts,
                'crash_details': self.stats.crash_details,
            }
            stats_file.write_text(json.dumps(stats_data, indent=2))


# ============================================================================
# MAIN
# ============================================================================

def main():
    parser = argparse.ArgumentParser(
        description='High-Performance Multi-Engine JS Fuzzer (FIXED)',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:

  # V8 with 8 workers (interesting mode)
  python multi_engine_fuzzer_v3_fast.py \\
      --engine v8 \\
      --mode interesting \\
      --templates learned_mutators_gumtree.json \\
      --seeds corpus/ \\
      --output v8_output/ \\
      --workers 8 \\
      --max-execs 100000

  # JSC with 4 workers (random mode)
  python multi_engine_fuzzer_v3_fast.py \\
      --engine jsc \\
      --mode random \\
      --templates learned_mutators_gumtree.json \\
      --seeds corpus/ \\
      --output jsc_output/ \\
      --workers 4 \\
      --max-execs 50000
        """
    )
    
    parser.add_argument('--engine', required=True,
                       choices=['v8', 'jsc', 'spidermonkey', 'chakra'],
                       help='JS engine to fuzz')
    parser.add_argument('--mode', required=True,
                       choices=['interesting', 'random'],
                       help='Fuzzing mode: interesting (score-guided) or random')
    parser.add_argument('--templates', required=True,
                       help='Path to learned templates JSON')
    parser.add_argument('--seeds', required=True,
                       help='Directory with seed JS files')
    parser.add_argument('--output', required=True,
                       help='Output directory for crashes and stats')
    
    parser.add_argument('--workers', type=int, default=4,
                       help='Number of parallel workers (default: 4)')
    parser.add_argument('--max-execs', type=int, default=10000,
                       help='Maximum executions (default: 10000)')
    parser.add_argument('--max-mutations', type=int, default=3,
                       help='Max mutations per test (default: 3)')
    parser.add_argument('--timeout', type=float, default=1.0,
                       help='Execution timeout in seconds (default: 1.0)')
    
    parser.add_argument('--score-threshold', type=float, default=0.3,
                       help='Min crash score for interesting mode (default: 0.3)')
    parser.add_argument('--skip-warmup', action='store_true',
                       help='Skip warmup session (not recommended)')
    parser.add_argument('--warmup-timeout', type=float, default=1.0,
                       help='Timeout for warmup session (default: 1.0)')
    
    parser.add_argument('--verbose', action='store_true',
                       help='Verbose output')
    
    args = parser.parse_args()
    
    # Validate
    if args.mode == 'interesting' and not ENGINES[args.engine]['has_scoring']:
        print(f"[!] Warning: {args.engine} doesn't support scoring")
        print(f"[!] Falling back to random mode")
        args.mode = 'random'
    
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
    
    print(f"[+] Loaded {len(templates)} templates")
    
    # Load seeds
    print(f"[+] Loading seeds from {args.seeds}")
    seed_files = list(Path(args.seeds).glob('*.js'))
    
    if not seed_files:
        print(f"[!] No seed files found in {args.seeds}")
        return 1
    
    print(f"[+] Found {len(seed_files)} seed files")
    
    # Warmup
    if args.skip_warmup:
        print("[!] Skipping warmup session")
        valid_seeds = seed_files
    else:
        warmup = WarmupSession(
            engine=args.engine,
            timeout=args.warmup_timeout,
            verbose=args.verbose
        )
        valid_seeds, warmup_stats = warmup.warmup(seed_files)
        
        if not valid_seeds:
            print("[!] No valid seeds after warmup!")
            return 1
    
    # Create fuzzer
    output_dir = Path(args.output)
    output_dir.mkdir(parents=True, exist_ok=True)
    
    fuzzer = ParallelFuzzer(
        engine=args.engine,
        mode=args.mode,
        templates=templates,
        valid_seeds=valid_seeds,
        crashes_dir=output_dir / 'crashes',
        num_workers=args.workers,
        max_mutations=args.max_mutations,
        timeout=args.timeout,
        score_threshold=args.score_threshold,
        verbose=args.verbose
    )
    
    # Run
    fuzzer.run(max_execs=args.max_execs)
    
    return 0


if __name__ == '__main__':
    mp.set_start_method('spawn', force=True)
    sys.exit(main())