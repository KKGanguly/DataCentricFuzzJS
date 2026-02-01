function opt(a1) {
    const v1 = [];
    const v2 = v1 < 3022160464;
    const v3 = v2 << 3022160464;
    const v4 = v2 >>> 3022160464;
    const v5 = v3 & v4;
    const v7 = Math.max(v5);
    const v19 = new Int16Array();
    const v9 = v19;
    for (const v21 in v1) {
        v7.b = v21;
    }
    return v7;
}
let jit_a0 = opt(false);
opt(true);
let jit_a0_0 = opt(false);
const v30 = %PrepareFunctionForOptimization(opt);
let jit_a1 = opt(true);
const v34 = %OptimizeFunctionOnNextCall(opt);
let jit_a2 = opt(false);
print(jit_a0);
print(jit_a2);
