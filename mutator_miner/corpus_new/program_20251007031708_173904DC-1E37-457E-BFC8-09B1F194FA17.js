try {
    function f0() {
    }
    try { load("test/mjsunit/wasm/wasm-constants.js"); } catch (e) {}
    try { load("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
    let v7;
    try { v7 = new WasmModuleBuilder(); } catch (e) {}
    const builder = v7;
    try { builder.addMemory(16, 32); } catch (e) {}
    const v14 = [kExprI32Const,12];
    let v17;
    try { v17 = builder.addFunction("test", kSig_i_v); } catch (e) {}
    try { v17.addBody(v14); } catch (e) {}
    const v19 = (a20) => {
        try { f0(); } catch (e) {}
    };
    const t16 = WebAssembly?.Module?.prototype;
    t16.then = v19;
    let v25;
    try { v25 = builder.toBuffer(); } catch (e) {}
    try { WebAssembly.instantiate(v25); } catch (e) {}
} catch(e27) {
}
