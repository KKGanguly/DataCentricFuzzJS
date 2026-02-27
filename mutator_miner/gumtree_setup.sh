#!/usr/bin/env bash
set -e

WORKDIR=$(pwd)

echo "=== Installing Java ==="
sudo apt update
sudo apt install -y openjdk-17-jdk

echo "=== Cloning GumTree ==="
if [ ! -d "gumtree" ]; then
  git clone https://github.com/GumTreeDiff/gumtree
fi

cd gumtree
./gradlew build

echo "=== Locating GumTree zip ==="
ZIP_FILE=$(find . -type f -name "gumtree-*.zip" | head -n 1)

if [[ -z "$ZIP_FILE" ]]; then
  echo "❌ GumTree zip not found!"
  exit 1
fi

ZIP_DIR=$(dirname "$ZIP_FILE")
cd "$ZIP_DIR"
unzip -o "$(basename "$ZIP_FILE")"

GUMTREE_HOME=$(find . -maxdepth 1 -type d -name "gumtree-*" | head -n 1)

if [[ -z "$GUMTREE_HOME" ]]; then
  echo "❌ Extracted GumTree directory not found!"
  exit 1
fi

GUMTREE_HOME=$(realpath "$GUMTREE_HOME")
echo "GUMTREE_HOME resolved to: $GUMTREE_HOME"

cd "$WORKDIR"

echo "=== Cloning JS Parser ==="
if [ ! -d "jsparser" ]; then
  git clone https://github.com/GumTreeDiff/jsparser
fi

cd jsparser
npm install

GUMTREE_JS_PARSER=$(realpath "$PWD")

cd "$WORKDIR"

echo "=== Persisting Environment Variables ==="

ENV_FILE="$HOME/.gumtree_env"
BASHRC="$HOME/.bashrc"

cat > "$ENV_FILE" <<EOF
# GumTree environment configuration
export GUMTREE_HOME="$GUMTREE_HOME"
export GUMTREE_JS_PARSER="$GUMTREE_JS_PARSER"
export PATH="\$GUMTREE_HOME/bin:\$PATH"
EOF

echo "Written environment config to $ENV_FILE"

# Ensure .bashrc sources the env file
if ! grep -q ".gumtree_env" "$BASHRC"; then
  echo "" >> "$BASHRC"
  echo "# Load GumTree environment" >> "$BASHRC"
  echo "[ -f \$HOME/.gumtree_env ] && source \$HOME/.gumtree_env" >> "$BASHRC"
  echo "Updated ~/.bashrc to load GumTree environment"
fi

echo "=== Reloading environment for current session ==="
source "$ENV_FILE"

echo ""
echo "=== Verification ==="
which gumtree || echo "gumtree not found"
gumtree --version || true
echo "GUMTREE_JS_PARSER=$GUMTREE_JS_PARSER"

echo ""
echo "✅ Installation complete."
echo "If gumtree is not found, run: source ~/.bashrc"