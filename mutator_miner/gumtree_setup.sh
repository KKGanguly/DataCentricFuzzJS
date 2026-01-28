# Java
sudo apt install openjdk-17-jdk

# GumTree
git clone https://github.com/GumTreeDiff/gumtree
cd gumtree
./gradlew build
export PATH=$PWD/bin:$PATH

# JS parser for GumTree
git clone https://github.com/GumTreeDiff/jsparser
cd jsparser
npm install
npm run build
export GUMTREE_JS_PARSER=$PWD
