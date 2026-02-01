#!/usr/bin/env bash
set -e

WORKDIR=$(pwd)

### Java ###
sudo apt update
sudo apt install -y openjdk-17-jdk

### GumTree ###
git clone https://github.com/GumTreeDiff/gumtree
cd gumtree

./gradlew build

# Find the zip anywhere under gumtree/
ZIP_FILE=$(find . -type f -name "gumtree-*.zip" | head -n 1)

if [[ -z "$ZIP_FILE" ]]; then
  echo "❌ GumTree zip not found!"
  exit 1
fi

echo "Found zip: $ZIP_FILE"

# Go to directory containing the zip
ZIP_DIR=$(dirname "$ZIP_FILE")
cd "$ZIP_DIR"

# Unzip in place
unzip -o "$(basename "$ZIP_FILE")"

# Find extracted GumTree folder
GUMTREE_HOME=$(find . -maxdepth 1 -type d -name "gumtree-*" | head -n 1)

if [[ -z "$GUMTREE_HOME" ]]; then
  echo "❌ Extracted GumTree directory not found!"
  exit 1
fi

GUMTREE_HOME=$(realpath "$GUMTREE_HOME")
echo "GUMTREE_HOME=$GUMTREE_HOME"

export PATH="$GUMTREE_HOME/bin:$PATH"

cd "$WORKDIR"

### JS parser ###
git clone https://github.com/GumTreeDiff/jsparser
cd jsparser
npm install

export GUMTREE_JS_PARSER="$PWD"
export PATH="$PWD:$PATH"

### Verification ###
echo "PATH=$PATH"
which gumtree || echo "gumtree not found"
gumtree --version || true
echo "GUMTREE_JS_PARSER=$GUMTREE_JS_PARSER"
