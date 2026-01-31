try {
    try { load("test/mjsunit/wasm/wasm-constants.js"); } catch (e) {}
    try { load("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
    let v6;
    try { v6 = new WasmModuleBuilder(); } catch (e) {}
    const builder = v6;
    const v19 = [kExprI32Const,0,kExprIf,kWasmI32,kExprI32Const,0,kExprElse,kExprI32Const,1,kExprEnd,kExprTeeLocal,0,kExprI32Popcnt];
    const v21 = { i32_count: 7 };
    let v24;
    try { v24 = builder.addFunction(undefined, kSig_i_i); } catch (e) {}
    let v25;
    try { v25 = v24.addLocals(v21); } catch (e) {}
    try { v25.addBody(v19); } catch (e) {}
    try { builder.instantiate(); } catch (e) {}
} catch(e28) {
}
