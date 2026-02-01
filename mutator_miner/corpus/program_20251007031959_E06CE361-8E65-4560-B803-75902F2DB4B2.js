const v1 = {};
const v4 = new ArrayBuffer(256);
function f5(a6, a7, a8) {
    'use asm';
    var ff = Math.sign;
    const t5 = a6.Int32Array;
    const v13 = new t5(a8);
    var m32 = v13;
    function f(a16) {
        m32[(((1 - ff(NaN)) >>> 0) % 231006547) & a16] = 305419896;
    }
    return f;
}
boom0 = f5(this, v1, v4);
boom0(4294967295);
