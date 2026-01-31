function __f_1(a1) {
    var __v_1 = 1 + a1;
}
function __f_0() {
    __f_1();
    const v7 = __f_1();
    var __v_0 = { x: v7 };
    return [__v_0];
}
try {
    __f_0();
    __f_0();
    const v13 = %OptimizeFunctionOnNextCall(__f_0);
    __f_0();
} catch(e15) {
}
gc();
