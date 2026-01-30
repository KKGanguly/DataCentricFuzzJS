function f0() {
}
function f(a2) {
    const v4 = new Array(a2);
    return v4;
}
const v5 = %PrepareFunctionForOptimization(f);
f0(3, f(3).length);
f0(18, f(18).length);
const v16 = %OptimizeFunctionOnNextCall(f);
f0(4, f(4).length);
f0(f);
let a = f("8");
f0(f);
f0(1, a.length);
f0("8", a[0]);
const v33 = %PrepareFunctionForOptimization(f);
f0(1, f(1).length);
const v39 = %OptimizeFunctionOnNextCall(f);
f0(8, f(8).length);
f0(f);
f0(1, f("8").length);
f0(f);
