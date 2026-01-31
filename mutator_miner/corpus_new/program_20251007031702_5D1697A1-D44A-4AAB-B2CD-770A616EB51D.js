try {
    try { load("test/mjsunit/wasm/wasm-constants.js"); } catch (e) {}
    try { load("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
    let v6;
    try { v6 = new WasmModuleBuilder(); } catch (e) {}
    const builder = v6;
    const v10 = [kWasmI32,kWasmI64];
    const v11 = [];
    let v13;
    try { v13 = makeSig(v10, v11); } catch (e) {}
    let v14;
    try { v14 = builder.addType(v13); } catch (e) {}
    const sig = v14;
    const v42 = [kExprI32Const,0,kExprIf,kWasmI32,kExprI32Const,0,kExprElse,kExprI32Const,1,kExprEnd,kExprTeeLocal,0,kExprGetLocal,0,kExprLoop,kWasmStmt,kExprI64Const,128,128,128,112,kExprSetLocal,1,kExprI32Const,0,kExprIf,kWasmI32,kExprI32Const,0,kExprElse,kExprI32Const,0,kExprEnd,kExprBrIf,0,kExprUnreachable,kExprEnd,kExprUnreachable];
    let v44;
    try { v44 = builder.addFunction(undefined, sig); } catch (e) {}
    try { v44.addBody(v42); } catch (e) {}
    try { builder.instantiate(); } catch (e) {}
} catch(e47) {
}
