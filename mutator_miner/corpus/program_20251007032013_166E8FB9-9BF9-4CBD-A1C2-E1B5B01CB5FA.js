function f0() {
}
function opt(a2, a3) {
    a3[0] = 0;
    a2.length;
    for (let i7 = 0; i7 < 1; i7++) {
        a2[0] = 0;
    }
    a3[0] = 9.431092e-317;
}
const v17 = new Array(1);
let arr1 = v17;
arr1[0] = "a";
opt(arr1, [0]);
let arr2 = [0.1];
opt(arr2, arr2);
const v27 = %OptimizeFunctionOnNextCall(opt);
opt(arr2, arr2);
f0(9.431092e-317, arr2[0]);
