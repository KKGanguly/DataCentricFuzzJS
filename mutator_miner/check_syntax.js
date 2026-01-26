// check_syntax.js
const esprima = require("esprima");
const fs = require("fs");

const code = fs.readFileSync(process.argv[2], "utf8");

try {
  esprima.parseScript(code, { tolerant: false });
  process.exit(0);
} catch (e) {
  process.exit(1);
}
