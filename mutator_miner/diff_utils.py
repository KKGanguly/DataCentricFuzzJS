#!/usr/bin/env python3
# diff_utils.py - STRUCTURED MUTATION EXTRACTOR (REPLACE + INSERT, CONTEXTED)

import re
from typing import Dict, Set, List
import difflib
import re
from tree_sitter_languages import get_parser

js_parser = get_parser("javascript")

SEMANTIC_NODE_TYPES = {
    "expression_statement","return_statement","throw_statement",
    "if_statement","for_statement","while_statement","do_statement",
    "try_statement","switch_statement",
    "variable_declaration","lexical_declaration",
    "assignment_expression","call_expression","new_expression"
}

# -----------------------------
# Built-ins / keywords database
# -----------------------------

BUILTINS: Set[str] = {
    "Object","Array","String","Number","Boolean","Function",
    "Error","TypeError","ReferenceError","SyntaxError","RangeError",
    "EvalError","URIError","AggregateError",
    "Math","JSON","Date","RegExp","Promise","Symbol","BigInt",
    "Map","Set","WeakMap","WeakSet","Proxy","Reflect",
    "ArrayBuffer","SharedArrayBuffer","DataView",
    "Int8Array","Uint8Array","Uint8ClampedArray",
    "Int16Array","Uint16Array",
    "Int32Array","Uint32Array",
    "Float32Array","Float64Array",
    "Atomics","Intl",
    "console","globalThis","global","window","document","process",
}

BUILTIN_METHODS: Dict[str, Set[str]] = {
    "Object": {"create","defineProperty","defineProperties","keys","values","entries",
               "assign","freeze","seal","preventExtensions","getPrototypeOf","setPrototypeOf"},
    "Array": {"from","of","isArray"},
    "String": {"fromCharCode","fromCodePoint"},
    "Number": {"isNaN","isFinite","isInteger","isSafeInteger","parseInt","parseFloat"},
    "Math": {"abs","acos","asin","atan","atan2","ceil","cos","exp","floor","log","max",
             "min","pow","random","round","sin","sqrt","tan","trunc"},
    "JSON": {"parse","stringify"},
    "console": {"log","error","warn","info","debug","trace","assert"},
    "Promise": {"all","race","resolve","reject","allSettled","any"},
    "Reflect": {"apply","construct","defineProperty","deleteProperty",
                "get","getPrototypeOf","has","ownKeys","set","setPrototypeOf"},
}

COMMON_PROPERTIES: Set[str] = {
    "length","prototype","constructor","__proto__","name","message",
    "stack","toString","valueOf","hasOwnProperty","call","apply","bind"
}

KEYWORDS: Set[str] = {
    "if","else","for","while","do","break","continue","return","function",
    "var","let","const","class","new","this","super","import","export","default",
    "switch","case","try","catch","finally","throw","typeof","void","delete",
    "in","instanceof","yield","await","async","static","extends",
    "null","true","false","undefined","with","debugger"
}

def is_trivial_context(line: str) -> bool:
    line = line.strip()
    if not line:
        return True
    if re.fullmatch(r"[{}();]+", line):
        return True
    return False

def is_good_context(line: str) -> bool:
    line = line.strip()
    if not line:
        return False
    if re.fullmatch(r"[{}();]+", line):
        return False
    if line.startswith("//"):
        return False
    return True
    
def line_to_byte_offset(code: str, line_no_1based: int) -> int:
    lines = code.splitlines(keepends=True)
    return sum(len(lines[i]) for i in range(min(line_no_1based-1, len(lines))))

def find_semantic_context(code: str, line_no_1based: int) -> str | None:
    byte_off = line_to_byte_offset(code, line_no_1based)
    tree = js_parser.parse(code.encode("utf8"))
    node = tree.root_node.descendant_for_byte_range(byte_off, byte_off)

    while node:
        if node.type in SEMANTIC_NODE_TYPES:
            return code[node.start_byte:node.end_byte].strip()
        node = node.parent

    return None


# -----------------------------
# Diff extraction
# -----------------------------

def extract_diff(original: str, mutated: str) -> str:
    original_lines = original.splitlines(keepends=True)
    mutated_lines = mutated.splitlines(keepends=True)

    diff_iter = difflib.unified_diff(
        original_lines,
        mutated_lines,
        fromfile="original.js",
        tofile="mutated.js",
        lineterm="\n"
    )
    return "".join(diff_iter)

# -----------------------------
# Generalization
# -----------------------------

def generalize(diff_text: str) -> str:
    result_lines = []
    for line in diff_text.splitlines():
        if line.startswith(("+++", "---", "@@")):
            result_lines.append(line)
            continue

        prefix = ""
        content = line
        if line.startswith(("+", "-", " ")):
            prefix = line[0]
            content = line[1:]

        result_lines.append(prefix + generalize_line(content))

    return "\n".join(result_lines)


def generalize_line(line: str) -> str:
    token_pattern = r"""
        ("[^"\\]*(?:\\.[^"\\]*)*"|'[^'\\]*(?:\\.[^'\\]*)*'|`[^`\\]*(?:\\.[^`\\]*)*`) |
        (0x[0-9a-fA-F]+|0b[01]+|0o[0-7]+|\d+\.?\d*(?:[eE][+-]?\d+)?) |
        ([a-zA-Z_$][a-zA-Z0-9_$]*) |
        (\.) |
        (\s+) |
        (===|!==|==|!=|<=|>=|>>>|>>|<<|&&|\|\||
         [+\-*/%&|^~!<>=?:;,.()\[\]{}])
    """

    tokens = [m.group(0) for m in re.finditer(token_pattern, line, re.VERBOSE)]
    out = []
    i = 0

    while i < len(tokens):
        tok = tokens[i]

        if tok.isspace():
            out.append(tok)
            i += 1
            continue

        if tok.startswith(("'",'"','`')):
            out.append("<STR>")
            i += 1
            continue

        if tok[0].isdigit() or tok.startswith(("0x","0b","0o")):
            out.append("<NUM>")
            i += 1
            continue

        if re.match(r"^[a-zA-Z_$]", tok):
            if tok in KEYWORDS and not (tok in {"super","this"} and i+1 < len(tokens) and tokens[i+1]=="."):
                out.append(tok)
                i += 1
                continue

            chain = [tok]
            j = i + 1
            while j + 1 < len(tokens) and tokens[j] == "." and re.match(r"^[a-zA-Z_$]", tokens[j+1]):
                chain.append(tokens[j])
                chain.append(tokens[j+1])
                j += 2

            out.append(generalize_chain(chain))
            i = j
            continue

        out.append(tok)
        i += 1

    return "".join(out)


def generalize_chain(chain_tokens):
    parts = chain_tokens[::2]
    base = parts[0]

    if base == "super":
        return "<SUPER>.<PROP>" if len(parts) >= 2 else "<SUPER>"

    if base == "this":
        return "this.<PROP>" if len(parts) >= 2 else "this"

    if base in BUILTINS:
        if len(parts) >= 2 and parts[1] in BUILTIN_METHODS.get(base,set()):
            return "<BUILTIN>.<BUILTIN_METHOD>"
        if len(parts) == 2 and parts[1] in COMMON_PROPERTIES:
            return "<BUILTIN>.<PROP>"
        if len(parts) >= 2:
            return "<BUILTIN_CHAIN>"
        return "<BUILTIN>"

    if base[0].isupper():
        # Use <<TYPE>> token (your data uses this form a lot)
        if len(parts)==2 and parts[1] in COMMON_PROPERTIES:
            return "<<TYPE>>.<PROP>"
        if len(parts)>=2:
            return "<TYPE_CHAIN>"
        return "<<TYPE>>"

    if len(parts)>=2:
        return "<VAR_CHAIN>"

    return "<VAR>"

# -----------------------------
# Structured mutation extraction
# -----------------------------

def _strip_prefix(line: str) -> str:
    if line and line[0] in "+- ":
        return line[1:]
    return line

def _is_header(line: str) -> bool:
    return line.startswith(("---", "+++", "@@"))

def extract_mutations(generalized_unified_diff: str, original_code: str) -> List[dict]:
    """
    Turn unified diff hunks into small replace/insert mutations with context.

    Output format:
      { kind: "replace"|"insert",
        before: [..],
        after:  [..],
        ctx_before: "some context line",
        ctx_after:  "some context line" }
    """
    lines = generalized_unified_diff.splitlines()
    muts: List[dict] = []

    # Collect hunks (lines between @@ ... @@ markers)
    cur: List[str] = []
    in_hunk = False
    for ln in lines:
        if ln.startswith("@@"):
            if cur:
                muts.extend(_extract_from_hunk(cur, original_code))
                cur = []
            in_hunk = True
            continue
        if not in_hunk:
            continue
        if _is_header(ln):
            continue
        # real hunk line starts with ' ', '-', '+'
        if ln.startswith((" ", "-", "+")):
            cur.append(ln)

    if cur:
        muts.extend(_extract_from_hunk(cur, original_code))

    return muts

def _extract_from_hunk(hunk_lines: List[str], original_code: str) -> List[dict]:
    out: List[dict] = []

    block_minus: List[str] = []
    block_plus: List[str] = []

    last_ctx = ""

    def find_nearest_context(idx: int) -> str:
        # scan backward
        for j in range(idx - 1, -1, -1):
            if hunk_lines[j].startswith(" "):
                c = _strip_prefix(hunk_lines[j]).rstrip()
                if is_good_context(c):
                    return c
        # scan forward
        for j in range(idx + 1, len(hunk_lines)):
            if hunk_lines[j].startswith(" "):
                c = _strip_prefix(hunk_lines[j]).rstrip()
                if is_good_context(c):
                    return c
        return ""

    def flush(ctx_after: str):
        nonlocal block_minus, block_plus, last_ctx
        if not block_minus and not block_plus:
            return

        before = [x.rstrip() for x in block_minus if x.strip()]
        after  = [x.rstrip() for x in block_plus  if x.strip()]

        if before and after:
            out.append({
                "kind": "replace",
                "before": before,
                "after": after,
                "ctx_before": last_ctx,
                "ctx_after": ctx_after,
            })
        elif after and not before:
            out.append({
                "kind": "insert",
                "before": [],
                "after": after,
                "ctx_before": last_ctx,
                "ctx_after": ctx_after,
            })
        else:
            out.append({
                "kind": "replace",
                "before": before,
                "after": [],
                "ctx_before": last_ctx,
                "ctx_after": ctx_after,
            })

        block_minus = []
        block_plus = []

    for i, ln in enumerate(hunk_lines):
        if ln.startswith("-"):
            block_minus.append(_strip_prefix(ln))

        elif ln.startswith("+"):
            block_plus.append(_strip_prefix(ln))

        elif ln.startswith(" "):
            candidate = _strip_prefix(ln).rstrip()

            if is_good_context(candidate):
                flush(candidate)
                last_ctx = candidate
            else:
                ctx = find_nearest_context(i)
                flush(ctx)
                last_ctx = ctx

    flush("")  # flush at end

    # prune no-ops
    pruned = []
    for m in out:
        if (m.get("before") or []) == (m.get("after") or []):
            continue
        if m["kind"] == "insert" and not m.get("after"):
            continue
        pruned.append(m)

    return pruned

# -----------------------------
# Self-test
# -----------------------------
if __name__ == "__main__":
    test_code = """
const err = new Error();
class B {
  m() {
    return super.stack;
  }
}
Object.setPrototypeOf(B.prototype, err);
const b = new B();
b.m.call(0x4141414 >> 1);
"""

    mutated_code = """
const err = new Error();
class B {
  m() {
    return super.stack;
  }
}
Object.setPrototypeOf(B.prototype, err);
const b = new B();
b.m.call(0x4141414 >> 1);
try { err; } catch(e) {}
"""

    diff = extract_diff(test_code, mutated_code)
    print("Original diff:")
    print(diff)
    print("\n" + "=" * 70 + "\n")

    generalized = generalize(diff)
    print("Generalized diff:")
    print(generalized)
    print("\n" + "=" * 70 + "\n")

    muts = extract_mutations(generalized)
    print("Extracted mutations:")
    for m in muts:
        print(m)
