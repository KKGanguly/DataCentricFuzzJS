function f0() {
}
const o = {};
function foo() {
    return o[4294967295];
}
f0(undefined, foo());
f0(undefined, foo());
const v11 = %OptimizeFunctionOnNextCall(foo);
f0(undefined, foo());
