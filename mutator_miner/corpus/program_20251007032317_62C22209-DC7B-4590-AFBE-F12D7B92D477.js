function foo() {
    let val = [];
    val.__proto__ = RegExp();
    let v6;
    try { v6 = Math.max(...val); } catch (e) {}
    return v6;
}
const v7 = %PrepareFunctionForOptimization(foo);
try {
    foo();
} catch(e9) {
}
const v10 = %OptimizeFunctionOnNextCall(foo);
foo();
