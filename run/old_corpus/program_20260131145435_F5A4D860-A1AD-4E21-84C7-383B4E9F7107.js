function f0() {
}
let use = 0;
let v = 0;
function* opt_me(a6, a7) {
    if (a6) {
        const v8 = %OptimizeOsr();
        const v7 = v8;
    }
    for (let i11 = 0; i11 < 1; i11++) {
    }
    for (let i18 = 0; i18 < 1; i18++) {
        const tmp = a7 || 1;
        use = tmp % 4;
        v = tmp;
        yield 1;
    }
}
const v31 = %PrepareFunctionForOptimization(opt_me);
const v29 = v31;
opt_me(false, 123).next();
f0(v);
opt_me(false, 123).next();
f0(v);
opt_me(true, 123).next();
f0(v);
