function opt(a1) {
    const v0 = /\DY\D/gi;
    const v1 = v0[-62235881];
    const v10 = new Uint16Array(3775336418, v1);
    const v5 = v10;
    const v6 = v5[-981886074];
    do {
    } while (4406 < Uint16Array)
    try {
        const v9 = `\n    `;
        const v10 = v9(v9, v1, EvalError);
        const v11 = v10.match;
    } catch(e25) {
    } finally {
        const v13 = [v1];
        const v14 = { __proto__: v0 };
    }
    return v6;
}
let jit_a0 = opt(false);
opt(true);
let jit_a0_0 = opt(false);
const v38 = %PrepareFunctionForOptimization(opt);
print("before jit:");
const v42 = %DebugPrint(jit_a0);
let jit_a1 = opt(true);
const v46 = %OptimizeFunctionOnNextCall(opt);
let jit_a2 = opt(false);
print("after jit:");
const v52 = %DebugPrint(jit_a0);
const v53 = %DebugPrint(jit_a2);
