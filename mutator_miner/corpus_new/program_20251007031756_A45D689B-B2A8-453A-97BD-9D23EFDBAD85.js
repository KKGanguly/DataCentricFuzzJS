function f0() {
}
function foo(a2) {
    return a2 + "0123456789012";
}
foo("a");
foo("က");
const v9 = %OptimizeFunctionOnNextCall(foo);
foo("a");
f0(foo);
foo("");
f0(foo);
