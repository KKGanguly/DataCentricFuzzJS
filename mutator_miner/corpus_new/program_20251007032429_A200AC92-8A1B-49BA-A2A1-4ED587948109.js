function opt(a1) {
    const t52 = "undefined";
    let v1 = delete t52.length;
    try {
        const v2 = [0.5345328425681423,-871.8233695234496,2.623970852598832e+307,-2];
        for (let i15 = 0; i15 < 5; i15++) {
            Object.defineProperty(v2, "length", { writable: true, configurable: true, value: v2 });
            v1++;
            v1--;
        }
    } catch(e29) {
        Math.round(v1);
    } finally {
    }
    const v9 = [65536,-4096,-128,-36659];
    return v9;
}
opt(false);
const v43 = %PrepareFunctionForOptimization(opt);
opt(true);
const v46 = %OptimizeFunctionOnNextCall(opt);
opt(false);
