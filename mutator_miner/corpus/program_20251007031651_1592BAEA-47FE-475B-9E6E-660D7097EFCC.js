function __f_4(a1, a2) {
    var __v_5 = a1 * a2;
    const v6 = new Uint32Array(__v_5);
    return v6;
}
__f_4(0, -1);
for (let i12 = 0; i12 < 1000; i12++) {
    __f_4();
}
__v_4 = __f_4();
function __f_3(a22) {
    try {
    } catch(e23) {
    }
    return a22?.[a22];
}
for (let i27 = 0; i27 < 3; i27++) {
    try { __f_3(__v_4); } catch (e) {}
}
const v35 = %OptimizeFunctionOnNextCall(__f_3);
gc();
for (let i40 = __v_4.length; i40 < 100; i40++) {
    try { __f_3(__v_4); } catch (e) {}
}
