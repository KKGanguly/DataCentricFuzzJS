try {
    function f0() {
    }
    try { load("test/mjsunit/wasm/wasm-constants.js"); } catch (e) {}
    try { load("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
    let v7;
    try { v7 = new WasmModuleBuilder(); } catch (e) {}
    const builder = v7;
    const v23 = [kExprI64Const,163,130,131,134,140,216,174,181,64,kExprI32ConvertI64,kExprI32Const,0,kExprI32Sub];
    let v26;
    try { v26 = builder.addFunction("main", kSig_i_v); } catch (e) {}
    let v27;
    try { v27 = v26.addBody(v23); } catch (e) {}
    try { v27.exportFunc(); } catch (e) {}
    let v29;
    try { v29 = builder.instantiate(); } catch (e) {}
    const instance = v29;
    const v34 = instance?.exports;
    let v35;
    try { v35 = v34.main(1, 2, 3); } catch (e) {}
    try { f0(v35); } catch (e) {}
} catch(e37) {
}
