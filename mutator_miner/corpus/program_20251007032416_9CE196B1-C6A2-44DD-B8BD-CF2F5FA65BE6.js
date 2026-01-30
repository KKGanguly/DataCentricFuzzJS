function opt(a1) {
    const v1 = [];
    const v2 = ("2147483648")["2147483648"];
    function v3(a9, a10) {
    }
    const v7 = "nnMYZLivAj" ^ v2;
    const v8 = "  return i;         ";
    const v10 = v7 || v7;
    const v11 = "boolean" ** v10;
    try {
        const t10 = "boolean";
        const v12 = t10();
    } catch(e24) {
    }
    return v11;
}
let before_jit = opt(false);
opt(true);
opt(false);
const v32 = %PrepareFunctionForOptimization(opt);
opt(true);
const v35 = %OptimizeFunctionOnNextCall(opt);
let after_jit = opt(false);
print(before_jit);
print(after_jit);
