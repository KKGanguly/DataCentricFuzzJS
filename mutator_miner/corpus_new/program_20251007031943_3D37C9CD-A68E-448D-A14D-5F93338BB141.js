[-26490,-60394,8,2147483648,257,2147483647];
[-52344];
const v2 = [-42555,3566,-36484,2088];
class C3 {
    static #valueOf(a5) {
        v2.length = 7;
        new Int8Array(127);
        new Float64Array(3);
        const v14 = new Int8Array(12);
        return v14;
    }
}
C3.e = C3;
new C3();
const v16 = new C3();
const v17 = v16?.constructor;
try { new v17(); } catch (e) {}
new C3();
try { new Int16Array(Int16Array, Int16Array, Int16Array); } catch (e) {}
new Int16Array(392);
new Int32Array(14);
BigUint64Array.prototype = BigUint64Array;
const v29 = new BigUint64Array(2);
try { v29.filter(v16); } catch (e) {}
try {
    function f31() {
    }
    let v34;
    try { v34 = load("test/mjsunit/wasm/wasm-constants.js"); } catch (e) {}
    v34 ?? v34;
    try { ("test/mjsunit/wasm/wasm-module-builder.js").endsWith("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
    try { load("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
    let v40;
    try { v40 = new WasmModuleBuilder(); } catch (e) {}
    const builder = v40;
    try { builder.addMemory(16, 32); } catch (e) {}
    const v47 = [kExprI32Const,12];
    let v50;
    try { v50 = builder.addFunction("test", kSig_i_v); } catch (e) {}
    try { v50.addBody(v47); } catch (e) {}
    const v52 = (a53) => {
        try { f31(); } catch (e) {}
    };
    const t43 = WebAssembly?.Module?.prototype;
    t43.then = v52;
    let v58;
    try { v58 = builder.toBuffer(); } catch (e) {}
    try { WebAssembly.instantiate(v58); } catch (e) {}
} catch(e60) {
}
