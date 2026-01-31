function f0() {
}
function f1() {
}
var __v_9690 = f1;
try {
    function f3() {
        __f_1653();
    }
    f3();
} catch(e7) {
}
function __f_1653(a9, a10) {
    try {
    } catch(e11) {
    }
    a9[a10 + 4] = 2;
}
function f15() {
    const v16 = %PrepareFunctionForOptimization(__f_1653);
    __f_1653(__v_9690, true);
    const v19 = %OptimizeFunctionOnNextCall(__f_1653);
    const v20 = () => {
        return __f_1653();
    };
    f0(v20, TypeError);
}
f15();
