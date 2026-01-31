try {
    try { load("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
    let v4;
    try { v4 = new WasmModuleBuilder(); } catch (e) {}
    const builder = v4;
    try { builder.addMemory(1, 1, false, true); } catch (e) {}
    const v11 = [];
    const v13 = [kWasmI32];
    let v15;
    try { v15 = makeSig(v11, v13); } catch (e) {}
    let v16;
    try { v16 = builder.addType(v15); } catch (e) {}
    const sig = v16;
    const v44 = [kExprLocalGet,236,7,kExprLocalGet,234,7,kExprLocalGet,23,kExprLocalGet,181,1,kExprI32Const,0,kExprIf,kWasmI32,kExprI32Const,145,232,126,kExprElse,kExprI32Const,0,kExprEnd,kExprIf,kWasmStmt,kExprI32Const,0,kExprI32Const,0,kAtomicPrefix,kExprI32AtomicSub,1,4,kExprDrop,kExprEnd,kExprUnreachable,kExprEnd];
    const v46 = { i64_count: 3 };
    const v48 = { i32_count: 1002 };
    let v50;
    try { v50 = builder.addFunction(undefined, sig); } catch (e) {}
    let v51;
    try { v51 = v50.addLocals(v48); } catch (e) {}
    let v52;
    try { v52 = v51.addLocals(v46); } catch (e) {}
    try { v52.addBodyWithEnd(v44); } catch (e) {}
    let v54;
    try { v54 = builder.instantiate(); } catch (e) {}
    const instance = v54;
} catch(e56) {
}
