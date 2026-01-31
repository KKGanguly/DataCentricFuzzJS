function f0() {
}
function f() {
    const o = {};
    o.a = 0;
    o[1024] = 1;
    delete o.a;
    o.b = 2;
    return o.b;
}
const v9 = %PrepareFunctionForOptimization(f);
f();
f();
const v12 = %OptimizeFunctionOnNextCall(f);
f();
function g(a15) {
    a15.b = 2;
}
function h() {
    const o = {};
    o.a = 0;
    o[1024] = 1;
    delete o.a;
    g(o);
    f0(o.b, 2);
}
const v27 = %NeverOptimizeFunction(g);
const v28 = %PrepareFunctionForOptimization(h);
h();
h();
const v31 = %OptimizeFunctionOnNextCall(h);
h();
