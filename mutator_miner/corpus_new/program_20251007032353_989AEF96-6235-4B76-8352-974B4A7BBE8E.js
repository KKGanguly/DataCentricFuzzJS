function __f_1() {
    const o = {};
    gc();
    o.a = 0;
    o[1024] = 1;
    delete o.a;
}
__f_1();
const v9 = %OptimizeFunctionOnNextCall(__f_1);
__f_1();
__v_4 = [];
gc();
