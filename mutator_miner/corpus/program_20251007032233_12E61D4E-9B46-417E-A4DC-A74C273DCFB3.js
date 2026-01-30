var a = [0,,];
function foo(a5) {
    return a[a5] + 2147483647;
}
const v9 = %PrepareFunctionForOptimization(foo);
foo(0);
const v12 = %OptimizeFunctionOnNextCall(foo);
print(foo(1));
