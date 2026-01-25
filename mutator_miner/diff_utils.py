#!/usr/bin/env python3
# diff_utils.py - STRUCTURED MUTATION EXTRACTOR (REPLACE + INSERT, CONTEXTED)

import re
from typing import Dict, Set, List
import difflib

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

def extract_mutations(generalized_unified_diff: str) -> List[dict]:
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
                muts.extend(_extract_from_hunk(cur))
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
        muts.extend(_extract_from_hunk(cur))

    return muts

def _extract_from_hunk(hunk_lines: List[str]) -> List[dict]:
    """
    Break a hunk into blocks separated by context lines.
    If block is large, fall back to per-line alignment to avoid giant rules.
    """
    out: List[dict] = []

    # We keep a rolling context window of the last seen context line
    last_ctx = ""
    pending_ctx_after_candidates: List[str] = []

    block_minus: List[str] = []
    block_plus: List[str] = []

    def flush(next_ctx: str):
        nonlocal block_minus, block_plus, last_ctx
        if not block_minus and not block_plus:
            return

        # Clean
        before = [x.rstrip() for x in block_minus if x.strip()]
        after  = [x.rstrip() for x in block_plus  if x.strip()]

        # If block huge, make smaller aligned atomic mutations
        if len(before) + len(after) > 6:
            # Try line-wise alignment (zip), then extras as inserts/deletes
            k = min(len(before), len(after))
            for i in range(k):
                b = before[i]
                a = after[i]
                if b == a:
                    continue
                out.append({
                    "kind": "replace",
                    "before": [b],
                    "after": [a],
                    "ctx_before": (last_ctx or ""),
                    "ctx_after": (next_ctx or ""),
                })
            # extra additions -> inserts
            for j in range(k, len(after)):
                out.append({
                    "kind": "insert",
                    "before": [],
                    "after": [after[j]],
                    "ctx_before": (last_ctx or ""),
                    "ctx_after": (next_ctx or ""),
                })
            # extra deletions -> replace to empty
            for j in range(k, len(before)):
                out.append({
                    "kind": "replace",
                    "before": [before[j]],
                    "after": [],
                    "ctx_before": (last_ctx or ""),
                    "ctx_after": (next_ctx or ""),
                })
        else:
            if before and after:
                out.append({
                    "kind": "replace",
                    "before": before,
                    "after": after,
                    "ctx_before": (last_ctx or ""),
                    "ctx_after": (next_ctx or ""),
                })
            elif after and not before:
                out.append({
                    "kind": "insert",
                    "before": [],
                    "after": after,
                    "ctx_before": (last_ctx or ""),
                    "ctx_after": (next_ctx or ""),
                })
            else:
                # pure deletion -> treat as replace-to-empty (still "replace")
                out.append({
                    "kind": "replace",
                    "before": before,
                    "after": [],
                    "ctx_before": (last_ctx or ""),
                    "ctx_after": (next_ctx or ""),
                })

        block_minus = []
        block_plus = []

    # Walk hunk, splitting blocks on context lines
    for ln in hunk_lines:
        if ln.startswith(" "):
            next_ctx = _strip_prefix(ln).rstrip()
            flush(next_ctx)
            last_ctx = next_ctx
        elif ln.startswith("-"):
            block_minus.append(_strip_prefix(ln))
        elif ln.startswith("+"):
            block_plus.append(_strip_prefix(ln))

    flush("")  # end of hunk

    # Prune obvious no-ops (before==after) and empty
    pruned = []
    for m in out:
        if (m.get("before") or []) == (m.get("after") or []):
            continue
        if m["kind"] == "insert" and not (m.get("after") or []):
            continue
        if m["kind"] == "replace" and not (m.get("before") or []) and not (m.get("after") or []):
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
