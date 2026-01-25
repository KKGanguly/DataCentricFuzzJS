#!/usr/bin/env python3
"""
apply_learned_mutators.py - scope-safe AST-validated replace+insert mutator applier
"""

import argparse, json, random, re, sys
from dataclasses import dataclass
from typing import List, Dict, Optional, Set
from tree_sitter_languages import get_parser

parser = get_parser("javascript")

BUILTINS = {
    "Object","Array","String","Number","Boolean","Function","Error",
    "Math","JSON","Date","RegExp","Promise","Symbol","BigInt",
    "Map","Set","WeakMap","WeakSet","Proxy","Reflect",
    "console","globalThis","window","document","process","WScript"
}

KEYWORDS = {
    "if","else","for","while","do","break","continue","return","function",
    "var","let","const","class","new","this","super","try","catch","finally",
    "throw","typeof","void","delete","in","instanceof","await","async",
    "null","true","false","undefined"
}

IDENT_RX = re.compile(r"\b[A-Za-z_$][A-Za-z0-9_$]*\b")

@dataclass
class Mutator:
    kind: str
    before: List[str]
    after: List[str]
    ctx_before: str
    ctx_after: str
    gain: float

def parse_mutator(m):
    return Mutator(
        m.get("kind","insert"),
        list(m.get("before") or []),
        list(m.get("after") or []),
        m.get("ctx_before",""),
        m.get("ctx_after",""),
        float(m.get("gain",0.0))
    )


# ---------------- AST helpers ---------------- #

def walk(n):
    yield n
    for c in n.children:
        yield from walk(c)

def parse_ok(js: str) -> bool:
    tree = parser.parse(js.encode())
    root = tree.root_node
    if root.has_error:
        return False
    for n in walk(root):
        if n.type == "ERROR":
            return False
    return True


# ---------------- Scope-aware symbol collection ---------------- #

def collect_symbols_in_scope(js: str, insert_byte: int):
    tree = parser.parse(js.encode())
    src = js.encode()
    vars=set(); funcs=set(); classes=set()

    def node_text(n):
        return src[n.start_byte:n.end_byte].decode()

    def in_scope(n):
        return n.start_byte <= insert_byte

    for n in walk(tree.root_node):
        if not in_scope(n):
            continue

        if n.type == "variable_declarator":
            for c in n.children:
                if c.type == "identifier":
                    vars.add(node_text(c))

        if n.type == "function_declaration":
            for c in n.children:
                if c.type=="identifier":
                    funcs.add(node_text(c))
                    vars.add(node_text(c))

        if n.type == "class_declaration":
            for c in n.children:
                if c.type=="identifier":
                    classes.add(node_text(c))

        if n.type=="formal_parameters":
            for c in walk(n):
                if c.type=="identifier":
                    vars.add(node_text(c))

    vars -= BUILTINS
    funcs -= BUILTINS
    classes -= BUILTINS

    return vars, funcs, classes


def find_statement_nodes(js):
    tree = parser.parse(js.encode())
    nodes=[]
    for n in walk(tree.root_node):
        if n.type.endswith("_statement"):
            nodes.append(n)
    return nodes


# ---------------- Template instantiation ---------------- #

def instantiate_template(line, vars, funcs, classes):
    def pick(s,fallback):
        return sorted(s)[0] if s else fallback

    var = pick(vars,"x")
    func = pick(funcs,var)
    typ = pick(classes,"Array")

    s=line
    s=re.sub(r"catch\s*\(<TYPE>\)","catch(e)",s)

    replacements={
        "<VAR>":var,
        "<VAR_CHAIN>":var,
        "<NUM>":"1",
        "<STR>":"'x'",
        "<PROP>":"p",
        "<TYPE>":typ,
        "<<TYPE>>":typ,
        "<BUILTIN>":"Object",
        "<BUILTIN_METHOD>":"keys",
        "<BUILTIN_CHAIN>":"Object.keys({})",
        "<SUPER>":"super"
    }

    for k,v in replacements.items():
        s=s.replace(k,v)

    return s


def identifiers_used(code):
    return set(m.group(0) for m in IDENT_RX.finditer(code))


def declared_in_payload(payload):
    decl=set()
    for m in re.findall(r"(?:var|let|const)\s+([A-Za-z_$][A-Za-z0-9_$]*)",payload):
        decl.add(m)
    for m in re.findall(r"function\s+([A-Za-z_$][A-Za-z0-9_$]*)",payload):
        decl.add(m)
    return decl


def semantic_ok(payload, vars, funcs, classes):
    used=identifiers_used(payload)
    declared=declared_in_payload(payload)
    allowed=vars|funcs|classes|BUILTINS|KEYWORDS|declared

    for name in used:
        if name not in allowed:
            return False

    # reject bare identifier statements
    for ln in payload.splitlines():
        if re.fullmatch(r"[A-Za-z_$][A-Za-z0-9_$]*\s*;", ln.strip()):
            return False

    return True


# ---------------- Apply logic ---------------- #

def try_insert(js, mut):
    stmts=find_statement_nodes(js)
    if not stmts:
        return None

    node=random.choice(stmts)
    insert_pos=node.end_byte

    vars,funcs,classes=collect_symbols_in_scope(js, insert_pos)
    payload="\n".join(instantiate_template(l,vars,funcs,classes) for l in mut.after if l.strip())

    if not semantic_ok(payload,vars,funcs,classes):
        return None

    mutated=js[:insert_pos]+"\n"+payload+"\n"+js[insert_pos:]
    if not parse_ok(mutated):
        return None

    return mutated


def try_replace(js, mut):
    for node in find_statement_nodes(js):
        pos=node.start_byte
        vars,funcs,classes=collect_symbols_in_scope(js,pos)

        before="\n".join(instantiate_template(l,vars,funcs,classes) for l in mut.before if l.strip())
        after="\n".join(instantiate_template(l,vars,funcs,classes) for l in mut.after if l.strip())

        if before and before in js:
            payload=after
            if not semantic_ok(payload,vars,funcs,classes):
                return None
            new=js.replace(before,after,1)
            if parse_ok(new):
                return new
    return None


def apply_one(js, mut):
    if mut.kind=="replace":
        r=try_replace(js,mut)
        if r: return r
        return try_insert(js,mut)
    else:
        return try_insert(js,mut)


# ---------------- Main ---------------- #

def main():
    ap=argparse.ArgumentParser()
    ap.add_argument("--mutators",required=True)
    ap.add_argument("--in",dest="input_file",required=True)
    ap.add_argument("--out",required=True)
    ap.add_argument("--max_mutations",type=int,default=5)
    ap.add_argument("--seed",type=int,default=42)
    ap.add_argument("--debug",action="store_true")
    args=ap.parse_args()

    random.seed(args.seed)

    mutators=[parse_mutator(m) for m in json.load(open(args.mutators))]
    mutators.sort(key=lambda m:m.gain,reverse=True)

    js=open(args.input_file).read()
    applied=0
    attempts=0
    max_attempts=args.max_mutations*200

    while applied<args.max_mutations and attempts<max_attempts:
        attempts+=1
        m=random.choice(mutators)
        new=apply_one(js,m)
        if new:
            js=new
            applied+=1
            if args.debug:
                print(f"[✓] applied {m.kind}",file=sys.stderr)

    open(args.out,"w").write(js)
    print(f"[✓] wrote {args.out} applied={applied} attempts={attempts}",file=sys.stderr)


if __name__=="__main__":
    main()
