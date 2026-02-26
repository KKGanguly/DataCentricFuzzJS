#!/usr/bin/env python3
"""
apply_learned_mutators.py   rewritten to match the actual template format
produced by mutator_learning_improved.py + corpus_ast_mutator.py.

KEY FIXES vs the original v6:

1. ROLE-AWARE <VAR> INSTANTIATION
   Every <VAR> in a template has a structural role derivable from the surrounding
   syntax.  The original code treated all <VAR>s identically.  We now classify:
     FRESH     catch(<VAR>), let/const/var <VAR> =       � generate an unused name
     CALLABLE  <VAR>(                                     � pick a known function
     PROPERTY  .<VAR>                                     � pick a safe method/property
     ASSIGNABLE  LHS of assignment: <VAR> =               � pick a mutable var
     ANY       anything else                              � pick any in-scope var

2. STRUCTURE-AWARE REPLACE MATCHING
   Original: did a literal string match of the abstract pattern against code.
   Result:   always 0 matches because code has concrete names, pattern has <VAR>.
   Fix:      convert the abstract pattern to a regex (each <VAR> � ident pattern,
             each <NUM> � number pattern, etc.) and find real matches.
             Capture groups give us the concrete bindings, which we then substitute
             into the 'after' template for correct variable names.

3. AST-BASED SCOPE ANALYSIS (tree-sitter, not regex)
   The original used bare regexes for declaration detection, missing destructuring,
   for-loop init variables, catch parameters, arrow function params, etc.
   We use tree-sitter to walk the AST and collect every binding site.

4. CATCH-PARAM AND LET/CONST LHS ALWAYS GET FRESH NAMES
   Shadowing existing variables in catch() or introducing a duplicate let binding
   causes a SyntaxError.  We always generate a unique fresh name for these roles.

5. MULTI-LINE TEMPLATE SUPPORT
   Templates may span multiple lines.  Pattern matching and insertion both handle
   the full multi-line form.

6. FAST PATH: tree-sitter syntax check before running d8
   Avoids spawning a V8 process for obviously invalid mutations.
"""

import os, json, re, random, tempfile, subprocess, argparse
from pathlib import Path
from typing import Dict, List, Set, Tuple, Optional, Any
from dataclasses import dataclass, field
from tree_sitter_languages import get_parser

# ============================================================================
# CONFIG
# ============================================================================

js_parser = get_parser("javascript")

JS_ENGINE_PATH = os.environ.get(
    "JS_ENGINE_PATH",
    "/home/kgangul/DataCentricFuzzJS/v8/out/fuzzbuild/d8",
)
JS_ENGINE_ARGS = ["--expose-gc", "--allow-natives-syntax"]

# Properties that exist on virtually every JS object  safe to use as property names
SAFE_PROPERTIES = [
    "toString", "valueOf", "hasOwnProperty", "isPrototypeOf",
    "constructor", "prototype", "length", "name", "call", "apply", "bind",
]

# Builtins that are always callable
BUILTIN_CALLABLES = [
    "Object", "Array", "String", "Number", "Boolean", "Function",
    "Error", "TypeError", "RangeError",
    "isFinite", "isNaN", "parseInt", "parseFloat",
]

BUILTIN_NAMES = {
    "Object", "Array", "String", "Number", "Boolean", "Function", "Symbol",
    "BigInt", "Map", "Set", "WeakMap", "WeakSet", "Promise", "Proxy",
    "Reflect", "Math", "Date", "RegExp", "Error", "TypeError", "RangeError",
    "SyntaxError", "JSON", "console", "parseInt", "parseFloat", "isNaN",
    "isFinite", "undefined", "null", "Infinity", "NaN", "globalThis",
}

JS_KEYWORDS = {
    "var", "let", "const", "function", "class", "if", "else", "for", "while",
    "do", "switch", "case", "break", "continue", "return", "throw", "try",
    "catch", "finally", "new", "this", "super", "typeof", "instanceof",
    "in", "of", "void", "delete", "yield", "await", "async", "static",
    "get", "set", "extends", "import", "export", "default", "from", "as",
    "true", "false", "null", "undefined", "debugger",
}


# ============================================================================
# SCOPE ANALYSIS  (tree-sitter based, not regex)
# ============================================================================

@dataclass
class Binding:
    name: str
    byte_offset: int      # where the binding appears in source
    kind: str             # 'var'|'let'|'const'|'function'|'class'|'param'|'catch'
    hoisted: bool         # var and function declarations are hoisted
    inferred_type: str    # 'function'|'class'|'object'|'array'|'primitive'|'unknown'


def _walk(node):
    yield node
    for c in node.children:
        yield from _walk(c)


def _text(code_bytes: bytes, node) -> str:
    return code_bytes[node.start_byte:node.end_byte].decode("utf-8", errors="replace")


def _infer_type_from_value(value_node, code_bytes: bytes) -> str:
    if value_node is None:
        return "unknown"
    t = value_node.type
    if t in ("arrow_function", "function", "function_expression"):
        return "function"
    if t == "class":
        return "class"
    if t == "array":
        return "array"
    if t in ("object", "new_expression"):
        return "object"
    if t in ("number", "string", "template_string", "true", "false"):
        return "primitive"
    return "unknown"


def analyze_scope(code: str) -> List[Binding]:
    """
    Walk the tree-sitter AST and collect every variable binding with its
    byte offset (used to determine availability at an insertion point).
    """
    code_bytes = code.encode("utf-8", errors="replace")
    tree = js_parser.parse(code_bytes)
    bindings: List[Binding] = []

    for node in _walk(tree.root_node):
        # var x = ...  /  let x = ...  /  const x = ...
        if node.type == "variable_declarator":
            kind_node = node.parent  # variable_declaration
            kind = "var"
            if kind_node and kind_node.type == "lexical_declaration":
                # first child is the 'let'/'const' keyword
                kw = kind_node.children[0]
                kind = _text(code_bytes, kw)  # 'let' or 'const'

            # name may be identifier or destructuring pattern
            name_node = node.children[0] if node.children else None
            if name_node and name_node.type == "identifier":
                name = _text(code_bytes, name_node)
                # find the value node (after '=')
                value_node = None
                for i, c in enumerate(node.children):
                    if _text(code_bytes, c) == "=" and i + 1 < len(node.children):
                        value_node = node.children[i + 1]
                        break
                bindings.append(Binding(
                    name=name,
                    byte_offset=name_node.start_byte,
                    kind=kind,
                    hoisted=(kind == "var"),
                    inferred_type=_infer_type_from_value(value_node, code_bytes),
                ))

        # function foo() {}
        elif node.type == "function_declaration":
            for c in node.children:
                if c.type == "identifier":
                    bindings.append(Binding(
                        name=_text(code_bytes, c),
                        byte_offset=c.start_byte,
                        kind="function",
                        hoisted=True,
                        inferred_type="function",
                    ))
                    break

        # class Foo {}
        elif node.type == "class_declaration":
            for c in node.children:
                if c.type == "identifier":
                    bindings.append(Binding(
                        name=_text(code_bytes, c),
                        byte_offset=c.start_byte,
                        kind="class",
                        hoisted=False,
                        inferred_type="class",
                    ))
                    break

        # function parameters
        elif node.type == "formal_parameters":
            for c in _walk(node):
                if c.type == "identifier" and c.parent and c.parent.type != "member_expression":
                    bindings.append(Binding(
                        name=_text(code_bytes, c),
                        byte_offset=c.start_byte,
                        kind="param",
                        hoisted=True,
                        inferred_type="unknown",
                    ))

        # catch (e)
        elif node.type == "catch_clause":
            for c in node.children:
                if c.type == "identifier":
                    bindings.append(Binding(
                        name=_text(code_bytes, c),
                        byte_offset=c.start_byte,
                        kind="catch",
                        hoisted=False,
                        inferred_type="object",
                    ))

    return bindings


def get_visible_at(bindings: List[Binding], insert_byte: int) -> List[Binding]:
    """Return bindings visible at a given byte offset."""
    result = []
    for b in bindings:
        if b.hoisted or b.byte_offset < insert_byte:
            result.append(b)
    return result


def get_visible_names(bindings: List[Binding], insert_byte: int) -> Set[str]:
    return {b.name for b in get_visible_at(bindings, insert_byte)}


def get_callable_names(bindings: List[Binding], insert_byte: int) -> List[str]:
    visible = get_visible_at(bindings, insert_byte)
    return [b.name for b in visible if b.inferred_type in ("function", "class")]


def get_mutable_names(bindings: List[Binding], insert_byte: int) -> List[str]:
    """Variables that can be assigned to (not const)."""
    visible = get_visible_at(bindings, insert_byte)
    return [b.name for b in visible if b.kind in ("var", "let", "param")]


def all_names_in_scope(bindings: List[Binding], insert_byte: int) -> Set[str]:
    return get_visible_names(bindings, insert_byte) | BUILTIN_NAMES


def fresh_name(existing: Set[str], prefix: str = "_v") -> str:
    i = 0
    while True:
        n = f"{prefix}{i}"
        if n not in existing:
            return n
        i += 1


# ============================================================================
# ROLE-AWARE <VAR> INSTANTIATION
# ============================================================================

# Roles a <VAR> slot can have
ROLE_FRESH      = "fresh"       # must be a new binding name (catch param, let/const LHS)
ROLE_CALLABLE   = "callable"    # must be a function/class
ROLE_PROPERTY   = "property"    # property/method name (after '.')
ROLE_ASSIGNABLE = "assignable"  # LHS of assignment (must be mutable)
ROLE_ANY        = "any"         # any in-scope identifier


def classify_var_roles(template_str: str) -> List[str]:
    """
    Given the full template string, return a list with one role per <VAR>
    occurrence, in left-to-right order.

    Rules applied in priority order:
      catch(<VAR>)           � FRESH
      let/const/var <VAR> =  � FRESH
      .<VAR>                 � PROPERTY
      <VAR>(                 � CALLABLE  (but not if preceded by let/const/catch)
      <VAR> =                � ASSIGNABLE (LHS of assignment)
      anything else          � ANY
    """
    roles: List[str] = []
    # We walk the string tracking each <VAR> occurrence
    ph = "<VAR>"
    pos = 0
    while True:
        idx = template_str.find(ph, pos)
        if idx == -1:
            break

        before = template_str[:idx]
        after_ph = template_str[idx + len(ph):]
        after_stripped = after_ph.lstrip()

        # What immediately precedes the placeholder (skip whitespace)
        before_stripped = before.rstrip()

        # Determine role
        role = ROLE_ANY

        # catch(<VAR>)
        if re.search(r'\bcatch\s*\(\s*$', before_stripped):
            role = ROLE_FRESH

        # let/const/var <VAR>   use \s* because before.rstrip() strips the space
        elif re.search(r'\b(?:let|const|var)\s*$', before_stripped):
            role = ROLE_FRESH

        # .<VAR>   property access
        elif before_stripped.endswith('.'):
            role = ROLE_PROPERTY

        # <VAR>(  called as function
        elif after_stripped.startswith('('):
            role = ROLE_CALLABLE

        # <VAR> = ... (assignment LHS) but NOT == or ===
        elif re.search(r'\s*$', before_stripped) and re.match(r'\s*=[^>=]', after_ph):
            role = ROLE_ASSIGNABLE

        roles.append(role)
        pos = idx + len(ph)

    return roles


def instantiate_template(
    template_lines: List[str],
    bindings: List[Binding],
    insert_byte: int,
    _used_fresh: Optional[Set[str]] = None,
) -> List[str]:
    """
    Replace every <VAR>, <NUM>, <STR>, etc. placeholder in the template lines
    with a concrete value that respects the structural role of each slot.
    """
    if _used_fresh is None:
        _used_fresh = set()

    full_text = "\n".join(template_lines)
    roles = classify_var_roles(full_text)

    all_scope = all_names_in_scope(bindings, insert_byte) | _used_fresh
    callables = get_callable_names(bindings, insert_byte) + BUILTIN_CALLABLES
    mutables = get_mutable_names(bindings, insert_byte)
    any_vars = list(get_visible_names(bindings, insert_byte))
    if not any_vars:
        any_vars = list(BUILTIN_NAMES)[:5]

    # Build substitution values for each <VAR> slot
    var_substitutions: List[str] = []
    role_idx = 0
    for role in roles:
        if role == ROLE_FRESH:
            name = fresh_name(all_scope | set(var_substitutions), "_e")
            all_scope.add(name)
            _used_fresh.add(name)
            var_substitutions.append(name)

        elif role == ROLE_CALLABLE:
            if callables:
                var_substitutions.append(random.choice(callables))
            else:
                var_substitutions.append("Object")

        elif role == ROLE_PROPERTY:
            var_substitutions.append(random.choice(SAFE_PROPERTIES))

        elif role == ROLE_ASSIGNABLE:
            if mutables:
                var_substitutions.append(random.choice(mutables))
            elif any_vars:
                var_substitutions.append(random.choice(any_vars))
            else:
                name = fresh_name(all_scope, "_t")
                all_scope.add(name)
                var_substitutions.append(name)

        else:  # ROLE_ANY
            if any_vars:
                var_substitutions.append(random.choice(any_vars))
            elif callables:
                var_substitutions.append(random.choice(callables))
            else:
                var_substitutions.append("x")

        role_idx += 1

    # Now substitute numeric/string placeholders and then <VAR> in order
    def apply_subs(text: str, var_subs: List[str]) -> str:
        # Numbers
        num_choices = ["0", "1", "2", "16", "100", "0xFF", "2147483647"]
        text = re.sub(r'<ZERO>', '0', text)
        text = re.sub(r'<ONE>', '1', text)
        text = re.sub(r'<NEG_ONE>', '-1', text)
        text = re.sub(r'<BOUNDARY>', '2147483647', text)
        text = re.sub(r'<POW2>', str(random.choice([2, 4, 8, 16, 32, 64, 128])), text)
        text = re.sub(r'<SMALL>', str(random.randint(0, 16)), text)
        text = re.sub(r'<NUM>', lambda _: random.choice(num_choices), text)
        # Strings
        str_choices = ['"test"', '"value"', '""', '"x"']
        text = re.sub(r'<STR>', lambda _: random.choice(str_choices), text)
        # VAR  consume substitutions left to right
        result = []
        remaining = list(var_subs)
        i = 0
        while i < len(text):
            if text[i:i+5] == '<VAR>':
                if remaining:
                    result.append(remaining.pop(0))
                else:
                    result.append('x')  # fallback
                i += 5
            else:
                result.append(text[i])
                i += 1
        return ''.join(result)

    instantiated = apply_subs(full_text, var_substitutions)
    return instantiated.split("\n")


# ============================================================================
# ABSTRACT PATTERN � REGEX  (for replace mutation matching)
# ============================================================================

def abstract_to_regex(abstract_pattern: str) -> str:
    """
    Convert an abstract template pattern (using <VAR>, <NUM>, etc.) to a
    regex that matches concrete JavaScript code.

    Each <VAR> becomes a named capture group so we can extract the concrete
    binding and reuse it in the 'after' template.
    """
    IDENT = r'([a-zA-Z_$][a-zA-Z0-9_$]*)'
    NUM   = r'(-?(?:0x[0-9a-fA-F]+|\d+\.?\d*(?:[eE][+-]?\d+)?))'
    STR   = r'("[^"]*"|\'[^\']*\')'

    # Replace in length order (longest first) to avoid partial replacement
    substitutions = [
        ('<NEG_ONE>', '(-1)'),
        ('<BOUNDARY>', NUM),
        ('<POW2>', NUM),
        ('<SMALL>', NUM),
        ('<ZERO>', '(0)'),
        ('<ONE>', '(1)'),
        ('<NUM>', NUM),
        ('<STR>', STR),
        ('<VAR>', '__PH_VAR__'),
    ]
    p = abstract_pattern
    for old, new in substitutions:
        p = p.replace(old, new)

    # Escape regex metacharacters in everything except our placeholder
    parts = p.split('__PH_VAR__')
    escaped = [re.escape(part) for part in parts]
    p = IDENT.join(escaped)

    # Allow flexible whitespace
    p = p.replace('\\ ', r'\s*')
    # Allow whitespace around opening braces
    p = p.replace(r'\{', r'\s*\{')

    return p


def find_pattern_matches(code: str, abstract_before: List[str]) -> List[Tuple[int, int, Tuple[str, ...]]]:
    """
    Find all locations in `code` where the abstract 'before' pattern matches.
    Returns list of (start_char, end_char, captured_groups).
    """
    before_str = "\n".join(abstract_before)
    try:
        rx = abstract_to_regex(before_str)
        matches = []
        for m in re.finditer(rx, code, re.MULTILINE | re.DOTALL):
            matches.append((m.start(), m.end(), m.groups()))
        return matches
    except re.error:
        return []


def apply_captured_bindings(
    after_lines: List[str],
    captured_groups: Tuple[str, ...],
    before_lines: List[str],
    bindings: List[Binding],
    insert_byte: int,
) -> List[str]:
    """
    For a replace mutation, the 'after' template may contain <VAR> slots that
    correspond to the same conceptual variable as in 'before'.
    Strategy: map <VAR> slots in 'before' to their captured concrete values,
    then reuse those same values for positionally-matching <VAR> slots in 'after'.
    Fresh roles (catch param, let LHS) always get new names.
    """
    # Count <VAR>s in before and after
    before_str = "\n".join(before_lines)
    after_str = "\n".join(after_lines)

    n_before_vars = before_str.count("<VAR>")
    captured = list(captured_groups[:n_before_vars])

    # Build a value pool: first try to reuse captured values (same semantic role),
    # then fall back to normal instantiation for extra slots
    after_roles = classify_var_roles(after_str)
    all_scope = all_names_in_scope(bindings, insert_byte)
    callables = get_callable_names(bindings, insert_byte) + BUILTIN_CALLABLES
    mutables = get_mutable_names(bindings, insert_byte)
    any_vars = list(get_visible_names(bindings, insert_byte)) or list(BUILTIN_NAMES)[:5]
    used_fresh: Set[str] = set()

    var_subs: List[str] = []
    for i, role in enumerate(after_roles):
        if role == ROLE_FRESH:
            name = fresh_name(all_scope | used_fresh, "_e")
            used_fresh.add(name)
            all_scope.add(name)
            var_subs.append(name)
        elif role == ROLE_PROPERTY:
            var_subs.append(random.choice(SAFE_PROPERTIES))
        elif role == ROLE_CALLABLE:
            # Try to reuse a captured callable value
            reused = next((v for v in captured if v in [b.name for b in bindings if b.inferred_type == "function"] + BUILTIN_CALLABLES), None)
            var_subs.append(reused if reused else (random.choice(callables) if callables else "Object"))
        elif role == ROLE_ASSIGNABLE:
            # Prefer a captured value that is mutable
            reused = next((v for v in captured if v in mutables), None)
            var_subs.append(reused if reused else (random.choice(mutables) if mutables else random.choice(any_vars) if any_vars else "x"))
        else:  # ANY  prefer reusing captured values (preserves the "story" of the mutation)
            if i < len(captured):
                var_subs.append(captured[i])
            elif any_vars:
                var_subs.append(random.choice(any_vars))
            else:
                var_subs.append("x")

    # Now apply the substitutions to after_str
    def apply_subs(text: str, var_s: List[str]) -> str:
        num_choices = ["0", "1", "2", "16", "100"]
        text = re.sub(r'<ZERO>', '0', text)
        text = re.sub(r'<ONE>', '1', text)
        text = re.sub(r'<NEG_ONE>', '-1', text)
        text = re.sub(r'<BOUNDARY>', '2147483647', text)
        text = re.sub(r'<POW2>', str(random.choice([2, 4, 8, 16, 32, 64])), text)
        text = re.sub(r'<SMALL>', str(random.randint(0, 16)), text)
        text = re.sub(r'<NUM>', lambda _: random.choice(num_choices), text)
        text = re.sub(r'<STR>', lambda _: random.choice(['"test"', '"x"', '""']), text)
        remaining = list(var_s)
        result = []
        i = 0
        while i < len(text):
            if text[i:i+5] == '<VAR>':
                result.append(remaining.pop(0) if remaining else 'x')
                i += 5
            else:
                result.append(text[i])
                i += 1
        return ''.join(result)

    instantiated = apply_subs(after_str, var_subs)
    return instantiated.split("\n")


# ============================================================================
# SYNTAX / EXECUTION VALIDATION
# ============================================================================

def ts_syntax_ok(code: str) -> bool:
    """Fast tree-sitter syntax check (no subprocess)."""
    try:
        tree = js_parser.parse(code.encode("utf-8", errors="replace"))
        return not tree.root_node.has_error
    except Exception:
        return False


def v8_validate(code: str, timeout: float = 5.0) -> Tuple[bool, str]:
    """
    Run code through d8.
    Returns (keep, reason).
    keep=True  for: clean exit, crash (exit>1), timeout
    keep=False for: exit code 1 (syntax/type error)
    """
    tmp = None
    try:
        with tempfile.NamedTemporaryFile("w", suffix=".js", delete=False) as f:
            f.write(code)
            tmp = f.name
        p = subprocess.run(
            [JS_ENGINE_PATH, tmp] + JS_ENGINE_ARGS,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.PIPE,
            timeout=timeout,
        )
        rc = p.returncode
        if rc == 0:
            return True, "ok"
        if rc == 1:
            msg = p.stderr.decode(errors="ignore").strip().splitlines()
            first = msg[0] if msg else "error"
            return False, first
        return True, f"crash rc={rc}"
    except subprocess.TimeoutExpired:
        return True, "timeout"
    except Exception as e:
        return True, f"exception: {e}"
    finally:
        if tmp and os.path.exists(tmp):
            try:
                os.unlink(tmp)
            except OSError:
                pass


# ============================================================================
# FIND INSERTION BYTE OFFSET
# ============================================================================

def find_statement_end_bytes(code: str) -> List[int]:
    """
    Return byte offsets of positions just after top-level statements,
    which are safe places to insert new code.
    """
    code_bytes = code.encode("utf-8", errors="replace")
    tree = js_parser.parse(code_bytes)
    positions = []

    STMT_TYPES = {
        "expression_statement", "lexical_declaration", "variable_declaration",
        "function_declaration", "class_declaration", "if_statement",
        "for_statement", "for_in_statement", "for_of_statement",
        "while_statement", "do_statement", "try_statement", "throw_statement",
        "return_statement", "switch_statement",
    }

    for child in tree.root_node.children:
        if child.is_named and child.type in STMT_TYPES:
            positions.append(child.end_byte)

    # Also include positions after statements inside top-level blocks
    for child in tree.root_node.children:
        if child.type == "statement_block":
            for gc in child.children:
                if gc.is_named and gc.type in STMT_TYPES:
                    positions.append(gc.end_byte)

    return sorted(set(positions))


def byte_offset_to_line(code: str, byte_offset: int) -> int:
    """Convert byte offset to line number (0-indexed)."""
    return code[:byte_offset].count("\n")


def get_indentation_at_byte(code: str, byte_offset: int) -> str:
    """Get the indentation of the line at the given byte offset."""
    line_start = code.rfind("\n", 0, byte_offset) + 1
    line_text = code[line_start:]
    return " " * (len(line_text) - len(line_text.lstrip()))


# ============================================================================
# CORE MUTATION FUNCTIONS
# ============================================================================

def apply_insert(
    code: str,
    template: Dict,
    bindings: List[Binding],
    validate: bool = True,
) -> Tuple[Optional[str], str]:
    """
    Insert the 'after' template after a randomly chosen statement.
    Uses role-aware instantiation.
    """
    after = template.get("after", [])
    if not after:
        return None, "empty after"

    insertion_bytes = find_statement_end_bytes(code)
    if not insertion_bytes:
        # Fallback: insert at end
        insertion_bytes = [len(code.encode("utf-8", errors="replace"))]

    # Shuffle and try up to N insertion points
    random.shuffle(insertion_bytes)
    code_bytes = code.encode("utf-8", errors="replace")

    for ins_byte in insertion_bytes[:10]:
        # Instantiate template at this scope
        used_fresh: Set[str] = set()
        try:
            inst_lines = instantiate_template(after, bindings, ins_byte, used_fresh)
        except Exception as e:
            continue

        inst_str = "\n".join(inst_lines)

        # Fast syntax check on the snippet itself
        snippet_check = f"function _chk_() {{\n{inst_str}\n}}"
        if not ts_syntax_ok(snippet_check):
            continue

        # Insert after the statement at ins_byte
        insert_char = len(code_bytes[:ins_byte].decode("utf-8", errors="replace"))
        indent = get_indentation_at_byte(code, insert_char)
        indented = "\n".join(indent + line for line in inst_lines)
        mutated = code[:insert_char] + "\n" + indented + code[insert_char:]

        # Fast tree-sitter check first
        if not ts_syntax_ok(mutated):
            continue

        if validate:
            ok, msg = v8_validate(mutated)
            if not ok:
                continue

        return mutated, f"inserted at byte {ins_byte}"

    return None, "no valid insertion point found"


def apply_replace(
    code: str,
    template: Dict,
    bindings: List[Binding],
    validate: bool = True,
) -> Tuple[Optional[str], str]:
    """
    Find concrete matches of the abstract 'before' pattern in the code,
    then replace with the 'after' template instantiated using the captured
    concrete variable names.
    """
    before = template.get("before", [])
    after = template.get("after", [])
    if not before or not after:
        return None, "missing before or after"

    matches = find_pattern_matches(code, before)
    if not matches:
        return None, "pattern not found in code"

    random.shuffle(list(matches))

    code_bytes = code.encode("utf-8", errors="replace")

    for start_char, end_char, captured in matches:
        # Byte offset of the match start for scope analysis
        ins_byte = len(code[:start_char].encode("utf-8", errors="replace"))

        try:
            after_lines = apply_captured_bindings(
                after, captured, before, bindings, ins_byte
            )
        except Exception:
            continue

        after_str = "\n".join(after_lines)
        snippet_check = f"function _chk_() {{\n{after_str}\n}}"
        if not ts_syntax_ok(snippet_check):
            continue

        # Preserve indentation of the matched region
        line_start = code.rfind("\n", 0, start_char) + 1
        indent = " " * (len(code[line_start:start_char + 1]) - len(code[line_start:start_char + 1].lstrip()))
        indented = "\n".join(indent + line if i > 0 else line for i, line in enumerate(after_lines))

        mutated = code[:start_char] + indented + code[end_char:]

        if not ts_syntax_ok(mutated):
            continue

        if validate:
            ok, msg = v8_validate(mutated)
            if not ok:
                continue

        return mutated, f"replaced at char {start_char}"

    return None, "no valid replacement found"


def apply_mutation(
    code: str,
    template: Dict,
    bindings: List[Binding],
    validate: bool = True,
) -> Tuple[Optional[str], str]:
    kind = template.get("kind", "insert")
    if kind == "insert":
        return apply_insert(code, template, bindings, validate)
    elif kind == "replace":
        return apply_replace(code, template, bindings, validate)
    return None, f"unknown kind: {kind}"


# ============================================================================
# BATCH APPLICATION
# ============================================================================

def apply_mutations_batch(
    code: str,
    templates: List[Dict],
    num_mutations: int = 10,
    validate: bool = True,
    verbose: bool = False,
) -> Tuple[List[Dict], Dict[str, int]]:
    """
    Apply up to `num_mutations` mutations to `code`.
    Returns (results_list, stats_dict).
    """
    bindings = analyze_scope(code)

    stats: Dict[str, int] = {
        "attempts": 0,
        "success": 0,
        "pattern_not_found": 0,
        "no_insertion_point": 0,
        "syntax_fail": 0,
        "exec_fail": 0,
        "other_fail": 0,
    }

    results: List[Dict] = []
    # Sort by gain descending, try high-gain templates first
    sorted_tpls = sorted(templates, key=lambda t: t.get("gain", 0.0), reverse=True)
    top_half = sorted_tpls[:max(1, len(sorted_tpls) // 2)]

    max_attempts = num_mutations * 50

    while len(results) < num_mutations and stats["attempts"] < max_attempts:
        stats["attempts"] += 1
        tpl = random.choice(top_half)

        mutated, msg = apply_mutation(code, tpl, bindings, validate)

        if mutated is None:
            if "pattern not found" in msg:
                stats["pattern_not_found"] += 1
            elif "insertion point" in msg:
                stats["no_insertion_point"] += 1
            elif "syntax" in msg.lower():
                stats["syntax_fail"] += 1
            elif "exec" in msg.lower() or "error" in msg.lower():
                stats["exec_fail"] += 1
            else:
                stats["other_fail"] += 1
            if verbose and stats["attempts"] % 20 == 0:
                print(f"    attempt {stats['attempts']}: {msg}")
            continue

        stats["success"] += 1
        results.append({
            "mutated_code": mutated,
            "template": tpl,
            "gain": tpl.get("gain", 0.0),
            "kind": tpl.get("kind", "insert"),
            "node_type": tpl.get("node_type", ""),
        })

        if verbose:
            print(f"  [{len(results)}/{num_mutations}] {tpl.get('kind')} gain={tpl.get('gain', 0):.4f}  {msg}")

    if verbose:
        total = stats["attempts"]
        print(f"\n  Stats (total attempts={total}):")
        for k, v in sorted(stats.items()):
            if v > 0 and k != "attempts":
                pct = 100 * v / max(total, 1)
                print(f"    {k}: {v} ({pct:.1f}%)")

    return results, stats


# ============================================================================
# CLI
# ============================================================================

def main():
    ap = argparse.ArgumentParser(description="Apply learned mutators to JS files")
    ap.add_argument("--templates", required=True, help="learned_mutators_gumtree.json")
    ap.add_argument("--input", required=True, help="JS file or directory")
    ap.add_argument("--output", required=True, help="Output directory")
    ap.add_argument("--num-mutations", type=int, default=10)
    ap.add_argument("--min-gain", type=float, default=0.0)
    ap.add_argument("--no-validate", action="store_true",
                    help="Skip d8 execution check (faster, less filtering)")
    ap.add_argument("--verbose", action="store_true")
    args = ap.parse_args()

    print(f"[+] Loading templates from {args.templates}")
    with open(args.templates) as f:
        templates = json.load(f)
    templates = [t for t in templates if t.get("gain", 0) >= args.min_gain]
    print(f"[+] {len(templates)} templates (min_gain={args.min_gain})")
    if not templates:
        print("[!] No templates after filtering")
        return

    input_path = Path(args.input)
    files = [input_path] if input_path.is_file() else sorted(input_path.rglob("*.js"))
    print(f"[+] {len(files)} input files")

    out_dir = Path(args.output)
    out_dir.mkdir(parents=True, exist_ok=True)

    total_generated = 0

    for file_path in files:
        if args.verbose or len(files) < 5:
            print(f"\n--- {file_path.name} ---")

        try:
            code = file_path.read_text(errors="ignore")
        except Exception as e:
            print(f"  [!] read error: {e}")
            continue

        mutations, stats = apply_mutations_batch(
            code,
            templates,
            num_mutations=args.num_mutations,
            validate=not args.no_validate,
            verbose=args.verbose,
        )

        print(f"  {file_path.name}: {len(mutations)} mutations "
              f"(success={stats['success']}, attempts={stats['attempts']})")

        file_out = out_dir / file_path.stem
        file_out.mkdir(exist_ok=True)

        metadata = []
        for i, m in enumerate(mutations):
            out_path = file_out / f"{file_path.stem}_mut_{i:03d}.js"
            out_path.write_text(m["mutated_code"])
            total_generated += 1
            metadata.append({
                "index": i,
                "filename": out_path.name,
                "gain": m["gain"],
                "kind": m["kind"],
                "node_type": m["node_type"],
            })

        (file_out / "metadata.json").write_text(json.dumps(metadata, indent=2))

    print(f"\n[*] Done  {total_generated} mutations written to {out_dir}")


if __name__ == "__main__":
    main()