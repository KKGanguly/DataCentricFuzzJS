#!/bin/bash
set -e

echo "[+] Installing dependencies with Python 3.13"

python3 -m pip install --upgrade pip

# Pin compatible versions
python3 -m pip install \
  tree_sitter==0.20.1 \
  tree_sitter_languages \
  requests \
  numpy \
  pandas \
  flask \
  shap \
  joblib \
  scipy

echo "[+] Setup complete"

echo "----------------------------------------"
echo "Test installation with:"
echo "python3 - <<EOF"
echo "from tree_sitter_languages import get_language"
echo "from tree_sitter import Parser"
echo "lang = get_language('javascript')"
echo "parser = Parser()"
echo "parser.set_language(lang)"
echo "tree = parser.parse(b'let x = 1;')"
echo "print(tree.root_node)"
echo "EOF"
echo "----------------------------------------"
