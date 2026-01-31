function f5(a1, a2) {
    try {
        a1[0] = a2;
    } catch(e3) {
    }
    return a1;
}
const v4 = %PrepareFunctionForOptimization(f5);
f5([0,3,2], 1.5);
f5([0,3,2], 1.5);
const v17 = %OptimizeMaglevOnNextCall(f5);
f5([0,3,2], 1.5);
f5(233333333);
