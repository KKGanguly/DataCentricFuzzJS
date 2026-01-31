function Module() {
    'use asm';
    function div_(a2) {
        a2 = a2 | 0;
    }
    return { f: div_ };
}
var __f_0 = Module().f;
__v_8 = [0];
function f13() {
    return __f_0(__v_8);
}
__v_8.__defineGetter__(0, f13);
__v_8[0];
