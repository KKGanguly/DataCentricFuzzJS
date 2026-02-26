#!/usr/bin/env python3
"""
corpus_ast_mutator.py  (FIXED)

Key fixes over original:
1. v8_parse_ok uses consistent file-based invocation (not stdin) matching mutator_learning
2. Removed --check flag so v8 actually executes (--check only does syntax, but we also want
   to catch runtime issues via exit code); use file-based approach with timeout
3. Fixed abstract_code() string regex  backreference in character class is undefined behaviour
4. Fixed rename_identifier_global to use AST-based renaming (not regex on raw text)
5. Fixed rewrite_fragment_hygienic: formal_parameters children now handled recursively
6. Fixed BAD_TOKENS matching to avoid false positives (e.g. 'evaluate(' != 'eval(')
7. insert_statement now properly validates with same v8_parse_ok used everywhere
8. collect_declared_positions: fixed formal_parameters to walk recursively
9. Added deduplicated fragment pool building with size limits
10. replace_expression: added precedence guard and better candidate validation
"""

from __future__ import annotations
import argparse, json, os, random, re, tempfile, subprocess
from dataclasses import dataclass, asdict
from typing import List, Set, Dict, Optional, Tuple

# ---------------------------------------------------------------------------
# Engine config
# ---------------------------------------------------------------------------
JS_ENGINE_PATH = os.environ.get(
    "JS_ENGINE_PATH",
    "/home/kgangul/DataCentricFuzzJS/v8/out/fuzzbuild/d8",
)
# FIXED: separate flags, no --check so we actually run code and detect crashes
JS_ENGINE_EXEC_ARGS = ["--allow-natives-syntax", "--expose-gc"]
SYNTAX_TIMEOUT = 3.0


def v8_parse_ok(js: str, timeout: float = SYNTAX_TIMEOUT) -> bool:
    """
    Returns True if code is syntactically valid (or causes crash/timeout).
    Uses a temp file  consistent with how mutator_learning_improved calls it.
    Returns False only for exit code 1 (syntax / early type error).
    """
    tmp_path = None
    try:
        with tempfile.NamedTemporaryFile("w", suffix=".js", delete=False) as f:
            f.write(js)
            tmp_path = f.name
        p = subprocess.run(
            [JS_ENGINE_PATH, tmp_path] + JS_ENGINE_EXEC_ARGS,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
            timeout=timeout,
        )
        ret = p.returncode
        if ret == 0:
            return True
        if ret == 1:
            return False   # syntax/type error � discard
        return True        # crash (>1) or other � keep
    except subprocess.TimeoutExpired:
        return True
    except Exception:
        return True
    finally:
        if tmp_path and os.path.exists(tmp_path):
            try:
                os.remove(tmp_path)
            except OSError:
                pass


# ---------------------------------------------------------------------------
# Tree-sitter loader
# ---------------------------------------------------------------------------
def _load_js_language():
    try:
        from tree_sitter_languages import get_language
        return get_language("javascript")
    except Exception:
        from tree_sitter import Language
        so = os.environ.get("JS_LANG_SO", "./js_lang.so")
        return Language(so, "javascript")


JS_LANGUAGE = _load_js_language()
from tree_sitter import Parser  # noqa: E402

parser = Parser()
try:
    parser.set_language(JS_LANGUAGE)
except Exception:
    parser.language = JS_LANGUAGE


def parse(code: str):
    return parser.parse(code.encode("utf-8", errors="replace"))


def walk(n):
    yield n
    for c in n.children:
        yield from walk(c)


def node_text(code: str, n) -> str:
    return code[n.start_byte:n.end_byte]


def replace_span(code: str, s: int, e: int, new: str) -> str:
    return code[:s] + new + code[e:]


# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------
JS_KEYWORDS = {
    "let", "var", "const", "function", "class", "return", "if", "for",
    "while", "try", "catch", "throw", "break", "continue", "new", "delete",
    "typeof", "instanceof", "in", "of", "do", "switch", "case", "default",
    "import", "export", "from", "as", "async", "await", "yield", "static",
    "extends", "super", "void", "null", "undefined", "true", "false",
    "this", "arguments",
}

JS_BUILTINS = {
    "Object", "Array", "Map", "Set", "Intl", "Math", "JSON", "Promise",
    "WebAssembly", "console", "Error", "Symbol", "Proxy", "Reflect",
    "Number", "String", "Boolean", "BigInt", "Date", "RegExp",
    "isFinite", "isNaN", "parseInt", "parseFloat", "encodeURI",
    "decodeURI", "encodeURIComponent", "decodeURIComponent",
}

# FIXED: use whole-word or suffix-safe tokens to avoid false positives
# e.g. "eval(" would match "evaluate("  so we check token boundaries properly
BAD_TOKEN_PATTERNS: List[re.Pattern] = [
    re.compile(r'%OptimizeFunction\b'),
    re.compile(r'%PrepareFunction\b'),
    re.compile(r'%NeverOptimizeFunction\b'),
    re.compile(r'%DeoptimizeFunction\b'),
    re.compile(r'%DebugPrint\b'),
    re.compile(r'%DebugBreak\b'),
    re.compile(r'%SystemBreak\b'),
    re.compile(r'%CollectGarbage\b'),
    re.compile(r'%GetOptimizationStatus\b'),
    re.compile(r'%HasFastProperties\b'),
    re.compile(r'%DisassembleFunction\b'),
    re.compile(r'%HeapObjectVerify\b'),
    re.compile(r'%IsBeingInterpreted\b'),
    re.compile(r'\bOptimizeFunctionOnNextCall\b'),
    re.compile(r'\bPrepareFunctionForOptimization\b'),
    re.compile(r'\b__defineGetter__\b'),
    re.compile(r'\b__defineSetter__\b'),
    re.compile(r'\b__lookupGetter__\b'),
    re.compile(r'\b__lookupSetter__\b'),
    # FIXED: use word boundary after 'eval' so 'evaluate' doesn't match
    re.compile(r'\beval\s*\('),
    # FIXED: 'new Function' and bare Function( as constructor only
    re.compile(r'\bnew\s+Function\b'),
    re.compile(r'(?<!\w)Function\s*\('),
    re.compile(r'\bWebAssembly\b'),
    re.compile(r'\bSharedArrayBuffer\b'),
    re.compile(r'\bAtomics\b'),
    re.compile(r'\bWorker\b'),
    re.compile(r'\bimport\s*\('),
    re.compile(r'\brequire\s*\('),
]

IDENT_RX = re.compile(r"\b[A-Za-z_$][A-Za-z0-9_$]*\b")


def has_bad_token(code: str) -> bool:
    for pat in BAD_TOKEN_PATTERNS:
        if pat.search(code):
            return True
    return False


# ---------------------------------------------------------------------------
# Identifier analysis
# ---------------------------------------------------------------------------
def collect_identifiers(code: str) -> List[str]:
    t = parse(code)
    ids = []
    for n in walk(t.root_node):
        if n.type == "identifier":
            s = node_text(code, n)
            if s not in JS_KEYWORDS:
                ids.append(s)
    return ids


def collect_declared_identifiers(code: str) -> Set[str]:
    t = parse(code)
    root = t.root_node
    out: Set[str] = set()
    for n in walk(root):
        if n.type == "variable_declarator":
            for c in n.children:
                if c.type == "identifier":
                    out.add(node_text(code, c))
        elif n.type in ("function_declaration", "class_declaration"):
            for c in n.children:
                if c.type == "identifier":
                    out.add(node_text(code, c))
        elif n.type == "formal_parameters":
            # FIXED: walk recursively to catch destructured params
            for c in walk(n):
                if c.type == "identifier":
                    out.add(node_text(code, c))
    return out


def collect_declared_from_fragment(fragment: str) -> Set[str]:
    t = parse(fragment)
    out: Set[str] = set()
    for n in walk(t.root_node):
        if n.type == "variable_declarator":
            for c in n.children:
                if c.type == "identifier":
                    out.add(node_text(fragment, c))
        elif n.type in ("function_declaration", "class_declaration"):
            for c in n.children:
                if c.type == "identifier":
                    out.add(node_text(fragment, c))
        elif n.type == "formal_parameters":
            for c in walk(n):
                if c.type == "identifier":
                    out.add(node_text(fragment, c))
    return out


def infer_fragment_usage_types(fragment: str) -> Dict[str, str]:
    t = parse(fragment)
    usage: Dict[str, str] = {}
    for n in walk(t.root_node):
        if n.type == "call_expression":
            fn = n.children[0]
            if fn.type == "identifier":
                usage[node_text(fragment, fn)] = "function"
        if n.type == "member_expression":
            obj = n.children[0]
            prop = n.children[-1]
            if obj.type == "identifier" and prop.type == "property_identifier":
                pname = node_text(fragment, prop)
                if pname in ("push", "pop", "map", "filter", "slice", "forEach", "reduce"):
                    usage[node_text(fragment, obj)] = "array"
    return usage


def collect_declared_positions(code: str) -> Dict[str, int]:
    t = parse(code)
    pos: Dict[str, int] = {}

    def record(name: str, start: int) -> None:
        pos[name] = min(pos.get(name, 10 ** 18), start)

    for n in walk(t.root_node):
        if n.type == "variable_declarator":
            for c in n.children:
                if c.type == "identifier":
                    record(node_text(code, c), c.start_byte)
        elif n.type in ("function_declaration", "class_declaration"):
            for c in n.children:
                if c.type == "identifier":
                    record(node_text(code, c), c.start_byte)
        elif n.type == "formal_parameters":
            # FIXED: recursive walk so destructuring patterns are included
            for c in walk(n):
                if c.type == "identifier":
                    record(node_text(code, c), c.start_byte)
    return pos


def visible_identifiers_at(code: str, insert_pos: int) -> List[str]:
    decl_pos = collect_declared_positions(code)
    return [name for name, p in decl_pos.items() if p <= insert_pos]


def collect_variable_types(code: str) -> Dict[str, str]:
    t = parse(code)
    types: Dict[str, str] = {}
    for n in walk(t.root_node):
        if n.type == "variable_declarator":
            name = None
            value = None
            for c in n.children:
                if c.type == "identifier":
                    name = node_text(code, c)
                else:
                    value = c
            if name and value:
                if value.type == "array":
                    types[name] = "array"
                elif value.type == "object":
                    types[name] = "object"
                elif value.type in ("number", "true", "false"):
                    types[name] = "number"
                elif value.type == "function":
                    types[name] = "function"
        if n.type == "function_declaration":
            for c in n.children:
                if c.type == "identifier":
                    types[node_text(code, c)] = "function"
    return types


def identifiers_in_text(txt: str) -> List[str]:
    return [m.group(0) for m in IDENT_RX.finditer(txt) if m.group(0) not in JS_KEYWORDS]


def make_fresh(used: Set[str]) -> str:
    i = 0
    while True:
        v = f"v{i}"
        if v not in used:
            used.add(v)
            return v
        i += 1


def rewrite_identifiers_ast(fragment: str, mapping: Dict[str, str]) -> str:
    """
    FIXED: rewrites identifier nodes only (not property_identifier which are keys).
    Applies edits back-to-front so byte offsets stay valid.
    """
    t = parse(fragment)
    edits: List[Tuple[int, int, str]] = []

    for n in walk(t.root_node):
        # Only rewrite 'identifier' nodes that are NOT object property keys
        if n.type == "identifier":
            # Skip if parent is a member_expression and this is the property (right side)
            parent = n.parent
            if parent and parent.type == "member_expression":
                # children: [object, '.', property]   skip the property child
                if parent.children[-1] is n and not parent.children[1].type == "[":
                    continue
            # Skip if parent is shorthand_property_identifier or similar
            if parent and parent.type in (
                "property_identifier",
                "shorthand_property_identifier_pattern",
            ):
                continue
            old = node_text(fragment, n)
            new = mapping.get(old)
            if new and new != old:
                edits.append((n.start_byte, n.end_byte, new))

    out = fragment
    for s, e, new in sorted(edits, key=lambda x: x[0], reverse=True):
        out = out[:s] + new + out[e:]
    return out


# ---------------------------------------------------------------------------
# Hygiene rewrite
# ---------------------------------------------------------------------------
def rewrite_fragment_hygienic(
    fragment: str, target_code: str, insert_pos: int
) -> Optional[str]:
    if has_bad_token(fragment):
        return None

    target_ids_all = set(collect_identifiers(target_code))
    target_declared = collect_declared_identifiers(target_code)
    target_types = collect_variable_types(target_code)

    visible_ids = set(visible_identifiers_at(target_code, insert_pos))
    visible_ids = {v for v in visible_ids if v in target_ids_all}

    frag_declared = collect_declared_from_fragment(fragment)
    frag_usage_types = infer_fragment_usage_types(fragment)

    if frag_declared & target_declared:
        return None

    t = parse(fragment)
    all_ident_nodes = [n for n in walk(t.root_node) if n.type == "identifier"]
    all_ids = [
        node_text(fragment, n)
        for n in all_ident_nodes
        if node_text(fragment, n) not in JS_KEYWORDS
    ]
    free = [x for x in all_ids if x not in frag_declared]

    mapping: Dict[str, str] = {}
    used = set(all_ids) | set(collect_identifiers(target_code))
    declarations: List[str] = []

    for name in set(free):
        if name in JS_BUILTINS:
            continue
        needed_type = frag_usage_types.get(name)
        candidates = [
            v for v in visible_ids
            if needed_type is None or target_types.get(v) == needed_type
        ]
        if candidates:
            mapping[name] = random.choice(candidates)
        else:
            newv = make_fresh(used)
            mapping[name] = newv
            if needed_type == "array":
                declarations.append(f"let {newv} = [];")
            elif needed_type == "object":
                declarations.append(f"let {newv} = {{}};")
            elif needed_type == "function":
                declarations.append(f"function {newv}(){{}}")
            else:
                declarations.append(f"let {newv} = 0;")

    for d in frag_declared:
        mapping[d] = make_fresh(used)

    out = rewrite_identifiers_ast(fragment, mapping)

    if declarations:
        out = "\n".join(declarations) + "\n" + out

    return out


# ---------------------------------------------------------------------------
# Fragment mining
# ---------------------------------------------------------------------------
def is_statement_node(n) -> bool:
    return n.is_named and n.type.endswith("_statement")


# Compound control-flow statement types worth mining as whole units.
# These are the "interesting" fragments  for-loops, try-catch, if-else, etc.
COMPOUND_STMT_TYPES = {
    "for_statement",
    "for_in_statement",
    "for_of_statement",
    "while_statement",
    "do_statement",
    "if_statement",
    "try_statement",
    "switch_statement",
    "labeled_statement",
}

# Simple statement types  still useful but not as structurally interesting
SIMPLE_STMT_TYPES = {
    "expression_statement",
    "lexical_declaration",
    "variable_declaration",
    "throw_statement",
}

EXPR_TYPES = {
    "binary_expression",
    "call_expression",
    "assignment_expression",
    "member_expression",
    "new_expression",
    "unary_expression",
    "update_expression",
    "conditional_expression",
    "await_expression",
    "yield_expression",
    "sequence_expression",
}

# Size limits  compound statements can be bigger
MAX_SIMPLE_STMT_LEN = 300
MAX_COMPOUND_STMT_LEN = 1500   # allow full for-loops and try-catch blocks
MAX_EXPR_LEN = 200


def _is_inside_compound(node) -> bool:
    """Returns True if this node is nested inside a compound statement body."""
    p = node.parent
    while p is not None:
        if p.type in COMPOUND_STMT_TYPES:
            return True
        if p.type == "program":
            break
        p = p.parent
    return False


def mine_fragments(code: str) -> Tuple[List[str], List[str], List[str], List[str]]:
    """
    Returns (simple_stmts, compound_stmts, exprs, ids).

    KEY FIX: compound statements are mined separately and inner body statements
    are NOT added to simple_stmts when they live inside a compound block.
    This prevents the pool from being flooded with atoms like 'test();' that
    come from the body of a for-loop, which massively dilutes complex fragments.
    """
    t = parse(code)
    simple_stmts: List[str] = []
    compound_stmts: List[str] = []
    exprs: List[str] = []
    ids: List[str] = []

    for n in walk(t.root_node):
        # Always collect identifiers
        if n.type == "identifier":
            s = node_text(code, n)
            if s not in JS_KEYWORDS:
                ids.append(s)

        # Compound statements: mine the whole block regardless of nesting
        if n.type in COMPOUND_STMT_TYPES:
            txt = node_text(code, n)
            if 20 < len(txt) < MAX_COMPOUND_STMT_LEN and not has_bad_token(txt):
                compound_stmts.append(txt)
            # Do NOT recurse into children for simple_stmts  skip to next node
            continue

        # Simple statements: only mine if NOT inside a compound block
        # (avoids flooding pool with body atoms like 'i++;', 'test();')
        if n.type in SIMPLE_STMT_TYPES:
            txt = node_text(code, n)
            if 5 < len(txt) < MAX_SIMPLE_STMT_LEN and not has_bad_token(txt):
                if "return" not in txt and not _is_inside_compound(n):
                    simple_stmts.append(txt)

        # Expressions
        if n.type in EXPR_TYPES:
            txt = node_text(code, n)
            if 3 < len(txt) < MAX_EXPR_LEN and not has_bad_token(txt):
                exprs.append(txt)

    return simple_stmts, compound_stmts, exprs, ids


@dataclass
class FragmentPool:
    statements: List[str]       # simple statements (top-level only)
    compound: List[str]         # compound: for/while/if/try blocks
    expressions: List[str]
    identifiers: List[str]

    def to_json(self) -> str:
        return json.dumps(asdict(self), indent=2)

    @staticmethod
    def from_json(s: str) -> "FragmentPool":
        d = json.loads(s)
        # backwards-compat: old pools have no 'compound' key
        return FragmentPool(
            d["statements"],
            d.get("compound", []),
            d["expressions"],
            d["identifiers"],
        )

    def pick_statement(self, prefer_compound_prob: float = 0.6) -> str:
        """
        Pick a statement fragment with configurable bias toward compound statements.
        Without this, uniform random.choice almost never selects for-loops/try-catch
        because simple expression_statements vastly outnumber them.
        """
        use_compound = (
            self.compound
            and (not self.statements or random.random() < prefer_compound_prob)
        )
        if use_compound:
            # Also weight compound picks by sqrt(len) so longer blocks aren't
            # totally suppressed vs short if-statements
            weights = [len(s) ** 0.5 for s in self.compound]
            total = sum(weights)
            r = random.uniform(0, total)
            cumulative = 0.0
            for item, w in zip(self.compound, weights):
                cumulative += w
                if r <= cumulative:
                    return item
            return self.compound[-1]
        return random.choice(self.statements) if self.statements else ""


def build_pool(directory: str, max_per_category: int = 5000) -> "FragmentPool":
    S: List[str] = []
    C: List[str] = []
    E: List[str] = []
    I: List[str] = []
    for f in os.listdir(directory):
        if f.endswith(".js"):
            try:
                code = open(os.path.join(directory, f), "r", errors="ignore").read()
            except OSError:
                continue
            s, c, e, i = mine_fragments(code)
            S += s
            C += c
            E += e
            I += i

    # Deduplicate and cap sizes
    S = list(dict.fromkeys(S))[:max_per_category]
    C = list(dict.fromkeys(C))[:max_per_category]
    E = list(dict.fromkeys(E))[:max_per_category]
    I = list(dict.fromkeys(I))[:max_per_category]
    print(f"[pool] simple={len(S)} compound={len(C)} exprs={len(E)} ids={len(I)}")
    return FragmentPool(S, C, E, I)


# ---------------------------------------------------------------------------
# Mutators
# ---------------------------------------------------------------------------
def pick_statement_nodes(code: str):
    """
    Returns all named statement nodes whose direct parent is program or a block.
    Includes both simple and compound statements so we have varied anchor points.
    """
    t = parse(code)
    return [
        n for n in walk(t.root_node)
        if n.is_named
        and (n.type in COMPOUND_STMT_TYPES or n.type in SIMPLE_STMT_TYPES)
        and n.parent
        and n.parent.type in ("program", "statement_block")
    ]


def insert_statement(code: str, pool: FragmentPool) -> str:
    """
    Insert a statement fragment after a random anchor statement.
    Uses pool.pick_statement() which biases toward compound fragments.
    """
    nodes = pick_statement_nodes(code)
    if not nodes or (not pool.statements and not pool.compound):
        return code

    anchor = random.choice(nodes)

    for _ in range(20):
        frag = pool.pick_statement()
        if not frag:
            continue
        frag_rewritten = rewrite_fragment_hygienic(frag, code, insert_pos=anchor.end_byte)
        if not frag_rewritten:
            continue
        mutated = replace_span(code, anchor.end_byte, anchor.end_byte, "\n" + frag_rewritten + "\n")
        if v8_parse_ok(mutated):
            return mutated

    return code


def replace_statement(code: str, pool: FragmentPool) -> str:
    """
    Replace an entire statement with a compound fragment.
    Specifically targets upgrading simple statements to loops/try-catch.
    """
    nodes = pick_statement_nodes(code)
    if not nodes or not pool.compound:
        return code

    # Prefer replacing simple statements (less likely to break things)
    simple_nodes = [n for n in nodes if n.type in SIMPLE_STMT_TYPES]
    victim = random.choice(simple_nodes if simple_nodes else nodes)

    for _ in range(20):
        frag = pool.pick_statement(prefer_compound_prob=0.9)
        if not frag:
            continue
        frag_rewritten = rewrite_fragment_hygienic(frag, code, insert_pos=victim.start_byte)
        if not frag_rewritten:
            continue
        mutated = replace_span(code, victim.start_byte, victim.end_byte, frag_rewritten)
        if v8_parse_ok(mutated):
            return mutated

    return code


def replace_expression(code: str, pool: FragmentPool) -> str:
    t = parse(code)
    exprs = [
        n for n in walk(t.root_node)
        if n.type in EXPR_TYPES
        # Don't replace LHS of assignments  that would break semantics
        and not (
            n.parent
            and n.parent.type == "assignment_expression"
            and n.parent.children[0] is n
        )
    ]
    if not exprs or not pool.expressions:
        return code

    victim = random.choice(exprs)

    for _ in range(20):
        frag = random.choice(pool.expressions)
        frag_rewritten = rewrite_fragment_hygienic(frag, code, insert_pos=victim.start_byte)
        if not frag_rewritten:
            continue

        # Always wrap in parens for precedence safety
        frag_rewritten = f"({frag_rewritten})"

        mutated = replace_span(code, victim.start_byte, victim.end_byte, frag_rewritten)
        if v8_parse_ok(mutated):
            return mutated

    return code


def rename_identifier_global(code: str, pool: FragmentPool) -> str:
    """
    FIXED: uses AST-based renaming instead of regex substitution on raw text,
    which avoids corrupting string literals and comments.
    """
    ids = list({
        node_text(code, n)
        for n in walk(parse(code).root_node)
        if n.type == "identifier"
        and node_text(code, n) not in JS_KEYWORDS
        and node_text(code, n) not in JS_BUILTINS
    })
    if len(ids) < 2:
        return code

    src = random.choice(ids)
    dst = random.choice([x for x in ids if x != src])

    # Use AST rewriter instead of regex
    mapping = {src: dst}
    new_code = rewrite_identifiers_ast(code, mapping)

    if new_code != code and v8_parse_ok(new_code):
        return new_code
    return code


def nop_mutator(code: str, pool: FragmentPool) -> str:
    """Wraps a random statement in a try-catch  good for uncovering edge cases."""
    nodes = pick_statement_nodes(code)
    if not nodes:
        return code
    anchor = random.choice(nodes)
    stmt_text = node_text(code, anchor)
    wrapped = f"try {{ {stmt_text} }} catch (_e) {{}}"
    mutated = replace_span(code, anchor.start_byte, anchor.end_byte, wrapped)
    if v8_parse_ok(mutated):
        return mutated
    return code


MUTATORS = [insert_statement, replace_statement, replace_expression, rename_identifier_global, nop_mutator]


def mutate(code: str, pool: FragmentPool, rounds: int = 5) -> str:
    out = code
    for _ in range(rounds):
        m = random.choice(MUTATORS)
        cand = m(out, pool)
        if cand != out:
            out = cand
    return out


# ---------------------------------------------------------------------------
# Debug helper
# ---------------------------------------------------------------------------
def print_tree(code: str) -> None:
    tree = parse(code)
    print(tree.root_node.sexp())


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------
def main() -> None:
    ap = argparse.ArgumentParser()
    sp = ap.add_subparsers(dest="cmd", required=True)

    m = sp.add_parser("mine")
    m.add_argument("--corpus-dir", required=True)
    m.add_argument("--out", required=True)

    mu = sp.add_parser("mutate")
    mu.add_argument("--pool", required=True)
    mu.add_argument("--infile", required=True)
    mu.add_argument("--outfile", required=True)
    mu.add_argument("--rounds", type=int, default=5)

    args = ap.parse_args()

    if args.cmd == "mine":
        pool = build_pool(args.corpus_dir)
        open(args.out, "w").write(pool.to_json())
        print(f"[+] Mined {len(pool.statements)} stmts, {len(pool.expressions)} exprs")
    elif args.cmd == "mutate":
        pool = FragmentPool.from_json(open(args.pool).read())
        src = open(args.infile).read()
        out = mutate(src, pool, args.rounds)
        open(args.outfile, "w").write(out)


if __name__ == "__main__":
    main()