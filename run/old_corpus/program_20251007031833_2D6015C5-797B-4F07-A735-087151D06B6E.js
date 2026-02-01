function Module() {
    'use asm';
    function f() {
        try { arr(); } catch (e) {}
    }
    function g() {
    }
    var arr = [g];
    return f;
}
let f = Module();
f();
