function f0() {
}
var val = { x: 0 };
function foo(a5) {
    a5 += 1;
    a5 += 1;
    val.x = a5;
}
const v8 = %PrepareFunctionForOptimization(foo);
const v7 = v8;
foo(1073741823);
const v12 = %OptimizeFunctionOnNextCall(foo);
const v10 = v12;
foo();
f0(val.x);
