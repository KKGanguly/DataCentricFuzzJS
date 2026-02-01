try {
    try { load("test/mjsunit/wasm/wasm-constants.js"); } catch (e) {}
    try { load("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
    let v6;
    try { v6 = new WasmModuleBuilder(); } catch (e) {}
    const builder = v6;
    const v9 = [kWasmI32,kWasmI32,kWasmI32];
    const v11 = [kWasmI64];
    let v13;
    try { v13 = makeSig(v9, v11); } catch (e) {}
    let v14;
    try { v14 = builder.addType(v13); } catch (e) {}
    const sig = v14;
    const v19 = [kExprI64Const,1,kExprI64SExtendI8];
    let v21;
    try { v21 = builder.addFunction("main", sig); } catch (e) {}
    try { v21.addBody(v19); } catch (e) {}
    try { builder.instantiate(); } catch (e) {}
} catch(e24) {
}
