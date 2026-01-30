#!/usr/bin/env bash
set -e

### Java ###
sudo apt update
sudo apt install -y openjdk-17-jdk

### GumTree ###
git clone https://github.com/GumTreeDiff/gumtree
cd gumtree

# Build GumTree
./gradlew build

# Unzip the distribution (gumtree binary is inside bin/)
cd dist/build/distributions
unzip -o gumtree-*.zip

# Add gumtree binary to PATH
GUMTREE_HOME="$PWD/$(ls -d gumtree-*/ | head -n1)"
export PATH="$GUMTREE_HOME/bin:$PATH"

cd ../../../

### JS parser for GumTree ###
git clone https://github.com/GumTreeDiff/jsparser
cd jsparser

npm install
# GumTree expects this variable
export GUMTREE_JS_PARSER="$PWD"

# Also put JS parser on PATH (as requested)
export PATH="$PWD/dist:$PATH"

### Verification ###
echo "gumtree location: $(which gumtree)"
gumtree --version || true
echo "GUMTREE_JS_PARSER=$GUMTREE_JS_PARSER"
