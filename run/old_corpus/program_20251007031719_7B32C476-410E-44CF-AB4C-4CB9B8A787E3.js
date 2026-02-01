function f0() {
}
f0("0 || () =>", SyntaxError);
f0("++(a) =>", SyntaxError);
