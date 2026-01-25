#!/usr/bin/env python3
# mutator_learning.py - VALID-ONLY LEARNED MUTATORS (REPLACE + INSERT, CONTEXTED, AST-PARSE CHECK)

import os, json, subprocess, tempfile, requests, re
from multiprocessing import Pool, cpu_count
from tqdm import tqdm
from tree_sitter_languages import get_parser

from corpus_ast_mutator import build_pool, mutate
from diff_utils import extract_diff, generalize, extract_mutations

CORPUS = "corpus"
PREDICT_URL = "http://localhost:5000/predict"

FEATURE_CMD = [
    "python3.13",
    "../feature_extractor_cli.py",
    "file",
    "--i", None,
    "--format", "string"
]

FAIL_KEYS = ["exit_code", "execution_failed", "runtime_error"]

N_MUTATIONS = 10
N_WORKERS = min(32, cpu_count())

js_parser = get_parser("javascript")

# ---------------- VALIDATION RULES ---------------- #

INVALID_GENERALIZED_PATTERNS = [
    r"<VAR_CHAIN>\s*=",             # chain assignment (usually nonsense)
    r"<BUILTIN_CHAIN>\s*;",         # meaningless builtin chain
    r"catch\s*\(<TYPE>\)",          # invalid catch
    r"catch\s*\(<<TYPE>>\)",        # invalid catch (alt token)
    r"\+=\s*<",                     # broken arithmetic
    r"^\+?\s*$",                    # empty diff lines
    r"Object\.setPrototypeOf\(\)",  # zero-arg builtins
    r"<BUILTIN>\s*\(\)",            # builtin() call
]

MAX_MUTATION_LINES = 3
MAX_MUTATION_CHARS = 220

def _block_too_big(lines):
    if not lines:
        return False
    s = "\n".join(lines)
    return (len(lines) > MAX_MUTATION_LINES) or (len(s) > MAX_MUTATION_CHARS)

def generalized_text_is_valid(txt: str) -> bool:
    for pat in INVALID_GENERALIZED_PATTERNS:
        if re.search(pat, txt):
            return False
    return True

def generalized_mut_is_valid(m: dict) -> bool:
    # Must be insert or replace only
    if m.get("kind") not in ("insert", "replace"):
        return False

    before = m.get("before", []) or []
    after  = m.get("after", []) or []
    ctx_b  = (m.get("ctx_before") or "").strip()
    ctx_a  = (m.get("ctx_after")  or "").strip()

    # No-ops
    if before == after:
        return False

    # Size limits
    if _block_too_big(before) or _block_too_big(after):
        return False

    # Replace requires context (otherwise it matches everywhere and explodes)
    if m["kind"] == "replace" and not ctx_b and not ctx_a:
        return False

    # Insert must add something
    if m["kind"] == "insert" and not after:
        return False

    # Reject obviously-broken generalized patterns inside any part
    blob = "\n".join(before + after + ([ctx_b] if ctx_b else []) + ([ctx_a] if ctx_a else []))
    if not generalized_text_is_valid(blob):
        return False

    return True

def can_roundtrip_apply(src: str, mut: dict) -> bool:
    """
    Instantiate placeholders once and check JS parses when applying insertion
    (and for replace, check that 'after' parses if spliced).
    """
    replacements = {
        "<VAR>": "x",
        "<TYPE>": "Array",
        "<<TYPE>>": "Array",
        "<NUM>": "1",
        "<STR>": "'x'",
        "<VAR_CHAIN>": "x",
        "<BUILTIN>": "Object",
        "<BUILTIN_METHOD>": "keys",
        "<PROP>": "p",
        "<SUPER>": "super",
    }

    def inst(s: str) -> str:
        out = s
        for k, v in replacements.items():
            out = out.replace(k, v)
        return out

    if mut["kind"] == "insert":
        added = [inst(x) for x in (mut.get("after") or []) if x.strip()]
        if not added:
            return False
        candidate = src + "\n" + "\n".join(added)
        tree = js_parser.parse(candidate.encode())
        return not tree.root_node.has_error

    # replace
    before = [inst(x) for x in (mut.get("before") or [])]
    after  = [inst(x) for x in (mut.get("after")  or [])]
    if not after and not before:
        return False

    # If we can't find "before" literally, still allow parse-check of 'after' payload
    # by appending to src (conservative). Apply-time does real matching.
    probe = src + "\n" + "\n".join(after) if after else src
    tree = js_parser.parse(probe.encode())
    return not tree.root_node.has_error


# ---------------- FEATURE UTILS ---------------- #

def parse_feature_string(s):
    d = {}
    for pair in s.split(","):
        if "=" not in pair:
            continue
        k, v = pair.split("=", 1)
        try:
            d[k] = eval(v, {"__builtins__": {}})
        except:
            d[k] = v
    return d


def extract_features(jsfile):
    cmd = FEATURE_CMD.copy()
    cmd[4] = jsfile
    result = subprocess.run(
        cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True
    )
    return parse_feature_string(result.stdout.strip())


def execution_failed(feats: dict) -> bool:
    for k in FAIL_KEYS:
        if k in feats and feats[k] not in (0, False, None):
            return True
    return False


def crash_score(feature_dict: dict) -> float:
    res = requests.post(PREDICT_URL, json=feature_dict, timeout=10)
    return float(res.json()["probability"])


# ---------------- CORE LEARNING ---------------- #

def process_file(fname):
    path = os.path.join(CORPUS, fname)
    src = open(path, "r", encoding="utf-8", errors="ignore").read()

    base_feats = extract_features(path)
    if execution_failed(base_feats):
        return []

    base_score = crash_score(base_feats)

    learned = []
    seen = set()  # signature dedupe within file

    for _ in range(N_MUTATIONS):
        mutated = mutate(src, POOL, rounds=3)

        tmp = tempfile.NamedTemporaryFile(delete=False, suffix=".js")
        tmp.write(mutated.encode())
        tmp.close()

        try:
            new_feats = extract_features(tmp.name)
            # SYNTAX VALIDATION HERE
            tree = js_parser.parse(mutated.encode())
            if tree.root_node.has_error:
                continue

            new_score = crash_score(new_feats)

            if new_score > base_score:
                diff = extract_diff(src, mutated)
                gdiff = generalize(diff)

                # Extract structured mutations (replace/insert with context)
                muts = extract_mutations(gdiff)

                for m in muts:
                    if not generalized_mut_is_valid(m):
                        continue
                    if not can_roundtrip_apply(src, m):
                        continue

                    sig = (
                        m["kind"],
                        tuple(m.get("before") or []),
                        tuple(m.get("after") or []),
                        (m.get("ctx_before") or "").strip(),
                        (m.get("ctx_after") or "").strip(),
                    )
                    if sig in seen:
                        continue
                    seen.add(sig)

                    learned.append({
                        "kind": m["kind"],
                        "before": m.get("before") or [],
                        "after": m.get("after") or [],
                        "ctx_before": (m.get("ctx_before") or ""),
                        "ctx_after": (m.get("ctx_after") or ""),
                        "gain": float(new_score - base_score),
                        "original_file": fname
                    })
        finally:
            os.unlink(tmp.name)

    return learned


# ---------------- MAIN ---------------- #

def main():
    global POOL

    print(f"[+] Building fragment pool from {CORPUS}")
    POOL = build_pool(CORPUS)

    files = [f for f in os.listdir(CORPUS) if f.endswith(".js")]
    print(f"[+] {len(files)} corpus files")
    print(f"[+] Using {N_WORKERS} cores")

    learned = []

    with Pool(N_WORKERS) as p:
        for result in tqdm(
            p.imap_unordered(process_file, files),
            total=len(files),
            desc="Mining valid mutators",
            ncols=80
        ):
            learned.extend(result)

    learned.sort(key=lambda x: x["gain"], reverse=True)

    json.dump(learned, open("learned_mutators.json", "w"), indent=2)

    print(f"\n[✓] Saved {len(learned)} learned mutators to learned_mutators.json")
    if learned:
        print(f"[+] Gain range: {learned[-1]['gain']:.6f} to {learned[0]['gain']:.6f}")
        print("[+] Sample mutator:")
        print(json.dumps(learned[0], indent=2)[:900])


if __name__ == "__main__":
    main()
