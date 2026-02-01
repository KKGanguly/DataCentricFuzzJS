function f0() {
}
f0(`\n    class C {\n      get [(function() { function lazy() { Syntax Error } })()]() {}\n    }`, SyntaxError);
