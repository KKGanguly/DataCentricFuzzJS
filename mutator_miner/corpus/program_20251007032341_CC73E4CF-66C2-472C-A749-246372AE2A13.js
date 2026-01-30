function opt_me(a1) {
    if (!a1 > 0) {
        return a1 += {};
        const v6 = () => {
        };
        v6();
    }
    return a1;
}
const v8 = %PrepareFunctionForOptimization(opt_me);
opt_me(0);
opt_me(1);
const v13 = %OptimizeMaglevOnNextCall(opt_me);
opt_me(0);
let res = opt_me({});
