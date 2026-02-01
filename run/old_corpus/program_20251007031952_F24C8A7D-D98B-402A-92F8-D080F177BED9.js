[-26490,-60394,8,2147483648,257,2147483647];
[-52344];
const v2 = [-42555,3566,-36484,2088];
class C3 {
    static #valueOf(a5) {
        v2.length = 7;
        new Int8Array(127);
        new Float64Array(3);
        const v15 = new Int8Array(12);
        return v15;
    }
}
C3.prototype = C3;
const v16 = new C3();
const v17 = v16?.constructor;
try { new v17(); } catch (e) {}
new C3();
new C3();
-392;
new Int16Array(392);
let v25 = 14;
v25++;
Int32Array.BYTES_PER_ELEMENT = Int32Array;
new Int32Array(v25);
BigUint64Array.prototype = BigUint64Array;
new BigUint64Array(2);
try {
    function f32() {
    }
    ("test/mjsunit/wasm/wasm-constants.js")[23];
    try { load.constructor(BigUint64Array); } catch (e) {}
    let v37;
    try { v37 = load("test/mjsunit/wasm/wasm-constants.js"); } catch (e) {}
    v37 ?? v37;
    let v40;
    try { v40 = load("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
    v40 ?? v40;
    let v43;
    try { v43 = new WasmModuleBuilder(); } catch (e) {}
    const builder = v43;
    try { builder.addMemory(16, 32); } catch (e) {}
    const v50 = [kExprI32Const,12];
    let v53;
    try { v53 = builder.addFunction("test", kSig_i_v); } catch (e) {}
    try { v53.addBody(v50); } catch (e) {}
    const v55 = (a56) => {
        try { f32(); } catch (e) {}
    };
    const t48 = WebAssembly?.Module?.prototype;
    t48.then = v55;
    let v61;
    try { v61 = builder.toBuffer(); } catch (e) {}
    try { WebAssembly.instantiate(v61); } catch (e) {}
} catch(e63) {
}
