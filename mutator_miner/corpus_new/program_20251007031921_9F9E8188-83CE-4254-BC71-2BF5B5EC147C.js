function f0() {
}
function bar(a2) {
    a2.y;
    a2.x;
    return a2.b;
}
function foo(a7) {
    bar(a7);
    return a7.a;
}
var obj = { a: 10, b: 20 };
const v14 = %PrepareFunctionForOptimization(foo);
const v15 = %EnsureFeedbackVectorForFunction(bar);
foo(obj);
const v17 = %OptimizeFunctionOnNextCall(foo);
f0(10, foo(obj));
