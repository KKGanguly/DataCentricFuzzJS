function f0() {
}
var a = [0,,];
function foo(a6) {
    return a[a6] + 2147483647;
}
const v10 = %PrepareFunctionForOptimization(foo);
const v9 = v10;
foo(0);
const v14 = %OptimizeFunctionOnNextCall(foo);
const v12 = v14;
f0(foo(1));
