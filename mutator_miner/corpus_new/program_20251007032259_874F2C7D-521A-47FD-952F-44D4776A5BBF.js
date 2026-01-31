var obj = {};
function f2() {
    print("Called valueOf");
}
obj.valueOf = f2;
function foo() {
    "" + obj;
}
const v9 = %PrepareFunctionForOptimization(foo);
foo();
const v11 = %OptimizeMaglevOnNextCall(foo);
foo();
