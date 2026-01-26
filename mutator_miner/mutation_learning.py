#!/usr/bin/env python3
# mutator_learning_fixed.py - Extract AST-aware mutations with node types
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

# Valid statement node types in JS
STATEMENT_TYPES = {
    "expression_statement", "return_statement", "throw_statement",
    "if_statement", "for_statement", "while_statement", "do_statement",
    "try_statement", "switch_statement", "break_statement", "continue_statement",
    "variable_declaration", "lexical_declaration",
    "function_declaration", "class_declaration"
}

def walk(n):
    yield n
    for c in n.children:
        yield from walk(c)

def node_text(code, n):
    return code.encode()[n.start_byte:n.end_byte].decode(errors="ignore")

def find_node_type_at_line(code: str, line_1based: int) -> str:
    """Find the AST node type at a given line number"""
    lines = code.splitlines(keepends=True)
    if line_1based < 1 or line_1based > len(lines):
        return "unknown"
    
    byte_offset = sum(len(lines[i]) for i in range(line_1based - 1))
    tree = js_parser.parse(code.encode())
    
    # Find smallest named statement node containing this position
    best = None
    best_size = float('inf')
    
    for n in walk(tree.root_node):
        if not n.is_named:
            continue
        if n.start_byte <= byte_offset < n.end_byte:
            size = n.end_byte - n.start_byte
            if size < best_size and n.type in STATEMENT_TYPES:
                best = n
                best_size = size
    
    return best.type if best else "expression_statement"

def extract_node_type_from_context(original_code: str, ctx_before: str, ctx_after: str) -> str:
    """
    Try to find where ctx_before or ctx_after appears in original code
    and return the node type at that location
    """
    if not original_code:
        return "expression_statement"
    
    lines = original_code.splitlines()
    
    # Try to find context in original
    for i, line in enumerate(lines, 1):
        if ctx_before and ctx_before.strip() in line:
            return find_node_type_at_line(original_code, i)
        if ctx_after and ctx_after.strip() in line:
            return find_node_type_at_line(original_code, i)
    
    # Fallback: parse the mutation itself if it exists
    return "expression_statement"

INVALID_PATTERNS = [
    r"<VAR_CHAIN>\s*=\s*<VAR_CHAIN>",  # nonsense chain
    r"<BUILTIN_CHAIN>\s*;",
    r"catch\s*\(<<TYPE>>\)",
    r"catch\s*\(<TYPE>\)",
    r"\+=\s*<",
    r"^\+?\s*$",
]

MAX_MUTATION_LINES = 3
MAX_MUTATION_CHARS = 220

def _block_too_big(lines):
    if not lines:
        return False
    s = "\n".join(lines)
    return (len(lines) > MAX_MUTATION_LINES) or (len(s) > MAX_MUTATION_CHARS)

def text_is_valid(txt: str) -> bool:
    for pat in INVALID_PATTERNS:
        if re.search(pat, txt):
            return False
    return True

def mut_is_valid(m: dict) -> bool:
    if m.get("kind") not in ("insert", "replace"):
        return False
    
    before = m.get("before", []) or []
    after = m.get("after", []) or []
    
    if before == after:
        return False
    if _block_too_big(before) or _block_too_big(after):
        return False
    
    # Insert must have content
    if m["kind"] == "insert" and not after:
        return False
    
    blob = "\n".join(before + after)
    if not text_is_valid(blob):
        return False
    
    return True

def can_parse_as_statements(lines: list) -> bool:
    """Check if lines parse as valid JS statements"""
    if not lines:
        return True
    
    code = "\n".join(lines)
    # Wrap in function to test as statement block
    wrapped = f"function __test__() {{\n{code}\n}}"
    tree = js_parser.parse(wrapped.encode())
    return not tree.root_node.has_error

# ---- Feature & scoring ---- #
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
    try:
        result = subprocess.run(
            cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, timeout=20
        )
        return parse_feature_string(result.stdout.strip())
    except Exception:
        return {}

def execution_failed(feats: dict) -> bool:
    if not feats:
        return True
    for k in FAIL_KEYS:
        if feats.get(k) not in (0, False, None):
            return True
    return False

def crash_score(feature_dict: dict) -> float:
    try:
        res = requests.post(PREDICT_URL, json=feature_dict, timeout=10)
        data = res.json()
        return float(data.get("probability", 0.0))
    except Exception:
        return 0.0

# ---- Core learning ---- #
def process_file(fname):
    path = os.path.join(CORPUS, fname)
    src = open(path, "r", encoding="utf-8", errors="ignore").read()
    
    base_feats = extract_features(path)
    if execution_failed(base_feats):
        return []
    
    base_score = crash_score(base_feats)
    learned = []
    seen = set()
    
    for _ in range(N_MUTATIONS):
        mutated = mutate(src, POOL, rounds=3)
        
        tmp = tempfile.NamedTemporaryFile(delete=False, suffix=".js")
        tmp.write(mutated.encode())
        tmp.close()
        
        try:
            # Validate syntax
            tree = js_parser.parse(mutated.encode())
            if tree.root_node.has_error:
                continue
            
            new_feats = extract_features(tmp.name)
            new_score = crash_score(new_feats)
            
            if new_score > base_score:
                diff = extract_diff(src, mutated)
                gdiff = generalize(diff)
                if not gdiff.strip():
                    continue
                
                muts = extract_mutations(gdiff, src)
                
                for m in muts:
                    if not mut_is_valid(m):
                        continue
                    
                    # EXTRACT NODE TYPE from original context
                    node_type = extract_node_type_from_context(
                        src,
                        m.get("ctx_before", ""),
                        m.get("ctx_after", "")
                    )
                    
                    # Validate 'after' block parses
                    after = m.get("after", [])
                    if after and not can_parse_as_statements(after):
                        continue
                    
                    sig = (
                        m["kind"],
                        node_type,
                        tuple(m.get("before") or []),
                        tuple(after),
                    )
                    if sig in seen:
                        continue
                    seen.add(sig)
                    
                    learned.append({
                        "kind": m["kind"],
                        "node_type": node_type,
                        "before": m.get("before") or [],
                        "after": after,
                        "gain": float(new_score - base_score),
                        "original_file": fname
                    })
        
        finally:
            os.unlink(tmp.name)
    
    return learned

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
            desc="Mining mutations",
            ncols=80
        ):
            learned.extend(result)
    
    learned.sort(key=lambda x: x["gain"], reverse=True)
    
    json.dump(learned, open("learned_mutators_fixed.json", "w"), indent=2)
    print(f"\n[✓] Saved {len(learned)} mutations to learned_mutators_fixed.json")
    
    if learned:
        print(f"[+] Gain range: {learned[-1]['gain']:.6f} to {learned[0]['gain']:.6f}")
        print("[+] Sample mutator:")
        print(json.dumps(learned[0], indent=2)[:900])

if __name__ == "__main__":
    main()