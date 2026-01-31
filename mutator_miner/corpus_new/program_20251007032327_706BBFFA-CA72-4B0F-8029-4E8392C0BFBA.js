function opt_me() {
    const args = arguments;
    const obj = { f: args };
    try {
        opt_me(args, 1);
    } catch(e7) {
        print("error");
    }
    const slice = Array.prototype.slice;
    slice.apply(args);
}
const v16 = %PrepareFunctionForOptimization(opt_me);
opt_me();
const v18 = %OptimizeMaglevOnNextCall(opt_me);
opt_me();
