function f0() {
}
function TestOptimizedFastExpm1MinusZero() {
    function foo() {
        return Object.is(Math.expm1(-0), -0);
    }
    f0(foo());
    const v13 = %OptimizeFunctionOnNextCall(foo);
    f0(foo());
}
TestOptimizedFastExpm1MinusZero();
function TestOptimizedExpm1MinusZeroSlowPath() {
    function f(a19) {
        return Object.is(Math.expm1(a19), -0);
    }
    function g() {
        return f(-0);
    }
    f(0);
    const v32 = %OptimizeFunctionOnNextCall(f);
    f("0");
    f0(g());
    const v37 = %OptimizeFunctionOnNextCall(g);
    f0(g());
}
TestOptimizedExpm1MinusZeroSlowPath();
