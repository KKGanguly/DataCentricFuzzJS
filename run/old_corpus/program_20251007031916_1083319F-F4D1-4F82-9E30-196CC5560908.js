function foo(a1) {
    var y = 1;
    var x = 0;
    var z = 0;
    if (a1 == NaN) {
        z = NaN;
    }
    if (a1) {
        x = -0;
        y = 1;
        z = -0;
    }
    return Object.is(z + (x % y), -0);
}
console.log(foo(true));
const v25 = %PrepareFunctionForOptimization(foo);
foo(false);
const v28 = %OptimizeFunctionOnNextCall(foo);
foo(false);
console.log(foo(true));
