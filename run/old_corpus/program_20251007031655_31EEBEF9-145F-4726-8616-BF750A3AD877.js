try {
    try { load("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
    let v4;
    try { v4 = new WasmModuleBuilder(); } catch (e) {}
    const builder = v4;
    try { builder.addMemory(1, 1, false, true); } catch (e) {}
    try { builder.addGlobal(kWasmI32, 1); } catch (e) {}
    try { builder.addGlobal(kWasmI32, 1); } catch (e) {}
    const v17 = [kWasmI32,kWasmI64,kWasmI32];
    const v18 = [];
    let v20;
    try { v20 = makeSig(v17, v18); } catch (e) {}
    try { builder.addType(v20); } catch (e) {}
    const v68 = [kExprI32Const,0,kExprLocalSet,4,kExprI32Const,1,kExprLocalSet,5,kExprBlock,kWasmStmt,kExprBr,0,kExprEnd,kExprGlobalGet,1,kExprLocalSet,3,kExprLocalGet,3,kExprI32Const,1,kExprI32Sub,kExprLocalSet,6,kExprI64Const,1,kExprLocalSet,1,kExprI32Const,0,kExprI32Eqz,kExprLocalSet,7,kExprBlock,kWasmStmt,kExprBr,0,kExprEnd,kExprGlobalGet,1,kExprLocalSet,8,kExprI32Const,1,kExprI32Const,1,kExprI32Sub,kExprLocalSet,9,kExprLocalGet,0,kExprLocalSet,10,kExprGlobalGet,0,kExprLocalSet,11,kExprI32Const,0,kExprI32Const,15,kExprI32And,kExprLocalSet,12,kExprI32Const,0,kAtomicPrefix,kExprI64AtomicLoad,3,4,kExprDrop,kExprUnreachable,kExprEnd];
    let v72;
    try { v72 = builder.addFunction(undefined, 0); } catch (e) {}
    let v73;
    try { v73 = v72.addLocals(kWasmI32, 10); } catch (e) {}
    try { v73.addBodyWithEnd(v68); } catch (e) {}
    try { builder.toModule(); } catch (e) {}
} catch(e76) {
}
