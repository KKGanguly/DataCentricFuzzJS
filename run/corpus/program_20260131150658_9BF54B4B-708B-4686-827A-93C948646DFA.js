gc();
function asm(a3, a4, a5) {
    'use asm';
    const t3 = a3.Uint32Array;
    const v8 = new t3(a5);
    const v7 = v8;
    var HEAP32 = v7;
    function load(a12) {
        const v14 = a12 | 0;
        a12 = v14;
        return +(HEAP32[v14 >> 2] >>> 0);
    }
    return { load: load };
}
function RunAsmJsTest() {
    const v25 = new ArrayBuffer(65536);
    const v23 = v25;
    buffer = v23;
    const v26 = { Uint32Array: Uint32Array };
    var asm_module = asm(v26, {}, buffer);
    asm_module.load(buffer.byteLength);
}
RunAsmJsTest();
