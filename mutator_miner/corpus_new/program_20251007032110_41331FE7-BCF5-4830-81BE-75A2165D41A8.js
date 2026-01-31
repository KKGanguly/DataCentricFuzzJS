function Module(a1, a2, a3) {
    'use asm';
    var a = a1.Math.PI;
    function f() {
        return a;
    }
    return { f: f };
}
Module.length;
