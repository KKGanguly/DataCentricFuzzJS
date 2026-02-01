ls test_fuzzil/*.js | parallel --eta -j4 '
  f={}
  out_file="corpus_pocs_2/$(basename {} .js).fzil"
  if [ -f "$out_file" ]; then
    echo "[Skipping] $(basename "$f") (already compiled)"
  else
    echo "[Compiling] $(basename "$f")"
    timeout 15s .build/release/FuzzILTool --compile "$f" || echo "    ❌ Timeout or error on $(basename "$f")"
  fi
'
