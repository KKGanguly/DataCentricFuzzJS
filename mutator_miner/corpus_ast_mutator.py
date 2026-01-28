#!/usr/bin/env python3
from __future__ import annotations
import argparse, json, os, random, re
from dataclasses import dataclass, asdict
from typing import List, Set, Dict, Optional
import subprocess
JS_ENGINE_PATH = os.environ.get("JS_ENGINE_PATH", "/home/kgangul/DataCentricFuzzJS/v8/out/fuzzbuild/d8")
JS_ENGINE_CHECK_ARGS = ["--check", "--allow-natives-syntax", "--expose-gc"]
SYNTAX_TIMEOUT = 3.0


def v8_parse_ok(js: str) -> bool:
    try:
        p = subprocess.run(
            [JS_ENGINE_PATH] + JS_ENGINE_CHECK_ARGS,
            input=js.encode("utf-8", errors="ignore"),
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
            timeout=SYNTAX_TIMEOUT
        )
        return p.returncode==0
    except Exception as e:
        return False
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

BAD_TOKENS = {
    "%OptimizeFunction",
    "%PrepareFunction",
    "%NeverOptimizeFunction",
    "%DeoptimizeFunction",
    "%DebugPrint",
    "%DebugBreak",
    "%SystemBreak",
    "%CollectGarbage",
    "%GetOptimizationStatus",
    "%HasFastProperties",
    "%DisassembleFunction",
    "%HeapObjectVerify",
    "%IsBeingInterpreted",

    "OptimizeFunctionOnNextCall",
    "PrepareFunctionForOptimization",

    "__defineGetter__",
    "__defineSetter__",
    "__lookupGetter__",
    "__lookupSetter__",

    "eval(",
    "Function(",
    "new Function",

    "WebAssembly",
    "SharedArrayBuffer",
    "Atomics",
    "Worker",
    "import(",
    "require(",
}

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

def infer_fragment_usage_types(fragment: str) -> Dict[str, str]:
    t = parse(fragment)
    usage = {}

    for n in walk(t.root_node):
        # x() → function
        if n.type == "call_expression":
            fn = n.children[0]
            if fn.type == "identifier":
                usage[node_text(fragment, fn)] = "function"

        # x.push(...) → array
        if n.type == "member_expression":
            obj = n.children[0]
            prop = n.children[-1]
            if obj.type == "identifier" and prop.type == "property_identifier":
                pname = node_text(fragment, prop)
                if pname in ("push", "pop", "map", "filter", "slice"):
                    usage[node_text(fragment, obj)] = "array"

    return usage
def collect_declared_positions(code: str) -> Dict[str, int]:
    t = parse(code)
    pos: Dict[str, int] = {}

    for n in walk(t.root_node):
        if n.type == "variable_declarator":
            for c in n.children:
                if c.type == "identifier":
                    name = node_text(code, c)
                    pos[name] = min(pos.get(name, 10**18), c.start_byte)

        elif n.type in ("function_declaration", "class_declaration"):
            for c in n.children:
                if c.type == "identifier":
                    name = node_text(code, c)
                    pos[name] = min(pos.get(name, 10**18), c.start_byte)

        elif n.type == "formal_parameters":
            for c in walk(n):
                if c.type == "identifier":
                    name = node_text(code, c)
                    pos[name] = min(pos.get(name, 10**18), c.start_byte)

    return pos


def visible_identifiers_at(code: str, insert_pos: int) -> List[str]:
    decl_pos = collect_declared_positions(code)
    # visible = declared before insertion point
    return [name for name, p in decl_pos.items() if p <= insert_pos]

def collect_variable_types(code: str) -> Dict[str, str]:
    t = parse(code)
    types = {}

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
def rewrite_identifiers_ast(fragment: str, mapping: Dict[str, str]) -> str:
    t = parse(fragment)
    edits = []

    for n in walk(t.root_node):
        if n.type == "identifier":
            old = node_text(fragment, n)
            new = mapping.get(old)
            if new and new != old:
                edits.append((n.start_byte, n.end_byte, new))

    # apply from back to front so byte offsets stay valid
    out = fragment
    for s, e, new in sorted(edits, key=lambda x: x[0], reverse=True):
        out = out[:s] + new + out[e:]
    return out

# -------------------------------
# Hygiene rewrite
# -------------------------------
def rewrite_fragment_hygienic(fragment: str, target_code: str, insert_pos: int) -> Optional[str]:
    for tok in BAD_TOKENS:
        if tok in fragment:
            return None

    target_ids_all = set(collect_identifiers(target_code))
    target_declared = collect_declared_identifiers(target_code)
    target_types = collect_variable_types(target_code)

    visible_ids = set(visible_identifiers_at(target_code, insert_pos))
    # keep only real identifiers, and keep builtins separately
    visible_ids = {v for v in visible_ids if v in target_ids_all}

    frag_declared = collect_declared_from_fragment(fragment)
    frag_usage_types = infer_fragment_usage_types(fragment)

    if frag_declared & target_declared:
        return None

    # IMPORTANT: derive "free" names from AST identifiers (not regex)
    t = parse(fragment)
    all_ident_nodes = [n for n in walk(t.root_node) if n.type == "identifier"]
    all_ids = [node_text(fragment, n) for n in all_ident_nodes if node_text(fragment, n) not in JS_KEYWORDS]
    free = [x for x in all_ids if x not in frag_declared]

    mapping: Dict[str, str] = {}
    used = set(all_ids) | set(collect_identifiers(target_code))
    declarations: List[str] = []

    for name in set(free):
        if name in JS_BUILTINS:
            continue

        needed_type = frag_usage_types.get(name)

        candidates = []
        for v in visible_ids:
            if needed_type is None or target_types.get(v) == needed_type:
                candidates.append(v)

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

def insert_statement(code, pool):
    nodes = pick_statement_nodes(code)
    if not nodes or not pool.statements:
        return code

    anchor = random.choice(nodes)

    for _ in range(20):
        frag = random.choice(pool.statements)
        frag = rewrite_fragment_hygienic(frag, code, insert_pos=anchor.end_byte)
        if not frag:
            continue
        mutated = replace_span(code, anchor.end_byte, anchor.end_byte, "\n" + frag + "\n")
        if v8_parse_ok(mutated):
            return mutated

    return code


def replace_expression(code, pool):
    t = parse(code)
    exprs = [n for n in walk(t.root_node) if n.type in EXPR_TYPES]
    if not exprs or not pool.expressions:
        return code

    victim = random.choice(exprs)

    for _ in range(20):
        frag = random.choice(pool.expressions)
        frag = rewrite_fragment_hygienic(frag, code, insert_pos=victim.start_byte)
        if not frag:
            continue

        # precedence-safe
        frag = f"({frag})"

        mutated = replace_span(code, victim.start_byte, victim.end_byte, frag)
        if v8_parse_ok(mutated):
            return mutated

    return code


def rename_identifier_global(code, pool):
    ids = list(set(collect_identifiers(code)))
    ids = [i for i in ids if i not in JS_BUILTINS]
    if len(ids) < 2:
        return code

    src = random.choice(ids)
    dst = random.choice([x for x in ids if x != src])

    pattern = rf"\b{re.escape(src)}\b"
    new_code = re.sub(pattern, dst, code)

    if new_code != code and v8_parse_ok(new_code):
        return new_code
    return code

MUTATORS=[insert_statement,replace_expression,rename_identifier_global]


def print_tree(code):
    tree = parse(code)
    print(tree.root_node.sexp()) 

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
