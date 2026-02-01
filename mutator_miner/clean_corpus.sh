#!/bin/bash

ENGINE="../v8/out/fuzzbuild/d8"
FLAGS="--allow-natives-syntax --expose-gc"
CORPUS_DIR="corpus"
TIMEOUT=1

for f in "$CORPUS_DIR"/*.js; do
  echo "Checking: $f"

  timeout ${TIMEOUT}s $ENGINE $FLAGS "$f" > /dev/null 2>&1
  RET=$?

  case $RET in
    0)
      echo "✅ OK: $f"
      ;;
    124)
      echo "⏱️ Timeout (kept): $f"
      rm -f "$f"
      ;;
    1)
      echo "❌ Removing (syntax/type error): $f"
      rm -f "$f"
      ;;
    *)
      echo "💥 Crash or other error (kept, exit=$RET): $f"
      ;;
  esac

done

echo "Done cleaning corpus."