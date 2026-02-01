function foo(a1, a2) {
    let x = a1 + a2;
}
function test() {
    try {
        foo(1n, 1n);
    } catch(e9) {
    }
}
const v10 = %PrepareFunctionForOptimization(foo);
const v11 = %PrepareFunctionForOptimization(test);
test();
test();
const v14 = %OptimizeFunctionOnNextCall(test);
test();
