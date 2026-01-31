try {
    try { load("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
    let v4;
    try { v4 = new WasmModuleBuilder(); } catch (e) {}
    const builder = v4;
    try { builder.addMemory(1, 1, false, true); } catch (e) {}
    const v11 = [];
    const v12 = [];
    let v14;
    try { v14 = makeSig(v11, v12); } catch (e) {}
    try { builder.addType(v14); } catch (e) {}
    const v17 = [kWasmI64];
    const v19 = [kWasmF32];
    let v20;
    try { v20 = makeSig(v17, v19); } catch (e) {}
    try { builder.addType(v20); } catch (e) {}
    const v24 = [kExprNop,kExprEnd];
    let v27;
    try { v27 = builder.addFunction(undefined, 0); } catch (e) {}
    try { v27.addBodyWithEnd(v24); } catch (e) {}
    const v52 = [kExprBlock,kWasmF32,kExprI32Const,0,kExprI32Const,1,kExprIf,kWasmI64,kExprI64Const,0,kExprElse,kExprUnreachable,kExprEnd,kAtomicPrefix,kExprI64AtomicStore,3,4,kExprF32Const,0,0,0,0,kExprEnd,kExprDrop,kExprF32Const,0,0,128,81,kExprEnd];
    let v56;
    try { v56 = builder.addFunction(undefined, 1); } catch (e) {}
    let v57;
    try { v57 = v56.addLocals(kWasmI64, 1); } catch (e) {}
    try { v57.addBodyWithEnd(v52); } catch (e) {}
    try { builder.instantiate(); } catch (e) {}
} catch(e60) {
}
