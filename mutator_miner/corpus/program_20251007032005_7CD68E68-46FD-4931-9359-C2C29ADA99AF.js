try {
    try { load("test/mjsunit/wasm/wasm-constants.js"); } catch (e) {}
    try { load("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
    let v6;
    try { v6 = new WasmModuleBuilder(); } catch (e) {}
    const builder = v6;
    try { builder.addMemory(16, 32); } catch (e) {}
    const v13 = [kExprI32Const,12];
    let v16;
    try { v16 = builder.addFunction("test", kSig_i_v); } catch (e) {}
    try { v16.addBody(v13); } catch (e) {}
    let bla = 0;
    const v21 = WebAssembly?.Module;
    let v22;
    try { v22 = builder.toBuffer(); } catch (e) {}
    let v23;
    try { v23 = new v21(v22); } catch (e) {}
    let module = v23;
    const v25 = (a26) => {
        let v28;
        try { v28 = a26(1094795585); } catch (e) {}
        return v28;
    };
    module.then = v25;
    try { WebAssembly.instantiate(module); } catch (e) {}
} catch(e30) {
}
