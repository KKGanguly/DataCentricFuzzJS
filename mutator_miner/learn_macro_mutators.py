#!/usr/bin/env python3
"""
mutator_learning_improved.py

SCORE-BASED LEARNED MUTATORS with proper GumTree template extraction.

Key improvements over original:
1. Uses GumTree for precise diff extraction (not diff_utils)
2. Extracts statement-level templates properly
3. Better abstraction that preserves JS semantics
4. Multi-level validation
5. Score-based filtering (only beneficial mutations)
"""

import os, json, subprocess, tempfile, requests, re
from multiprocessing import Pool, cpu_count
from tqdm import tqdm
from typing import Dict, List, Optional, Tuple

from corpus_ast_mutator import build_pool, mutate
from tree_sitter_languages import get_parser

# ============================================================================
# CONFIGURATION
# ============================================================================

CORPUS = "corpus"
PREDICT_URL = "http://localhost:5000/predict"
FEATURE_CMD = ["python3.13", "../feature_extractor_cli.py", "file", "--i", None, "--format", "string"]
FAIL_KEYS = ["exit_code", "execution_failed", "runtime_error"]

N_MUTATIONS = 20
N_WORKERS = min(32, cpu_count())

JS_ENGINE_PATH = os.environ.get("JS_ENGINE_PATH", "/home/kgangul/DataCentricFuzzJS/v8/out/fuzzbuild/d8")
JS_ENGINE_CHECK_ARGS = ["--allow-natives-syntax --expose-gc"]
SYNTAX_TIMEOUT = 5.0

GUMTREE_BIN = os.environ.get("GUMTREE", "gumtree")
GUMTREE_TIMEOUT = 15.0

js_parser = get_parser("javascript")


# ============================================================================
# GUMTREE INTEGRATION
# ============================================================================

def run_gumtree_diff(orig_path: str, mut_path: str) -> Optional[Dict]:
    """Run GumTree textdiff and return JSON"""
    try:
        cmd = [GUMTREE_BIN, "textdiff", orig_path, mut_path, "-f", "JSON"]
        p = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, timeout=GUMTREE_TIMEOUT)
        raw_out = (p.stdout or b"").decode("utf-8", errors="ignore")
        return json.loads(raw_out)
    except Exception:
        return None


NODE_RE = re.compile(r"(?P<type>[A-Za-z_]+)(:\s*(?P<label>.*?))?\s*\[(?P<s>\d+),(?P<e>\d+)\]")


def parse_gumtree_span(tree_str: str) -> Optional[Tuple[str, str, int, int]]:
    m = NODE_RE.search(tree_str or "")
    if not m:
        return None
    return (m.group("type") or "").strip(), (m.group("label") or "").strip(), int(m.group("s")), int(m.group("e"))


def get_statement_bounds(code: str, pos: int) -> Tuple[int, int]:
    """Find statement boundaries"""
    lines = code.split('\n')
    char_count = 0
    target_line = 0
    for i, line in enumerate(lines):
        if char_count <= pos < char_count + len(line) + 1:
            target_line = i
            break
        char_count += len(line) + 1
    
    start_line = target_line
    while start_line > 0:
        line = lines[start_line].strip()
        if not line or line.startswith('//'):
            start_line += 1
            break
        prev = lines[start_line - 1].strip()
        if prev.endswith(';') or prev.endswith('}') or prev.endswith('{'):
            break
        start_line -= 1
    
    end_line = target_line
    while end_line < len(lines) - 1:
        line = lines[end_line].strip()
        if line.endswith(';') or line.endswith('}') or line.endswith('{'):
            end_line += 1
            break
        if end_line > target_line and (not line or line.startswith('//')):
            break
        end_line += 1
    
    start_pos = sum(len(lines[i]) + 1 for i in range(start_line))
    end_pos = sum(len(lines[i]) + 1 for i in range(end_line))
    return start_pos, end_pos


def clean_code_chunk(code: str) -> str:
    """Remove comments"""
    lines = [l for l in code.split('\n') if not l.strip().startswith('//')]
    code = '\n'.join(lines)
    code = re.sub(r'/\*.*?\*/', '', code, flags=re.DOTALL)
    code = re.sub(r'\n\s*\n\s*\n', '\n\n', code)
    return code.strip()


# ============================================================================
# ABSTRACTION
# ============================================================================

JS_KEEP = {
    'if', 'else', 'for', 'while', 'function', 'return', 'throw', 'try', 'catch',
    'Array', 'Object', 'Math', 'String', 'Number', 'Error', 'Promise',
    'prototype', 'length', 'constructor', 'call', 'apply',
    'undefined', 'null', 'true', 'false', 'new', 'this', 'let', 'const', 'var',
}


def classify_number(s: str) -> str:
    try:
        n = int(s, 16 if s.startswith('0x') else 10)
        if n == 0: return '<ZERO>'
        if n == 1: return '<ONE>'
        if n == -1: return '<NEG_ONE>'
        if n in (0x7FFFFFFF, 0xFFFFFFFF, 2147483647, 4294967295): return '<BOUNDARY>'
        if n > 0 and (n & (n - 1)) == 0: return '<POW2>'
        if abs(n) <= 16: return '<SMALL>'
    except:
        pass
    return '<NUM>'


def abstract_code(code: str) -> str:
    """Abstract code while preserving structure"""
    # Numbers
    def num_sub(m):
        return classify_number(m.group(0))
    code = re.sub(r'\b-?0x[0-9a-fA-F]+\b', num_sub, code)
    code = re.sub(r'\b-?\d+\.?\d*([eE][+-]?\d+)?\b', num_sub, code)
    
    # Strings
    code = re.sub(r'''(['"`])[^\1]*?\1''', '<STR>', code)
    
    # Identifiers
    def id_sub(m):
        w = m.group(0)
        return w if w in JS_KEEP else '<VAR>'
    code = re.sub(r'\b[A-Za-z_$][A-Za-z0-9_$]*\b', id_sub, code)
    
    # Normalize whitespace
    code = re.sub(r'[ \t]+', ' ', code)
    code = re.sub(r'\n+', '\n', code)
    return code.strip()


# ============================================================================
# TEMPLATE EXTRACTION FROM GUMTREE
# ============================================================================

def extract_templates_from_gumtree(gumtree_json: Dict, orig_code: str, mut_code: str, gain: float) -> List[Dict]:
    """Extract statement-level templates from GumTree diff"""
    ops = gumtree_json.get("operations") or gumtree_json.get("actions") or []
    templates = []
    
    for op in ops:
        if not isinstance(op, dict):
            continue
        
        action = (op.get("action") or op.get("type") or "").strip()
        tree = op.get("tree") or op.get("node") or ""
        
        parsed = parse_gumtree_span(tree)
        if not parsed:
            continue
        
        node_type, label, s, e = parsed
        
        if 'comment' in node_type.lower():
            continue
        
        # Get statement boundaries in original
        orig_start, orig_end = get_statement_bounds(orig_code, s)
        orig_chunk = orig_code[orig_start:orig_end]
        orig_chunk = clean_code_chunk(orig_chunk)
        
        if len(orig_chunk) < 5 or len(orig_chunk) > 500:
            continue
        
        # Find corresponding in mutated (simple offset)
        mut_start = min(orig_start, len(mut_code))
        mut_end = min(orig_end, len(mut_code))
        mut_start, mut_end = get_statement_bounds(mut_code, mut_start)
        
        mut_chunk = mut_code[mut_start:mut_end]
        mut_chunk = clean_code_chunk(mut_chunk)
        
        if len(mut_chunk) < 5 or len(mut_chunk) > 500:
            continue
        
        if orig_chunk == mut_chunk:
            continue
        
        # Abstract
        orig_abs = abstract_code(orig_chunk)
        mut_abs = abstract_code(mut_chunk)
        
        if not orig_abs or not mut_abs or orig_abs == mut_abs:
            continue
        
        # Determine kind
        if action.startswith("insert"):
            kind = "insert"
        elif action.startswith("delete"):
            kind = "delete"
        else:
            kind = "replace"
        
        templates.append({
            "kind": kind,
            "scope": "statement",
            "before": orig_abs.split('\n'),
            "after": mut_abs.split('\n'),
            "node_type": node_type,
            "gain": gain,
        })
    
    return templates


# ============================================================================
# VALIDATION
# ============================================================================

INVALID_PATTERNS = [
    r"<VAR>\s*=\s*<VAR>$",
    r"catch\s*\(<VAR>\)",
    r"Object\.setPrototypeOf\(\)",
    r"^\s*$",
    r"//", r"/\*",
]


def is_valid_template(template: Dict) -> bool:
    kind = template.get("kind")
    if kind not in ("insert", "replace"):
        return False
    
    before = template.get("before", [])
    after = template.get("after", [])
    
    if len(before) > 10 or len(after) > 10:
        return False
    
    before_text = '\n'.join(before)
    after_text = '\n'.join(after)
    
    if len(before_text) > 1000 or len(after_text) > 1000:
        return False
    
    if kind == "insert" and not after_text.strip():
        return False
    
    if kind == "replace" and (not before_text.strip() or not after_text.strip()):
        return False
    
    combined = before_text + "\n" + after_text
    for pattern in INVALID_PATTERNS:
        if re.search(pattern, combined):
            return False
    
    return True


def can_instantiate(template: Dict) -> bool:
    """Quick sanity check"""
    replacements = {
        '<VAR>': 'x', '<NUM>': '1', '<ZERO>': '0', '<ONE>': '1',
        '<STR>': '"test"', '<POW2>': '16', '<BOUNDARY>': '2147483647',
    }
    
    def instantiate(lines):
        result = []
        for line in lines:
            for ph, val in replacements.items():
                line = line.replace(ph, val)
            result.append(line)
        return '\n'.join(result)
    
    try:
        after_inst = instantiate(template.get("after", []))
        if not after_inst.strip():
            return False
        test_code = f"function test() {{\n{after_inst}\n}}"
        tree = js_parser.parse(test_code.encode())
        return not tree.root_node.has_error
    except:
        return False


# ============================================================================
# SCORING
# ============================================================================

def parse_feature_string(s: str) -> Dict:
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


def extract_features(jsfile: str) -> Dict:
    cmd = FEATURE_CMD.copy()
    cmd[4] = jsfile
    try:
        result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, timeout=20)
        return parse_feature_string(result.stdout.strip())
    except:
        return {}


def execution_failed(feats: Dict) -> bool:
    if not feats:
        return True
    return any(feats.get(k) not in (0, False, None) for k in FAIL_KEYS)


def crash_score(feature_dict: Dict) -> float:
    try:
        res = requests.post(PREDICT_URL, json=feature_dict, timeout=10)
        return float(res.json().get("probability", 0.0))
    except:
        return 0.0


def v8_parse_ok(js: str) -> bool:
    try:
        p = subprocess.run(
            [JS_ENGINE_PATH] + JS_ENGINE_CHECK_ARGS,
            input=js.encode("utf-8", errors="ignore"),
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
            timeout=SYNTAX_TIMEOUT
        )
        return p.returncode <= 0
    except Exception as e:
        return False


# ============================================================================
# MAIN LEARNING LOOP
# ============================================================================

def process_file(fname):
    """Process one file and extract learned mutators"""
    path = os.path.join(CORPUS, fname)
    src = open(path, "r", encoding="utf-8", errors="ignore").read()

    # Phase 1: Baseline scoring
    base_feats = extract_features(path)
    if not v8_parse_ok(src):
        return []
    base_score = crash_score(base_feats)
    print(base_score)
    learned = []
    seen = set()

    # Phase 2: Mutation loop
    for _ in range(N_MUTATIONS):
        mutated = mutate(src, POOL, rounds=1)
        # Syntax validation
        if not v8_parse_ok(mutated):
            continue
        
        # Write to temp file for feature extraction
        tmp = tempfile.NamedTemporaryFile(delete=False, suffix=".js", mode='w')
        tmp.write(mutated)
        tmp.close()

        try:
            # Phase 3: Score new mutation
            new_feats = extract_features(tmp.name)
            
            
            new_score = crash_score(new_feats)
            
            # Phase 4: Filter by score (CRITICAL)
            if new_score <= base_score:
                continue
            
            gain = new_score - base_score
            print(f"  [+] Found beneficial mutation: gain={gain:.6f}")
            
            # Phase 5: Extract diff with GumTree
            orig_tmp = tempfile.NamedTemporaryFile(delete=False, suffix=".js", mode='w')
            orig_tmp.write(src)
            orig_tmp.close()
            
            try:
                gumtree_json = run_gumtree_diff(orig_tmp.name, tmp.name)
                
                if not gumtree_json:
                    continue
                
                # Phase 6: Extract templates
                templates = extract_templates_from_gumtree(gumtree_json, src, mutated, gain)
                
                print(f"  [+] Extracted {len(templates)} templates from GumTree")
                
                # Phase 7-9: Validate, instantiate, dedupe
                for tmpl in templates:
                    if not is_valid_template(tmpl):
                        continue
                    
                    if not can_instantiate(tmpl):
                        continue
                    
                    sig = (
                        tmpl["kind"],
                        tuple(tmpl.get("before", [])),
                        tuple(tmpl.get("after", [])),
                    )
                    if sig in seen:
                        continue
                    seen.add(sig)
                    
                    # Phase 10: Save
                    learned.append({
                        "kind": tmpl["kind"],
                        "scope": tmpl["scope"],
                        "before": tmpl["before"],
                        "after": tmpl["after"],
                        "node_type": tmpl.get("node_type", ""),
                        "gain": gain,
                        "original_file": fname
                    })
            finally:
                os.unlink(orig_tmp.name)
        finally:
            os.unlink(tmp.name)

    return learned


# ============================================================================
# ENTRY POINT
# ============================================================================

def main():
    global POOL

    print(f"[+] Building fragment pool from {CORPUS}")
    POOL = build_pool(CORPUS)
    files = [f for f in os.listdir(CORPUS) if f.endswith(".js")]
    print(f"[+] {len(files)} corpus files")
    print(f"[+] Using {N_WORKERS} cores")
    print(f"[+] GumTree binary: {GUMTREE_BIN}")

    learned = []

    with Pool(N_WORKERS) as p:
        for result in tqdm(
            p.imap_unordered(process_file, files),
            total=len(files),
            desc="Mining mutators",
            ncols=80
        ):
            learned.extend(result)

    # Sort by gain
    learned.sort(key=lambda x: x["gain"], reverse=True)

    # Save
    output_path = "learned_mutators_gumtree.json"
    with open(output_path, "w") as f:
        json.dump(learned, f, indent=2)

    print(f"\n[] Saved {len(learned)} learned mutators to {output_path}")
    if learned:
        print(f"[+] Gain range: {learned[-1]['gain']:.6f} to {learned[0]['gain']:.6f}")
        print("[+] Top mutator:")
        print(json.dumps(learned[0], indent=2))


if __name__ == "__main__":
    main() 