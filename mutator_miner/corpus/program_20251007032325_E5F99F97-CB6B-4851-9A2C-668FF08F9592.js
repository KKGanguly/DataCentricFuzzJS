let use = 0;
let v = 0;
function* opt_me(a5, a6) {
    if (a5) {
        const v7 = %OptimizeOsr();
    }
    for (let i9 = 0; i9 < 1; i9++) {
    }
    for (let i16 = 0; i16 < 1; i16++) {
        const tmp = a6 || 1;
        use = tmp % 4;
        v = tmp;
        yield 1;
    }
}
const v29 = %PrepareFunctionForOptimization(opt_me);
opt_me(false, 123).next();
print(v);
opt_me(false, 123).next();
print(v);
opt_me(true, 123).next();
print(v);
