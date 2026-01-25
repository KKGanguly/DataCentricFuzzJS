try {
    try { load("test/mjsunit/wasm/wasm-constants.js"); } catch (e) {}
    try { load("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
    let v6;
    try { v6 = new WasmModuleBuilder(); } catch (e) {}
    const builder = v6;
    const v9 = [kWasmF32];
    const v11 = [kWasmI32];
    let v13;
    try { v13 = makeSig(v9, v11); } catch (e) {}
    let v14;
    try { v14 = builder.addType(v13); } catch (e) {}
    const sig0 = v14;
    const v17 = [kWasmI64,kWasmI32,kWasmI64,kWasmF32,kWasmI64];
    const v18 = [kWasmF32];
    let v19;
    try { v19 = makeSig(v17, v18); } catch (e) {}
    let v20;
    try { v20 = builder.addType(v19); } catch (e) {}
    const sig1 = v20;
    const v22 = [kWasmF32];
    const v23 = [kWasmF32];
    let v24;
    try { v24 = makeSig(v22, v23); } catch (e) {}
    let v25;
    try { v25 = builder.addType(v24); } catch (e) {}
    const sig2 = v25;
    const v29 = [kExprI32Const,0];
    let v31;
    try { v31 = builder.addFunction(undefined, sig0); } catch (e) {}
    try { v31.addBody(v29); } catch (e) {}
    const v80 = [kExprBlock,kWasmF32,kExprI32Const,0,kExprIf,kWasmStmt,kExprLoop,kWasmStmt,kExprBlock,kWasmI32,kExprF32Const,0,0,128,193,kExprF32Const,0,0,128,69,kExprCallFunction,0,kExprBrIf,3,kExprDrop,kExprI32Const,216,0,kExprEnd,kExprBrIf,0,kExprEnd,kExprF32Const,0,0,128,63,kExprF32Const,0,0,128,198,kExprBlock,kWasmI32,kExprF32Const,0,0,128,63,kExprCallFunction,2,kExprDrop,kExprI32Const,104,kExprEnd,kExprBrIf,1,kExprI32Const,0,kExprSelect,kExprDrop,kExprUnreachable,kExprElse,kExprNop,kExprEnd,kExprF32Const,0,0,105,67,kExprEnd];
    let v82;
    try { v82 = builder.addFunction(undefined, sig1); } catch (e) {}
    try { v82.addBody(v80); } catch (e) {}
    const v88 = [kExprF32Const,0,0,128,63];
    let v90;
    try { v90 = builder.addFunction(undefined, sig2); } catch (e) {}
    try { v90.addBody(v88); } catch (e) {}
    try { builder.instantiate(); } catch (e) {}
} catch(e93) {
}
