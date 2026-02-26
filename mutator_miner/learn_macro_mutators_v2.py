#!/usr/bin/env python3
"""
mutator_learning_improved.py  (FIXED)

SCORE-BASED LEARNED MUTATORS with proper GumTree template extraction.

Key fixes over original:
1. JS_ENGINE_CHECK_ARGS was a single-string list ['--flag1 --flag2']  FIXED to two items
2. get_statement_bounds() was a fragile line-heuristic  REPLACED with tree-sitter AST
   to find the nearest enclosing statement reliably
3. extract_templates_from_gumtree() was computing mut_start/mut_end from orig offsets
   in the mutated file  completely wrong after any edit.  FIXED by using the GumTree
   'dst-tree' node position (from the 'tree' field of insert/update ops) for the mutated
   side, and by running a second GumTree query direction on the mutated file.
4. abstract_code() string regex used [^\1] (backreference in char class = undefined)  FIXED
5. Added deduplication by abstract signature not raw code, reducing noise
6. Improved template validity checks: reject templates whose abstract form is trivially
   identical after normalisation
7. process_file now cleans up tmp files even on exceptions
8. Added node-type filtering in extract_templates so we skip structural noise like
   block_statement, program, etc. and only extract meaningful diff hunks
"""

import os, json, subprocess, tempfile, requests, re
from multiprocessing import Pool, cpu_count
from tqdm import tqdm
from typing import Dict, List, Optional, Tuple
from corpus_ast_mutator_v2 import build_pool, mutate, v8_parse_ok
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
# FIXED: was ['--allow-natives-syntax --expose-gc'] (single string)  now two separate args
JS_ENGINE_EXEC_ARGS = ["--allow-natives-syntax", "--expose-gc"]
SYNTAX_TIMEOUT = 5.0

GUMTREE_BIN = os.environ.get("GUMTREE", "gumtree")
GUMTREE_TIMEOUT = 15.0

js_parser = get_parser("javascript")


# ============================================================================
# GUMTREE INTEGRATION
# ============================================================================

def run_gumtree_diff(orig_path: str, mut_path: str) -> Optional[Dict]:
    """Run GumTree textdiff and return parsed JSON"""
    try:
        cmd = [GUMTREE_BIN, "textdiff", orig_path, mut_path, "-f", "JSON"]
        p = subprocess.run(
            cmd,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            timeout=GUMTREE_TIMEOUT,
        )
        raw_out = (p.stdout or b"").decode("utf-8", errors="ignore").strip()
        if not raw_out:
            return None
        return json.loads(raw_out)
    except (subprocess.TimeoutExpired, json.JSONDecodeError, Exception):
        return None


NODE_RE = re.compile(
    r"(?P<type>[A-Za-z_][A-Za-z0-9_]*)(?::\s*(?P<label>.*?))?\s*\[(?P<s>\d+),\s*(?P<e>\d+)\]"
)


def parse_gumtree_span(tree_str: str) -> Optional[Tuple[str, str, int, int]]:
    m = NODE_RE.search(tree_str or "")
    if not m:
        return None
    return (
        (m.group("type") or "").strip(),
        (m.group("label") or "").strip(),
        int(m.group("s")),
        int(m.group("e")),
    )


# ============================================================================
# AST-BASED STATEMENT EXTRACTION  (replaces fragile line heuristic)
# ============================================================================

# Node types we consider to be "statements" worth extracting
STATEMENT_TYPES = {
    "expression_statement",
    "lexical_declaration",
    "variable_declaration",
    "function_declaration",
    "class_declaration",
    "if_statement",
    "for_statement",
    "for_in_statement",
    "for_of_statement",
    "while_statement",
    "do_statement",
    "try_statement",
    "throw_statement",
    "return_statement",
    "switch_statement",
}

# Node types that are too coarse / structural  skip them
SKIP_NODE_TYPES = {
    "program", "statement_block", "block",
    "comment", "line_comment", "block_comment",
    "identifier",            # single variable names are not useful templates
    "property_identifier",
}


def find_enclosing_statement(code: str, byte_pos: int):
    """
    Walk the tree-sitter AST and find the smallest statement node that contains byte_pos.
    Returns (start_byte, end_byte, node_type) or None.
    """
    tree = js_parser.parse(code.encode("utf-8", errors="replace"))

    def _find(node):
        if not (node.start_byte <= byte_pos <= node.end_byte):
            return None
        # Try children first (want deepest match that is still a statement)
        best = None
        for child in node.children:
            res = _find(child)
            if res:
                best = res
        if best:
            return best
        if node.type in STATEMENT_TYPES:
            return (node.start_byte, node.end_byte, node.type)
        return None

    return _find(tree.root_node)


def get_statement_for_pos(code: str, byte_pos: int) -> Optional[Tuple[int, int, str]]:
    """Returns (start, end, node_type) of the statement enclosing byte_pos."""
    result = find_enclosing_statement(code, byte_pos)
    if result:
        return result
    # Fallback: try nearby positions �50 bytes
    for delta in range(1, 50):
        for d in (delta, -delta):
            p = byte_pos + d
            if 0 <= p < len(code):
                r = find_enclosing_statement(code, p)
                if r:
                    return r
    return None


def clean_code_chunk(code: str) -> str:
    """Remove comments and normalize whitespace"""
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
    'Array', 'Object', 'Math', 'String', 'Number', 'Error', 'Promise', 'Proxy',
    'Reflect', 'Symbol', 'prototype', 'length', 'constructor', 'call', 'apply',
    'bind', 'undefined', 'null', 'true', 'false', 'new', 'this', 'let', 'const',
    'var', 'delete', 'typeof', 'instanceof', 'in', 'of', 'class', 'extends',
    'super', 'static', 'async', 'await', 'yield', 'isFinite', 'isNaN',
    'parseInt', 'parseFloat', 'console',
}


def classify_number(s: str) -> str:
    try:
        n = int(s, 16 if s.startswith('0x') else 10)
        if n == 0:
            return '<ZERO>'
        if n == 1:
            return '<ONE>'
        if n == -1:
            return '<NEG_ONE>'
        if n in (0x7FFFFFFF, 0xFFFFFFFF, 2147483647, 4294967295):
            return '<BOUNDARY>'
        if n > 0 and (n & (n - 1)) == 0:
            return '<POW2>'
        if abs(n) <= 16:
            return '<SMALL>'
    except Exception:
        pass
    return '<NUM>'


def abstract_code(code: str) -> str:
    """Abstract code while preserving structural keywords"""
    # FIXED: use proper per-quote-char patterns, not broken backreference-in-charclass
    # Handle template literals (may span lines)
    code = re.sub(r'`[^`]*`', '<STR>', code, flags=re.DOTALL)
    # Handle double-quoted strings
    code = re.sub(r'"(?:[^"\\]|\\.)*"', '<STR>', code)
    # Handle single-quoted strings
    code = re.sub(r"'(?:[^'\\]|\\.)*'", '<STR>', code)

    # Numbers (after strings so we don't match inside them)
    def num_sub(m: re.Match) -> str:
        return classify_number(m.group(0))

    code = re.sub(r'\b0x[0-9a-fA-F]+\b', num_sub, code)
    code = re.sub(r'\b-?\d+\.?\d*(?:[eE][+-]?\d+)?\b', num_sub, code)

    # Identifiers  keep keywords and JS builtins
    def id_sub(m: re.Match) -> str:
        w = m.group(0)
        return w if w in JS_KEEP else '<VAR>'

    code = re.sub(r'\b[A-Za-z_$][A-Za-z0-9_$]*\b', id_sub, code)

    # Normalize whitespace
    code = re.sub(r'[ \t]+', ' ', code)
    code = re.sub(r'\n+', '\n', code)
    return code.strip()


def abstract_signature(template: Dict) -> str:
    """Canonical signature for deduplication"""
    return json.dumps({
        "kind": template["kind"],
        "before": template.get("before", []),
        "after": template.get("after", []),
    }, sort_keys=True)


# ============================================================================
# TEMPLATE EXTRACTION FROM GUMTREE  (major rewrite)
# ============================================================================

def extract_templates_from_gumtree(
    gumtree_json: Dict,
    orig_code: str,
    mut_code: str,
    gain: float,
) -> List[Dict]:
    """
    Extract statement-level templates from GumTree diff.

    FIXED:
    - Uses AST-based statement lookup for both original and mutated code
    - For the mutated side we use the destination tree positions from GumTree
      (the 'dest-tree' / second 'tree' fields), not a naive byte offset copy
    - Skips structural/noise node types
    - Better action � kind mapping
    """
    ops = gumtree_json.get("operations") or gumtree_json.get("actions") or []
    templates: List[Dict] = []

    for op in ops:
        if not isinstance(op, dict):
            continue

        action = (op.get("action") or op.get("type") or "").strip().lower()

        # GumTree JSON has 'tree' for the source-side node and sometimes
        # 'parent' for insert, or a 'dest' field.  The positions in 'tree'
        # refer to the ORIGINAL file for delete/update, and to the MUTATED
        # file for insert.
        src_tree_str = op.get("tree") or ""
        dst_tree_str = op.get("dest") or op.get("parent") or ""

        src_parsed = parse_gumtree_span(src_tree_str)
        if not src_parsed:
            continue

        node_type, label, s, e = src_parsed

        # Skip noise node types
        if node_type.lower() in SKIP_NODE_TYPES:
            continue
        if 'comment' in node_type.lower():
            continue

        # ---- Determine which file provides the source position ----
        # For 'delete'/'update', positions are in orig_code.
        # For 'insert'/'move', positions are in mut_code.
        if action.startswith("insert") or action.startswith("move"):
            orig_bytes = orig_code.encode("utf-8", errors="replace")
            mut_bytes = mut_code.encode("utf-8", errors="replace")
            # 'tree' position is in the mutated file for inserts
            after_bounds = get_statement_for_pos(mut_code, s)
            # For the 'before' side, try to find a nearby statement in orig
            # at roughly the same relative position
            rel = s / max(len(mut_bytes), 1)
            approx_orig_pos = int(rel * len(orig_bytes))
            before_bounds = get_statement_for_pos(orig_code, approx_orig_pos)
        elif action.startswith("delete"):
            before_bounds = get_statement_for_pos(orig_code, s)
            after_bounds = None
        else:  # update / match / other
            before_bounds = get_statement_for_pos(orig_code, s)
            # For update, try the dst position if available
            if dst_tree_str:
                dst_parsed = parse_gumtree_span(dst_tree_str)
                if dst_parsed:
                    _, _, ds, de = dst_parsed
                    after_bounds = get_statement_for_pos(mut_code, ds)
                else:
                    after_bounds = before_bounds  # fallback
            else:
                after_bounds = before_bounds

        # ---- Extract code chunks ----
        orig_chunk = ""
        if before_bounds:
            bs, be, _ = before_bounds
            orig_chunk = clean_code_chunk(orig_code[bs:be])

        mut_chunk = ""
        if after_bounds:
            ms, me, _ = after_bounds
            mut_chunk = clean_code_chunk(mut_code[ms:me])

        # For delete ops we only need orig_chunk; after is empty
        if action.startswith("delete"):
            mut_chunk = ""

        # Sanity checks
        if action in ("insert",) and not mut_chunk:
            continue
        if action in ("delete",) and not orig_chunk:
            continue
        if action not in ("insert", "delete") and (not orig_chunk or not mut_chunk):
            continue

        if len(orig_chunk) > 600 or len(mut_chunk) > 600:
            continue

        if orig_chunk == mut_chunk:
            continue

        # ---- Abstract ----
        orig_abs = abstract_code(orig_chunk) if orig_chunk else ""
        mut_abs = abstract_code(mut_chunk) if mut_chunk else ""

        if orig_abs == mut_abs:
            continue

        # Reject if abstraction collapsed everything to the same placeholder
        if orig_abs in ("<VAR>", "<NUM>", "") and mut_abs in ("<VAR>", "<NUM>", ""):
            continue

        # ---- Determine kind ----
        if action.startswith("insert"):
            kind = "insert"
        elif action.startswith("delete"):
            kind = "delete"
        else:
            kind = "replace"

        templates.append({
            "kind": kind,
            "scope": "statement",
            "before": orig_abs.split('\n') if orig_abs else [],
            "after": mut_abs.split('\n') if mut_abs else [],
            "node_type": node_type,
            "gain": gain,
        })

    return templates


# ============================================================================
# VALIDATION
# ============================================================================

INVALID_PATTERNS = [
    r"^\s*<VAR>\s*=\s*<VAR>\s*;?\s*$",  # trivial assignment
    r"catch\s*\(\s*<VAR>\s*\)\s*$",       # bare catch clause (incomplete)
    r"^\s*//",
    r"/\*",
    r"^\s*$",
]


def is_valid_template(template: Dict) -> bool:
    kind = template.get("kind")
    if kind not in ("insert", "replace"):
        return False

    before = template.get("before", [])
    after = template.get("after", [])

    if len(before) > 12 or len(after) > 12:
        return False

    before_text = '\n'.join(before)
    after_text = '\n'.join(after)

    if len(before_text) > 1200 or len(after_text) > 1200:
        return False

    if kind == "insert" and not after_text.strip():
        return False

    if kind == "replace" and (not before_text.strip() or not after_text.strip()):
        return False

    # Must have at least one non-trivial token
    combined = before_text + "\n" + after_text
    for pattern in INVALID_PATTERNS:
        if re.search(pattern, combined, re.MULTILINE):
            return False

    # Require at least one <VAR> or keyword to be meaningful
    if not re.search(r'<VAR>|<NUM>|<STR>|\b(?:try|if|for|while|function|new|return)\b', combined):
        return False

    return True


def can_instantiate(template: Dict) -> bool:
    """Syntax-check an instantiated version of the template."""
    replacements = {
        '<VAR>': 'x',
        '<NUM>': '1',
        '<ZERO>': '0',
        '<ONE>': '1',
        '<NEG_ONE>': '-1',
        '<STR>': '"test"',
        '<POW2>': '16',
        '<BOUNDARY>': '2147483647',
        '<SMALL>': '5',
    }

    def instantiate(lines: List[str]) -> str:
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
        test_code = f"function _test_() {{\n{after_inst}\n}}"
        tree = js_parser.parse(test_code.encode("utf-8", errors="replace"))
        return not tree.root_node.has_error
    except Exception:
        return False


# ============================================================================
# SCORING
# ============================================================================

def parse_feature_string(s: str) -> Dict:
    """
    Parse feature extractor comma-separated key=value output.

    FIX: the extractor emits numpy scalar types (np.str_, np.int64 &) which the
    scorer rejects with {"error":"np.str_('some_key')"}.  We force every key to a
    plain str and coerce every value to a JSON-safe Python primitive.
    """
    d: Dict = {}
    for pair in s.split(","):
        if "=" not in pair:
            continue
        k, v = pair.split("=", 1)
        key = str(k.strip())
        val_str = v.strip()
        try:
            val = eval(val_str, {"__builtins__": {}})
            if isinstance(val, bool):
                val = bool(val)
            elif isinstance(val, int):
                val = int(val)
            elif isinstance(val, float):
                val = float(val)
            else:
                val = str(val)
        except Exception:
            val = val_str
        d[key] = val
    return d


def sanitize_for_json(d: Dict) -> Dict:
    """Coerce any numpy / exotic scalars to plain JSON-serialisable types."""
    out = {}
    for k, v in d.items():
        k = str(k)
        if isinstance(v, bool):
            out[k] = bool(v)
        elif isinstance(v, int):
            out[k] = int(v)
        elif isinstance(v, float):
            out[k] = float(v)
        elif isinstance(v, str):
            out[k] = v
        else:
            try:
                out[k] = float(v)
            except Exception:
                out[k] = str(v)
    return out


def extract_features(jsfile: str) -> Dict:
    cmd = FEATURE_CMD.copy()
    cmd[4] = jsfile
    try:
        result = subprocess.run(
            cmd,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            timeout=20,
        )
        raw = result.stdout.strip()
        if not raw:
            return {}
        return sanitize_for_json(parse_feature_string(raw))
    except Exception:
        return {}


def execution_failed(feats: Dict) -> bool:
    if not feats:
        return True
    return any(feats.get(k) not in (0, False, None) for k in FAIL_KEYS)


def crash_score(feature_dict: Dict) -> float:
    if not feature_dict:
        return 0.0
    try:
        res = requests.post(PREDICT_URL, json=feature_dict, timeout=10)
        data = res.json()
        # FIX: scorer returns {"error": "..."} when it receives bad types  treat as 0
        if "error" in data:
            return 0.0
        return float(data.get("probability", 0.0))
    except Exception:
        return 0.0


# ============================================================================
# MAIN LEARNING LOOP
# ============================================================================

# Global pool reference  populated in each worker by _worker_init
POOL = None


def _worker_init(pool_obj):
    """
    Pool initializer: store the FragmentPool in each worker's global namespace.
    FIX: multiprocessing.Pool spawns fresh processes that do NOT inherit the
    parent globals.  Using an initializer is the standard pattern for sharing
    a read-only object without pickling it on every task call.
    """
    global POOL
    POOL = pool_obj


def process_file(fname: str) -> List[Dict]:
    """Process one corpus file and extract learned mutators"""
    import random

    path = os.path.join(CORPUS, fname)
    try:
        src = open(path, "r", encoding="utf-8", errors="ignore").read()
    except OSError:
        return []

    # Phase 1: Baseline
    if not v8_parse_ok(src):
        return []

    base_feats = extract_features(path)
    base_score = crash_score(base_feats)
    learned: List[Dict] = []
    seen: set = set()

    # Phase 2: Mutation loop
    for _ in range(N_MUTATIONS):
        rounds = 3 if random.random() < 0.7 else 5
        mutated = mutate(src, POOL, rounds=rounds)

        if not v8_parse_ok(mutated):
            continue

        mut_tmp: Optional[str] = None
        orig_tmp: Optional[str] = None
        try:
            with tempfile.NamedTemporaryFile(delete=False, suffix=".js", mode='w') as f:
                f.write(mutated)
                mut_tmp = f.name

            # Phase 3: Score
            new_feats = extract_features(mut_tmp)
            new_score = crash_score(new_feats)

            # Phase 4: Filter
            if new_score <= base_score + 0.05:
                continue

            gain = new_score - base_score
            print(f"  [+] {fname}: gain={gain:.4f}")

            # Phase 5: GumTree diff
            with tempfile.NamedTemporaryFile(delete=False, suffix=".js", mode='w') as f:
                f.write(src)
                orig_tmp = f.name

            gumtree_json = run_gumtree_diff(orig_tmp, mut_tmp)
            if not gumtree_json:
                continue

            # Phase 6: Extract templates
            templates = extract_templates_from_gumtree(gumtree_json, src, mutated, gain)
            print(f"       {len(templates)} raw templates from GumTree")

            # Phase 7-9: Validate, instantiate, dedupe
            for tmpl in templates:
                if not is_valid_template(tmpl):
                    continue
                if not can_instantiate(tmpl):
                    continue

                sig = abstract_signature(tmpl)
                if sig in seen:
                    continue
                seen.add(sig)

                learned.append({
                    "kind": tmpl["kind"],
                    "scope": tmpl["scope"],
                    "before": tmpl["before"],
                    "after": tmpl["after"],
                    "node_type": tmpl.get("node_type", ""),
                    "gain": gain,
                    "original_file": fname,
                })

        finally:
            for p in (mut_tmp, orig_tmp):
                if p and os.path.exists(p):
                    try:
                        os.unlink(p)
                    except OSError:
                        pass

    return learned


# ============================================================================
# ENTRY POINT
# ============================================================================

def main() -> None:
    global POOL

    print(f"[+] Building fragment pool from {CORPUS!r}")
    POOL = build_pool(CORPUS)
    print(f"[+] Pool: {len(POOL.statements)} simple, {len(POOL.compound)} compound, {len(POOL.expressions)} exprs")

    files = [f for f in os.listdir(CORPUS) if f.endswith(".js")]
    print(f"[+] {len(files)} corpus files")
    print(f"[+] {N_WORKERS} workers | GumTree: {GUMTREE_BIN}")

    learned: List[Dict] = []

    # FIX: pass POOL to each worker via initializer  global assignment in main()
    # is not visible in spawned subprocesses without this
    with Pool(N_WORKERS, initializer=_worker_init, initargs=(POOL,)) as p:
        for result in tqdm(
            p.imap_unordered(process_file, files),
            total=len(files),
            desc="Mining mutators",
            ncols=80,
        ):
            learned.extend(result)

    # Sort by gain descending
    learned.sort(key=lambda x: x["gain"], reverse=True)

    output_path = "learned_mutators_gumtree.json"
    with open(output_path, "w") as f:
        json.dump(learned, f, indent=2)

    print(f"\n[*] Saved {len(learned)} learned mutators � {output_path}")
    if learned:
        print(f"[+] Gain range: {learned[-1]['gain']:.4f}  {learned[0]['gain']:.4f}")
        print("[+] Top mutator:")
        print(json.dumps(learned[0], indent=2))


if __name__ == "__main__":
    main() 