try {
    try { load("test/mjsunit/wasm/wasm-constants.js"); } catch (e) {}
    try { load("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
    let v6;
    try { v6 = new WasmModuleBuilder(); } catch (e) {}
    const builder = v6;
    const v19 = [kExprGetLocal,1,kExprGetLocal,2,kExprGetLocal,0,kExprIf,kWasmI32,kExprI32Const,1,kExprElse,kExprUnreachable,kExprEnd,kExprUnreachable];
    const v21 = { f64_count: 1 };
    const v23 = { f32_count: 1 };
    const v25 = { i32_count: 1 };
    let v28;
    try { v28 = builder.addFunction(undefined, kSig_v_v); } catch (e) {}
    let v29;
    try { v29 = v28.addLocals(v25); } catch (e) {}
    let v30;
    try { v30 = v29.addLocals(v23); } catch (e) {}
    let v31;
    try { v31 = v30.addLocals(v21); } catch (e) {}
    try { v31.addBody(v19); } catch (e) {}
    try { builder.instantiate(); } catch (e) {}
} catch(e34) {
}
