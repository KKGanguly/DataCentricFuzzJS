function f0() {
}
function foo(a2) {
    return (a2 = "" + Math.abs(a2)).charCodeAt(0);
}
String.fromCharCode(49);
const o = {};
o[(1).toString()] = 1;
f0(49, foo(1));
f0(49, foo(1));
const v25 = %OptimizeFunctionOnNextCall(foo);
f0(49, foo(1));
