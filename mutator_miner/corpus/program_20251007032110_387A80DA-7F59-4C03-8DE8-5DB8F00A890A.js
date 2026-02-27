function f0() {
}
function f(a2) {
    return arguments[0];
}
const v5 = %OptimizeFunctionOnNextCall(f);
f0(undefined, f());
