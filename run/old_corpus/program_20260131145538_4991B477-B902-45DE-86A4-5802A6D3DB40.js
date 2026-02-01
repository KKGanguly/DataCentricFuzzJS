function f0() {
}
function opt(a2) {
    const v1 = [];
    const v2 = v1 < 3022160464;
    const v3 = v2 << 3022160464;
    const v4 = v2 >>> 3022160464;
    const v5 = v3 & v4;
    const v7 = Math.max(v5);
    const v20 = new Int16Array();
    const v19 = v20;
    const v9 = v19;
    for (const v23 in v1) {
        v7.b = v23;
    }
    return v7;
}
let jit_a0 = opt(false);
opt(true);
let jit_a0_0 = opt(false);
const v32 = %PrepareFunctionForOptimization(opt);
const v30 = v32;
let jit_a1 = opt(true);
const v37 = %OptimizeFunctionOnNextCall(opt);
const v34 = v37;
let jit_a2 = opt(false);
f0(jit_a0);
f0(jit_a2);
