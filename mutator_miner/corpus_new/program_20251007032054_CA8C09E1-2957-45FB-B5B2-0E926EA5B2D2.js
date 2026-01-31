try {
    try { load("test/mjsunit/wasm/wasm-constants.js"); } catch (e) {}
    try { load("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
    let v6;
    try { v6 = new WasmModuleBuilder(); } catch (e) {}
    const builder = v6;
    const v8 = [];
    let v11;
    try { v11 = builder.addFunction(undefined, kSig_v_v); } catch (e) {}
    try { v11.addBody(v8); } catch (e) {}
    const v24 = [kExprGetLocal,0,kExprGetLocal,0,kExprLoop,kWasmStmt,kExprCallFunction,0,kExprBr,0,kExprEnd,kExprDrop];
    let v27;
    try { v27 = builder.addFunction(undefined, kSig_i_i); } catch (e) {}
    try { v27.addBody(v24); } catch (e) {}
    try { builder.instantiate(); } catch (e) {}
} catch(e30) {
}
