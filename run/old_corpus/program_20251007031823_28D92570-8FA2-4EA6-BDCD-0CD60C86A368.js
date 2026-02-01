const v1 = {};
const v4 = new ArrayBuffer(1);
function f5(a6, a7, a8) {
    'use asm';
    const t4 = a6.Uint8Array;
    const v10 = new t4(a8);
    var MEM = v10;
    function f(a13) {
        MEM[a13 = a13 | 0] = 0;
    }
    return { f: f };
}
var m = f5(this, v1, v4);
m.f((-926416896 * 32) * 1024);
