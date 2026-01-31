function f0() {
}
function f(a2, a3, a4) {
    let x = BigInt.asUintN(64, a2 + a3);
    try {
        x + a4;
    } catch(e11) {
        eval();
    }
    return x;
}
const v14 = %PrepareFunctionForOptimization(f);
f0(f(3n, 5n), 8n);
f0(f(8n, 12n), 20n);
const v25 = %OptimizeFunctionOnNextCall(f);
f0(f(2n, 3n), 5n);
