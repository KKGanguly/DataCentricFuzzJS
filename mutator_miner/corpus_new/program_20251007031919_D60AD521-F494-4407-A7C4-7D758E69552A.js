function __f_57(a1, a2, a3) {
    const v4 = a2.toString();
    try { Wasm.instantiateModuleFromAsm(v4); } catch (e) {}
}
function __f_4() {
    'use asm';
    function __f_78() {
        var __v_41 = 0;
        __v_41 <= 4294967295;
    }
    return { __f_78: __f_78 };
}
try { __f_57(4, __f_4); } catch (e) {}
