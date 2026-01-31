function f0() {
}
function f(a2) {
    return a2.b;
}
var v = { a: 10, b: 10.23 };
const v8 = %PrepareFunctionForOptimization(f);
f(v);
const v10 = %OptimizeFunctionOnNextCall(f);
f(v);
f0(f);
v.b = { x: 20 };
f0(f(v).x, 20);
f0(f);
function f0(a21) {
    return a21.b;
}
var v0 = { b: 10.23 };
const v26 = %PrepareFunctionForOptimization(f0);
f0(v0);
v0.b = {};
v0.b = 0;
const v30 = %OptimizeFunctionOnNextCall(f0);
f0(v0);
f0(f0(v0), 0);
