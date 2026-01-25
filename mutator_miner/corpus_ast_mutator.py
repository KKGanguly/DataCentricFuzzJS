#!/usr/bin/env python3
from __future__ import annotations
import argparse, json, os, random, re
from dataclasses import dataclass, asdict
from typing import List, Set, Dict, Optional

# -------------------------------
# Tree-sitter loader
# -------------------------------
def _load_js_language():
    try:
        from tree_sitter_languages import get_language
        return get_language("javascript")
    except:
        from tree_sitter import Language
        so = os.environ.get("JS_LANG_SO","./js_lang.so")
        return Language(so,"javascript")

JS_LANGUAGE = _load_js_language()
from tree_sitter import Parser
parser = Parser()
try: parser.set_language(JS_LANGUAGE)
except: parser.language = JS_LANGUAGE

def parse(code:str):
    return parser.parse(code.encode())

def walk(n):
    yield n
    for c in n.children:
        yield from walk(c)

def node_text(code,n):
    return code[n.start_byte:n.end_byte]

def replace_span(code,s,e,new):
    return code[:s]+new+code[e:]

# -------------------------------
# Constants
# -------------------------------
JS_KEYWORDS = {"let","var","const","function","class","return","if","for","while","try","catch","throw","break","continue"}
JS_BUILTINS = {"Object","Array","Map","Set","Intl","Math","JSON","Promise","WebAssembly","console","Error","Symbol"}

BAD_TOKENS = {"%OptimizeFunction","%PrepareFunction","OptimizeFunctionOnNextCall"}

IDENT_RX = re.compile(r"\b[A-Za-z_$][A-Za-z0-9_$]*\b")

# -------------------------------
# Identifier analysis
# -------------------------------
def collect_identifiers(code:str)->List[str]:
    t=parse(code); ids=[]
    for n in walk(t.root_node):
        if n.type=="identifier":
            s=node_text(code,n)
            if s not in JS_KEYWORDS: ids.append(s)
    return ids

def collect_declared_identifiers(code:str)->Set[str]:
    t=parse(code); root=t.root_node; out=set()
    for n in walk(root):
        if n.type=="variable_declarator":
            for c in n.children:
                if c.type=="identifier":
                    out.add(node_text(code,c))
        elif n.type in ("function_declaration","class_declaration"):
            for c in n.children:
                if c.type=="identifier":
                    out.add(node_text(code,c))
        elif n.type=="formal_parameters":
            for c in walk(n):
                if c.type=="identifier":
                    out.add(node_text(code,c))
    return out

def collect_declared_from_fragment(fragment:str)->Set[str]:
    t=parse(fragment)
    out=set()
    for n in walk(t.root_node):
        if n.type=="variable_declarator":
            for c in n.children:
                if c.type=="identifier":
                    out.add(node_text(fragment,c))
        elif n.type in ("function_declaration","class_declaration"):
            for c in n.children:
                if c.type=="identifier":
                    out.add(node_text(fragment,c))
    return out

def identifiers_in_text(txt:str)->List[str]:
    return [m.group(0) for m in IDENT_RX.finditer(txt) if m.group(0) not in JS_KEYWORDS]

def make_fresh(used:Set[str])->str:
    i=0
    while True:
        v=f"v{i}"
        if v not in used:
            used.add(v)
            return v
        i+=1

# -------------------------------
# Hygiene rewrite
# -------------------------------
def rewrite_fragment_hygienic(fragment:str, target_code:str)->Optional[str]:
    if any(tok in fragment for tok in BAD_TOKENS):
        return None

    tree=parse(fragment)
    if tree.root_node.has_error:
        return None

    target_ids=set(collect_identifiers(target_code))
    target_declared=collect_declared_identifiers(target_code)

    frag_declared=collect_declared_from_fragment(fragment)
    if frag_declared & target_declared:
        return None

    all_ids=identifiers_in_text(fragment)
    free=[x for x in all_ids if x not in frag_declared]

    mapping={}
    used=set(all_ids)|target_ids

    for name in set(free):
        if name in JS_BUILTINS: continue
        if name in target_ids: continue
        if not target_ids: return None
        mapping[name]=random.choice(list(target_ids))

    for d in frag_declared:
        mapping[d]=make_fresh(used)

    out=fragment
    for src in sorted(mapping,key=len,reverse=True):
        out=re.sub(rf"\b{re.escape(src)}\b",mapping[src],out)

    return out

# -------------------------------
# Fragment mining
# -------------------------------
@dataclass
class FragmentPool:
    statements:List[str]
    expressions:List[str]
    identifiers:List[str]

    def to_json(self):
        return json.dumps(asdict(self),indent=2)

    @staticmethod
    def from_json(s):
        d=json.loads(s)
        return FragmentPool(d["statements"],d["expressions"],d["identifiers"])

def is_statement_node(n):
    return n.is_named and n.type.endswith("_statement")

EXPR_TYPES={"binary_expression","call_expression","assignment_expression","member_expression","new_expression"}

def mine_fragments(code:str):
    t=parse(code)
    stmts=[]; exprs=[]; ids=[]
    for n in walk(t.root_node):
        if n.type=="identifier":
            s=node_text(code,n)
            if s not in JS_KEYWORDS: ids.append(s)
        if is_statement_node(n):
            txt=node_text(code,n)
            if 5<len(txt)<200 and "return" not in txt:
                stmts.append(txt)
        if n.type in EXPR_TYPES:
            txt=node_text(code,n)
            if 3<len(txt)<150:
                exprs.append(txt)
    return stmts,exprs,ids

def build_pool(dir):
    S=[];E=[];I=[]
    for f in os.listdir(dir):
        if f.endswith(".js"):
            code=open(os.path.join(dir,f),"r",errors="ignore").read()
            s,e,i=mine_fragments(code)
            S+=s;E+=e;I+=i
    return FragmentPool(list(set(S)),list(set(E)),list(set(I)))

# -------------------------------
# Mutators
# -------------------------------
def pick_statement_nodes(code):
    t=parse(code)
    return [n for n in walk(t.root_node) if is_statement_node(n) and n.parent and n.parent.type in ("program","statement_block")]

def insert_statement(code,pool):
    nodes=pick_statement_nodes(code)
    if not nodes or not pool.statements: return code
    anchor=random.choice(nodes)
    frag=random.choice(pool.statements)
    frag=rewrite_fragment_hygienic(frag,code)
    if frag is None: return code
    return replace_span(code,anchor.end_byte,anchor.end_byte,"\n"+frag+"\n")

def replace_expression(code,pool):
    t=parse(code)
    exprs=[n for n in walk(t.root_node) if n.type in EXPR_TYPES]
    if not exprs or not pool.expressions: return code
    victim=random.choice(exprs)
    frag=random.choice(pool.expressions)
    frag=rewrite_fragment_hygienic(frag,code)
    if frag is None: return code
    return replace_span(code,victim.start_byte,victim.end_byte,frag)

def rename_identifier_global(code,pool):
    ids=list(set(collect_identifiers(code)))
    if len(ids)<2: return code
    src=random.choice(ids)
    if src in JS_BUILTINS: return code
    dst=random.choice([x for x in ids if x!=src])
    return re.sub(rf"\b{src}\b",dst,code)

MUTATORS=[insert_statement,replace_expression,rename_identifier_global]

def mutate(code,pool,rounds=5):
    out=code
    for _ in range(rounds):
        m=random.choice(MUTATORS)
        cand=m(out,pool)
        if cand!=out:
            out=cand
    return out

# -------------------------------
# CLI
# -------------------------------
def main():
    ap=argparse.ArgumentParser()
    sp=ap.add_subparsers(dest="cmd",required=True)

    m=sp.add_parser("mine")
    m.add_argument("--corpus-dir")
    m.add_argument("--out")

    mu=sp.add_parser("mutate")
    mu.add_argument("--pool")
    mu.add_argument("--infile")
    mu.add_argument("--outfile")
    mu.add_argument("--rounds",type=int,default=5)

    args=ap.parse_args()

    if args.cmd=="mine":
        pool=build_pool(args.corpus_dir)
        open(args.out,"w").write(pool.to_json())
    elif args.cmd=="mutate":
        pool=FragmentPool.from_json(open(args.pool).read())
        src=open(args.infile).read()
        out=mutate(src,pool,args.rounds)
        open(args.outfile,"w").write(out)

if __name__=="__main__":
    main()
