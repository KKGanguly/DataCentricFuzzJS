function test(a1) {
    let right = 5 + (10 ** 308);
    right = Math.min(right, (a1 % a1) + right);
    right = Math.max(1, right);
    let left = 5;
    left = Math.min(left, (a1 % a1) + left);
    left = Math.min(left - 1, left);
    left = 4 - left;
    left = left - 2.00084e-18;
    result = left / right;
    const v28 = %DebugPrint(left);
    const v29 = %DebugPrint(right);
    const v31 = %DebugPrint(result);
    return result;
}
const v32 = %PrepareFunctionForOptimization(test);
test(true);
const v35 = %OptimizeFunctionOnNextCall(test);
test(true);
