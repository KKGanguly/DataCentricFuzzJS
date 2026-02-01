function f0() {
}
function foo() {
    const v3 = new Array();
    v3.pop();
}
f0(undefined, foo());
f0(undefined, foo());
const v11 = %OptimizeFunctionOnNextCall(foo);
f0(undefined, foo());
