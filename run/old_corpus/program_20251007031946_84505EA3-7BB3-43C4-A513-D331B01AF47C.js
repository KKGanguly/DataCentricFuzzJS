const v1 = {};
const v4 = new ArrayBuffer(1);
function f5(a6, a7, a8) {
    'use asm';
    const t4 = a6.Uint8Array;
    const v10 = new t4(a8);
    var MEM = v10;
    function foo(a13) {
        MEM[a13 | 0] *= 0;
    }
    return { foo: foo };
}
var foo = f5(this, v1, v4).foo;
foo((-926416896 * 8) * 1024);
