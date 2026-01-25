#!/usr/bin/env python3
"""
dynamic_feature_extractor.py
────────────────────────────
A thin wrapper around V8 (d8) that executes a JS PoC under the right
logging flags, parses the emitted log and returns *dynamic* features.

It now also exposes:
  • process_poc_folder(pocs_dir, output_csv, crash=0)
  • process_poc(single_poc, return_format="dict")

so that you can batch-extract features or call it programmatically.
"""

import csv
import json
import os
import pathlib
import random
import re
import subprocess
import sys
import time as timer
from typing import Dict, Iterable, List, Tuple, Union, Optional
import argparse
import pandas as pd
from collections import defaultdict
# ----------------------------------------------------------------------
# (1)  >>>  All your existing regexes / helpers / parsers  <<<
# ----------------------------------------------------------------------

import dynamic_maps as map        # your own module
import dynamic_ic as ic           # your own module


RX = {
    "elem_tx":      re.compile(r"Elements transition"),
    "proto_inv":    re.compile(r"Prototype invalidated"),
    "gc_minor":     re.compile(r" Scavenge "),
    "gc_major":     re.compile(r"\bMark-(Sweep|Compact)\b"),
    "opt_attempt":  re.compile(r"\[compiling method "),
    "opt_success":  re.compile(r"\[completed compiling "),
    "opt_marked":   re.compile(r"\[marking .* for optimization"),
    "deopt_all":    re.compile(r"deoptimizing "),
    "deopt_reason": re.compile(r"reason:\s*([A-Za-z_]+)"),
}
RAW_HEADER = """filename,exit_code,execution_time_ms,peak_memory_mb,crash_signal,error,uniq_map_create,uniq_map_trans,uniq_ic_states,uniq_elem_kind,proto_invalidated,gc_minor,gc_major,opt_attempts,opt_success,opt_marked,deopt_all,deopt_unique_reasons,deopt_ratio,log_kb,map_create_count,bucket_string_count,elem_kind_holey,instance_size_max,back_pointer_is_null,non_extensible_flag,bucket_misc_count,bucket_collection_count,bucket_array_count,bucket_weak_count,bucket_handler_count,bucket_dictionary_count,bucket_code_count,elem_kind_shared,elem_kind_slow,bucket_context_count,elem_kind_typed,elem_kind_misc,elem_kind_double,elem_kind_args,unique_map_types,max_descriptor_array_size,uses_transition_array,stable_map_flag,has_cycle_in_back_ptrs,is_code_type,is_feedback_vector,is_cons_or_thin_string,is_external_string,is_symbol_type,is_instruction_stream,total_ic_count,load_ic_count,store_ic_count,megamorphic_ics,polymorphic_ics,monomorphic_ics,prototype_failure_ics,ic_state_transitions,ic_slow_stub_count,polymorphic_in_optimized_func_count,ic_triggered_deopts,issue_report_date,target"""
HEADER = RAW_HEADER.strip().split(",")
def parse_v8_log(log_output: str) -> Dict[str, Union[int, float]]:
    """Extract dynamic counts from the V8 tracing output."""
    import hashlib

    def _h(line: str) -> bytes:
        return hashlib.blake2s(line.encode(), digest_size=3).digest()

    uniq = {
        k: set()
        for k in (
            "map_create",
            "map_trans",
            "ic",
            "elem_tx",
            "proto_inv",
            "bb",
            "deopt_reason",
        )
    }
    cnt = {
        k: 0
        for k in (
            "gc_minor",
            "gc_major",
            "opt_attempt",
            "opt_success",
            "opt_marked",
            "deopt_all",
        )
    }

    for line in log_output.splitlines():
        if RX["elem_tx"].search(line):
            uniq["elem_tx"].add(_h(line))
        elif RX["proto_inv"].search(line):
            uniq["proto_inv"].add(1)
        elif RX["gc_minor"].search(line):
            cnt["gc_minor"] += 1
        elif RX["gc_major"].search(line):
            cnt["gc_major"] += 1
        elif RX["opt_attempt"].search(line):
            cnt["opt_attempt"] += 1
        elif RX["opt_success"].search(line):
            cnt["opt_success"] += 1
        elif RX["opt_marked"].search(line):
            cnt["opt_marked"] += 1
        elif RX["deopt_all"].search(line):
            cnt["deopt_all"] += 1
            m = RX["deopt_reason"].search(line)
            if m:
                uniq["deopt_reason"].add(m.group(1))

    deopt_ratio = (
        cnt["deopt_all"] / cnt["opt_success"] if cnt["opt_success"] else 0.0
    )

    v8_feats = {
        "uniq_map_create": len(uniq["map_create"]),
        "uniq_map_trans": len(uniq["map_trans"]),
        "uniq_ic_states": len(uniq["ic"]),
        "uniq_elem_kind": len(uniq["elem_tx"]),
        "proto_invalidated": int(bool(uniq["proto_inv"])),
        "gc_minor": cnt["gc_minor"],
        "gc_major": cnt["gc_major"],
        "opt_attempts": cnt["opt_attempt"],
        "opt_success": cnt["opt_success"],
        "opt_marked": cnt["opt_marked"],
        "deopt_all": cnt["deopt_all"],
        "deopt_unique_reasons": len(uniq["deopt_reason"]),
        "deopt_ratio": round(deopt_ratio, 3),
        "log_kb": len(log_output) // 1024,
    }

    # merge map + ic feature extractors
    v8_feats.update(map.extract_features(log_output))
    v8_feats.update(ic.extract_ic_features(log_output.splitlines()))
    return v8_feats


# ----------------------------------------------------------------------
# (2)  >>>  single-file runner (factor-out of previous `main`)  <<<
# ----------------------------------------------------------------------
def run_single_poc(js_file: str, flags: List[str], v8_path: str = "/home/kgangul/DataCentricFuzzJS/v8/out/fuzzbuild/d8", timeout_sec: float = 1) -> Dict[str, Union[int, float, str]]:
    import signal

    features: Dict[str, Union[int, float, str]] = {
        "filename": pathlib.Path(js_file).name,
        "exit_code": -1,
        "execution_time_ms": 0,
        "peak_memory_mb": 0.0,
        "crash_signal": "",
        "error": "",
    }
    
    script_dir = pathlib.Path(__file__).parent.resolve()
    #asserts_stub = script_dir / "asserts_stub.js"
    #if not asserts_stub.exists():
    #    features["error"] = "asserts_stub.js not found"
    #    return features
    if flags:
        cmd = [
            v8_path,
            *flags,
            #"../v8/v8/test/webkit/resources/standalone-pre.js",
            #"../v8/v8/test/webkit/resources/standalone-post.js",
            #"../v8/v8/test/webkit/resources/JSON-stringify.js",
            #"../v8/v8/test/webkit/resources/json2-es5-compat.js",
            #"../v8/v8/test/wasm-js/third_party/testharness.js",
            #"../v8/v8/test/wasm-js/testharness-additions.js",
            #"v8/test/mjsunit/mjsunit.js",
            "--log-maps",
            "--log-ic",
            "--trace-gc",
            "--trace-opt",
            "--trace-deopt",
            "--logfile=-",
            #"v8-test-suites/v8-12.31.2023/test/mjsunit/mjsunit.js",
            #"../v8/v8/test/wasm-js/third_party/testharness.js",
            #"./v8/v8/test/wasm-js/testharness-additions.js",
            js_file,
        ]
    else:
        cmd = [
            v8_path,
            #"../v8/v8/test/webkit/resources/standalone-pre.js",
            #"../v8/v8/test/webkit/resources/standalone-post.js",
            #"../v8/v8/test/webkit/resources/JSON-stringify.js",
            #"../v8/v8/test/webkit/resources/json2-es5-compat.js",
            #"../v8/v8/test/wasm-js/third_party/testharness.js",
            #"../v8/v8/test/wasm-js/testharness-additions.js",
            #"folds/fold_3/tmp/mjsunit/mjsunit.js",
            "--log-maps",
            "--log-ic",
            "--trace-gc",
            "--trace-opt",
            "--trace-deopt",
            "--logfile=-",
            #"v8-test-suites/v8-12.31.2023/test/mjsunit/mjsunit.js",
            #"../v8/v8/test/wasm-js/third_party/testharness.js",
            #"./v8/v8/test/wasm-js/testharness-additions.js",
            js_file,
        ]
    try:
        start = timer.perf_counter()
        proc = subprocess.Popen(
            cmd,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            preexec_fn=os.setsid  # to allow killing all children
        )

        try:
            stdout, stderr = proc.communicate(timeout=timeout_sec)
        except subprocess.TimeoutExpired:
            os.killpg(proc.pid, signal.SIGKILL)
            stdout, stderr = proc.communicate()
            features.update({
                "error": "TIMEOUT",
                "exit_code": -99,
                "crash_signal": "TIMEOUT",
            })

        end = timer.perf_counter()
        features["execution_time_ms"] = int((end - start) * 1000)

        if features["exit_code"] == -1:  # not set in timeout block
            features["exit_code"] = proc.returncode

        if proc.returncode and proc.returncode < 0:
            features["crash_signal"] = {
                -5: "SIGTRAP",
                -6: "SIGABRT",
                -11: "SIGSEGV",
            }.get(proc.returncode, f"SIG{abs(proc.returncode)}")

        # Extract peak memory if available
        mm = re.search(r"Maximum resident set size \(kbytes\):\s*(\d+)", stderr)
        if mm:
            features["peak_memory_mb"] = round(int(mm.group(1)) / 1024, 2)

        # Always try parsing logs, even if timeout/crash
        if stdout:
            if len(stdout) > 5_000_000:
                stdout = stdout[:5_000_000]  # truncate if massive
            features.update(parse_v8_log(stdout))

    except Exception as e:
        features["error"] = f"EXCEPTION: {e}"

    return features


# ----------------------------------------------------------------------
# (3)  >>>  NEW API – helpers for batch work  <<<
# ----------------------------------------------------------------------

def process_poc(poc_path: str, extra_flags: Optional[List[str]] = None, return_format: str = "dict") -> Union[Dict[str, object], str]:
    """
    Execute one PoC and return the dynamic feature set.
    return_format:
        • "dict"   → raw dictionary
        • "string" → key=value comma-separated string  (easy to grep)
    """
    if not os.path.isfile(poc_path):
        raise FileNotFoundError(poc_path)
    
    feats = run_single_poc(poc_path,extra_flags)
    return ",".join(f"{k}={v}" for k, v in feats.items()) if return_format == "string" else feats


def process_poc_folder(pocs_folder_path: str,
                       output_csv_path: str,
                       crash: int = 0,
                       sample_cap: Optional[int] = None,
                       mapping_csv: Optional[str] = None,
                       extra_flags: Optional[List[str]] = None) -> None:
    """
    Walk `pocs_folder_path`, run each *.js PoC listed in mapping CSV, save CSV.
    """
    mapping = pd.read_csv(mapping_csv) if mapping_csv else None
    poc_set = set(mapping["poc_filename"]) if mapping is not None else None
    
    all_files = [
        fn for fn in os.listdir(pocs_folder_path)
        if fn.endswith(".js")
        and not (crash == 0 and ("regress" in fn.lower() or "bug" in fn.lower()))
        and (poc_set is None or fn in poc_set)
    ]
    
    if not all_files:
        print("- no JS files found.", file=sys.stderr)
        return

    if sample_cap and len(all_files) > sample_cap:
        all_files = random.sample(all_files, sample_cap)

    print(f"▶ processing {len(all_files)} JS files …")


    with open(output_csv_path, "w", newline="", encoding="utf-8") as csv_fh:
        writer = csv.DictWriter(csv_fh, fieldnames=HEADER)
        writer.writeheader()

        for fn in all_files:
            fpath = os.path.join(pocs_folder_path, fn)
            if mapping is not None:
                row = mapping[mapping["poc_filename"] == fn]
                if row.empty:
                    continue
                v8_version = row.iloc[0]["v8_version_tested"]
                issue_date = row.iloc[0]["issue_report_date"]
                flags = row.iloc[0]["flags_used"]
                flags_list = flags.split() if isinstance(flags, str) else []
            else:
                v8_version = "v8"  # fallback
                issue_date = ""
                flags_list = []

            final_flags = flags_list + (extra_flags or [])
            v8_path = os.path.expanduser(f"~/.jsvu/bin/v8-{v8_version}")

            feats = run_single_poc(fpath,final_flags,v8_path )
            feats["filename"] = fn
            feats["target"] = crash
            feats["issue_report_date"] = issue_date

            full_row = {k: feats.get(k, 0) for k in HEADER}
            writer.writerow(full_row)

    print("✅ CSV saved →", output_csv_path)


# ----------------------------------------------------------------------
# (4)  >>>  original single-file CLI behaviour (kept)  <<<
# ----------------------------------------------------------------------

def _usage() -> None:
    print(f"Usage: {sys.argv[0]} <poc.js> | --batch <dir> <out.csv>", file=sys.stderr)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Extract dynamic features from V8 PoCs.")
    parser.add_argument("jsfile_or_folder", help="A .js file or folder of PoCs")
    parser.add_argument("--batch", action="store_true", help="Process a folder instead of a single file")
    parser.add_argument("--output", help="Output CSV (used with --batch)")
    parser.add_argument("--mapping", help="Mapping CSV with poc_filename,v8_version_tested,flags_used,issue_report_date")
    parser.add_argument("--extra-flags", nargs="*", default=[], help="Additional flags to pass to V8")
    parser.add_argument("--crash", type=int, default=0, help="Label as crash (1) or non-crash (0)")
    args = parser.parse_args()

    if args.batch:
        if not args.output:
            print("❌ Must provide --output when using --batch", file=sys.stderr)
            sys.exit(1)
        process_poc_folder(
            args.jsfile_or_folder,
            output_csv_path=args.output,
            crash=args.crash,
            mapping_csv=args.mapping,
            extra_flags=args.extra_flags
        )
    else:
        print(json.dumps(
            run_single_poc(
                args.jsfile_or_folder,
                v8_path=os.path.expanduser("~/.jsvu/bin/v8-latest"),  # fallback path
                flags=args.extra_flags,
            ),
            separators=(",", ":")
        ))
