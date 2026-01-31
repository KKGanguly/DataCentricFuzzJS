function f0() {
}
function Module() {
    'use asm';
    function f() {
    }
    function g() {
        var x = 0;
        table[x & 3]();
    }
    var table = [f,f,f,f];
    return { g: g };
}
var m = Module();
f0(m.g);
const v17 = %IsAsmWasmCode(Module);
f0(v17);
