var val = { x: 0 };
function foo(a4) {
    a4 += 1;
    a4 += 1;
    val.x = a4;
}
const v7 = %PrepareFunctionForOptimization(foo);
foo(1073741823);
const v10 = %OptimizeFunctionOnNextCall(foo);
foo();
print(val.x);
