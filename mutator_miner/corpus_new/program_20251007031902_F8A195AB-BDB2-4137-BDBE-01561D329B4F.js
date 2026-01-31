gc();
function asm(a3, a4, a5) {
    'use asm';
    const t3 = a3.Uint32Array;
    const v7 = new t3(a5);
    var HEAP32 = v7;
    function load(a10) {
        return +(HEAP32[(a10 = a10 | 0) >> 2] >>> 0);
    }
    return { load: load };
}
function RunAsmJsTest() {
    const v23 = new ArrayBuffer(65536);
    buffer = v23;
    const v26 = { Uint32Array: Uint32Array };
    var asm_module = asm(v26, {}, buffer);
    asm_module.load(buffer.byteLength);
}
RunAsmJsTest();
