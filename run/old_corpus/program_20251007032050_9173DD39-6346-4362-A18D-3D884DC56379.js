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
