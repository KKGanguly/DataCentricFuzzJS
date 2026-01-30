const v1 = Symbol();
v = { symbol: v1 };
function f() {
    for (let i6 = 0; i6 < 1; ++i6) {
        try {
            v.symbol();
        } catch(e14) {
        }
    }
}
const v15 = %PrepareFunctionForOptimization(f);
f();
const v17 = %OptimizeFunctionOnNextCall(f);
f();
