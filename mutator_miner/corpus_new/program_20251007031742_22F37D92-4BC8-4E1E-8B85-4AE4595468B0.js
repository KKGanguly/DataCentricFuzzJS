function f0() {
}
function testMax1(a2) {
    const max = Math.max(-1, a2 ? -0 : 1);
    return Object.is(max, -0);
}
const v16 = %PrepareFunctionForOptimization(testMax1);
f0(testMax1(true));
f0(testMax1(true));
const v23 = %OptimizeFunctionOnNextCall(testMax1);
f0(testMax1(true));
function testMax2(a28) {
    const max = Math.max(a28 ? -0 : 1, -1);
    return Object.is(max, -0);
}
const v42 = %PrepareFunctionForOptimization(testMax2);
f0(testMax2(true));
f0(testMax2(true));
const v49 = %OptimizeFunctionOnNextCall(testMax2);
f0(testMax2(true));
function testMin1(a54) {
    const min = Math.min(1, a54 ? -0 : -1);
    return Object.is(min, -0);
}
const v68 = %PrepareFunctionForOptimization(testMin1);
f0(testMin1(true));
f0(testMin1(true));
const v75 = %OptimizeFunctionOnNextCall(testMin1);
f0(testMin1(true));
function testMin2(a80) {
    const min = Math.min(a80 ? -0 : -1, 1);
    return Object.is(min, -0);
}
const v94 = %PrepareFunctionForOptimization(testMin2);
f0(testMin2(true));
f0(testMin2(true));
const v101 = %OptimizeFunctionOnNextCall(testMin2);
f0(testMin2(true));
