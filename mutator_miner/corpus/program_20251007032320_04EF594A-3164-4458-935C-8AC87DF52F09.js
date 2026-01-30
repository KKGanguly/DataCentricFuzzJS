function main() {
    function f0(a2, a3) {
        var v4 = a3[0];
        var v5 = a2[0];
        Array.prototype.indexOf.call(a3);
    }
    const v12 = %PrepareFunctionForOptimization(f0);
    const v15 = new Array(1);
    var v0 = v15;
    v0[0] = "tagged";
    f0(v0, [1]);
    const v22 = new Array(1);
    var v1 = v22;
    v1[0] = 0.1;
    const v25 = %OptimizeFunctionOnNextCall(f0);
    f0(v1, v1);
}
main();
main();
