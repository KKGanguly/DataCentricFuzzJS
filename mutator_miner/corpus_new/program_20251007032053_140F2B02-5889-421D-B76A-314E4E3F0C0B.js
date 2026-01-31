var __v_8 = {};
function __f_58(a3, a4, a5) {
    const v8 = new ArrayBuffer(1);
    const v9 = a4(__v_8, a5, v8);
    try { v9.__f_19(); } catch (e) {}
}
function __f_105(a12, a13, a14) {
    'use asm';
    const v15 = a12.Int32Array;
    let v16;
    try { v16 = new v15(a14); } catch (e) {}
    var __v_34 = v16;
    function __f_19() {
        var __v_31 = 4;
        const v27 = ((__v_34?.[0] | 0) + 1) | 0;
        __v_34[__v_31 >> 2] = v27;
    }
    return { __f_19: __f_19 };
}
__f_58(7, __f_105);
