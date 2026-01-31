function f0(a1) {
    a1 += a1;
    a1 += a1;
    a1 += a1;
    a1 += a1;
    a1 += a1;
    a1 += a1;
    a1 += a1;
    a1 += a1;
    a1 += a1;
    a1 += a1;
    a1 += a1;
    a1 += a1;
    a1 += a1;
    a1 += a1;
    a1 += a1;
    const v3 = () => {
        a1.length = 0;
        return 0;
    };
    const v5 = { toString: v3 };
    try { a1.includes(4.4, v5); } catch (e) {}
}
var v3 = [0,1];
for (const v11 in v3) {
    var v5 = v11[v11];
    const v14 = %PrepareFunctionForOptimization(f0);
    f0(v5);
    f0(v5);
    const v17 = %OptimizeFunctionOnNextCall(f0);
    f0(v5);
}
