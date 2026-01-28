#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import os
import random
import subprocess
import tempfile
import time
from dataclasses import dataclass, asdict
from typing import Dict, List, Tuple

# Import your mutator module (save your pasted code as mutator_tool.py)
import corpus_ast_mutator as M

passed_dir = "passed_mutations"
failed_dir = "failed_mutations"
os.makedirs(passed_dir, exist_ok=True)
os.makedirs(failed_dir, exist_ok=True)
# -------------------------------
# Runtime correctness check (REAL RUN, not --check)
# -------------------------------
JS_ENGINE_PATH = os.environ.get("JS_ENGINE_PATH", "../v8/out/fuzzbuild/d8")
JS_ENGINE_RUN_ARGS = ["--allow-natives-syntax","--expose-gc"]
RUN_TIMEOUT = float(os.environ.get("D8_TIMEOUT", "3.0"))


def d8_run_ok(js_code: str) -> Tuple[bool, str]:
    """
    Returns (ok, reason). ok=True iff d8 exit code == 0 under real execution.
    """
    with tempfile.NamedTemporaryFile("w", suffix=".js", delete=False) as tmp:
        tmp.write(js_code)
        tmp_path = tmp.name

    try:
        p = subprocess.run(
            [JS_ENGINE_PATH] + JS_ENGINE_RUN_ARGS + [tmp_path],
            stdout=subprocess.DEVNULL,
            stderr=subprocess.PIPE,
            timeout=RUN_TIMEOUT,
        )
        if p.returncode <= 0:
            return True, "ok"
        # classify common failures lightly
        err = (p.stderr or b"").decode("utf-8", errors="ignore")
        if "SyntaxError" in err:
            return False, "SyntaxError"
        if "ReferenceError" in err:
            return False, "ReferenceError"
        if "TypeError" in err:
            return False, "TypeError"
        if "RangeError" in err:
            return False, "RangeError"
        if "Error" in err:
            return False, "Error"
        return False, f"exit_{p.returncode}"
    except subprocess.TimeoutExpired:
        return False, "Timeout"
    except FileNotFoundError:
        return False, "d8_not_found"
    except Exception:
        return False, "exception"
    finally:
        try:
            os.remove(tmp_path)
        except Exception:
            pass


# -------------------------------
# Add a DELETE mutator (since your current MUTATORS has no delete)
# -------------------------------
def delete_statement(code: str) -> str:
    nodes = M.pick_statement_nodes(code)
    if not nodes:
        return code
    victim = random.choice(nodes)
    # delete the statement span; keep a newline to reduce token-joining issues
    return M.replace_span(code, victim.start_byte, victim.end_byte, "\n")


# We will evaluate these 3 operations separately
OPS = {
    "insert": lambda code, pool: M.insert_statement(code, pool),
    "replace": lambda code, pool: M.replace_expression(code, pool),
    "delete": lambda code, pool: delete_statement(code),
}


# -------------------------------
# Stats
# -------------------------------
@dataclass
class OpStats:
    attempts: int = 0
    changed: int = 0
    ok: int = 0
    fail: int = 0
    fail_reasons: Dict[str, int] = None

    def __post_init__(self):
        if self.fail_reasons is None:
            self.fail_reasons = {}

    def add(self, changed: bool, ok: bool, reason: str):
        self.attempts += 1
        if changed:
            self.changed += 1
        if ok:
            self.ok += 1
        else:
            self.fail += 1
            self.fail_reasons[reason] = self.fail_reasons.get(reason, 0) + 1

    def correctness(self) -> float:
        # correctness = ok / attempts (you can change to ok/changed if you prefer)
        return (self.ok / self.attempts) if self.attempts else 0.0

    def effectiveness(self) -> float:
        # changed rate = changed / attempts
        return (self.changed / self.attempts) if self.attempts else 0.0


def iter_js_files(corpus_dir: str) -> List[str]:
    out = []
    for root, _, files in os.walk(corpus_dir):
        for f in files:
            if f.endswith(".js"):
                out.append(os.path.join(root, f))
    return sorted(out)


# -------------------------------
# Main experiment
# -------------------------------
def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--corpus-dir", required=True, help="Folder with .js files")
    ap.add_argument("--mutations-per-file", type=int, default=10, help="Mutations per file per operation")
    ap.add_argument("--pool-json", default=None, help="If provided, load pool from JSON instead of mining corpus")
    ap.add_argument("--out", default="mutator_correctness.json", help="Write results JSON here")
    ap.add_argument("--seed", type=int, default=1)
    ap.add_argument("--skip-original-run", action="store_true", help="If set, do not sanity-run original corpus files")
    args = ap.parse_args()

    random.seed(time.time())

    files = iter_js_files(args.corpus_dir)
    if not files:
        raise SystemExit(f"No .js files found in {args.corpus_dir}")

    # Build or load fragment pool
    if args.pool_json:
        pool = M.FragmentPool.from_json(open(args.pool_json, "r", errors="ignore").read())
    else:
        pool = M.build_pool(args.corpus_dir)

    # Optional: sanity check that originals run (useful to interpret correctness)
    orig_ok = 0
    orig_fail = 0
    if not args.skip_original_run:
        for fp in files:
            src = open(fp, "r", errors="ignore").read()
            ok, _ = d8_run_ok(src)
            if ok:
                orig_ok += 1
            else:
                orig_fail += 1

    # Measure per-op correctness
    per_op: Dict[str, OpStats] = {k: OpStats() for k in OPS.keys()}
    per_file_detail = []  # optional detailed log; can be large

    start = time.time()

    for fp in files:
        src = open(fp, "r", errors="ignore").read()

        for op_name, op_fn in OPS.items():
            for _ in range(args.mutations_per_file):
                mutated = op_fn(src, pool)
                changed = (mutated != src)

                if not changed:
                    ok = False
                    reason = "no_change"
                else:
                    ok, reason = d8_run_ok(mutated)

                per_op[op_name].add(changed=changed, ok=ok, reason=reason)

                base = os.path.basename(fp)
                tag = f"{op_name}_{base}_{per_op[op_name].attempts}.js"

                if ok:
                    out_path = os.path.join(passed_dir, tag)
                else:
                    out_path = os.path.join(failed_dir, tag)

                with open(out_path, "w") as f:
                    f.write(mutated)

                if not ok:
                    per_file_detail.append({
                        "file": fp,
                        "op": op_name,
                        "changed": changed,
                        "reason": reason,
                        "saved_to": out_path
                    })

    elapsed = time.time() - start

    # Prepare output
    summary = {
        "engine": JS_ENGINE_PATH,
        "engine_args": JS_ENGINE_RUN_ARGS,
        "timeout_s": RUN_TIMEOUT,
        "corpus_dir": args.corpus_dir,
        "num_files": len(files),
        "mutations_per_file_per_op": args.mutations_per_file,
        "seed": args.seed,
        "original_run": None if args.skip_original_run else {"ok": orig_ok, "fail": orig_fail},
        "elapsed_s": round(elapsed, 3),
        "per_op": {
            op: {
                **asdict(st),
                "correctness": round(st.correctness(), 4),
                "changed_rate": round(st.effectiveness(), 4),
            }
            for op, st in per_op.items()
        },
        "fail_examples": per_file_detail[:200],  # cap
    }

    with open(args.out, "w") as f:
        json.dump(summary, f, indent=2)

    # Console summary
    print(f"[done] wrote {args.out}")
    if not args.skip_original_run:
        print(f"original corpus run: ok={orig_ok} fail={orig_fail} (note: originals failing lowers achievable correctness)")
    for op, st in per_op.items():
        print(
            f"{op:7s}  attempts={st.attempts:6d}  changed={st.changed:6d} "
            f"changed_rate={st.effectiveness():.3f}  ok={st.ok:6d}  correctness={st.correctness():.3f}"
        )
        if st.fail_reasons:
            top = sorted(st.fail_reasons.items(), key=lambda x: -x[1])[:5]
            print("         top_fail:", ", ".join([f"{k}:{v}" for k, v in top]))


if __name__ == "__main__":
    main()
