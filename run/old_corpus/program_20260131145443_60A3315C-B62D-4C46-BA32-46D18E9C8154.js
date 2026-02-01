function f0() {
}
const factor = 9.223372036854776e+18;
const value = 0 / factor;
let use;
function opt_me() {
    use = value;
    const arr = Array(value);
    return arr;
}
const v12 = %PrepareFunctionForOptimization(opt_me);
const v11 = v12;
opt_me();
const v15 = %OptimizeMaglevOnNextCall(opt_me);
const v13 = v15;
let evil_arr = opt_me();
f0(evil_arr[0]);
