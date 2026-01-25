# feature_cli.py

import argparse
import json
from pathlib import Path
import sys
from feature_extractor_v4 import process_poc, process_poc_folder
import dynamic_feature_extractor_v2 as dynamic_extractor

def main():
    parser = argparse.ArgumentParser(description="JavaScript PoC Feature Extractor CLI")
    subparsers = parser.add_subparsers(dest="command", required=True)

    # --- Command: folder ---
    folder_parser = subparsers.add_parser("folder", help="Extract features from all JS files in a folder")
    folder_parser.add_argument("-i", "--input-folder", required=True, help="Folder containing JS files")
    folder_parser.add_argument("-o", "--output-csv", required=True, help="CSV output file")
    folder_parser.add_argument("--crash", type=int, choices=[0, 1], default=0, help="Crash label (0 or 1)")

    # --- Command: file ---
    file_parser = subparsers.add_parser("file", help="Extract features from a single JS file")
    file_parser.add_argument("-i", "--input", required=True, help="Path to JS PoC file")
    file_parser.add_argument("--format", choices=["dict", "string", "json"], default="string", help="Output format")
    file_parser.add_argument("--flags", type=str, default="", help="Optional flags as a string")
    file_parser.add_argument("--static", type=str, default=0, help="1 is static only, 0 is dynamic only, omit for both")
    args = parser.parse_args()

    if args.command == "folder":
        process_poc_folder(args.input_folder, args.output_csv, args.crash)
        dynamic_extractor.process_poc_folder(
            args.input_folder, args.output_csv, args.crash)
    elif args.command == "file":
        flags = args.flags.split() if args.flags else []

        merged_feats = {}

        if args.static == "1":
            feats_static = process_poc(args.input, return_format="dict")
            merged_feats = feats_static
        elif args.static == "0":
            feats_dynamic = dynamic_extractor.process_poc(args.input, flags, return_format="dict")
            
            feats_dynamic.pop("filename", None)
            merged_feats = feats_dynamic
        else:
            feats_static = process_poc(args.input, return_format="dict")
            feats_dynamic = dynamic_extractor.process_poc(args.input, flags, return_format="dict")
            feats_dynamic.pop("filename", None)
            merged_feats = {**feats_static, **feats_dynamic}

        if args.format == "dict":
            print(json.dumps(merged_feats, indent=2, ensure_ascii=False))

        elif args.format == "json":
            dump = json.dumps(merged_feats, separators=(",", ":"))
            tmp_path = Path("/tmp/feature_dump.json")
            tmp_path.write_text(dump, encoding="utf-8")
            print(dump)

        else:  # string format
            # Flatten to comma-separated format
            feat_str = ",".join(f"{k}={v}" for k, v in merged_feats.items())
            print(feat_str)

    else:
        parser.print_help()
        sys.exit(1)

if __name__ == "__main__":
    main()
