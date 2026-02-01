const v1 = Symbol();
v = { symbol: v1 };
function f() {
    for (let i7 = 0; i7 < 1; ++i7) {
        try {
            v.symbol();
        } catch(e15) {
        }
    }
}
const v16 = %PrepareFunctionForOptimization(f);
const v15 = v16;
f();
const v19 = %OptimizeFunctionOnNextCall(f);
const v17 = v19;
f();
