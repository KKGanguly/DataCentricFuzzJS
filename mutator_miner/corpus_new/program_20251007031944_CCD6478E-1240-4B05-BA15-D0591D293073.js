function f0() {
}
function f(a2, a3) {
    var o = a2 ? { a: 1 } : undefined;
    return o.a + !(a3 & 1);
}
f(1);
function g() {
    f(0, "s");
}
f0(g);
const v21 = %OptimizeFunctionOnNextCall(g);
f0(g);
