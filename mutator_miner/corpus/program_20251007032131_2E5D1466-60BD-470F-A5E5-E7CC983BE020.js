try {
    function f0() {
    }
    try { load("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
    let v5;
    try { v5 = new WasmModuleBuilder(); } catch (e) {}
    const builder = v5;
    try { builder.addMemory(16, 32, false, true); } catch (e) {}
    try { builder.addGlobal(kWasmI32, 1); } catch (e) {}
    try { builder.addGlobal(kWasmI32, 1); } catch (e) {}
    try { builder.addGlobal(kWasmF32, 1); } catch (e) {}
    try { builder.addGlobal(kWasmI32, 1); } catch (e) {}
    const v22 = [kWasmI32,kWasmI32,kWasmI32];
    const v23 = [kWasmI32];
    let v25;
    try { v25 = makeSig(v22, v23); } catch (e) {}
    try { builder.addType(v25); } catch (e) {}
    const v27 = [];
    const v29 = [kWasmF64,kWasmI32,kWasmF64,kWasmF32,kWasmI32];
    let v30;
    try { v30 = makeSig(v27, v29); } catch (e) {}
    try { builder.addType(v30); } catch (e) {}
    const v33 = [kWasmF64,kWasmI32,kWasmF64,kWasmF32,kWasmI32,kWasmI32,kWasmF32,kWasmF32,kWasmI32,kWasmI32,kWasmI32,kWasmI64,kWasmI64,kWasmF32,kWasmI32];
    const v34 = [];
    let v35;
    try { v35 = makeSig(v33, v34); } catch (e) {}
    try { builder.addType(v35); } catch (e) {}
    const v101 = [kExprI32Const,0,kExprLocalTee,0,kExprI32Const,0,kExprIf,kWasmStmt,kExprI32Const,0,kExprI64Const,0,kExprI64StoreMem32,0,1,kExprBr,0,kExprBlock,1,kExprF64Const,0,0,0,0,0,0,0,0,kExprI32Const,0,kExprF64Const,0,0,0,0,0,0,0,0,kExprF32Const,0,0,0,0,kExprI32Const,0,kExprEnd,kExprI32Const,0,kExprF32Const,0,0,0,0,kExprF32Const,0,0,0,0,kExprI32Const,0,kExprI32Const,0,kExprI32Const,0,kExprI64Const,0,kExprI64Const,0,kExprF32Const,0,0,0,0,kExprI32Const,0,kExprBlock,2,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprEnd,kExprElse,kExprEnd,kExprEnd];
    const v103 = { i32_count: 4 };
    let v106;
    try { v106 = builder.addFunction(undefined, 0); } catch (e) {}
    let v107;
    try { v107 = v106.addLocals(v103); } catch (e) {}
    try { v107.addBodyWithEnd(v101); } catch (e) {}
    try { builder.addExport("main", 0); } catch (e) {}
    let v112;
    try { v112 = builder.instantiate(); } catch (e) {}
    const instance = v112;
    const v117 = instance?.exports;
    let v118;
    try { v118 = v117.main(1, 2, 3); } catch (e) {}
    try { f0(v118); } catch (e) {}
} catch(e120) {
}
