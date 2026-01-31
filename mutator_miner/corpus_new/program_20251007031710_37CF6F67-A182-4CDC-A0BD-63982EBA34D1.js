{
    function f() {
        const b = BigInt.asUintN(4, 3n);
        let i = 0;
        while (i < 1) {
            i + 1;
            i = b;
        }
    }
    const v12 = %PrepareFunctionForOptimization(f);
    f();
    f();
    const v15 = %OptimizeFunctionOnNextCall(f);
    f();
}
{
    function f() {
        const b = BigInt.asUintN(4, 10n);
        let i = 0.1;
        while (i < 1.8) {
            i + 1;
            i = b;
        }
    }
    const v29 = %PrepareFunctionForOptimization(f);
    f();
    f();
    const v32 = %OptimizeFunctionOnNextCall(f);
    f();
}
