#!/usr/bin/env python3
"""
apply_learned_mutators_v6_semantic_aware.py

SEMANTIC-AWARE VERSION:
1. TDZ awareness (no use-before-declaration)
2. Type-aware instantiation (don't call non-functions)
3. Property-aware (don't access random properties)
4. Better validation to catch semantic errors
"""

import os
import json
import re
import random
import tempfile
import argparse
from pathlib import Path
from typing import Dict, List, Set, Optional, Tuple, Any
from dataclasses import dataclass, field
from tree_sitter_languages import get_parser
import subprocess

# ============================================================================
# CONFIGURATION
# ============================================================================

js_parser = get_parser("javascript")

JS_BUILTINS = {
    'Array', 'Object', 'String', 'Number', 'Boolean', 'Function', 'Symbol',
    'BigInt', 'Map', 'Set', 'WeakMap', 'WeakSet', 'Promise', 'Proxy', 'Reflect',
    'Math', 'Date', 'RegExp', 'Error', 'TypeError', 'RangeError', 'SyntaxError',
    'JSON', 'Atomics', 'DataView', 'ArrayBuffer', 'console', 'parseInt',
    'parseFloat', 'isNaN', 'isFinite', 'eval', 'undefined', 'null', 'Infinity',
    'NaN', 'globalThis', 'window', 'document',
}

# Safe methods that exist on common objects
SAFE_METHODS = {
    'toString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf',
    'propertyIsEnumerable', 'toLocaleString', 'constructor'
}

JS_ENGINE_PATH = os.environ.get("JS_ENGINE_PATH", "/home/kgangul/DataCentricFuzzJS/v8/out/fuzzbuild/d8")
JS_ENGINE_CHECK_ARGS = ["--expose-gc","--allow-natives-syntax"]  # Removed --check for full execution


# ============================================================================
# ENHANCED DECLARATION TRACKING
# ============================================================================

@dataclass
class Declaration:
    """Track where a variable is declared with type info"""
    name: str
    line: int
    scope: str
    kind: str
    hoisted: bool
    inferred_type: Optional[str] = None  # 'function', 'class', 'object', 'primitive', 'unknown'


@dataclass
class CodeContext:
    """Code context with type information"""
    variables: List[str]
    functions: List[str]
    classes: List[str]
    declarations: List[Declaration]
    type_info: Dict[str, str] = field(default_factory=dict)  # name -> type
    
    def get_available_at_line(self, line: int) -> Set[str]:
        """Get all variables available at a given line"""
        available = set(JS_BUILTINS)
        
        for decl in self.declarations:
            if decl.hoisted:
                available.add(decl.name)
            else:
                if decl.line < line:
                    available.add(decl.name)
        
        return available
    
    def get_functions_at_line(self, line: int) -> List[str]:
        """Get only callable functions at a given line"""
        funcs = []
        for decl in self.declarations:
            if decl.inferred_type == 'function':
                if decl.hoisted or decl.line < line:
                    funcs.append(decl.name)
        return funcs
    
    def get_type(self, name: str) -> str:
        """Get inferred type of a variable"""
        return self.type_info.get(name, 'unknown')
    
    def is_callable(self, name: str) -> bool:
        """Check if a name is likely callable"""
        if name in self.functions:
            return True
        return self.get_type(name) == 'function'


def infer_type_from_declaration(line: str, var_name: str) -> str:
    """Infer type from declaration line"""
    # Function declaration
    if f'function {var_name}' in line:
        return 'function'
    
    # Arrow function
    if re.search(rf'{var_name}\s*=\s*(?:\([^)]*\)|[a-zA-Z_$][a-zA-Z0-9_$]*)\s*=>', line):
        return 'function'
    
    # Class
    if f'class {var_name}' in line:
        return 'class'
    
    # new Something()
    if re.search(rf'{var_name}\s*=\s*new\s+', line):
        return 'object'
    
    # Object literal
    if re.search(rf'{var_name}\s*=\s*\{{', line):
        return 'object'
    
    # Array literal
    if re.search(rf'{var_name}\s*=\s*\[', line):
        return 'object'
    
    # Number literal
    if re.search(rf'{var_name}\s*=\s*-?\d+', line):
        return 'primitive'
    
    # String literal
    if re.search(rf'{var_name}\s*=\s*["\']', line):
        return 'primitive'
    
    # Boolean literal
    if re.search(rf'{var_name}\s*=\s*(?:true|false)', line):
        return 'primitive'
    
    return 'unknown'


def extract_declarations(code: str) -> CodeContext:
    """Extract declarations with type inference"""
    lines = code.split('\n')
    
    variables = []
    functions = []
    classes = []
    declarations = []
    type_info = {}
    
    for line_num, line in enumerate(lines):
        stripped = line.strip()
        
        # var declarations (hoisted)
        var_matches = re.finditer(r'\bvar\s+([a-zA-Z_$][a-zA-Z0-9_$]*)', line)
        for m in var_matches:
            name = m.group(1)
            variables.append(name)
            var_type = infer_type_from_declaration(line, name)
            type_info[name] = var_type
            declarations.append(Declaration(
                name=name,
                line=line_num,
                scope='function',
                kind='var',
                hoisted=True,
                inferred_type=var_type
            ))
        
        # let declarations (NOT hoisted)
        let_matches = re.finditer(r'\blet\s+([a-zA-Z_$][a-zA-Z0-9_$]*)', line)
        for m in let_matches:
            name = m.group(1)
            variables.append(name)
            var_type = infer_type_from_declaration(line, name)
            type_info[name] = var_type
            declarations.append(Declaration(
                name=name,
                line=line_num,
                scope='block',
                kind='let',
                hoisted=False,
                inferred_type=var_type
            ))
        
        # const declarations (NOT hoisted)
        const_matches = re.finditer(r'\bconst\s+([a-zA-Z_$][a-zA-Z0-9_$]*)', line)
        for m in const_matches:
            name = m.group(1)
            variables.append(name)
            var_type = infer_type_from_declaration(line, name)
            type_info[name] = var_type
            declarations.append(Declaration(
                name=name,
                line=line_num,
                scope='block',
                kind='const',
                hoisted=False,
                inferred_type=var_type
            ))
        
        # Function declarations (hoisted)
        func_matches = re.finditer(r'\bfunction\s+([a-zA-Z_$][a-zA-Z0-9_$]*)', line)
        for m in func_matches:
            name = m.group(1)
            functions.append(name)
            type_info[name] = 'function'
            declarations.append(Declaration(
                name=name,
                line=line_num,
                scope='function',
                kind='function',
                hoisted=True,
                inferred_type='function'
            ))
        
        # Class declarations (NOT hoisted)
        class_matches = re.finditer(r'\bclass\s+([a-zA-Z_$][a-zA-Z0-9_$]*)', line)
        for m in class_matches:
            name = m.group(1)
            classes.append(name)
            type_info[name] = 'class'
            declarations.append(Declaration(
                name=name,
                line=line_num,
                scope='block',
                kind='class',
                hoisted=False,
                inferred_type='class'
            ))
    
    return CodeContext(
        variables=list(set(variables)),
        functions=list(set(functions)),
        classes=list(set(classes)),
        declarations=declarations,
        type_info=type_info
    )


def extract_identifiers_from_code(code: str) -> Set[str]:
    """Extract all identifiers used in a code snippet"""
    ident_pattern = r'\b[a-zA-Z_$][a-zA-Z0-9_$]*\b'
    identifiers = set(re.findall(ident_pattern, code))
    
    keywords = {
        'var', 'let', 'const', 'function', 'class', 'if', 'else', 'for', 'while',
        'do', 'switch', 'case', 'break', 'continue', 'return', 'throw', 'try',
        'catch', 'finally', 'new', 'this', 'super', 'typeof', 'instanceof',
        'in', 'of', 'void', 'delete', 'yield', 'await', 'async', 'static',
        'get', 'set', 'extends', 'import', 'export', 'default', 'from', 'as',
        'true', 'false', 'null', 'undefined', 'NaN', 'Infinity', 'debugger',
        'with', 'enum', 'implements', 'interface', 'package', 'private', 'protected',
        'public',
    }
    
    return identifiers - keywords


def analyze_code_pattern(code: str) -> Dict[str, Any]:
    """Analyze code pattern to understand what it's doing"""
    pattern_info = {
        'has_function_call': bool(re.search(r'[a-zA-Z_$][a-zA-Z0-9_$]*\s*\(', code)),
        'has_property_access': bool(re.search(r'[a-zA-Z_$][a-zA-Z0-9_$]*\.[a-zA-Z_$][a-zA-Z0-9_$]*', code)),
        'has_method_call': bool(re.search(r'[a-zA-Z_$][a-zA-Z0-9_$]*\.[a-zA-Z_$][a-zA-Z0-9_$]*\s*\(', code)),
        'called_functions': re.findall(r'([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(', code),
        'accessed_properties': re.findall(r'\.([a-zA-Z_$][a-zA-Z0-9_$]*)', code),
    }
    return pattern_info


# ============================================================================
# SEMANTIC-AWARE INSTANTIATION
# ============================================================================

def pick_identifier_semantic(
    context: CodeContext,
    line: int,
    use_builtins: bool = True,
    require_callable: bool = False
) -> str:
    """
    Pick an identifier that makes semantic sense.
    """
    available = context.get_available_at_line(line)
    
    if require_callable:
        # Need a function
        funcs = context.get_functions_at_line(line)
        if funcs:
            return random.choice(funcs)
        
        # Fallback to safe builtins that are callable
        if use_builtins:
            safe_callables = ['Object', 'Array', 'String', 'Number', 'Function', 'Error']
            return random.choice(safe_callables)
        
        return 'Object'
    
    # Prefer local variables
    local_vars = [v for v in context.variables if v in available]
    local_funcs = [f for f in context.functions if f in available]
    
    if local_funcs:
        return random.choice(local_funcs)
    
    if local_vars:
        return random.choice(local_vars)
    
    if use_builtins:
        safe_builtins = ['Object', 'Array', 'Math', 'console', 'JSON']
        return random.choice(safe_builtins)
    
    return 'Object'


def instantiate_line_semantic(
    line: str,
    context: CodeContext,
    target_line: int,
    use_builtins: bool = True
) -> str:
    """
    Instantiate placeholders with semantic awareness.
    Avoids creating code like obj.nonExistentMethod()
    """
    result = line
    
    # Analyze what the line is trying to do
    pattern = analyze_code_pattern(line)
    
    # Find placeholders
    placeholder_patterns = [
        r'<<[A-Z_]+>>',
        r'<[A-Z_]+>',
        r'\{\{[A-Z_]+\}\}',
    ]
    
    placeholders = []
    for pat in placeholder_patterns:
        placeholders.extend(re.findall(pat, result))
    
    if not placeholders:
        return result
    
    used_values = set()
    
    # Check if this is a function call pattern
    is_function_call = '(' in line and pattern['has_function_call']
    
    for ph in placeholders:
        # Extract placeholder name
        if '<<' in ph:
            inner = ph[2:-2]
        elif '{{' in ph:
            inner = ph[2:-2]
        else:
            inner = ph[1:-1]
        
        # Check context around placeholder
        ph_idx = result.find(ph)
        after_ph = result[ph_idx + len(ph):ph_idx + len(ph) + 2] if ph_idx + len(ph) < len(result) else ''
        
        # If followed by '(', we need a callable
        require_callable = after_ph.startswith('(')
        
        # Pick appropriate value
        if inner in ('VAR', 'IDENTIFIER', 'ID', 'IDENT'):
            if require_callable:
                value = pick_identifier_semantic(context, target_line, use_builtins, require_callable=True)
            else:
                value = pick_identifier_semantic(context, target_line, use_builtins, require_callable=False)
        
        elif inner in ('FUNC', 'FUNCTION'):
            value = pick_identifier_semantic(context, target_line, use_builtins, require_callable=True)
        
        elif inner in ('NUM', 'NUMBER', 'INT'):
            value = random.choice(['0', '1', '42', '100'])
        
        elif inner == 'ZERO':
            value = '0'
        
        elif inner == 'ONE':
            value = '1'
        
        elif inner in ('STR', 'STRING'):
            value = random.choice(['"test"', '"value"', '""'])
        
        elif inner == 'BOOL':
            value = random.choice(['true', 'false'])
        
        elif inner in ('PROP', 'PROPERTY', 'METHOD'):
            # Use safe methods that exist on most objects
            value = random.choice(list(SAFE_METHODS))
        
        else:
            value = pick_identifier_semantic(context, target_line, use_builtins)
        
        # Ensure variety
        attempts = 0
        while value in used_values and attempts < 5:
            if inner in ('NUM', 'NUMBER', 'INT'):
                value = str(random.randint(0, 1000))
            elif inner in ('PROP', 'PROPERTY', 'METHOD'):
                value = random.choice(list(SAFE_METHODS))
            else:
                value = pick_identifier_semantic(context, target_line, use_builtins)
            attempts += 1
        
        used_values.add(value)
        result = result.replace(ph, value, 1)
    
    return result


def instantiate_template_semantic(
    template_lines: List[str],
    context: CodeContext,
    target_line: int,
    use_builtins: bool = True
) -> List[str]:
    """Instantiate template with semantic awareness"""
    return [
        instantiate_line_semantic(line, context, target_line, use_builtins)
        for line in template_lines
    ]


# ============================================================================
# SEMANTIC VALIDATION
# ============================================================================

def has_obvious_semantic_error(code: str) -> Tuple[bool, str]:
    """
    Quick check for obvious semantic errors without executing.
    """
    # Check for obvious bad patterns
    
    # Pattern: variable.variable() where both are the same
    if re.search(r'([a-zA-Z_$][a-zA-Z0-9_$]*)\.\1\s*\(', code):
        return True, "Self-referential method call (e.g., err.err())"
    
    # Pattern: accessing properties on primitives in weird ways
    if re.search(r'(?:0x[0-9a-f]+|0b[01]+|\d+)\s*\.\s*[a-zA-Z_$]', code):
        return True, "Property access on numeric literal"
    
    # Pattern: multiple consecutive dots
    if '..' in code:
        return True, "Consecutive dots"
    
    return False, "OK"

def validate_with_execution(code: str, timeout: float = 5.0):
    """
    Validate JS code execution.
    Keep crashes and timeouts, filter syntax/type errors.
    Always returns a tuple (is_valid, message)
    """
    import tempfile, subprocess, os

    tmp_path = None
    try:
        with tempfile.NamedTemporaryFile("w", suffix=".js", delete=False) as f:
            f.write(code)
            tmp_path = f.name

        p = subprocess.run(
            [JS_ENGINE_PATH, tmp_path] + JS_ENGINE_CHECK_ARGS,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            timeout=timeout
        )

        ret = p.returncode  # <-- fixed typo
        stderr = p.stderr.decode("utf-8", errors="ignore")

        # normal execution
        if ret == 0:
            return True, "OK"

        # syntax/type errors
        if ret == 1 or ("SyntaxError" in stderr or "TypeError" in stderr):
            return False, f"Filtered error: {stderr.strip().splitlines()[0]}"

        # crash → keep
        if ret > 1:
            return True, f"Crashed with code {ret}"

        # fallback
        return True, f"Unknown return code {ret}"

    except subprocess.TimeoutExpired:
        return True, "Timeout"

    except Exception as e:
        return True, f"Exception (kept): {e}"

    finally:
        if tmp_path and os.path.exists(tmp_path):
            os.unlink(tmp_path)

def validate_syntax(code: str, method: str = 'v8') -> bool:
    """Validate JS syntax"""
    if method == 'treesitter':
        try:
            tree = js_parser.parse(code.encode())
            return not tree.root_node.has_error
        except:
            return False
    elif method == 'v8':
        # For v8, we use execution-based validation
        is_valid, _ = validate_with_execution(code)
        return is_valid
    return False


# ============================================================================
# TDZ-AWARE INSERTION (from v5)
# ============================================================================

def check_insertion_safe_tdz(
    code_lines: List[str],
    insert_line: int,
    new_code: str,
    context: CodeContext
) -> Tuple[bool, str]:
    """Check if insertion respects TDZ"""
    used_idents = extract_identifiers_from_code(new_code)
    available = context.get_available_at_line(insert_line)
    
    missing = []
    for ident in used_idents:
        if ident not in available:
            missing.append(ident)
    
    if missing:
        return False, f"TDZ: {missing}"
    
    return True, "OK"


def find_safe_insertion_after_dependencies(
    code: str,
    new_code_lines: List[str],
    context: CodeContext,
    min_line: int = 0
) -> List[int]:
    """Find insertion points respecting dependencies"""
    lines = code.split('\n')
    new_code = '\n'.join(new_code_lines)
    
    used_idents = extract_identifiers_from_code(new_code)
    
    min_safe_line = min_line
    for ident in used_idents:
        if ident in JS_BUILTINS:
            continue
        
        # Find declaration
        for decl in context.declarations:
            if decl.name == ident:
                if not decl.hoisted:
                    min_safe_line = max(min_safe_line, decl.line + 1)
                break
    
    safe_points = []
    for line_num in range(min_safe_line, len(lines)):
        line = lines[line_num].strip()
        
        if not line or line.startswith('//') or line == '}':
            continue
        
        is_safe, _ = check_insertion_safe_tdz(lines, line_num, new_code, context)
        if is_safe:
            safe_points.append(line_num)
    
    if not safe_points:
        safe_points.append(len(lines))
    
    return safe_points


def pick_insertion_point_smart(
    code: str,
    new_code_lines: List[str],
    context: CodeContext,
    strategy: str = 'random'
) -> Optional[int]:
    """Pick insertion point with TDZ awareness"""
    safe_points = find_safe_insertion_after_dependencies(code, new_code_lines, context)
    
    if not safe_points:
        return None
    
    if strategy == 'random':
        return random.choice(safe_points)
    elif strategy == 'after_declaration':
        # Prefer early in safe zone
        return min(safe_points) if safe_points else None
    elif strategy == 'end':
        return max(safe_points)
    
    return random.choice(safe_points)


# ============================================================================
# MUTATION APPLICATION
# ============================================================================

def apply_insert_mutation_semantic(
    code: str,
    template: Dict,
    context: CodeContext,
    strategy: str = 'random',
    use_builtins: bool = True,
    validate_execution: bool = True,
    debug: bool = False
) -> Tuple[Optional[str], str]:
    """Apply insert mutation with semantic awareness"""
    after = template.get('after', [])
    if not after:
        return None, "No 'after' field"
    
    lines = code.split('\n')
    
    # Instantiate template
    temp_inst = instantiate_template_semantic(after, context, 0, use_builtins)
    
    # Find safe insertion point
    insert_line = pick_insertion_point_smart(code, temp_inst, context, strategy)
    
    if insert_line is None:
        return None, "No safe insertion point"
    
    # Re-instantiate at actual line
    after_inst = instantiate_template_semantic(after, context, insert_line, use_builtins)
    
    # Check for obvious semantic errors
    new_code_str = '\n'.join(after_inst)
    has_error, error_msg = has_obvious_semantic_error(new_code_str)
    if has_error:
        return None, f"Semantic error: {error_msg}"
    
    # Get indentation
    if insert_line < len(lines):
        next_line = lines[insert_line]
        indent = len(next_line) - len(next_line.lstrip())
        indented = [' ' * indent + line for line in after_inst]
    else:
        indented = after_inst
    
    # Insert
    new_lines = lines[:insert_line] + indented + lines[insert_line:]
    mutated = '\n'.join(new_lines)
    
    # Validate with execution if requested
    if validate_execution:
        is_valid, exec_msg = validate_with_execution(mutated)
        if not is_valid:
            return None, f"Execution failed: {exec_msg}"
    
    return mutated, f"Inserted at line {insert_line}"


def apply_replace_mutation_semantic(
    code: str,
    template: Dict,
    context: CodeContext,
    use_builtins: bool = True,
    validate_execution: bool = True,
    debug: bool = False
) -> Tuple[Optional[str], str]:
    """Apply replace mutation with semantic awareness"""
    before = template.get('before', [])
    after = template.get('after', [])
    
    if not before or not after:
        return None, "Missing 'before' or 'after'"
    
    lines = code.split('\n')
    
    # Find matches
    matches = []
    before_str = '\n'.join(before)
    
    for i in range(len(lines) - len(before) + 1):
        segment = '\n'.join(lines[i:i+len(before)])
        if segment.strip() == before_str.strip():
            matches.append(i)
    
    if not matches:
        return None, "Pattern not found"
    
    # Try to find a safe match
    for match_line in matches:
        after_inst = instantiate_template_semantic(after, context, match_line, use_builtins)
        
        # Check semantic errors
        new_code_str = '\n'.join(after_inst)
        has_error, _ = has_obvious_semantic_error(new_code_str)
        if has_error:
            continue
        
        # Get indentation
        if match_line < len(lines):
            matched = lines[match_line]
            indent = len(matched) - len(matched.lstrip())
            indented = [' ' * indent + line for line in after_inst]
        else:
            indented = after_inst
        
        # Replace
        new_lines = (
            lines[:match_line] +
            indented +
            lines[match_line + len(before):]
        )
        mutated = '\n'.join(new_lines)
        
        # Validate execution
        if validate_execution:
            is_valid, _ = validate_with_execution(mutated)
            if not is_valid:
                continue
        
        return mutated, f"Replaced at line {match_line}"
    
    return None, "No semantically valid replacement found"


def apply_mutation_semantic(
    code: str,
    template: Dict,
    context: CodeContext,
    strategy: str = 'random',
    use_builtins: bool = True,
    validate_execution: bool = True,
    debug: bool = False
) -> Tuple[Optional[str], str]:
    """Apply mutation with full semantic awareness"""
    kind = template.get('kind', 'insert')
    
    if kind == 'insert':
        return apply_insert_mutation_semantic(
            code, template, context, strategy, use_builtins, validate_execution, debug
        )
    elif kind == 'replace':
        return apply_replace_mutation_semantic(
            code, template, context, use_builtins, validate_execution, debug
        )
    
    return None, f"Unknown kind: {kind}"


# ============================================================================
# BATCH APPLICATION
# ============================================================================

def apply_mutations_batch(
    code: str,
    templates: List[Dict],
    num_mutations: int = 10,
    strategy: str = 'random',
    filter_invalid: bool = True,
    use_builtins: bool = True,
    validation_method: str = 'v8',
    validate_execution: bool = True,
    verbose: bool = False
) -> Tuple[List[Dict], Dict[str, int]]:
    """Apply mutations with semantic validation"""
    
    context = extract_declarations(code)
    
    if verbose:
        print(f"  Context: {len(context.variables)} vars, {len(context.functions)} funcs")
        print(f"  Type info: {len(context.type_info)} types inferred")
    
    results = []
    attempts = 0
    max_attempts = num_mutations * 100  # More attempts for semantic validation
    
    stats = {
        'total_attempts': 0,
        'semantic_error': 0,
        'execution_failed': 0,
        'tdz_violation': 0,
        'pattern_not_found': 0,
        'success': 0,
    }
    
    sorted_templates = sorted(templates, key=lambda t: t.get('gain', 0), reverse=True)
    
    while len(results) < num_mutations and attempts < max_attempts:
        attempts += 1
        stats['total_attempts'] += 1
        
        template = random.choice(sorted_templates[:max(1, len(sorted_templates)//2)])
        
        mutated, debug_msg = apply_mutation_semantic(
            code, template, context, strategy, use_builtins, validate_execution, verbose
        )
        
        if mutated is None:
            if 'Semantic error' in debug_msg:
                stats['semantic_error'] += 1
            elif 'Execution failed' in debug_msg:
                stats['execution_failed'] += 1
            elif 'TDZ' in debug_msg:
                stats['tdz_violation'] += 1
            elif 'Pattern not found' in debug_msg:
                stats['pattern_not_found'] += 1
            
            if verbose and attempts % 100 == 0:
                print(f"  Attempt {attempts}: {debug_msg}")
            continue
        
        # Additional syntax validation if requested
        if filter_invalid and validation_method == 'treesitter':
            try:
                tree = js_parser.parse(mutated.encode())
                if tree.root_node.has_error:
                    continue
            except:
                continue
        
        stats['success'] += 1
        
        results.append({
            'mutated_code': mutated,
            'template': template,
            'valid': True,
            'gain': template.get('gain', 0.0),
            'kind': template.get('kind', 'insert'),
            'node_type': template.get('node_type', ''),
        })
        
        if verbose:
            print(f"   Mutation {len(results)}: {template.get('kind', 'insert')}")
    
    if verbose:
        print(f"\n  Stats:")
        for key, val in sorted(stats.items()):
            if val > 0:
                pct = 100 * val / stats['total_attempts']
                print(f"    {key}: {val} ({pct:.1f}%)")
    
    return results, stats


# ============================================================================
# CLI
# ============================================================================

def main():
    parser = argparse.ArgumentParser(
        description='Apply mutations with semantic validation'
    )
    parser.add_argument('--templates', required=True)
    parser.add_argument('--input', required=True)
    parser.add_argument('--output', required=True)
    parser.add_argument('--num-mutations', type=int, default=10)
    parser.add_argument('--strategy', 
                       choices=['random', 'before_return', 'after_declaration', 'end'],
                       default='random')
    parser.add_argument('--filter-invalid', action='store_true', default=True)
    parser.add_argument('--no-filter-invalid', dest='filter_invalid', action='store_false')
    parser.add_argument('--no-builtins', action='store_true')
    parser.add_argument('--min-gain', type=float, default=0.0)
    parser.add_argument('--validation', choices=['treesitter', 'v8'], default='v8')
    parser.add_argument('--no-execution-check', action='store_true', default=False,
                       help='Skip execution validation (faster but less safe)')
    parser.add_argument('--verbose', action='store_true')
    
    args = parser.parse_args()
    
    print(f"[+] Loading templates from {args.templates}")
    try:
        with open(args.templates) as f:
            templates = json.load(f)
    except Exception as e:
        print(f"[!] Error: {e}")
        return
    
    templates = [t for t in templates if t.get('gain', 0) >= args.min_gain]
    print(f"[+] Using {len(templates)} templates")
    
    if not templates:
        print("[!] No templates!")
        return
    
    input_path = Path(args.input)
    files = [input_path] if input_path.is_file() else list(input_path.rglob('*.js'))
    
    print(f"[+] Processing {len(files)} files")
    print(f"[+] Validation: {args.validation}, Execution check: {not args.no_execution_check}")
    
    output_dir = Path(args.output)
    output_dir.mkdir(parents=True, exist_ok=True)
    
    total = 0
    valid = 0
    
    for file_idx, file_path in enumerate(files):
        if args.verbose or len(files) < 10:
            print(f"\n[{file_idx+1}/{len(files)}] {file_path.name}")
        
        try:
            code = file_path.read_text(errors='ignore')
        except Exception as e:
            print(f"  [!] Error: {e}")
            continue
        
        mutations, stats = apply_mutations_batch(
            code,
            templates,
            num_mutations=args.num_mutations,
            strategy=args.strategy,
            filter_invalid=args.filter_invalid,
            use_builtins=not args.no_builtins,
            validation_method=args.validation,
            validate_execution=not args.no_execution_check,
            verbose=args.verbose
        )
        
        print(f"  Generated {len(mutations)} valid mutations")
        
        if not mutations:
            continue
        
        file_out_dir = output_dir / file_path.stem
        file_out_dir.mkdir(exist_ok=True)
        
        for i, mut in enumerate(mutations):
            out_path = file_out_dir / f"{file_path.stem}_mut_{i:03d}.js"
            out_path.write_text(mut['mutated_code'])
            total += 1
            valid += 1
        
        metadata = [
            {
                'index': i,
                'filename': f"{file_path.stem}_mut_{i:03d}.js",
                'valid': True,
                'gain': m['gain'],
                'kind': m['kind'],
                'node_type': m['node_type'],
            }
            for i, m in enumerate(mutations)
        ]
        
        (file_out_dir / 'metadata.json').write_text(json.dumps(metadata, indent=2))
    
    print(f"\n[] Done! Generated {total} semantically valid mutations")
    print(f"  Output: {output_dir}")


if __name__ == '__main__':
    main() 