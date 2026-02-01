let hex_b = 11;
let hex_d = 13;
let hex_20 = 32;
let hex_52 = 82;
let hex_fe = 254;
function f(a11) {
    let unused = [a11 / 8,...[...[...[],a11 / 8,...[7,hex_fe,a11,0,0,hex_20,6,hex_52,hex_d,0,hex_b],0,hex_b],hex_b]];
}
const v28 = %PrepareFunctionForOptimization(f);
f(64);
f(64);
const v33 = %OptimizeFunctionOnNextCall(f);
f(64);
