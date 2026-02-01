function f0() {
}
function opt(a2) {
    const v0 = /\DY\D/ig;
    const v1 = v0[-62235881];
    const v11 = new Uint16Array(3775336418, v1);
    const v10 = v11;
    const v5 = v10;
    const v6 = v5[-981886074];
    do {
    } while (4406 < Uint16Array)
    try {
        const v9 = `\n    `;
        const v10 = v9(v9, v1, EvalError);
        const v11 = v10.match;
    } catch(e27) {
    } finally {
        const v13 = [v1];
        const v14 = { __proto__: v0 };
    }
    return v6;
}
let jit_a0 = opt(false);
opt(true);
let jit_a0_0 = opt(false);
const v40 = %PrepareFunctionForOptimization(opt);
const v38 = v40;
f0("before jit:");
const v44 = %DebugPrint(jit_a0);
const v42 = v44;
let jit_a1 = opt(true);
const v49 = %OptimizeFunctionOnNextCall(opt);
const v46 = v49;
let jit_a2 = opt(false);
f0("after jit:");
const v56 = %DebugPrint(jit_a0);
const v52 = v56;
const v58 = %DebugPrint(jit_a2);
const v53 = v58;
