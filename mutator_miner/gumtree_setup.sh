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

# Find the zip safely
ZIP_FILE=$(find . -name "gumtree-*.zip" | head -n 1)
echo "Found zip: $ZIP_FILE"

unzip -o "$ZIP_FILE" -d gumtree_dist

GUMTREE_HOME=$(find gumtree_dist -maxdepth 1 -type d -name "gumtree-*" | head -n 1)
echo "GUMTREE_HOME=$GUMTREE_HOME"

export PATH="$PWD/$GUMTREE_HOME/bin:$PATH"

cd "$WORKDIR"

### JS parser ###
git clone https://github.com/GumTreeDiff/jsparser
cd jsparser
npm install

export GUMTREE_JS_PARSER="$PWD"
export PATH="$PWD/dist:$PATH"

### Verification ###
echo "PATH=$PATH"
which gumtree || echo "gumtree not found"
gumtree --version || true
echo "GUMTREE_JS_PARSER=$GUMTREE_JS_PARSER"
