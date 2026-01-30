try {
    function f0() {
    }
    try { load("test/mjsunit/wasm/wasm-constants.js"); } catch (e) {}
    try { load("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
    let v7;
    try { v7 = new WasmModuleBuilder(); } catch (e) {}
    let builder = v7;
    const v15 = [kExprI32Const,0,kExprI32Const,0,kExprI32And,kExprI32Const,0,kExprI32ShrU];
    let v18;
    try { v18 = builder.addFunction("kaboom", kSig_i_v); } catch (e) {}
    let v19;
    try { v19 = v18.addBody(v15); } catch (e) {}
    try { v19.exportFunc(); } catch (e) {}
    let v21;
    try { v21 = builder.instantiate(); } catch (e) {}
    let instance = v21;
    const v24 = instance?.exports;
    let v25;
    try { v25 = v24.kaboom(); } catch (e) {}
    try { f0(0, v25); } catch (e) {}
} catch(e27) {
}
