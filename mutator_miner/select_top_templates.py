#!/usr/bin/env python3
"""
select_top_templates.py

Take the ranked JSON from rank_mutators_v2.py and produce a clean top-N
file in the original learned_mutators_gumtree.json structure.

Applies two constraints:
  1. Kind distribution quota  — e.g. 60% insert, 40% replace
     (avoids the ranked list being dominated by whichever kind happened to
      score highest globally)
  2. Per-node-type caps       — e.g. try_statement capped at 10% of total
     (prevents a single pattern like try-catch flooding the top slots)

Selection algorithm:
  Walk templates in rank order (best first).
  Accept a template only if:
    - Its kind still has quota remaining
    - Its node_type is below its cap
  Continue until N accepted or list exhausted.

Usage:
    python3 select_top_templates.py \\
        --ranked  ranked_temps.json \\
        --output  top500_mutators.json \\
        --n       500 \\
        --insert-pct  60 \\
        --replace-pct 40 \\
        --node-cap    try_statement=10 catch_clause=5 finally_clause=5

    # All percentages are % of total N.
    # --insert-pct + --replace-pct must sum to 100.
    # --node-cap accepts multiple key=value pairs.
"""

import json
import argparse
import sys
from pathlib import Path
from collections import defaultdict
from typing import Dict, List, Optional

# Fields that exist in ranked JSON but NOT in learned_mutators_gumtree.json
RANKED_ONLY_FIELDS = {"rank", "evaluation"}

# Node types that belong to the try-catch family — capped as a GROUP
TRY_CATCH_FAMILY = {
    "try_statement", "catch_clause", "finally_clause",
    "try_expression", "catch_block",
}
TRY_CATCH_GROUP_CAP_PCT = 5.0   # % of N — e.g. 5% of 500 = 25 total across ALL try-catch types

# Node types known to flood rankings — default caps as % of N
DEFAULT_NODE_CAPS_PCT: Dict[str, float] = {
    "if_statement":    15.0,
    "parenthesized_expression": 5.0,
    "arguments":        5.0,
    "call_expression":  5.0,
    "assignment_expression": 5.0,
    "member_expression": 3.0,
}


import re

# Patterns that indicate an infinite loop condition
_INFINITE_WHILE = re.compile(r'while\s*\(\s*(?:true|1|<ONE>)\s*\)')
_HAS_EXIT       = re.compile(r'\b(?:break|return|throw)\b')


def fix_while_true(template: Dict) -> Dict:
    """
    If a template's 'after' contains while(true) / while(1) with no
    break/return/throw inside the body, rewrite the condition to a
    bounded counter so it doesn't hang d8.

    Rewrite:  while (true) { <body> }
          →   for (let <VAR> = <ZERO>; <VAR> < <NUM>; <VAR>++) { <body> }

    If the body is empty or trivially just a single placeholder, reject
    the template entirely (return None) — it's useless even fixed.
    """
    after_text = '\n'.join(template.get('after', []))

    if not _INFINITE_WHILE.search(after_text):
        return template   # nothing to fix

    if _HAS_EXIT.search(after_text):
        return template   # already has an exit — fine as-is

    # Extract body content between the outermost braces after while(true)
    # Simple heuristic: everything between first { and last }
    body_match = re.search(r'\{(.*)\}', after_text, re.DOTALL)
    body = body_match.group(1).strip() if body_match else ''

    # Reject if body is empty or trivially a single token
    body_tokens = re.findall(r'<\w+>|\b\w+\b|[{}();=+\-*/<>!&|]', body)
    if len(body_tokens) < 3:
        return None   # useless even as a bounded loop

    # Rewrite: replace while(true) with a for-loop counter
    fixed = _INFINITE_WHILE.sub(
        'for (let <VAR> = <ZERO>; <VAR> < <NUM>; <VAR>++)',
        after_text
    )

    result = dict(template)
    result['after'] = fixed.split('\n')
    return result



def strip_ranked_fields(template: Dict) -> Dict:
    """Return template with only the learned_mutators_gumtree.json fields."""
    return {k: v for k, v in template.items() if k not in RANKED_ONLY_FIELDS}


def parse_node_caps(cap_args: List[str], n: int) -> Dict[str, int]:
    """
    Parse ['try_statement=10', 'catch_clause=5'] as percentages → absolute counts.
    Falls back to DEFAULT_NODE_CAPS_PCT for node types not explicitly specified.
    """
    caps: Dict[str, int] = {}
    explicit: Dict[str, float] = {}

    for item in (cap_args or []):
        if "=" not in item:
            print(f"[!] Ignoring malformed --node-cap entry: {item!r} (expected key=pct)")
            continue
        key, val = item.split("=", 1)
        try:
            explicit[key.strip()] = float(val.strip())
        except ValueError:
            print(f"[!] Non-numeric pct in --node-cap: {item!r}")

    # Merge defaults (explicit values override defaults)
    merged = dict(DEFAULT_NODE_CAPS_PCT)
    merged.update(explicit)

    for node_type, pct in merged.items():
        caps[node_type] = max(1, int(round(n * pct / 100)))

    return caps


def select_top(
    ranked: List[Dict],
    n: int,
    insert_pct: float,
    replace_pct: float,
    node_caps: Dict[str, int],
    verbose: bool = False,
) -> List[Dict]:
    """
    Walk ranked list (best-first) and greedily select up to n templates
    respecting kind quotas, node-type caps, and group caps.
    """
    # Quotas (absolute counts)
    quotas: Dict[str, int] = {
        "insert":  max(1, int(round(n * insert_pct  / 100))),
        "replace": max(1, int(round(n * replace_pct / 100))),
    }
    try_catch_group_cap = max(1, int(round(n * TRY_CATCH_GROUP_CAP_PCT / 100)))

    kind_counts:       Dict[str, int] = defaultdict(int)
    node_type_counts:  Dict[str, int] = defaultdict(int)
    try_catch_count = 0

    selected: List[Dict] = []
    skipped_kind  = 0
    skipped_node  = 0
    skipped_group = 0
    fixed_while   = 0

    for template in ranked:
        if len(selected) >= n:
            break

        kind      = template.get("kind", "")
        node_type = template.get("node_type", "unknown")

        # Kind quota check
        quota = quotas.get(kind)
        if quota is not None and kind_counts[kind] >= quota:
            skipped_kind += 1
            continue

        # Try-catch GROUP cap — counts all family members together
        if node_type in TRY_CATCH_FAMILY:
            if try_catch_count >= try_catch_group_cap:
                skipped_group += 1
                continue

        # Per-node-type cap check
        cap = node_caps.get(node_type)
        if cap is not None and node_type_counts[node_type] >= cap:
            skipped_node += 1
            continue

        # while(true) fix
        fixed = fix_while_true(template)
        if fixed is None:
            skipped_node += 1
            continue
        if fixed['after'] != template.get('after', []):
            fixed_while += 1
        template = fixed

        selected.append(strip_ranked_fields(template))
        kind_counts[kind]           += 1
        node_type_counts[node_type] += 1
        if node_type in TRY_CATCH_FAMILY:
            try_catch_count += 1

    if verbose:
        print(f"\n  Kind distribution in selection:")
        for k, cnt in sorted(kind_counts.items()):
            quota = quotas.get(k, "no quota")
            print(f"    {k:<12} {cnt:>5}  (quota={quota})")
        print(f"\n  Top node types:")
        for nt, cnt in sorted(node_type_counts.items(), key=lambda x: -x[1])[:15]:
            cap = node_caps.get(nt, "no cap")
            print(f"    {nt:<40} {cnt:>5}  (cap={cap})")
        print(f"\n  Try-catch family total: {try_catch_count} (group cap={try_catch_group_cap})")
        print(f"  Skipped: {skipped_kind} over-kind-quota, {skipped_node} over-node-cap, {skipped_group} over-try-catch-group-cap")
        print(f"  Fixed:   {fixed_while} while(true) → bounded for-loop")

    return selected


def main():
    ap = argparse.ArgumentParser(
        description="Select top-N templates from ranked JSON with distribution constraints"
    )
    ap.add_argument("--ranked",       required=True,
                    help="Ranked JSON from rank_mutators_v2.py")
    ap.add_argument("--output",       required=True,
                    help="Output JSON in learned_mutators_gumtree.json structure")
    ap.add_argument("--n",            type=int, default=500,
                    help="Number of templates to select (default 500)")
    ap.add_argument("--insert-pct",   type=float, default=60.0,
                    help="Percent of N to allocate to 'insert' templates (default 60)")
    ap.add_argument("--replace-pct",  type=float, default=40.0,
                    help="Percent of N to allocate to 'replace' templates (default 40)")
    ap.add_argument("--node-cap",     nargs="*", default=[],
                    metavar="NODE=PCT",
                    help="Per-node-type cap as %% of N. E.g. try_statement=8 if_statement=15. "
                         "Defaults: try_statement=8, catch_clause=4, finally_clause=3, if_statement=15")
    ap.add_argument("--verbose",      action="store_true")
    args = ap.parse_args()

    # Validate percentages
    total_pct = args.insert_pct + args.replace_pct
    if abs(total_pct - 100.0) > 0.1:
        print(f"[!] --insert-pct ({args.insert_pct}) + --replace-pct ({args.replace_pct}) "
              f"= {total_pct:.1f}, must sum to 100. Adjusting replace-pct.")
        args.replace_pct = 100.0 - args.insert_pct

    # Load ranked JSON
    ranked_path = Path(args.ranked)
    if not ranked_path.exists():
        print(f"[!] Ranked file not found: {ranked_path}")
        sys.exit(1)

    with open(ranked_path) as f:
        ranked = json.load(f)

    print(f"[+] Loaded {len(ranked)} ranked templates from {ranked_path}")

    # Inventory before selection
    kind_inventory: Dict[str, int] = defaultdict(int)
    node_inventory: Dict[str, int] = defaultdict(int)
    for t in ranked:
        kind_inventory[t.get("kind", "?")]           += 1
        node_inventory[t.get("node_type", "unknown")] += 1

    print(f"\n[+] Input distribution:")
    for k, cnt in sorted(kind_inventory.items()):
        print(f"    kind={k:<12} {cnt:>6}")
    print(f"\n[+] Top 10 node types in input:")
    for nt, cnt in sorted(node_inventory.items(), key=lambda x: -x[1])[:10]:
        print(f"    {nt:<40} {cnt:>6}")

    # Build node caps
    node_caps = parse_node_caps(args.node_cap, args.n)
    print(f"\n[+] Effective node-type caps (absolute counts for N={args.n}):")
    for nt, cap in sorted(node_caps.items()):
        print(f"    {nt:<40} <= {cap}")

    print(f"\n[+] Kind quotas: insert={int(round(args.n*args.insert_pct/100))} "
          f"replace={int(round(args.n*args.replace_pct/100))}")

    # Select
    selected = select_top(
        ranked=ranked,
        n=args.n,
        insert_pct=args.insert_pct,
        replace_pct=args.replace_pct,
        node_caps=node_caps,
        verbose=args.verbose,
    )

    print(f"\n[+] Selected {len(selected)} templates")

    if len(selected) < args.n:
        print(f"[!] WARNING: only {len(selected)}/{args.n} slots filled.")
        print(f"    Possible causes:")
        print(f"    - Not enough 'replace' templates in ranked list (try --replace-pct 30)")
        print(f"    - Node caps too tight (loosen with --node-cap try_statement=15)")
        print(f"    - Ranked list too short ({len(ranked)} templates total)")

    # Write output — learned_mutators_gumtree.json structure (no rank/evaluation)
    output_path = Path(args.output)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with open(output_path, "w") as f:
        json.dump(selected, f, indent=2)

    print(f"[+] Wrote {len(selected)} templates -> {output_path}")

    # Final summary
    final_kind:      Dict[str, int] = defaultdict(int)
    final_node_type: Dict[str, int] = defaultdict(int)
    for t in selected:
        final_kind[t.get("kind", "?")]            += 1
        final_node_type[t.get("node_type", "?")] += 1

    print(f"\n[+] Final kind distribution:")
    for k, cnt in sorted(final_kind.items()):
        pct = 100 * cnt / len(selected) if selected else 0
        print(f"    {k:<12} {cnt:>5}  ({pct:.1f}%)")

    print(f"\n[+] Top 10 node types in output:")
    for nt, cnt in sorted(final_node_type.items(), key=lambda x: -x[1])[:10]:
        print(f"    {nt:<40} {cnt:>5}")

    # Verify structure matches learned_mutators_gumtree.json
    expected_keys = {"kind", "scope", "before", "after", "node_type", "gain"}
    bad = [i for i, t in enumerate(selected) if not expected_keys.issubset(t.keys())]
    if bad:
        print(f"\n[!] {len(bad)} templates missing expected keys — check input ranked JSON")
    else:
        print(f"\n[+] Structure verified: all templates have required fields")


if __name__ == "__main__":
    main()