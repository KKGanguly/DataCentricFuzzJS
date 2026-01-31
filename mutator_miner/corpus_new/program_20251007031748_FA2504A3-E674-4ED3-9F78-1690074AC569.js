try {
    try { load("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
    let v4;
    try { v4 = new WasmModuleBuilder(); } catch (e) {}
    const builder = v4;
    try { builder.addMemory(1, 1, false, true); } catch (e) {}
    try { builder.addGlobal(kWasmI32, 1); } catch (e) {}
    const v15 = [kWasmI32,kWasmI64,kWasmI64,kWasmI64];
    const v17 = [kWasmF32];
    let v19;
    try { v19 = makeSig(v15, v17); } catch (e) {}
    let v20;
    try { v20 = builder.addType(v19); } catch (e) {}
    const sig = v20;
    const v91 = [kExprLocalGet,27,kExprLocalSet,28,kExprI32Const,0,kExprIf,kWasmStmt,kExprGlobalGet,0,kExprLocalSet,30,kExprBlock,kWasmStmt,kExprGlobalGet,0,kExprLocalSet,33,kExprBlock,kWasmStmt,kExprBlock,kWasmStmt,kExprBlock,kWasmStmt,kExprGlobalGet,0,kExprLocalSet,10,kExprI32Const,0,kExprLocalSet,40,kExprLocalGet,0,kExprLocalSet,11,kExprI32Const,0,kExprBrIf,1,kExprEnd,kExprUnreachable,kExprEnd,kExprI32Const,1,kExprLocalSet,54,kExprI32Const,0,kExprIf,kWasmStmt,kExprEnd,kExprLocalGet,0,kExprLocalSet,16,kExprI32Const,0,kExprI32Eqz,kExprLocalSet,56,kExprBlock,kWasmStmt,kExprI32Const,127,kExprI32Eqz,kExprLocalSet,57,kExprI32Const,1,kExprIf,kWasmStmt,kExprGlobalGet,0,kExprLocalSet,17,kExprI32Const,0,kExprI32Eqz,kExprLocalSet,18,kExprGlobalGet,0,kExprLocalSet,19,kExprI32Const,0,kExprI32Const,1,kExprI32Sub,kExprLocalSet,58,kExprI32Const,0,kAtomicPrefix,kExprI64AtomicLoad16U,1,4,kExprDrop,kExprI64Const,1,kExprLocalSet,68,kExprI64Const,1,kExprLocalSet,62,kExprElse,kExprNop,kExprEnd,kExprLocalGet,64,kExprLocalSet,65,kExprLocalGet,65,kExprI64Const,75,kExprI64Add,kExprDrop,kExprEnd,kExprEnd,kExprUnreachable,kExprEnd,kExprUnreachable,kExprEnd,kExprF32Const,0,0,132,66,kExprEnd];
    const v93 = { i64_count: 11 };
    const v95 = { i32_count: 57 };
    let v97;
    try { v97 = builder.addFunction(undefined, sig); } catch (e) {}
    let v98;
    try { v98 = v97.addLocals(v95); } catch (e) {}
    let v99;
    try { v99 = v98.addLocals(v93); } catch (e) {}
    try { v99.addBodyWithEnd(v91); } catch (e) {}
    let v101;
    try { v101 = builder.instantiate(); } catch (e) {}
    const instance = v101;
} catch(e103) {
}
