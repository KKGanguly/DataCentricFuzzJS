#!/usr/bin/env python3
"""
mutator_learning_improved.py

SCORE-BASED LEARNED MUTATORS with proper GumTree template extraction.

Key improvements over original:
1. Uses GumTree for precise diff extraction (not diff_utils)
2. Extracts statement-level templates properly
3. FUZZING-AWARE abstraction that preserves engine attack surfaces
4. Multi-level validation
5. Score-based filtering (only beneficial mutations)
"""

import os, json, subprocess, tempfile, requests, re
from multiprocessing import Pool, cpu_count
from tqdm import tqdm
from typing import Dict, List, Optional, Tuple
import tempfile
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
# FUZZING-AWARE ABSTRACTION
# ============================================================================

# Tier 1: NEVER abstract - engine attack surface
ENGINE_CRITICAL = {
    # Typed Arrays - memory corruption surface
    'Int8Array', 'Uint8Array', 'Int16Array', 'Uint16Array', 
    'Int32Array', 'Uint32Array', 'Float32Array', 'Float64Array',
    'BigInt64Array', 'BigUint64Array', 'Uint8ClampedArray',
    'ArrayBuffer', 'SharedArrayBuffer', 'DataView',
    
    # Prototype chain - shape/IC bugs
    'prototype', '__proto__', 'constructor', 
    'setPrototypeOf', 'getPrototypeOf', 'create',
    'getOwnPropertyDescriptor', 'defineProperty', 'defineProperties',
    
    # JIT hints - optimization bugs
    'OptimizeFunctionOnNextCall', 'PrepareFunctionForOptimization',
    'NeverOptimizeFunction', 'DeoptimizeFunction', 'ClearFunctionFeedback',
    'OptimizeOsr', 'DisableOptimizationFinalization',
    
    # Engine internals
    'gc', 'WeakMap', 'WeakSet', 'WeakRef', 'FinalizationRegistry',
    'Proxy', 'Reflect', 'Atomics',
    
    # Memory/allocation
    'Map', 'Set', 'Symbol', 'BigInt',
    
    # Reflective operations
    'eval', 'Function',
}

# Tier 2: Preserve operations (can use placeholders)
OPERATION_KEYWORDS = {
    # Array mutations - JIT speculation surface
    'push', 'pop', 'shift', 'unshift', 'splice', 'slice', 'concat',
    'fill', 'copyWithin', 'reverse', 'sort',
    
    # Iterators - deopt surface
    'map', 'filter', 'reduce', 'forEach', 'find', 'findIndex',
    'every', 'some', 'entries', 'keys', 'values',
    'flatMap', 'flat',
    
    # Property access - IC bugs
    'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable',
    
    # Coercion - type confusion
    'toString', 'valueOf', 'toPrimitive', 'toJSON',
    'toLocaleString', 'toFixed', 'toPrecision',
    
    # Object ops
    'freeze', 'seal', 'preventExtensions', 'assign',
    'is', 'keys', 'values', 'entries',
    
    # Function ops
    'call', 'apply', 'bind',
    
    # String ops (overflow potential)
    'charAt', 'charCodeAt', 'substring', 'substr', 'repeat',
    'split', 'replace', 'match', 'search',
    
    # Math (overflow/precision)
    'abs', 'floor', 'ceil', 'round', 'trunc',
    'max', 'min', 'pow', 'sqrt',
}

# Tier 3: Language keywords
LANGUAGE_KEYWORDS = {
    'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'default',
    'break', 'continue', 'return', 'throw', 'try', 'catch', 'finally',
    'function', 'class', 'extends', 'static', 'async', 'await', 'yield',
    'let', 'const', 'var', 'this', 'super', 'new', 'delete',
    'true', 'false', 'null', 'undefined', 'NaN', 'Infinity',
    'typeof', 'instanceof', 'in', 'of', 'with', 'debugger',
    'import', 'export', 'from', 'as', 'default',
    
    # Common globals worth preserving
    'Array', 'Object', 'String', 'Number', 'Boolean', 'Error',
    'Math', 'Date', 'RegExp', 'JSON', 'Promise',
    'console', 'parseInt', 'parseFloat', 'isNaN', 'isFinite',
}

def classify_number(s: str) -> str:
    """Keep numbers that trigger edge cases"""
    try:
        # Parse different number formats
        if s.startswith(('0x', '0X')):
            n = int(s, 16)
        elif s.startswith(('0o', '0O')):
            n = int(s, 8)
        elif s.startswith(('0b', '0B')):
            n = int(s, 2)
        else:
            # Float or scientific notation
            if '.' in s or 'e' in s.lower():
                return '__FLOAT__'
            n = int(s)
        
        # Keep specific values that commonly trigger bugs
        if n == 0: return '0'
        if n == 1: return '1'
        if n == -1: return '-1'
        if n == 2: return '2'
        
        # Boundary values (overflow, off-by-one)
        BOUNDARIES = {
            0x7FFFFFFF, -0x80000000,  # 32-bit signed
            0xFFFFFFFF,                # 32-bit unsigned
            2147483647, -2147483648,   # INT32_MAX/MIN
            4294967295,                # UINT32_MAX
            0x7FFF, -0x8000, 0xFFFF,   # 16-bit
            0x7F, -0x80, 0xFF,         # 8-bit
            65535, 65536,              # Common boundaries
        }
        if n in BOUNDARIES or -n in BOUNDARIES:
            return '__BOUNDARY__'
        
        # Powers of 2 (alignment, size bugs)
        if n > 0 and (n & (n - 1)) == 0:
            if n <= 16:
                return str(n)  # Keep small powers literal
            return '__POW2__'
        
        # Small numbers (loop bounds, indices)
        if -16 <= n <= 16:
            return str(n)
        
        # Large numbers
        if abs(n) > 1000000:
            return '__LARGE__'
        
        return '__NUM__'
    except:
        return '__NUM__'

def abstract_code(code: str) -> str:
    """Multi-tier abstraction preserving fuzzing attack surface"""
    
    # Step 0: Pre-protect existing placeholders (if any)
    code = code.replace('<', '__LT__').replace('>', '__GT__')
    
    # Step 1: Protect engine-critical patterns
    protected = []
    def protect(match):
        protected.append(match.group(0))
        return f'__PROTECTED_{len(protected)-1}__'
    
    # Protect V8 intrinsics (%OptimizeFunctionOnNextCall, etc.)
    code = re.sub(r'%[A-Za-z]+', protect, code)
    
    # Protect typed array constructors and buffer types
    typed_array_pattern = '|'.join(re.escape(k) for k in ENGINE_CRITICAL 
                                   if 'Array' in k or 'Buffer' in k or 'View' in k)
    if typed_array_pattern:
        code = re.sub(r'\b(' + typed_array_pattern + r')\b', protect, code)
    
    # Protect prototype chain operations
    code = re.sub(r'\.(__proto__|prototype)\b', protect, code)
    code = re.sub(r'\bObject\.(setPrototypeOf|getPrototypeOf|create|defineProperty|defineProperties|getOwnPropertyDescriptor)\b', 
                  protect, code)
    
    # Protect other critical APIs
    critical_apis = '|'.join(re.escape(k) for k in ENGINE_CRITICAL 
                             if k not in LANGUAGE_KEYWORDS and 'Array' not in k and 'Buffer' not in k)
    if critical_apis:
        code = re.sub(r'\b(' + critical_apis + r')\b', protect, code)
    
    # Step 2: Numbers - preserve edge cases
    def num_sub(match):
        return classify_number(match.group(0))
    
    # Hex/oct/bin literals
    code = re.sub(r'-?0[xXoObB][0-9a-fA-F]+', num_sub, code)
    # Decimal numbers (int and float)
    code = re.sub(r'-?\d+\.?\d*([eE][+-]?\d+)?', num_sub, code)
    
    # Step 3: Strings - categorize by length/purpose
    def string_sub(match):
        s = match.group(0)
        quote = s[0]
        content = s[1:-1]
        
        # Empty string (common edge case)
        if not content:
            return '__EMPTY_STR__'
        
        # Single char (type confusion potential)
        if len(content) == 1:
            return '__CHAR__'
        
        # Property names that are operations
        if content in OPERATION_KEYWORDS or content in ENGINE_CRITICAL:
            return s  # Keep literal
        
        # Long strings (allocation bugs)
        if len(content) > 100:
            return '__LONG_STR__'
        
        return '__STR__'
    
    code = re.sub(r'''(['"`])(?:[^\1\\]|\\.)*?\1''', string_sub, code)
    
    # Step 4: Property access - preserve operation semantics
    def property_sub(match):
        prop = match.group(1)
        
        # Engine-critical properties
        if prop in ENGINE_CRITICAL:
            return '.' + prop
        
        # Common operations
        if prop in OPERATION_KEYWORDS:
            # Categorize by type
            if prop in {'push', 'pop', 'shift', 'unshift', 'splice'}:
                return '.__ARRAY_MUTATOR__'
            elif prop in {'map', 'filter', 'reduce', 'forEach', 'find'}:
                return '.__ARRAY_ITERATOR__'
            elif prop in {'toString', 'valueOf', 'toPrimitive'}:
                return '.__COERCION__'
            elif prop in {'call', 'apply', 'bind'}:
                return '.__FUNC_METHOD__'
            else:
                return '.__METHOD__'
        
        # Generic property
        return '.__PROP__'
    
    code = re.sub(r'\.([a-zA-Z_$][a-zA-Z0-9_$]*)', property_sub, code)
    
    # Step 5: Identifiers - abstract variables but keep keywords
    def id_sub(match):
        word = match.group(0)
        
        # Skip protected tokens
        if word.startswith('__PROTECTED_'):
            return word
        
        # Skip our placeholders
        if word in {'EMPTY_STR', 'CHAR', 'LONG_STR', 'STR', 'VAR', 'NUM', 
                    'FLOAT', 'LARGE', 'BOUNDARY', 'POW2',
                    'ARRAY_MUTATOR', 'ARRAY_ITERATOR', 'COERCION', 
                    'FUNC_METHOD', 'METHOD', 'PROP'}:
            return word
        
        # Keep engine-critical identifiers
        if word in ENGINE_CRITICAL:
            return word
        
        # Keep operations
        if word in OPERATION_KEYWORDS:
            return word
        
        # Keep language keywords
        if word in LANGUAGE_KEYWORDS:
            return word
        
        # Abstract everything else
        return '__VAR__'
    
    code = re.sub(r'\b[a-zA-Z_$][a-zA-Z0-9_$]*\b', id_sub, code)
    
    # Step 6: Restore protected tokens
    for i, token in enumerate(protected):
        code = code.replace(f'__PROTECTED_{i}__', token)
    
    # Step 7: Convert placeholders to angle bracket format
    replacements = {
        '__VAR__': '<VAR>',
        '__NUM__': '<NUM>',
        '__FLOAT__': '<FLOAT>',
        '__LARGE__': '<LARGE>',
        '__BOUNDARY__': '<BOUNDARY>',
        '__POW2__': '<POW2>',
        '__STR__': '<STR>',
        '__EMPTY_STR__': '<EMPTY_STR>',
        '__CHAR__': '<CHAR>',
        '__LONG_STR__': '<LONG_STR>',
        '__ARRAY_MUTATOR__': '<ARRAY_MUTATOR>',
        '__ARRAY_ITERATOR__': '<ARRAY_ITERATOR>',
        '__COERCION__': '<COERCION>',
        '__FUNC_METHOD__': '<FUNC_METHOD>',
        '__METHOD__': '<METHOD>',
        '__PROP__': '<PROP>',
    }
    
    for old, new in replacements.items():
        code = code.replace(old, new)
    
    # Step 8: Restore any pre-existing angle brackets
    code = code.replace('__LT__', '<').replace('__GT__', '>')
    
    # Step 9: Normalize whitespace
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
        
        # Abstract with fuzzing-aware strategy
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
    r"^\s*<VAR>\s*=\s*<VAR>\s*;?\s*$",  # Useless assignment
    r"^\s*$",  # Empty
    r"//", r"/\*",  # Should be cleaned already
]
def is_valid_template(template: Dict) -> bool:
    """Validate template - RELAXED for initial learning"""
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
    
    # Check for actually useless patterns
    TRULY_USELESS = [
        r"^\s*<VAR>\s*=\s*<VAR>\s*;?\s*$",  # Just x = y
        r"^\s*$",  # Empty
    ]
    
    for pattern in TRULY_USELESS:
        if re.search(pattern, after_text):
            print(f"  [!] Rejected (useless): {after_text[:100]}")
            return False
    
    # RELAXED: Accept patterns that have STRUCTURE even if not "critical"
    
    # Tier 1: Engine-critical (best)
    has_critical = any(keyword in after_text for keyword in ENGINE_CRITICAL)
    
    # Tier 2: Interesting operations
    has_operation = any(marker in after_text for marker in 
                       ['<ARRAY_MUTATOR>', '<ARRAY_ITERATOR>', '<COERCION>', 
                        '<FUNC_METHOD>', '<METHOD>', '<PROP>'])
    
    # Tier 3: Edge case numbers
    has_edge_numbers = any(marker in after_text for marker in 
                          ['<BOUNDARY>', '<POW2>', '<LARGE>'])
    
    # Tier 4: Control flow (can lead to coverage)
    has_control_flow = any(kw in after_text for kw in 
                          ['if', 'for', 'while', 'try', 'catch', 'switch'])
    
    # Tier 5: Operators (might hit edge cases)
    has_operators = any(op in after_text for op in 
                       [' * ', ' / ', ' % ', ' << ', ' >> ', ' >>> ', ' & ', ' | ', ' ^ '])
    
    # Tier 6: Object/Array operations
    has_new = 'new ' in after_text
    has_instanceof = 'instanceof' in after_text
    has_typeof = 'typeof' in after_text
    has_array_access = re.search(r'\[.*\]', after_text)
    
    # Tier 7: Function patterns (might trigger JIT)
    has_function = 'function' in after_text
    has_arrow = '=>' in after_text
    has_async = 'async' in after_text or 'await' in after_text
    
    # Accept if ANY tier matches
    meaningful = (has_critical or has_operation or has_edge_numbers or
                  has_control_flow or has_operators or has_new or 
                  has_instanceof or has_typeof or has_array_access or
                  has_function or has_arrow or has_async)
    
    if not meaningful:
        print(f"  [!] Rejected (too generic): {after_text[:100]}")
        return False
    
    # Additional check: must have at least 2 tokens (not just "try {")
    token_count = len(re.findall(r'\b\w+\b|[(){}[\];,]', after_text))
    if token_count < 3:
        print(f"  [!] Rejected (too short): {after_text[:100]}")
        return False
    
    return True

def can_instantiate(template: Dict) -> bool:
    """Quick sanity check with COMPLETE replacements"""
    replacements = {
        # Variables
        '<VAR>': 'x',
        
        # Numbers
        '<NUM>': '42',
        '<FLOAT>': '3.14',
        '<LARGE>': '999999',
        '<BOUNDARY>': '2147483647',
        '<POW2>': '1024',
        '0': '0',
        '1': '1',
        '2': '2',
        '-1': '-1',
        
        # Strings
        '<STR>': '"test"',
        '<EMPTY_STR>': '""',
        '<CHAR>': '"x"',
        '<LONG_STR>': '"' + 'x' * 200 + '"',
        
        # Methods/Properties
        '<ARRAY_MUTATOR>': 'push',
        '<ARRAY_ITERATOR>': 'map',
        '<COERCION>': 'toString',
        '<FUNC_METHOD>': 'call',
        '<METHOD>': 'toString',
        '<PROP>': 'length',
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
        
        # Wrap in function and parse
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

def v8_parse_ok(js: str, timeout: float = 5.0) -> bool:
    """
    Returns True if JS code is *syntax valid*, otherwise False.
    Keeps crashes (exit code >1) and timeouts for further processing.
    Executes code via temporary file.
    """
    tmp_path = None
    try:
        # Write JS code to a temporary file
        with tempfile.NamedTemporaryFile("w", suffix=".js", delete=False) as f:
            f.write(js)
            tmp_path = f.name

        # Run V8 engine on the temp file
        p = subprocess.run(
            [JS_ENGINE_PATH, tmp_path] + JS_ENGINE_CHECK_ARGS,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
            timeout=timeout
        )

        ret = p.returncode

        # 0 = OK � keep
        if ret == 0:
            return True

        # 1 = syntax/type error � discard
        if ret == 1:
            return False

        # >1 = crash � keep
        if ret > 1:
            return True

    except subprocess.TimeoutExpired:
        # Timeout � keep
        return True
    except Exception:
        # Unexpected error � keep
        return True
    finally:
        # Cleanup temp file
        if tmp_path and os.path.exists(tmp_path):
            os.remove(tmp_path)

# ============================================================================
# MAIN LEARNING LOOP
# ============================================================================

def process_file(fname):
    """Process one file and extract learned mutators"""
    import random
    path = os.path.join(CORPUS, fname)
    src = open(path, "r", encoding="utf-8", errors="ignore").read()

    # Phase 1: Baseline scoring
    base_feats = extract_features(path)
    if not v8_parse_ok(src):
        return []
    base_score = crash_score(base_feats)
    learned = []
    seen = set()

    # Phase 2: Mutation loop
    for _ in range(N_MUTATIONS):
        mutated = mutate(src, POOL, rounds = 3 if random.random() < 0.7 else 5)
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
            if new_score <= base_score+0.05:
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
        
        # Stats
        critical_count = sum(1 for t in learned if any(k in '\n'.join(t['after']) for k in ENGINE_CRITICAL))
        print(f"[+] Templates with engine-critical APIs: {critical_count}/{len(learned)}")


if __name__ == "__main__":
    main()