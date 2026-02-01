 #!/usr/bin/env python3
"""
fuzzilli_hybrid_fuzzer.py

FINAL OPTIMIZED HYBRID FUZZER:
- 20% time: Fuzzilli coverage-guided fuzzing (discovers new code paths)
- 80% time: Pure mutation-based fuzzing with multi_engine_fuzzer_v2.py (NO coverage)
- Automatic corpus synchronization
- Intelligent seed retirement
- Crash-optimized configuration
"""

import os
import sys
import json
import time
import shutil
import random
import argparse
import subprocess
from pathlib import Path
from typing import List, Dict, Tuple, Optional
from collections import defaultdict
import logging

logging.basicConfig(
    level=logging.INFO,
    format='[%(asctime)s] %(levelname)s: %(message)s',
    datefmt='%H:%M:%S'
)
logger = logging.getLogger(__name__)


class SeedRetirementManager:
    """Manages seed retirement to keep corpus lean and effective"""
    
    def __init__(self, retirement_threshold: int = 100, min_corpus_size: int = 50):
        self.retirement_threshold = retirement_threshold
        self.min_corpus_size = min_corpus_size
        self.seed_stats = defaultdict(lambda: {
            "executions": 0,
            "crashes": 0,
            "last_crash_exec": 0,
            "unique_crashes": set(),
            "added_timestamp": time.time()
        })
        self.retired_seeds = set()
    
    def record_execution(self, seed_path: str, crash_hash: Optional[str] = None):
        """Record execution of a seed"""
        self.seed_stats[seed_path]["executions"] += 1
        
        if crash_hash:
            self.seed_stats[seed_path]["crashes"] += 1
            self.seed_stats[seed_path]["last_crash_exec"] = self.seed_stats[seed_path]["executions"]
            self.seed_stats[seed_path]["unique_crashes"].add(crash_hash)
    
    def should_retire(self, seed_path: str, total_corpus_size: int) -> bool:
        """Determine if seed should be retired"""
        # Never retire if we're at minimum corpus size
        if total_corpus_size <= self.min_corpus_size:
            return False
        
        if seed_path in self.retired_seeds:
            return True
        
        stats = self.seed_stats[seed_path]
        
        # Don't retire if not executed enough
        if stats["executions"] < self.retirement_threshold:
            return False
        
        # Keep if it found unique crashes
        if len(stats["unique_crashes"]) > 0:
            # But retire if no crashes in last 50% of executions
            if stats["executions"] - stats["last_crash_exec"] > self.retirement_threshold:
                return True
            return False
        
        # Retire if never found crashes
        if stats["crashes"] == 0:
            return True
        
        return False
    
    def retire_seed(self, seed_path: str, move_to: Optional[Path] = None):
        """Retire a seed (optionally move to archive)"""
        self.retired_seeds.add(seed_path)
        
        if move_to:
            move_to.mkdir(parents=True, exist_ok=True)
            src = Path(seed_path)
            if src.exists():
                dst = move_to / src.name
                shutil.move(str(src), str(dst))
                logger.info(f"Retired: {src.name} � archived")
        else:
            logger.info(f"Retired: {Path(seed_path).name}")
    
    def get_active_seeds(self, all_seeds: List[str]) -> List[str]:
        """Get list of active (non-retired) seeds"""
        return [s for s in all_seeds if s not in self.retired_seeds]
    
    def save_stats(self, filepath: str):
        """Save statistics to JSON"""
        # Convert sets to lists for JSON serialization
        serializable_stats = {}
        for seed, stats in self.seed_stats.items():
            serializable_stats[seed] = {
                "executions": stats["executions"],
                "crashes": stats["crashes"],
                "last_crash_exec": stats["last_crash_exec"],
                "unique_crashes": list(stats["unique_crashes"]),
                "added_timestamp": stats["added_timestamp"]
            }
        
        data = {
            "seed_stats": serializable_stats,
            "retired_seeds": list(self.retired_seeds),
            "retirement_threshold": self.retirement_threshold,
            "min_corpus_size": self.min_corpus_size
        }
        
        with open(filepath, 'w') as f:
            json.dump(data, f, indent=2)
    
    def load_stats(self, filepath: str):
        """Load statistics from JSON"""
        if not os.path.exists(filepath):
            return
        
        with open(filepath, 'r') as f:
            data = json.load(f)
        
        # Restore stats with sets
        for seed, stats in data.get("seed_stats", {}).items():
            self.seed_stats[seed] = {
                "executions": stats["executions"],
                "crashes": stats["crashes"],
                "last_crash_exec": stats["last_crash_exec"],
                "unique_crashes": set(stats["unique_crashes"]),
                "added_timestamp": stats["added_timestamp"]
            }
        
        self.retired_seeds = set(data.get("retired_seeds", []))
        self.retirement_threshold = data.get("retirement_threshold", self.retirement_threshold)
        self.min_corpus_size = data.get("min_corpus_size", self.min_corpus_size)


class FuzzilliRunner:
    """Manages Fuzzilli coverage-guided fuzzing"""
    
    def __init__(
        self,
        fuzzilli_path: Path,
        v8_binary: Path,
        work_dir: Path,
        corpus_subset_size: int = 150,
        jobs: int = 16
    ):
        self.fuzzilli_path = Path(fuzzilli_path)
        self.v8_binary = Path(v8_binary)
        self.work_dir = Path(work_dir)
        self.corpus_subset_size = corpus_subset_size
        self.jobs = jobs
        
        self.fuzzil_tool = self.fuzzilli_path / ".build" / "release" / "FuzzILTool"
        self.fuzzilli_cli = self.fuzzilli_path / ".build" / "release" / "FuzzilliCli"
    
    def ensure_built(self) -> bool:
        """Ensure Fuzzilli is built"""
        if self.fuzzil_tool.exists() and self.fuzzilli_cli.exists():
            return True
        
        logger.info("Building Fuzzilli...")
        try:
            result = subprocess.run(
                ["swift", "build", "-c", "release"],
                cwd=self.fuzzilli_path,
                capture_output=True,
                timeout=600,
                text=True
            )
            
            if result.returncode == 0:
                logger.info(" Fuzzilli built successfully")
                return True
            else:
                logger.error(f" Fuzzilli build failed:\n{result.stderr}")
                return False
                
        except Exception as e:
            logger.error(f" Fuzzilli build error: {e}")
            return False
    
    def select_diverse_subset(self, corpus_dir: Path, retirement_mgr: SeedRetirementManager) -> Path:
        """Select diverse subset prioritizing productive seeds"""
        logger.info(f"Selecting diverse corpus subset...")
        
        subset_dir = self.work_dir / "fuzzilli_subset"
        subset_dir.mkdir(parents=True, exist_ok=True)
        
        # Clean previous
        for f in subset_dir.glob("*.js"):
            f.unlink()
        
        all_seeds = list(corpus_dir.glob("*.js"))
        active_seeds = [s for s in all_seeds if str(s) not in retirement_mgr.retired_seeds]
        
        if not active_seeds:
            logger.warning("No active seeds!")
            return subset_dir
        
        # Prioritize by crash productivity
        def seed_priority(seed_path):
            stats = retirement_mgr.seed_stats.get(str(seed_path), {})
            crashes = stats.get("crashes", 0)
            execs = max(1, stats.get("executions", 1))
            return crashes / execs  # Crash rate
        
        # Sort by priority
        sorted_seeds = sorted(active_seeds, key=seed_priority, reverse=True)
        
        # Take top 50% + random 50%
        subset_size = min(self.corpus_subset_size, len(sorted_seeds))
        top_half = int(subset_size * 0.5)
        
        selected = sorted_seeds[:top_half]  # Top productive seeds
        remaining = [s for s in sorted_seeds if s not in selected]
        
        if remaining:
            random_count = min(subset_size - len(selected), len(remaining))
            selected.extend(random.sample(remaining, random_count))
        
        # Copy to subset
        for src in selected:
            shutil.copy2(src, subset_dir / src.name)
        
        logger.info(f" Selected {len(selected)} seeds ({top_half} productive + {len(selected)-top_half} random)")
        return subset_dir
    
    def convert_to_fuzzil(self, js_dir: Path) -> Tuple[Path, int]:
        """Convert JS to FuzzIL format using parallel processing"""
        logger.info("Converting to FuzzIL format...")
        
        fuzzil_dir = self.work_dir / "fuzzilli_fzil"
        fuzzil_dir.mkdir(parents=True, exist_ok=True)
        
        js_files = list(js_dir.glob("*.js"))
        if not js_files:
            return fuzzil_dir, 0
        
        # Parallel conversion script
        script = f"""
ls {js_dir}/*.js 2>/dev/null | parallel --no-notice --eta -j8 '
f={{}}
out="{fuzzil_dir}/$(basename {{}} .js).fzil"
if [ ! -f "$out" ]; then
    timeout 15s {self.fuzzil_tool} --compile "$f" 2>/dev/null && echo " $(basename "$f")" || true
fi
' 2>/dev/null
"""
        
        try:
            subprocess.run(script, shell=True, executable='/bin/bash', timeout=300)
        except:
            pass
        
        converted = len(list(fuzzil_dir.glob("*.fzil")))
        logger.info(f" Converted {converted}/{len(js_files)} files to FuzzIL")
        return fuzzil_dir, converted
    
    def setup_run_dir(self, fuzzil_dir: Path, js_dir: Path) -> Path:
        """Setup Fuzzilli run directory with optimized settings"""
        run_dir = self.work_dir / "run"
        
        if run_dir.exists():
            shutil.rmtree(run_dir)
        
        corpus_dir = run_dir / "corpus"
        corpus_dir.mkdir(parents=True, exist_ok=True)
        (run_dir / "crashes" / "duplicates").mkdir(parents=True, exist_ok=True)
        (run_dir / "stats").mkdir(parents=True, exist_ok=True)
        
        # Optimized V8 settings for crash finding
        settings = {
            "processArguments": [
                "--expose-gc",
                "--expose-externalize-string",
                "--omit-quit",
                "--allow-natives-syntax",
                "--fuzzing",
                "--jit-fuzzing",
                "--future",
                "--harmony",
                "--js-staging",
                "--wasm-staging",
                "--wasm-fast-api",
                "--expose-fast-api",
                "--experimental-wasm-memory64",
                "--no-lazy",
                "--no-lazy-inner-functions",
                "--stress-lazy-source-positions",
                # Aggressive optimization for more crashes
                "--turbofan",
                "--turbo-inlining",
                "--turbo-splitting",
            ]
        }
        
        with open(run_dir / "settings.json", 'w') as f:
            json.dump(settings, f, indent=2)
        
        # Copy FuzzIL files (prioritized)
        for f in fuzzil_dir.glob("*.fzil"):
            shutil.copy2(f, corpus_dir / f.name)
        
        # Copy JS files as fallback
        for f in js_dir.glob("*.js"):
            if not (corpus_dir / f.name).exists():
                shutil.copy2(f, corpus_dir / f.name)
        
        logger.info(f" Run directory ready: {len(list(corpus_dir.iterdir()))} corpus files")
        return run_dir
    
    def run(self, run_dir: Path, time_hours: float) -> bool:
        """Run Fuzzilli with crash-optimized settings"""
        logger.info(f"=� Starting Fuzzilli ({time_hours:.2f}h, {self.jobs} workers)")
        
        cmd = [
            "swift", "run", "-c", "release", "FuzzilliCli",
            f"--storagePath={run_dir}",
            "--resume",
            "--corpusImportMode=full",
            "--timeout=500",  # Slightly higher for complex cases
            "--exportStatistics",
            f"--maxRuntimeInHours={time_hours}",
            f"--jobs={self.jobs}",
            "--profile=v8",
            "--minCorpusSize=100",  # Keep corpus growing
            "--maxCorpusSize=5000",  # But not too large
            str(self.v8_binary)
        ]
        
        try:
            subprocess.run(
                cmd,
                cwd=self.fuzzilli_path,
                timeout=int(time_hours * 3600 + 600)  # 10 min buffer
            )
            return True
        except:
            return True  # Consider timeout as success
    
    def harvest_corpus(self, run_dir: Path, target_corpus: Path) -> Dict[str, int]:
        """Harvest new interesting seeds from Fuzzilli"""
        logger.info("Harvesting Fuzzilli corpus...")
        
        stats = {"total_found": 0, "new_added": 0, "duplicates": 0}
        
        # Check both locations
        for source_name in ["corpus", "old_corpus"]:
            source = run_dir / source_name
            if not source.exists():
                continue
            
            for item in source.iterdir():
                if not item.is_file() or item.suffix != '.js':
                    continue
                
                stats["total_found"] += 1
                dest = target_corpus / item.name
                
                if dest.exists():
                    stats["duplicates"] += 1
                else:
                    shutil.copy2(item, dest)
                    stats["new_added"] += 1
        
        logger.info(f" Harvested {stats['new_added']} new seeds (found {stats['total_found']}, {stats['duplicates']} duplicates)")
        
        # Also collect crashes
        crashes_src = run_dir / "crashes"
        if crashes_src.exists():
            crash_count = len(list(crashes_src.glob("*.js")))
            if crash_count > 0:
                logger.info(f"= Fuzzilli found {crash_count} crashes!")
        
        return stats
    
    def cleanup(self):
        """Clean up temporary directories"""
        for dirname in ["run", "fuzzilli_subset", "fuzzilli_fzil"]:
            dir_path = self.work_dir / dirname
            if dir_path.exists():
                shutil.rmtree(dir_path)


class YourFuzzerRunner:
    """Runs your multi_engine_fuzzer_v2.py (pure mutation, NO coverage)"""
    
    def __init__(self, args):
        self.args = args
        self.current_process = None  # ⬅️ ADD THIS
    
    def run(self, time_budget_seconds: float, corpus_dir: Path) -> Dict[str, any]:
        """Run your fuzzer for specified time"""
        logger.info(f">🔧 Starting mutation fuzzer ({time_budget_seconds:.0f}s)")
        
        max_execs = int(time_budget_seconds * 40)
        
        cmd = [
            "python3", "multi_engine_fuzzer_v2.py",
            "--engine", self.args.engine,
            "--mode", self.args.mode,
            "--templates", self.args.templates,
            "--seeds", str(corpus_dir),
            "--output", self.args.output,
            "--max-execs", str(max_execs),
            "--timeout", str(self.args.timeout),
            "--max-mutations", str(self.args.max_mutations),
            "--skip-warmup",
        ]
        
        if self.args.mode == 'interesting':
            cmd.extend(["--score-threshold", str(self.args.score_threshold)])
        
        if self.args.verbose:
            cmd.append("--verbose")
        
        start = time.time()
        
        try:
            # ✅ FIX: Use Popen instead of run for better control
            self.current_process = subprocess.Popen(cmd)
            
            # Wait with timeout
            self.current_process.wait(timeout=int(time_budget_seconds + 120))
            
            elapsed = time.time() - start
            
            # Parse stats if available
            stats_file = Path(self.args.output) / "crashes" / f"{self.args.engine}_stats.json"
            if stats_file.exists():
                with open(stats_file) as f:
                    return json.load(f)
            
            return {"success": self.current_process.returncode == 0, "elapsed": elapsed}
            
        except subprocess.TimeoutExpired:
            logger.warning("Fuzzer timeout - terminating gracefully")
            self.current_process.terminate()  # Send SIGTERM
            try:
                self.current_process.wait(timeout=10)  # Wait for graceful shutdown
            except subprocess.TimeoutExpired:
                self.current_process.kill()  # Force kill if needed
            
            return {"success": True, "elapsed": time_budget_seconds}
        
        except KeyboardInterrupt:
            # ✅ FIX: Handle Ctrl+C properly
            logger.warning("Interrupted by user - terminating fuzzer")
            if self.current_process:
                self.current_process.terminate()
                try:
                    self.current_process.wait(timeout=5)
                except subprocess.TimeoutExpired:
                    self.current_process.kill()
            raise  # Re-raise to propagate to main
        
        except Exception as e:
            logger.error(f"Fuzzer error: {e}")
            if self.current_process:
                self.current_process.terminate()
            return {"success": False, "error": str(e)}
        
        finally:
            self.current_process = None


class HybridFuzzingCampaign:
    """Main orchestrator for the hybrid fuzzing campaign"""
    
    def __init__(self, args):
        self.args = args
        self.work_dir = Path(args.work_dir)
        self.work_dir.mkdir(parents=True, exist_ok=True)
        
        self.corpus_dir = Path(args.corpus)
        self.retired_dir = self.work_dir / "retired_seeds"
        
        # Components
        self.retirement_mgr = SeedRetirementManager(
            retirement_threshold=args.retirement_threshold,
            min_corpus_size=args.min_corpus_size
        )
        
        self.fuzzilli = FuzzilliRunner(
            fuzzilli_path=Path(args.fuzzilli_path),
            v8_binary=Path(args.v8_binary),
            work_dir=self.work_dir,
            corpus_subset_size=args.fuzzilli_corpus_size,
            jobs=args.fuzzilli_jobs
        )
        
        self.your_fuzzer = YourFuzzerRunner(args)
        
        # Load existing stats
        stats_file = self.work_dir / "seed_stats.json"
        self.retirement_mgr.load_stats(str(stats_file))
        
        # Campaign stats
        self.campaign_stats = {
            "start_time": time.time(),
            "cycles_completed": 0,
            "total_fuzzilli_time": 0,
            "total_mutation_time": 0,
            "total_seeds_added": 0,
            "total_seeds_retired": 0,
        }
    
    def print_banner(self):
        """Print campaign banner"""
        print("\n" + "="*80)
        print(" " * 20 + "<� HYBRID FUZZING CAMPAIGN <�")
        print("="*80)
        print(f"""
Configuration:
  Corpus:           {self.corpus_dir} ({len(list(self.corpus_dir.glob('*.js')))} seeds)
  Engine:           {self.args.engine.upper()}
  Mode:             {self.args.mode}
  Templates:        {self.args.templates}
  
Campaign:
  Cycles:           {self.args.cycles}
  Cycle Time:       {self.args.cycle_time}s ({self.args.cycle_time/3600:.2f}h)
  
Time Split:
    Fuzzilli:      20% ({self.args.cycle_time * 0.2:.0f}s = {self.args.cycle_time*0.2/3600:.2f}h)
    Mutation:      80% ({self.args.cycle_time * 0.8:.0f}s = {self.args.cycle_time*0.8/3600:.2f}h)

Fuzzilli Settings:
  Corpus Subset:    {self.args.fuzzilli_corpus_size} seeds
  Workers:          {self.args.fuzzilli_jobs} jobs

Mutation Settings:
  Max Mutations:    {self.args.max_mutations}
  Timeout:          {self.args.timeout}s
  Score Threshold:  {self.args.score_threshold if self.args.mode == 'interesting' else 'N/A'}

Seed Management:
  Retirement:       {self.args.retirement_threshold} execs
  Min Corpus:       {self.args.min_corpus_size} seeds

Output:
  Crashes:          {self.args.output}
  Work Dir:         {self.work_dir}
""")
        print("="*80 + "\n")
        
        input("Press Enter to start fuzzing campaign... ")
        print()
    
    def run_cycle(self, cycle_num: int) -> Dict:
        """Run one fuzzing cycle"""
        logger.info(f"\n{'='*80}")
        logger.info(f"CYCLE {cycle_num}/{self.args.cycles}")
        logger.info(f"{'='*80}")
        
        cycle_stats = {
            "cycle": cycle_num,
            "fuzzilli_time": 0,
            "mutation_time": 0,
            "seeds_added": 0,
            "seeds_retired": 0,
        }
        
        # Phase 1: Fuzzilli (20% of cycle time)
        fuzzilli_time_hours = (self.args.cycle_time * 0.2) / 3600
        
        logger.info(f"\n[Phase 1/2] Fuzzilli Coverage-Guided Fuzzing")
        
        if not self.fuzzilli.ensure_built():
            logger.error("Fuzzilli not available, skipping coverage phase")
        else:
            # Select diverse subset
            subset_dir = self.fuzzilli.select_diverse_subset(
                self.corpus_dir, 
                self.retirement_mgr
            )
            
            # Convert to FuzzIL
            fuzzil_dir, converted = self.fuzzilli.convert_to_fuzzil(subset_dir)
            
            if converted > 0:
                # Setup and run
                run_dir = self.fuzzilli.setup_run_dir(fuzzil_dir, subset_dir)
                
                start = time.time()
                self.fuzzilli.run(run_dir, fuzzilli_time_hours)
                cycle_stats["fuzzilli_time"] = time.time() - start
                
                # Harvest new seeds
                harvest_stats = self.fuzzilli.harvest_corpus(run_dir, self.corpus_dir)
                cycle_stats["seeds_added"] = harvest_stats["new_added"]
                
                self.campaign_stats["total_seeds_added"] += harvest_stats["new_added"]
        
        # Phase 2: Mutation-based fuzzing (80% of cycle time)
        mutation_time = self.args.cycle_time * 0.8
        
        logger.info(f"\n[Phase 2/2] Template-Based Mutation Fuzzing")
        
        start = time.time()
        mutation_stats = self.your_fuzzer.run(mutation_time, self.corpus_dir)
        cycle_stats["mutation_time"] = time.time() - start
        
        # Seed retirement
        logger.info("\n[Maintenance] Seed Retirement Check")
        
        all_seeds = list(self.corpus_dir.glob("*.js"))
        retired_count = 0
        
        for seed in all_seeds:
            if self.retirement_mgr.should_retire(str(seed), len(all_seeds)):
                self.retirement_mgr.retire_seed(str(seed), self.retired_dir)
                retired_count += 1
        
        cycle_stats["seeds_retired"] = retired_count
        self.campaign_stats["total_seeds_retired"] += retired_count
        
        # Save stats
        self.retirement_mgr.save_stats(str(self.work_dir / "seed_stats.json"))
        
        logger.info(f"\nCycle {cycle_num} Summary:")
        logger.info(f"  Fuzzilli time:    {cycle_stats['fuzzilli_time']:.1f}s")
        logger.info(f"  Mutation time:    {cycle_stats['mutation_time']:.1f}s")
        logger.info(f"  Seeds added:      {cycle_stats['seeds_added']}")
        logger.info(f"  Seeds retired:    {cycle_stats['seeds_retired']}")
        logger.info(f"  Active corpus:    {len(list(self.corpus_dir.glob('*.js')))} seeds")
        
        return cycle_stats
    def run(self):
        """Run the complete fuzzing campaign"""
        self.print_banner()
        
        campaign_start = time.time()
        
        try:  # ⬅️ ADD TRY BLOCK
            for cycle in range(1, self.args.cycles + 1):
                cycle_stats = self.run_cycle(cycle)
                self.campaign_stats["cycles_completed"] = cycle
                self.campaign_stats["total_fuzzilli_time"] += cycle_stats["fuzzilli_time"]
                self.campaign_stats["total_mutation_time"] += cycle_stats["mutation_time"]
                
                # Save campaign stats
                self.campaign_stats["total_time"] = time.time() - campaign_start
                
                with open(self.work_dir / "campaign_stats.json", 'w') as f:
                    json.dump(self.campaign_stats, f, indent=2)
        
        except KeyboardInterrupt:  # ⬅️ ADD HANDLER
            print("\\n\\n[!] Campaign interrupted by user (Ctrl+C)")
            print(f"[+] Completed {self.campaign_stats['cycles_completed']} cycles")
        
        finally:  # ⬅️ ALWAYS SHOW SUMMARY
            # Final summary
            total_time = time.time() - campaign_start
            
            print("\\n" + "="*80)
            print("🎉 CAMPAIGN COMPLETE 🎉")
            print("="*80)
            print(f"""
    Total Runtime:        {total_time/3600:.2f}h
    Cycles Completed:     {self.campaign_stats['cycles_completed']}

    Time Breakdown:
    Fuzzilli:           {self.campaign_stats['total_fuzzilli_time']/3600:.2f}h ({100*self.campaign_stats['total_fuzzilli_time']/total_time:.1f}%)
    Mutation:           {self.campaign_stats['total_mutation_time']/3600:.2f}h ({100*self.campaign_stats['total_mutation_time']/total_time:.1f}%)

    Corpus Management:
    Seeds Added:        {self.campaign_stats['total_seeds_added']}
    Seeds Retired:      {self.campaign_stats['total_seeds_retired']}
    Final Corpus:       {len(list(self.corpus_dir.glob('*.js')))} seeds

    Crashes:
    Check:              {Path(self.args.output) / 'crashes'}
    """)
            print("="*80 + "\\n")
            
            # Cleanup
            self.fuzzilli.cleanup()
    
    def print_summary(self):
        """Print campaign summary"""
        elapsed = time.time() - self.campaign_stats["start_time"]
        
        print("\n" + "="*80)
        print(" " * 25 + "=� CAMPAIGN SUMMARY =�")
        print("="*80)
        print(f"""
Total Runtime:        {elapsed/3600:.2f} hours ({elapsed:.0f}s)
Cycles Completed:     {self.campaign_stats['cycles_completed']}/{self.args.cycles}

Time Distribution:
  Fuzzilli:           {self.campaign_stats['total_fuzzilli_time']/3600:.2f}h ({100*self.campaign_stats['total_fuzzilli_time']/elapsed:.1f}%)
  Mutation:           {self.campaign_stats['total_mutation_time']/3600:.2f}h ({100*self.campaign_stats['total_mutation_time']/elapsed:.1f}%)

Corpus Evolution:
  Current Size:       {len(list(self.corpus_dir.glob('*.js')))} seeds
  Seeds Added:        {self.campaign_stats['total_seeds_added']}
  Seeds Retired:      {self.campaign_stats['total_seeds_retired']}
  Net Growth:         {self.campaign_stats['total_seeds_added'] - self.campaign_stats['total_seeds_retired']}

Results:
  Crashes Dir:        {self.args.output}
  Work Dir:           {self.work_dir}
  Retired Seeds:      {self.retired_dir}
""")
        
        # Check crash counts
        crash_dir = Path(self.args.output) / "crashes" / self.args.engine
        if crash_dir.exists():
            crashes = len(list(crash_dir.glob("crash_*.js")))
            print(f"  =� Total Crashes:   {crashes}\n")
        
        print("="*80 + "\n")


def main():
    parser = argparse.ArgumentParser(
        description='Hybrid Fuzzer: Fuzzilli (20%, coverage) + Mutation (80%, no coverage)',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Example Usage:

  python3 fuzzilli_hybrid_fuzzer.py \\
      --fuzzilli-path ~/Fuzzilli \\
      --v8-binary /home/kgangul/DataCentricFuzzJS/v8/out/fuzzbuild/d8 \\
      --engine v8 \\
      --mode interesting \\
      --templates learned_mutators_gumtree.json \\
      --corpus ./corpus \\
      --output ./crashes \\
      --cycles 24 \\
      --cycle-time 3600

This runs 24 cycles of 1 hour each (24 hours total):
  - Each cycle: 12min Fuzzilli + 48min mutation fuzzing
  - Fuzzilli discovers new code paths (coverage-guided)
  - Mutation fuzzer exploits them (no coverage overhead)
  - Seeds automatically managed and retired
        """
    )
    
    # Fuzzilli configuration
    fuzz_group = parser.add_argument_group('Fuzzilli Settings (Coverage Phase)')
    fuzz_group.add_argument('--fuzzilli-path', required=True,
                           help='Path to Fuzzilli repository')
    fuzz_group.add_argument('--v8-binary', required=True,
                           help='Path to V8 d8 binary for Fuzzilli')
    fuzz_group.add_argument('--fuzzilli-corpus-size', type=int, default=150,
                           help='Subset size for Fuzzilli (default: 150)')
    fuzz_group.add_argument('--fuzzilli-jobs', type=int, default=16,
                           help='Fuzzilli worker jobs (default: 16)')
    
    # Your fuzzer configuration
    your_group = parser.add_argument_group('Mutation Fuzzer Settings (Your multi_engine_fuzzer_v2.py)')
    your_group.add_argument('--engine', required=True,
                           choices=['v8', 'jsc', 'spidermonkey', 'chakra'],
                           help='JS engine to fuzz')
    your_group.add_argument('--mode', required=True,
                           choices=['interesting', 'random'],
                           help='Fuzzing mode (interesting=score-guided, random=uniform)')
    your_group.add_argument('--templates', required=True,
                           help='Path to mutation templates JSON')
    your_group.add_argument('--corpus', required=True,
                           help='Corpus directory (will grow over time)')
    your_group.add_argument('--output', required=True,
                           help='Output directory for crashes')
    your_group.add_argument('--max-mutations', type=int, default=3,
                           help='Max mutations per test (default: 3)')
    your_group.add_argument('--timeout', type=float, default=1.0,
                           help='Execution timeout seconds (default: 1.0)')
    your_group.add_argument('--score-threshold', type=float, default=0.3,
                           help='Score threshold for interesting mode (default: 0.3)')
    
    # Campaign configuration
    camp_group = parser.add_argument_group('Campaign Settings')
    camp_group.add_argument('--cycles', type=int, default=24,
                           help='Number of fuzzing cycles (default: 24)')
    camp_group.add_argument('--cycle-time', type=int, default=3600,
                           help='Time per cycle in seconds (default: 3600 = 1 hour)')
    
    # Seed management
    seed_group = parser.add_argument_group('Seed Management')
    seed_group.add_argument('--retirement-threshold', type=int, default=150,
                           help='Executions before retirement consideration (default: 150)')
    seed_group.add_argument('--min-corpus-size', type=int, default=50,
                           help='Minimum corpus size to maintain (default: 50)')
    
    # Misc
    misc_group = parser.add_argument_group('Miscellaneous')
    misc_group.add_argument('--work-dir', default='./hybrid_work',
                           help='Working directory (default: ./hybrid_work)')
    misc_group.add_argument('--verbose', action='store_true',
                           help='Verbose output')
    
    args = parser.parse_args()
    
    # Validation
    errors = []
    
    if not os.path.exists(args.fuzzilli_path):
        errors.append(f"Fuzzilli path not found: {args.fuzzilli_path}")
    
    if not os.path.exists(args.v8_binary):
        errors.append(f"V8 binary not found: {args.v8_binary}")
    
    if not os.path.exists(args.corpus):
        errors.append(f"Corpus directory not found: {args.corpus}")
    
    if not os.path.exists(args.templates):
        errors.append(f"Templates file not found: {args.templates}")
    
    if not os.path.exists("multi_engine_fuzzer_v2.py"):
        errors.append("multi_engine_fuzzer_v2.py not found in current directory")
    
    if errors:
        print("L Validation errors:\n")
        for err in errors:
            print(f"{err}")
        print()
        return 1
    
    # Check corpus
    corpus_files = list(Path(args.corpus).glob("*.js"))
    if len(corpus_files) == 0:
        print(f"�  Warning: No seeds in {args.corpus}")
        return 1
    
    # Run campaign
    campaign = HybridFuzzingCampaign(args)
    campaign.run()
    
    return 0


if __name__ == '__main__':
    sys.exit(main())