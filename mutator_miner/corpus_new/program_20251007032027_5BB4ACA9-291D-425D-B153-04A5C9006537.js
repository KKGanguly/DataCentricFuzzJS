function f0() {
}
function asm() {
    'use asm';
    function f(a3) {
        a3 = a3 | 0;
        while (1) {
            return 1;
        }
        return 0;
    }
    return { f: f };
}
const mod = asm();
function call_f() {
    mod.f();
    call_f();
}
f0(call_f, RangeError);
