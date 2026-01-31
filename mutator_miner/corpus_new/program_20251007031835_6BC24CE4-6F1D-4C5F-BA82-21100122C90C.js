function f0() {
}
function foo(a2) {
    return (a2 ? -0 : 0) - 0;
}
f0(0, foo(false));
const v13 = %OptimizeFunctionOnNextCall(foo);
f0(-0, foo(true));
function foo(a20) {
    return (a20 ? -0 : 0) - 0;
}
f0(0, foo(false));
const v31 = %OptimizeFunctionOnNextCall(foo);
f0(-0, foo(true));
function foo(a38) {
    return (a38 ? -0 : 0) - 0;
}
f0(0, foo(false));
const v49 = %OptimizeFunctionOnNextCall(foo);
f0(-0, foo(true));
