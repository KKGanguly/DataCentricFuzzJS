function f0(a1) {
    let v3 = -0;
    -v3;
    v3++;
    if (a1) {
        v3 = 0;
    }
    return v3 + v3;
}
const v8 = %PrepareFunctionForOptimization(f0);
f0(v8);
const v10 = %OptimizeFunctionOnNextCall(f0);
f0();
