const v4 = new ArrayBuffer(256);
function f5(a6, a7, a8) {
    'use asm';
    const t3 = a6.Uint8Array;
    const v10 = new t3(a8);
    var Uint8ArrayView = v10;
    const t6 = a6.Int32Array;
    const v13 = new t6(a8);
    var Int32ArrayView = v13;
    function f(a16, a17) {
        Int32ArrayView[(a17 = Uint8ArrayView[256]) >> 10] = 2882400170;
        return -a17 + Int32ArrayView[a17 >> 2];
    }
    return f;
}
boom = f5(this, 0, v4);
for (let i30 = 0; i30 < 400; ++i30) {
    boom(0, 4096);
}
