function f0(a1, a2) {
    let v3 = 4294967294;
    let v4 = 0;
    v3 = NaN;
    if (a1) {
        v3 = 4294967294;
    }
    const v9 = v3 - 1;
    v4 = 4294967294 - (v9 * 6328);
    if (a2) {
        v4 = 0;
    }
    0 - v4;
    for (let v16 = 0; v16 < 5; v16++) {
    }
    return v9;
}
const v17 = %PrepareFunctionForOptimization(f0);
f0(undefined, "KCGKEMDHOKLAAALLE");
const v21 = %OptimizeFunctionOnNextCall(f0);
f0();
