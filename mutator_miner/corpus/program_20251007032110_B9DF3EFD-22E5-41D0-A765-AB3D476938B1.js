function foo(a1) {
    var x = -0;
    if (a1) {
        x = 0;
    }
    return x + (x - 0);
}
const v9 = %PrepareFunctionForOptimization(foo);
console.log(Object.is(foo(true), 0));
const v17 = %OptimizeFunctionOnNextCall(foo);
console.log(Object.is(foo(false), -0));
