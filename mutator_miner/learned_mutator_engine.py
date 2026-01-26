#!/usr/bin/env python3
"""
apply_learned_mutators.py
Robust AST-based applier for generalized learned JS mutators.

Implements (and slightly corrects) the algorithm from MUTATION_ALGORITHM_PSEUDOCODE:
- Phase 1: prefilter low-quality / syntax-risky mutators (gain/complexity + hard rejects)
- Phase 2: apply up to K mutations with bounded attempts
- Phase 3/4: AST-targeted insert/replace into statement lists only
- Phase 5: placeholder instantiation using *scope at position*, with AST-validated snippets

Key fixes vs your previous versions:
- No descendant_for_byte_range (we implement our own "deepest node containing byte").
- Replacement uses pattern_could_match() against the target statement (no blind fallback).
- Scope is the *enclosing program/function* (not "everything before in file"), which prevents
  inserts like a13/proto2 leaking into other functions.
- If a placeholder forces a new identifier, we declare it inside the inserted/replaced snippet
  using fresh unique names (avoids ReferenceError without redeclare errors).
- Avoid giant chains: <VAR_CHAIN> is strictly limited to {v, v.p, v[0]}.
- Builtins are diversified (not always Object), but we only emit parse-safe builtin chains.

Usage:
  python3 apply_learned_mutators.py --mutators learned_mutators.json --in input.js --out out.js --debug
"""

import argparse, json, math, os, random, re, sys
from dataclasses import dataclass
from typing import List, Optional, Set, Tuple, Dict, Iterable

from tree_sitter_languages import get_parser


# ================== JS ENGINE CONFIG ==================

JS_ENGINE_PATH = os.environ.get("JS_ENGINE_PATH", "../v8/out/fuzzbuild/d8")
# Examples:
#   export JS_ENGINE_PATH=/path/to/v8/d8
#   export JS_ENGINE_PATH=node
#   export JS_ENGINE_PATH=/home/user/v8/out/x64.release/d8

JS_ENGINE_CHECK_ARGS = ["--check", "--allow-natives-syntax"]
# If you use node instead, set:
# JS_ENGINE_CHECK_ARGS = ["--check"]

SYNTAX_TIMEOUT = 4.0  # seconds

# =====================================================
# ------------------------ parser ------------------------

parser = get_parser("javascript")

def parse_tree(js: str):
    return parser.parse(js.encode("utf-8", errors="ignore"))

def walk(n):
    stack = [n]
    while stack:
        cur = stack.pop()
        yield cur
        # reverse for stable-ish order
        ch = getattr(cur, "children", [])
        for c in reversed(ch):
            stack.append(c)

def parse_ok_whole(js: str) -> bool:
    try:
        p = subprocess.run(
            [JS_ENGINE_PATH] + JS_ENGINE_CHECK_ARGS,
            input=js.encode("utf-8", errors="ignore"),
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
            timeout=SYNTAX_TIMEOUT
        )
        return p.returncode == 0
    except subprocess.TimeoutExpired:
        return False
    except FileNotFoundError:
        print(f"[!] JS engine not found: {JS_ENGINE_PATH}", file=sys.stderr)
        return False
    except Exception:
        return False

# ------------------------ vocab ------------------------

BUILTINS: Set[str] = {
    "Object","Array","String","Number","Boolean","Function","Error",
    "Math","JSON","Date","RegExp","Promise","Symbol","BigInt",
    "Map","Set","WeakMap","WeakSet","Proxy","Reflect",
    "console","globalThis","window","document","process","WScript"
}

CALLABLE_BUILTINS = {
    "Object","Array","Function","Error","Promise","Map","Set","WeakMap","WeakSet",
    "Proxy","Reflect","Date","RegExp"
}

KEYWORDS: Set[str] = {
    "if","else","for","while","do","break","continue","return","function",
    "var","let","const","class","new","this","super","try","catch","finally",
    "throw","typeof","void","delete","in","instanceof","await","async",
    "null","true","false","undefined","yield","switch","case","default",
    "with","debugger"
}

PLACEHOLDER_RX = re.compile(
    r"<<TYPE>>|<TYPE_CHAIN>|<TYPE>|<VAR_CHAIN>|<VAR>|<NUM>|<STR>|"
    r"<PROP>|<BUILTIN_CHAIN>|<BUILTIN_METHOD>|<BUILTIN>|<SUPER>"
)

IDENT_RX = re.compile(r"\b[A-Za-z_$][A-Za-z0-9_$]*\b")

FORBIDDEN_REPLACE_TYPES = {
    "variable_declaration",
    "lexical_declaration",
    "function_declaration",
    "class_declaration",
    # also avoid replacing import/export statements if present
    "import_statement",
    "export_statement",
}
import subprocess, tempfile

def esprima_ok(js: str) -> bool:
    try:
        p = subprocess.run(
            ["node", "check_syntax.js"],
            input=js.encode("utf-8", errors="ignore"),
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
            timeout=3
        )
        return p.returncode == 0
    except Exception:
        return False

# ------------------------ data model ------------------------

@dataclass
class Mutator:
    kind: str
    before: List[str]
    after: List[str]
    gain: float
    ctx_before: str = ""
    ctx_after: str = ""
    quality_score: float = 0.0
    complexity_score: float = 0.0

def parse_mutator(m: dict) -> Mutator:
    return Mutator(
        kind=m.get("kind", "insert"),
        before=list(m.get("before") or []),
        after=list(m.get("after") or []),
        gain=float(m.get("gain", 0.0)),
        ctx_before=str(m.get("ctx_before") or ""),
        ctx_after=str(m.get("ctx_after") or ""),
    )

# ------------------------ AST utilities ------------------------

def node_text(js: str, n) -> str:
    b = js.encode("utf-8", errors="ignore")
    return b[n.start_byte:n.end_byte].decode("utf-8", errors="ignore")

def is_statement_node(n) -> bool:
    # tree-sitter JS uses many *_statement nodes
    if not getattr(n, "is_named", False):
        return False
    if n.type.endswith("_statement"):
        return True
    # include a few that appear in lists
    return n.type in (
        "expression_statement",
        "return_statement",
        "throw_statement",
        "if_statement",
        "for_statement",
        "while_statement",
        "do_statement",
        "try_statement",
        "switch_statement",
        "break_statement",
        "continue_statement",
        "debugger_statement",
        "empty_statement",
    )

def statement_list_container(n) -> bool:
    # "program" is the toplevel list, "statement_block" is {...}
    return n.type in ("program", "statement_block")

def deepest_named_node_containing(root, byte_pos: int):
    """
    Replacement for descendant_for_byte_range (not available in your env).
    Returns the *deepest* named node that contains byte_pos.
    """
    best = None
    best_span = None
    for n in walk(root):
        if not getattr(n, "is_named", False):
            continue
        if n.start_byte <= byte_pos < n.end_byte:
            span = n.end_byte - n.start_byte
            if best is None or span < best_span:
                best = n
                best_span = span
    return best

def enclosing_scope_node(root, byte_pos: int):
    """
    Define "scope" as the nearest enclosing:
      - program, OR
      - function_declaration / function / arrow_function / method_definition
    We then collect declarations inside that node (and before byte_pos).
    """
    candidates = []
    for n in walk(root):
        if not getattr(n, "is_named", False):
            continue
        if not (n.start_byte <= byte_pos < n.end_byte):
            continue
        if n.type in ("program", "function_declaration", "function", "arrow_function", "method_definition"):
            candidates.append(n)
    if not candidates:
        return root
    # choose the smallest span among candidates (deepest)
    candidates.sort(key=lambda x: (x.end_byte - x.start_byte))
    return candidates[0]

def find_replaceable_statement_nodes(js: str):
    t = parse_tree(js)
    out = []
    for n in walk(t.root_node):
        if not is_statement_node(n):
            continue
        if n.type in FORBIDDEN_REPLACE_TYPES:
            continue
        if n.parent and statement_list_container(n.parent):
            # exclude declarations that show up as statements
            if n.type in FORBIDDEN_REPLACE_TYPES:
                continue
            out.append(n)
    return out

def find_statement_list_containers(js: str):
    t = parse_tree(js)
    return [n for n in walk(t.root_node) if getattr(n, "is_named", False) and statement_list_container(n)]

def find_insert_pos_before_block_close(js: str, container) -> Optional[int]:
    if container.type == "program":
        return len(js)

    # statement_block: insert before closing '}'
    start = container.start_byte
    end = min(container.end_byte, len(js))
    i = end - 1
    while i >= start:
        if js[i] == "}":
            return i
        i -= 1
    return None

# ------------------------ scope collection ------------------------
def collect_scope_symbols(js: str, byte_pos: int) -> Tuple[Set[str], Set[str], Set[str]]:
    t = parse_tree(js)
    root = t.root_node
    scope = enclosing_scope_node(root, byte_pos)

    src = js.encode("utf-8", errors="ignore")
    vars_s, funcs_s, classes_s = set(), set(), set()

    def txt(n):
        return src[n.start_byte:n.end_byte].decode("utf-8", errors="ignore")

    def walk_scope(n):
        # DO NOT descend into nested functions/classes
        if n != scope and n.type in (
            "function_declaration",
            "function",
            "arrow_function",
            "method_definition",
            "class_declaration",
        ):
            return

        yield n
        for c in n.children:
            yield from walk_scope(c)

    for n in walk_scope(scope):
        if n.start_byte > byte_pos:
            continue

        # var / let / const
        if n.type == "variable_declarator":
            for c in n.children:
                if c.type == "identifier":
                    vars_s.add(txt(c))

        # function declaration name
        if n.type == "function_declaration":
            for c in n.children:
                if c.type == "identifier":
                    name = txt(c)
                    funcs_s.add(name)
                    vars_s.add(name)

        # class declaration name
        if n.type == "class_declaration":
            for c in n.children:
                if c.type == "identifier":
                    classes_s.add(txt(c))

        # parameters ONLY if this is the scope function itself
        if n == scope and n.type == "formal_parameters":
            for c in walk(n):
                if c.type == "identifier":
                    vars_s.add(txt(c))

        # catch parameter only if in this scope
        if n == scope and n.type == "catch_clause":
            for c in walk(n):
                if c.type == "identifier":
                    vars_s.add(txt(c))

    vars_s -= (BUILTINS | KEYWORDS)
    funcs_s -= (BUILTINS | KEYWORDS)
    classes_s -= (BUILTINS | KEYWORDS)
    return vars_s, funcs_s, classes_s

# ------------------------ mutation prefilter (Phase 1) ------------------------

# From your pseudocode + a few extra hard rejects that were killing you.
INVALID_GENERALIZED_PATTERNS = [
    r"<VAR_CHAIN>\s*=",             # chain on LHS
    r"<TYPE_CHAIN>\s*\(",           # type chain used as callable
    r"<BUILTIN_CHAIN>\s*;",         # standalone builtin chain
    r"\.\.\.\s*<VAR>",              # spread var in random contexts
    r"<VAR>\s*\(\s*\)\s*\.\s*<VAR>\s*\(",   # <VAR>().<VAR>(
    r"<VAR_CHAIN>\s*\(\s*<VAR>\s*\)\s*\(",  # chain()(
    r"<VAR_CHAIN>\s*<\s*<VAR>\s*\(",        # comparison then call
    r"\bcatch\s*\(\s*<TYPE>\s*\)",          # invalid catch
    r"\bcatch\s*\(\s*<<TYPE>>\s*\)",        # invalid catch
]

def generalized_text_is_valid(blob: str) -> bool:
    for pat in INVALID_GENERALIZED_PATTERNS:
        if re.search(pat, blob):
            return False
    return True

def mutator_quality(mut: Mutator) -> Tuple[float, float]:
    after_text = "\n".join(mut.after or [])
    complexity = (len(mut.after or [])
                  + 2.0 * after_text.count("<VAR_CHAIN>")
                  + 1.5 * after_text.count("try {"))
    quality = mut.gain / (complexity + 1.0)
    return quality, complexity

def looks_like_split_trycatch(lines: List[str]) -> bool:
    txt = "\n".join(lines or [])
    # crude but effective: if it contains try { but no catch/finally close pattern,
    # it's often your "try {" split bug.
    if "try {" in txt and ("catch" not in txt and "finally" not in txt):
        return True
    if "catch (" in txt and "try {" not in txt:
        # orphan catch fragment
        return True
    return False

def validate_as_statements(snippet: str) -> bool:
    wrapped = "function __f__(){\n" + snippet + "\n}\n"
    return parse_ok_whole(wrapped)

def filter_valid_mutations(muts: List[Mutator], min_gain: float) -> List[Mutator]:
    valid: List[Mutator] = []
    for m in muts:
        if m.gain < min_gain:
            continue
        if m.kind not in ("insert", "replace"):
            continue

        before_text = "\n".join(m.before or [])
        after_text  = "\n".join(m.after or [])
        blob = "\n".join((m.before or []) + (m.after or []))

        if not blob.strip():
            continue

        if not generalized_text_is_valid(blob):
            continue

        if looks_like_split_trycatch(m.before) or looks_like_split_trycatch(m.after):
            continue

        # replace mutations: too many lines are risky (your pseudocode says >2 reject)
        if m.kind == "replace" and len(m.after or []) > 2:
            continue

        if m.kind == "insert" and not (m.after or []):
            continue

        q, c = mutator_quality(m)
        m.quality_score = q
        m.complexity_score = c
        valid.append(m)

    valid.sort(key=lambda x: x.quality_score, reverse=True)
    return valid

# ------------------------ placeholder instantiation (Phase 5) ------------------------

BUILTIN_METHODS: Dict[str, List[str]] = {
    "Object": ["keys","values","entries","freeze","seal","create","getPrototypeOf","setPrototypeOf","assign"],
    "Array": ["isArray","from","of"],
    "Math": ["abs","sin","cos","floor","ceil","imul","fround","max","min"],
    "JSON": ["stringify","parse"],
    "Date": ["now"],
    "Reflect": ["get","set","has","ownKeys","apply","construct"],
    "RegExp": [],   # prefer new RegExp('a') via <BUILTIN_CHAIN>
    "Promise": ["resolve","reject","all","race","allSettled","any"],
    "Symbol": ["for"],
    "BigInt": ["asIntN","asUintN"],
    "Map": [],
    "Set": [],
    "Proxy": [],
    "Function": [],
    "String": ["fromCharCode","fromCodePoint"],
    "Number": ["isNaN","isFinite","isInteger","parseInt","parseFloat"],
    "Error": [],
    "console": ["log","error","warn","info","debug","trace"],
}

SAFE_PROP_CHOICES = ["p","q","x","y","length","constructor","prototype"]

def fresh_name(used: Set[str], prefix: str = "v") -> str:
    i = 1
    while True:
        cand = f"{prefix}{i}"
        if cand not in used and cand not in BUILTINS and cand not in KEYWORDS:
            used.add(cand)
            return cand
        i += 1

def pick_from(s: Set[str]) -> Optional[str]:
    return random.choice(tuple(s)) if s else None

def random_number_literal() -> str:
    # diverse but parse-safe, avoid huge or weird suffixes
    choices = [
        "0","1","2","3","4","5","8","16","32","64","127","255",
        "0x10","0x20","0x7f","0xff",
        "1e2","-1","-2","-32"
    ]
    return random.choice(choices)

def random_string_literal() -> str:
    # keep it tiny
    choices = ["''", "'x'", "'a'", "'0'", "'p'", "'q'", "'test'"]
    return random.choice(choices)

def choose_builtin() -> str:
    # avoid environment-only globals unless input already uses them
    # but still allow WScript if present in scope selection (handled elsewhere).
    return random.choice(tuple(BUILTINS - {"WScript","window","document"}))  # safer defaults

def make_builtin_chain() -> str:
    """
    Produce a parse-safe expression. Keep it side-effect-light.
    """
    options = [
        "Math.abs(1)",
        "Math.imul(2, 3)",
        "JSON.stringify({a:1})",
        "JSON.parse('{\"a\":1}')",
        "Array.isArray([])",
        "Object.keys({a:1})",
        "Object.values({a:1})",
        "Reflect.get({a:1}, 'a')",
        "Reflect.has({a:1}, 'a')",
        "Date.now()",
        "Promise.resolve(1)",
        "Symbol.for('x')",
        "BigInt.asUintN(8, 1n)",
        "new RegExp('a')",
    ]
    return random.choice(options)

def instantiate_mutation(template_lines: List[str],
                         scope_vars: Set[str],
                         scope_funcs: Set[str],
                         scope_classes: Set[str],
                         require_no_undeclared: bool = False) -> Optional[str]:
    """
    Correct instantiation:
    - <VAR>(...) => must be function from scope_funcs
    - <VAR_CHAIN>(...) => must be callable
    - No undefined identifiers
    - No giant chains
    """

    used = set(scope_vars) | set(scope_funcs) | set(scope_classes)
    prelude = []

    # -------- detect call contexts --------
    call_required = set()
    for ln in template_lines:
        if re.search(r"<VAR>\s*\(", ln):
            call_required.add("<VAR>")
        if re.search(r"<VAR_CHAIN>\s*\(", ln):
            call_required.add("<VAR_CHAIN>")
        if re.search(r"<TYPE>\s*\(", ln):
            call_required.add("<TYPE>")
        if re.search(r"<BUILTIN>\s*\(", ln):
            call_required.add("<BUILTIN>")

    def fresh(prefix):
        i = 1
        while True:
            name = f"{prefix}{i}"
            if name not in used and name not in BUILTINS and name not in KEYWORDS:
                used.add(name)
                return name
            i += 1

    def ensure_var():
        if scope_vars:
            return random.choice(tuple(scope_vars))
        v = fresh("v")
        prelude.append(f"let {v} = 0;")
        scope_vars.add(v)
        return v

    def ensure_func():
        if scope_funcs:
            return random.choice(tuple(scope_funcs))
        f = fresh("f")
        prelude.append(f"function {f}(x){{ return x; }}")
        scope_funcs.add(f)
        scope_vars.add(f)
        return f

    def ensure_class():
        if scope_classes:
            return random.choice(tuple(scope_classes))
        c = fresh("C")
        prelude.append(f"class {c}{{ constructor(){{}} }}")
        scope_classes.add(c)
        return c

    placeholder_map = {}

    def repl(ph: str) -> Optional[str]:
        if ph in placeholder_map:
            return placeholder_map[ph]

        # ---------- VAR ----------
        if ph == "<VAR>":
            if "<VAR>" in call_required:
                f = ensure_func()
                placeholder_map[ph] = f
                return f
            v = ensure_var()
            placeholder_map[ph] = v
            return v

        # ---------- VAR_CHAIN ----------
        if ph == "<VAR_CHAIN>":
            if "<VAR_CHAIN>" in call_required:
                f = ensure_func()
                return f
            base = ensure_var()
            return random.choice([
                base,
                f"{base}.{random.choice(SAFE_PROP_CHOICES)}",
                f"{base}[0]"
            ])

        # ---------- TYPE ----------
        if ph in ("<TYPE>", "<<TYPE>>"):
            if "<TYPE>" in call_required:
                c = ensure_class()
                placeholder_map[ph] = c
                return c
            c = ensure_class()
            placeholder_map[ph] = c
            return c

        if ph == "<TYPE_CHAIN>":
            return ensure_class()

        # ---------- BUILTIN ----------
        if ph == "<BUILTIN>":
            b = random.choice(tuple(CALLABLE_BUILTINS))
            placeholder_map[ph] = b
            return b

        if ph == "<BUILTIN_METHOD>":
            b = placeholder_map.get("<BUILTIN>", random.choice(tuple(CALLABLE_BUILTINS)))
            meths = BUILTIN_METHODS.get(b, ["toString"])
            return random.choice(meths)

        if ph == "<BUILTIN_CHAIN>":
            return make_builtin_chain()

        # ---------- LITERALS ----------
        if ph == "<NUM>":
            return random_number_literal()

        if ph == "<STR>":
            return random_string_literal()

        if ph == "<PROP>":
            return random.choice(SAFE_PROP_CHOICES)

        if ph == "<SUPER>":
            return "super"

        return None

    out_lines = []
    for ln in template_lines:
        def sub(m):
            r = repl(m.group(0))
            return "__FAIL__" if r is None else r

        s = PLACEHOLDER_RX.sub(sub, ln)
        if "__FAIL__" in s:
            return None
        out_lines.append(s)

    payload = "\n".join(out_lines).strip()
    if not payload:
        return None

    # forbid giant chains a.b.c
    if re.search(r"[A-Za-z_$]\w*\.[A-Za-z_$]\w*\.[A-Za-z_$]", payload):
        return None

    if prelude:
        payload = "\n".join(prelude) + "\n" + payload

    # must parse as statements
    if not validate_as_statements(payload):
        return None

    # ---------- undefined identifier check ----------
    declared = set(scope_vars) | set(scope_funcs) | set(scope_classes)
    declared |= set(re.findall(r"\b(?:let|var|const|function|class)\s+([A-Za-z_$][A-Za-z0-9_$]*)\b", payload))

    stripped = re.sub(r"//.*", "", payload)
    stripped = re.sub(r"/\*.*?\*/", "", stripped, flags=re.DOTALL)
    stripped = re.sub(r"'(?:\\.|[^'])*'", "''", stripped)
    stripped = re.sub(r'"(?:\\.|[^"])*"', '""', stripped)

    for m in IDENT_RX.finditer(stripped):
        name = m.group(0)
        if name in declared or name in BUILTINS or name in KEYWORDS:
            continue
        i = m.start()
        if i > 0 and stripped[i-1] in ".?":
            continue
        return None  # reject mutation with free identifier

    return payload

# ------------------------ replace matching ------------------------

def normalize_space(s: str) -> str:
    return re.sub(r"\s+", " ", s.strip())

def template_to_regex(template: str) -> re.Pattern:
    """
    Convert a single generalized template line into a permissive regex that can
    match concrete JS statement text.

    This is used by pattern_could_match() for replacement targeting.
    """
    # escape regex specials first
    s = re.escape(template)

    # placeholders (escaped) -> regexes
    def rep(ph_escaped: str, rx: str):
        nonlocal s
        s = s.replace(re.escape(ph_escaped), rx)

    rep("<VAR>", r"[A-Za-z_$][A-Za-z0-9_$]*")
    rep("<NUM>", r"(?:-?\d+(?:\.\d+)?(?:e[+-]?\d+)?|0x[0-9a-fA-F]+)")
    rep("<STR>", r"(?:'[^']*'|\"[^\"]*\"|`[^`]*`)")
    rep("<PROP>", r"[A-Za-z_$][A-Za-z0-9_$]*")
    rep("<SUPER>", r"super")

    # simple chain, bounded
    rep("<VAR_CHAIN>", r"[A-Za-z_$][A-Za-z0-9_$]*(?:\.[A-Za-z_$][A-Za-z0-9_$]*|\[0\])?")

    # builtins
    builtin_alt = "|".join(sorted(map(re.escape, BUILTINS)))
    rep("<BUILTIN>", rf"(?:{builtin_alt})")
    rep("<BUILTIN_METHOD>", r"[A-Za-z_$][A-Za-z0-9_$]*")
    # builtin chain: accept "X.Y(...)" or "new X(...)" etc
    rep("<BUILTIN_CHAIN>", r"(?:[A-Za-z_$][A-Za-z0-9_$]*\.[A-Za-z_$][A-Za-z0-9_$]*\([^)]*\)|new\s+[A-Za-z_$][A-Za-z0-9_$]*\([^)]*\))")

    # types
    rep("<TYPE>", r"[A-Za-z_$][A-Za-z0-9_$]*")
    rep("<<TYPE>>", r"[A-Za-z_$][A-Za-z0-9_$]*")
    rep("<TYPE_CHAIN>", r"[A-Za-z_$][A-Za-z0-9_$]*")

    # allow flexible whitespace everywhere
    s = s.replace(r"\ ", r"\s+")
    # anchor as "could match within the statement"
    return re.compile(s)

def pattern_could_match(stmt_text: str, before_template_line: str) -> bool:
    try:
        rx = template_to_regex(before_template_line)
    except Exception:
        return False
    # match ignoring whitespace differences by normalizing and running a search
    return rx.search(stmt_text) is not None or rx.search(normalize_space(stmt_text)) is not None

# ------------------------ Phase 3: insert ------------------------

def try_insert(code: str, mutation: Mutator) -> Optional[str]:
    containers = find_statement_list_containers(code)
    if not containers:
        return None

    container = random.choice(containers)
    insert_pos = find_insert_pos_before_block_close(code, container)
    if insert_pos is None:
        return None

    vars_s, funcs_s, classes_s = collect_scope_symbols(code, insert_pos)

    payload = instantiate_mutation(mutation.after, set(vars_s), set(funcs_s), set(classes_s))
    if payload is None:
        return None

    new_code = code[:insert_pos] + "\n" + payload + "\n" + code[insert_pos:]
    if parse_ok_whole(new_code):
        return new_code
    return None

# ------------------------ Phase 4: replace ------------------------

def try_replace(code: str, mutation: Mutator) -> Optional[str]:
    # pseudocode: only single-line before, after non-empty
    if len(mutation.before or []) != 1 or len(mutation.after or []) == 0:
        return None

    candidates = []
    stmts = find_replaceable_statement_nodes(code)
    if not stmts:
        return None

    templ = mutation.before[0]
    for st in stmts:
        if st.type in FORBIDDEN_REPLACE_TYPES:
            continue
        st_txt = node_text(code, st)
        if pattern_could_match(st_txt, templ):
            candidates.append(st)

    if not candidates:
        return None

    target = random.choice(candidates)
    start_pos, end_pos = target.start_byte, target.end_byte

    vars_s, funcs_s, classes_s = collect_scope_symbols(code, start_pos)

    replacement = instantiate_mutation(mutation.after, set(vars_s), set(funcs_s), set(classes_s))
    if replacement is None:
        return None

    # must parse as statements (already validated), now splice
    new_code = code[:start_pos] + replacement + code[end_pos:]
    if parse_ok_whole(new_code):
        return new_code
    return None

# ------------------------ Phase 2: apply loop ------------------------

def apply_mutations(input_code: str,
                    filtered: List[Mutator],
                    max_mutations: int,
                    max_attempts: int,
                    debug: bool = False) -> Tuple[str, List[Mutator]]:
    if not parse_ok_whole(input_code):
        raise SystemExit("Input code has syntax errors (tree-sitter). Fix input first.")

    current = input_code
    applied: List[Mutator] = []
    attempts = 0

    # choose from top half like your pseudocode (but never empty)
    while len(applied) < max_mutations and attempts < max_attempts:
        attempts += 1
        if not filtered:
            break

        top_n = max(1, len(filtered) // 2)
        cand_pool = filtered[:top_n]
        mut = random.choice(cand_pool)

        new_code = None
        if mut.kind == "insert":
            new_code = try_insert(current, mut)
        elif mut.kind == "replace":
            new_code = try_replace(current, mut)

        if new_code is None:
            continue

        # final validation (already parse_ok_whole inside try_*, but keep it explicit)
        if parse_ok_whole(new_code):
            current = new_code
            applied.append(mut)
            # remove mutation once used (reduces repeats)
            try:
                filtered.remove(mut)
            except ValueError:
                pass
            if debug:
                print(f"[+] applied kind={mut.kind} gain={mut.gain:.6f} "
                      f"q={mut.quality_score:.6f} c={mut.complexity_score:.2f}",
                      file=sys.stderr)

    if debug:
        print(f"[i] apply loop done: applied={len(applied)} attempts={attempts}", file=sys.stderr)

    return current, applied

# ------------------------ CLI ------------------------

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--mutators", required=True, help="learned_mutators.json")
    ap.add_argument("--in", dest="input_file", required=True, help="Input JS file")
    ap.add_argument("--out", required=True, help="Output JS file")
    ap.add_argument("--max_mutations", type=int, default=20)
    ap.add_argument("--seed", type=int, default=42)
    ap.add_argument("--top_k", type=int, default=2000, help="consider at most top_k by gain before filtering")
    ap.add_argument("--min_gain", type=float, default=0.0, help="minimum gain threshold before quality sorting")
    ap.add_argument("--max_attempts", type=int, default=1000)
    ap.add_argument("--debug", action="store_true")
    args = ap.parse_args()

    random.seed(args.seed)

    raw = json.load(open(args.mutators, "r", encoding="utf-8", errors="ignore"))
    muts = [parse_mutator(m) for m in raw]

    # sort by gain desc, truncate, then filter+quality-rank (per pseudocode)
    muts.sort(key=lambda m: m.gain, reverse=True)
    if args.top_k and len(muts) > args.top_k:
        muts = muts[:args.top_k]

    filtered = filter_valid_mutations(muts, args.min_gain)

    if args.debug:
        print(f"[+] loaded mutators: {len(raw)}", file=sys.stderr)
        print(f"[+] after top_k: {len(muts)}", file=sys.stderr)
        print(f"[+] prefilt usable mutators: {len(filtered)}", file=sys.stderr)

    if not filtered:
        print("[!] no usable mutators after prefilter; relax filters or fix learning templates", file=sys.stderr)
        # still write input through unchanged (explicit)
        src = open(args.input_file, "r", encoding="utf-8", errors="ignore").read()
        open(args.out, "w", encoding="utf-8", errors="ignore").write(src)
        sys.exit(0)

    src = open(args.input_file, "r", encoding="utf-8", errors="ignore").read()

    out_js, applied = apply_mutations(
        src,
        filtered,
        max_mutations=args.max_mutations,
        max_attempts=args.max_attempts,
        debug=args.debug
    )

    open(args.out, "w", encoding="utf-8", errors="ignore").write(out_js)

    if args.debug:
        print(f"[] wrote {args.out}", file=sys.stderr)
        print(f"[] applied: {len(applied)}", file=sys.stderr)

if __name__ == "__main__":
    main()
 