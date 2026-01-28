
#!/usr/bin/env python3
"""
mutate_check_diff.py

For every .js file in a corpus folder:
  1) Generate N mutated variants using your `corpus_ast_mutator` (M.mutate)
  2) Run each mutated program on V8 d8 (real run). Treat crashes as OK:
       ok := (returncode == 0) OR (returncode < 0)
     (negative returncode in Python means terminated by signal => crash)
  3) If OK, compute GumTree edit script between original and mutated:
       gumtree diff -f json original.js mutated.js
  4) Post-process GumTree edits into abstracted mutator templates:
       - abstract identifiers into roles
       - abstract literals into semantic value classes (ZERO, BOUNDARY, POW2, etc.)
  5) Save:
       out_root/
         originals/...
         mutations/<file_base>/<k>.js
         verdicts.jsonl
         gumtree_raw/<file_base>/<k>.json  (or .txt if JSON fails)
         edit_scripts/<file_base>/<k>.json (abstracted)
         crashes/<file_base>/<k>.js        (if returncode < 0)
         fails/<file_base>/<k>.js          (if returncode > 0)
"""

from __future__ import annotations

import argparse
import json
import os
import re
import shutil
import subprocess
import tempfile
import time
from dataclasses import dataclass, asdict
from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple

import corpus_ast_mutator as M  # your module


# -----------------------
# V8 runner
# -----------------------
def d8_run(
    js_path: str,
    d8_path: str,
    d8_args: List[str],
    timeout_s: float,
) -> Tuple[bool, int, str]:
    """
    Returns:
      ok_for_fuzzer: True if returncode <= 0 (success or crash), False otherwise
      returncode: subprocess returncode
      stderr_snippet: short stderr (for debugging)
    """
    try:
        p = subprocess.run(
            [d8_path] + d8_args + [js_path],
            stdout=subprocess.DEVNULL,
            stderr=subprocess.PIPE,
            timeout=timeout_s,
        )
        rc = p.returncode
        err = (p.stderr or b"").decode("utf-8", errors="ignore")
        ok = (rc <= 0)  # <=0 => 0 success, <0 crash-by-signal (ok)
        return ok, rc, err[:5000]
    except subprocess.TimeoutExpired:
        return False, 124, "Timeout"
    except FileNotFoundError:
        return False, 127, f"d8_not_found: {d8_path}"
    except Exception as e:
        return False, 125, f"exception: {e}"

def generate_all_valid_mutations(orig_code, pool, rounds, tries, d8_path, d8_args, timeout):
    valid = []
    seen = set()

    for _ in range(tries):
        cand = M.mutate(orig_code, pool, rounds=rounds)

        if cand == orig_code:
            continue
        if cand in seen:
            continue
        seen.add(cand)

        with tempfile.NamedTemporaryFile("w", suffix=".js", delete=False) as tmp:
            tmp.write(cand)
            path = tmp.name

        ok, rc, _ = d8_run(path, d8_path, d8_args, timeout)
        os.remove(path)

        if ok:
            valid.append((cand, rc))

    return valid

# -----------------------
# GumTree runner
# -----------------------
def run_gumtree_diff_json(
    gumtree_bin: str,
    original_js: str,
    mutated_js: str,
    timeout_s: float = 15.0,
) -> Tuple[Optional[Dict[str, Any]], str]:

    try:
        cmd = [
            gumtree_bin,
            "textdiff",
            "-f", "json",
            original_js,
            mutated_js
        ]

        p = subprocess.run(
            cmd,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            timeout=timeout_s,
        )

        raw_out = (p.stdout or b"").decode("utf-8", errors="ignore")
        raw_err = (p.stderr or b"").decode("utf-8", errors="ignore")
        combined = raw_out if raw_out.strip() else raw_err

        try:
            data = json.loads(raw_out)
            return data, combined
        except Exception:
            return None, combined

    except FileNotFoundError:
        return None, f"gumtree_not_found: {gumtree_bin}"
    except subprocess.TimeoutExpired:
        return None, "gumtree_timeout"
    except Exception as e:
        return None, f"gumtree_exception: {e}"



# -----------------------
# Abstraction helpers
# -----------------------
INT_RX = re.compile(r"^-?\d+$")
HEX_RX = re.compile(r"^0x[0-9a-fA-F]+$")
FLOAT_RX = re.compile(r"^-?\d+\.\d+([eE]-?\d+)?$")
STR_LIT_RX = re.compile(r"""^(['"]).*\1$""", re.S)

SPECIAL_STRINGS = {
    "__proto__", "prototype", "constructor", "length",
    "toString", "valueOf", "name", "caller", "callee",
}

def is_power_of_two(n: int) -> bool:
    return n > 0 and (n & (n - 1)) == 0

def classify_number_token(tok: str) -> str:
    # tok is a string that might be decimal or hex
    try:
        if HEX_RX.match(tok):
            n = int(tok, 16)
        else:
            n = int(tok, 10)
    except Exception:
        return "<NUM>"

    if n == 0:
        return "<ZERO>"
    if n == 1:
        return "<ONE>"
    if n == -1:
        return "<NEG_ONE>"
    if is_power_of_two(abs(n)):
        return "<POW2>"
    # common integer boundaries / wide-range class
    if n >= 2**31 or n <= -(2**31):
        return "<BOUNDARY_INT>"
    if abs(n) <= 8:
        return "<SMALL_INT>"
    if abs(n) >= 10000:
        return "<BIG_INT>"
    return "<INT>"

def classify_literal(label: str) -> str:
    s = label.strip()
    if HEX_RX.match(s) or INT_RX.match(s):
        return classify_number_token(s)
    if FLOAT_RX.match(s):
        return "<FLOAT>"
    # GumTree may report string literal labels with quotes or without, depending on parser
    if STR_LIT_RX.match(s):
        inner = s[1:-1]
        if inner in SPECIAL_STRINGS:
            return f"<SPECIAL_STR:{inner}>"
        return "<STRING>"
    if s in ("true", "false"):
        return "<BOOL>"
    if s == "null":
        return "<NULL>"
    if s == "undefined":
        return "<UNDEFINED>"
    return "<LIT>"

def abstract_identifier(name: str) -> str:
    # Avoid over-hardcoding; keep builtins recognizable, others -> <ID>
    if name in M.JS_BUILTINS:
        return name
    if name in M.JS_KEYWORDS:
        return name
    # heuristic roles
    if name and name[0].isupper():
        return "<CLASS>"
    return "<ID>"


# -----------------------
# GumTree JSON normalization
# -----------------------
def iter_actions(gumtree_json: Dict[str, Any]) -> List[Dict[str, Any]]:
    """
    GumTree JSON schema differs by version.
    We try a few common layouts.
    """
    # Common: {"actions":[...]}
    if isinstance(gumtree_json.get("actions"), list):
        return gumtree_json["actions"]

    # Some versions: {"matches":..., "actions":[...]} or nested
    for k in ("editScript", "edit_script", "diff", "result"):
        v = gumtree_json.get(k)
        if isinstance(v, dict) and isinstance(v.get("actions"), list):
            return v["actions"]

    # Fallback: search shallowly
    for _, v in gumtree_json.items():
        if isinstance(v, dict) and isinstance(v.get("actions"), list):
            return v["actions"]
        if isinstance(v, list) and v and isinstance(v[0], dict) and "action" in v[0]:
            return v

    return []


def extract_node_info(node: Any) -> Dict[str, Any]:
    """
    Node objects also vary by backend.
    We aim for:
      type, label, pos, parent_type
    """
    if not isinstance(node, dict):
        return {"type": None, "label": None, "pos": None, "parent_type": None}

    ntype = node.get("type") or node.get("kind") or node.get("name")
    label = node.get("label") or node.get("value") or node.get("text")

    # Parent may be nested
    parent = node.get("parent")
    ptype = None
    if isinstance(parent, dict):
        ptype = parent.get("type") or parent.get("kind") or parent.get("name")

    pos = node.get("pos") or node.get("position") or node.get("start")
    return {"type": ntype, "label": label, "pos": pos, "parent_type": ptype}


def abstract_gumtree_actions(gumtree_json: Dict[str, Any]) -> Dict[str, Any]:
    """
    Convert GumTree actions into a compact abstract edit script that you can reuse as mutator templates.
    We focus on:
      - update: label change (identifiers/literals)
      - insert/delete/move: structural edits with node type + parent type
    """
    actions = iter_actions(gumtree_json)
    out_actions: List[Dict[str, Any]] = []

    for a in actions:
        if not isinstance(a, dict):
            continue

        akind = a.get("action") or a.get("type") or a.get("kind")
        node = a.get("node") or a.get("tree") or a.get("src") or a.get("element")
        info = extract_node_info(node)

        # Some schemas put the new value at a["value"] for update
        new_value = a.get("value") or a.get("newValue") or a.get("dstLabel") or a.get("to")

        entry: Dict[str, Any] = {
            "action": akind,
            "node_type": info["type"],
            "parent_type": info["parent_type"],
        }

        # Normalize updates for JS-relevant nodes
        if akind and akind.lower().startswith("upd") or akind == "update":
            old = info["label"]
            entry["old_raw"] = old
            entry["new_raw"] = new_value

            # abstract by node type
            if info["type"] in ("identifier", "Identifier"):
                entry["old_abs"] = abstract_identifier(str(old)) if old is not None else None
                entry["new_abs"] = abstract_identifier(str(new_value)) if new_value is not None else None
                entry["template_kind"] = "update_identifier"
            elif info["type"] in ("number", "string", "true", "false", "null", "undefined", "Literal", "literal"):
                entry["old_abs"] = classify_literal(str(old)) if old is not None else None
                entry["new_abs"] = classify_literal(str(new_value)) if new_value is not None else None
                entry["template_kind"] = "update_literal"
            else:
                entry["old_abs"] = "<OLD>"
                entry["new_abs"] = "<NEW>"
                entry["template_kind"] = "update_label"

        # Insert/delete/move: keep structural signature
        elif akind in ("insert", "delete", "move") or (isinstance(akind, str) and akind.lower() in ("ins", "del", "mov")):
            entry["label_abs"] = None
            if info["type"] in ("identifier", "Identifier") and info["label"] is not None:
                entry["label_abs"] = abstract_identifier(str(info["label"]))
            elif info["label"] is not None:
                entry["label_abs"] = classify_literal(str(info["label"]))
            entry["template_kind"] = akind.lower()
        else:
            # Unknown action kind; preserve minimally
            entry["raw"] = a
            entry["template_kind"] = "unknown"

        out_actions.append(entry)

    return {
        "abstract_actions": out_actions,
        "num_actions": len(out_actions),
    }


# -----------------------
# Main pipeline
# -----------------------
@dataclass
class Record:
    file: str
    mutation_index: int
    mutated_path: str
    ok: bool
    returncode: int
    verdict: str  # ok | crash | fail | timeout | tooling_error
    gumtree_ok: bool
    edit_script_path: Optional[str]
    gumtree_raw_path: Optional[str]


def ensure_dir(p: Path) -> None:
    p.mkdir(parents=True, exist_ok=True)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--corpus-dir", required=True, help="Folder containing .js files (recursively).")
    ap.add_argument("--out-root", default="out_mutate_check_diff", help="Output root directory.")
    ap.add_argument("--mutations-per-file", type=int, default=10)
    ap.add_argument("--rounds", type=int, default=5, help="Rounds passed to M.mutate().")
    ap.add_argument("--pool-json", default=None, help="Optional pool JSON; if omitted, build from corpus.")
    ap.add_argument("--d8", default=os.environ.get("JS_ENGINE_PATH", "../v8/out/fuzzbuild/d8"))
    ap.add_argument("--d8-timeout", type=float, default=float(os.environ.get("D8_TIMEOUT", "3.0")))
    ap.add_argument("--d8-args", default="--allow-natives-syntax --expose-gc",
                    help="Space-separated d8 args for runtime run.")
    ap.add_argument("--gumtree", default=os.environ.get("GUMTREE", "gumtree"),
                help="gumtree binary with jsparser installed (gumtree diff -g jsparser must work).")
    ap.add_argument("--gumtree-timeout", type=float, default=15.0)
    ap.add_argument("--seed", type=int, default=0, help="0 => time-based seed.")
    args = ap.parse_args()

    if args.seed == 0:
        random_seed = int(time.time() * 1000) & 0xFFFFFFFF
    else:
        random_seed = args.seed
    import random
    random.seed(random_seed)

    corpus_dir = Path(args.corpus_dir)
    out_root = Path(args.out_root)

    originals_dir = out_root / "originals"
    mutations_dir = out_root / "mutations"
    fails_dir = out_root / "fails"
    crashes_dir = out_root / "crashes"
    gumtree_raw_dir = out_root / "gumtree_raw"
    edits_dir = out_root / "edit_scripts"

    for d in [originals_dir, mutations_dir, fails_dir, crashes_dir, gumtree_raw_dir, edits_dir]:
        ensure_dir(d)

    # Collect .js files
    js_files = sorted([p for p in corpus_dir.rglob("*.js") if p.is_file()])
    if not js_files:
        raise SystemExit(f"No .js files found under {corpus_dir}")

    # Build/load pool
    if args.pool_json:
        pool = M.FragmentPool.from_json(Path(args.pool_json).read_text(errors="ignore"))
    else:
        pool = M.build_pool(str(corpus_dir))

    d8_args = args.d8_args.split()

    records: List[Record] = []

    verdicts_path = out_root / "verdicts.jsonl"
    with verdicts_path.open("w") as vout:
        for fp in js_files:
            rel = fp.relative_to(corpus_dir)
            base = fp.stem
            orig_code = fp.read_text(errors="ignore")

            # Copy original for traceability
            orig_copy_path = originals_dir / rel
            ensure_dir(orig_copy_path.parent)
            orig_copy_path.write_text(orig_code)

            file_mut_dir = mutations_dir / base
            file_fail_dir = fails_dir / base
            file_crash_dir = crashes_dir / base
            file_gum_dir = gumtree_raw_dir / base
            file_edit_dir = edits_dir / base
            for d in [file_mut_dir, file_fail_dir, file_crash_dir, file_gum_dir, file_edit_dir]:
                ensure_dir(d)

            # Write original to a stable temp file for gumtree diffs
            with tempfile.NamedTemporaryFile("w", suffix=".js", delete=False) as tmpo:
                tmpo.write(orig_code)
                orig_tmp_path = tmpo.name

            try:
                for i in range(args.mutations_per_file):
                    mutated_code = M.mutate(orig_code, pool, rounds=args.rounds)

                    mutated_path = file_mut_dir / f"{base}_{i:03d}.js"
                    mutated_path.write_text(mutated_code)

                    ok, rc, err = d8_run(
                        str(mutated_path),
                        d8_path=args.d8,
                        d8_args=d8_args,
                        timeout_s=args.d8_timeout,
                    )

                    # classify verdict
                    if rc == 124:
                        verdict = "timeout"
                    elif rc == 127:
                        verdict = "tooling_error"
                    elif rc < 0:
                        verdict = "crash"   # ok-by-policy
                    elif rc == 0:
                        verdict = "ok"
                    else:
                        verdict = "fail"

                    gum_ok = False
                    edit_script_path = None
                    gum_raw_path = None

                    if ok:
                        # run gumtree diff
                        with tempfile.NamedTemporaryFile("w", suffix=".js", delete=False) as tmpm:
                            tmpm.write(mutated_code)
                            mut_tmp_path = tmpm.name

                        try:
                            gum_json, gum_raw = run_gumtree_diff_json(
                                gumtree_bin=args.gumtree,
                                original_js=orig_tmp_path,
                                mutated_js=mut_tmp_path,
                                timeout_s=args.gumtree_timeout,
                            )

                            # save raw gumtree output
                            if gum_json is not None:
                                gum_raw_path = str(file_gum_dir / f"{base}_{i:03d}.json")
                                Path(gum_raw_path).write_text(json.dumps(gum_json, indent=2))
                                # abstract it
                                abstracted = abstract_gumtree_actions(gum_json)
                                edit_script_path = str(file_edit_dir / f"{base}_{i:03d}.json")
                                Path(edit_script_path).write_text(json.dumps(abstracted, indent=2))
                                gum_ok = True
                            else:
                                gum_raw_path = str(file_gum_dir / f"{base}_{i:03d}.txt")
                                Path(gum_raw_path).write_text(gum_raw)
                                gum_ok = False

                        finally:
                            try:
                                os.remove(mut_tmp_path)
                            except Exception:
                                pass

                    else:
                        # move failed mutation into fails/ (keep original copy in mutations/ too)
                        if verdict in ("fail", "timeout", "tooling_error"):
                            shutil.copyfile(str(mutated_path), str(file_fail_dir / mutated_path.name))
                        # if rc < 0, we'd be in ok branch; still keep crash copies:
                        # (but rc<0 is ok-by-policy, so also saved in mutations/)
                        if verdict == "crash":
                            shutil.copyfile(str(mutated_path), str(file_crash_dir / mutated_path.name))

                    rec = Record(
                        file=str(rel),
                        mutation_index=i,
                        mutated_path=str(mutated_path),
                        ok=ok,
                        returncode=rc,
                        verdict=verdict,
                        gumtree_ok=gum_ok,
                        edit_script_path=edit_script_path,
                        gumtree_raw_path=gum_raw_path,
                    )
                    records.append(rec)
                    vout.write(json.dumps(asdict(rec)) + "\n")

                    # if failed and you want debug, dump stderr snippet
                    if not ok and verdict == "fail" and err:
                        dbg = file_fail_dir / f"{base}_{i:03d}.stderr.txt"
                        dbg.write_text(err)

            finally:
                try:
                    os.remove(orig_tmp_path)
                except Exception:
                    pass

    # summary
    summary = {
        "corpus_dir": str(corpus_dir),
        "out_root": str(out_root),
        "num_files": len(js_files),
        "mutations_per_file": args.mutations_per_file,
        "rounds": args.rounds,
        "seed": random_seed,
        "d8": args.d8,
        "d8_args": d8_args,
        "d8_timeout": args.d8_timeout,
        "gumtree": args.gumtree,
        "gumtree_timeout": args.gumtree_timeout,
        "counts": {
            "ok_or_crash": sum(1 for r in records if r.ok),
            "fail": sum(1 for r in records if r.verdict == "fail"),
            "timeout": sum(1 for r in records if r.verdict == "timeout"),
            "tooling_error": sum(1 for r in records if r.verdict == "tooling_error"),
            "gumtree_ok": sum(1 for r in records if r.gumtree_ok),
        },
    }
    (out_root / "summary.json").write_text(json.dumps(summary, indent=2))
    print(f"[done] wrote {out_root/'summary.json'} and {out_root/'verdicts.jsonl'}")


if __name__ == "__main__":
    main() 