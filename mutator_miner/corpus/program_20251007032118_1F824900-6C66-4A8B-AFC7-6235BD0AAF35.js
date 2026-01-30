try {
    try { load("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
    let v4;
    try { v4 = new WasmModuleBuilder(); } catch (e) {}
    const builder = v4;
    try { builder.addMemory(19, 32, false); } catch (e) {}
    try { builder.addGlobal(kWasmI32, 0); } catch (e) {}
    const v13 = [];
    const v14 = [];
    let v16;
    try { v16 = makeSig(v13, v14); } catch (e) {}
    try { builder.addType(v16); } catch (e) {}
    const v21 = [kWasmI64,kWasmS128,kWasmF32];
    const v22 = [kWasmI32];
    let v23;
    try { v23 = makeSig(v21, v22); } catch (e) {}
    try { builder.addType(v23); } catch (e) {}
    const v30 = [kExprI32Const,5,kExprReturn,kExprUnreachable,kExprEnd];
    let v33;
    try { v33 = builder.addFunction(undefined, 0); } catch (e) {}
    try { v33.addBodyWithEnd(v30); } catch (e) {}
    const v60 = [kExprLocalGet,1,kExprLocalGet,1,kExprGlobalGet,0,kExprDrop,kExprLoop,kWasmStmt,kExprLoop,0,kExprI32Const,1,kExprMemoryGrow,0,kExprI64LoadMem8U,0,112,kExprLoop,0,kExprCallFunction,0,kExprEnd,kExprI64Const,241,36,kExprGlobalGet,0,kExprDrop,kExprBr,0,kExprEnd,kExprEnd,kExprI32Const,91,kExprReturn,kExprEnd];
    let v63;
    try { v63 = builder.addFunction(undefined, 1); } catch (e) {}
    try { v63.addBodyWithEnd(v60); } catch (e) {}
    let v65;
    try { v65 = builder.instantiate(); } catch (e) {}
    const instance = v65;
} catch(e67) {
}
