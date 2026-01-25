#!/bin/bash

ENGINE="../v8/out/fuzzbuild/d8"
FLAGS="--allow-natives-syntax --expose-gc"
CORPUS_DIR="corpus"
TIMEOUT=3

for f in "$CORPUS_DIR"/*.js; do
  echo "Checking: $f"

  timeout ${TIMEOUT}s $ENGINE $FLAGS "$f" > /dev/null 2>&1
  RET=$?

  # 124 = timeout (keep it)
  if [ $RET -eq 124 ]; then
    echo "⏱️ Timeout (kept): $f"
    continue
  fi

  # 0 = normal
  if [ $RET -eq 0 ]; then
    echo "✅ OK"
    continue
  fi

  # everything else = remove
  echo "❌ Removing (exit=$RET): $f"
  rm -f "$f"

done

echo "Done cleaning corpus."
