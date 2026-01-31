try {
    try { load("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
    let v4;
    try { v4 = new WasmModuleBuilder(); } catch (e) {}
    const builder = v4;
    try { builder.addGlobal(kWasmI32, 1); } catch (e) {}
    const v9 = [];
    const v11 = [kWasmF64];
    let v13;
    try { v13 = makeSig(v9, v11); } catch (e) {}
    try { builder.addType(v13); } catch (e) {}
    const v65 = [kExprGlobalGet,0,kExprLocalSet,0,kExprI32Const,0,kExprI32Eqz,kExprLocalSet,1,kExprGlobalGet,0,kExprLocalSet,2,kExprI32Const,1,kExprI32Const,1,kExprI32Sub,kExprLocalSet,3,kExprGlobalGet,0,kExprLocalSet,4,kExprI32Const,0,kExprI32Eqz,kExprLocalSet,5,kExprGlobalGet,0,kExprLocalSet,6,kExprI32Const,0,kExprI32Const,1,kExprI32Sub,kExprLocalSet,7,kExprBlock,kWasmStmt,kExprI32Const,0,kExprIf,kWasmStmt,kExprLocalGet,10,kExprLocalSet,8,kExprElse,kExprNop,kExprEnd,kExprLocalGet,8,kExprLocalSet,9,kExprLocalGet,9,kExprI64Const,255,1,kExprI64Add,kExprDrop,kExprEnd,kExprF64Const,0,0,0,0,0,0,240,63,kExprEnd];
    let v71;
    try { v71 = builder.addFunction(undefined, 0); } catch (e) {}
    let v72;
    try { v72 = v71.addLocals(kWasmI32, 8); } catch (e) {}
    let v73;
    try { v73 = v72.addLocals(kWasmI64, 3); } catch (e) {}
    try { v73.addBodyWithEnd(v65); } catch (e) {}
    try { builder.instantiate(); } catch (e) {}
} catch(e76) {
}
