function f0() {
}
function foo() {
    let v3 = Symbol.toPrimitive;
    return v3++;
}
f0(foo);
const v6 = %OptimizeFunctionOnNextCall(foo);
f0(foo);
