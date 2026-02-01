const o0 = {};
const v3 = [-1];
function f4() {
    (o0[65535] | 65535) / v3[2147483648];
}
const v12 = %PrepareFunctionForOptimization(f4);
const v10 = v12;
f4();
f4();
const v16 = %OptimizeFunctionOnNextCall(f4);
const v13 = v16;
f4();
