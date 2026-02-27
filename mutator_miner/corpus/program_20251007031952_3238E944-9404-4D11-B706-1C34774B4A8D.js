function f0() {
}
try { load("test/mjsunit/wasm/wasm-constants.js"); } catch (e) {}
try { load("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
function f6() {
    let v8;
    try { v8 = new WasmModuleBuilder(); } catch (e) {}
    const builder = v8;
    try { builder.addMemory(16, 32); } catch (e) {}
    const v14 = [kWasmI32,kWasmI32,kWasmI32];
    const v15 = [kWasmI32];
    let v17;
    try { v17 = makeSig(v14, v15); } catch (e) {}
    sig1 = v17;
    const v54 = [kExprI32Const,225,200,213,1,kExprI32Const,226,228,0,kExprI32Sub,kExprF32Const,0,0,0,0,kExprF32Const,201,201,201,0,kExprF32Eq,kExprI32LoadMem,1,239,236,149,147,7,kExprI32Add,kExprIf,kWasmStmt,kExprEnd,kExprI32Const,201,147,223,204,124,kExprEnd];
    let v57;
    try { v57 = builder.addFunction(undefined, sig1); } catch (e) {}
    try { v57.addBodyWithEnd(v54); } catch (e) {}
    try { builder.addExport("main", 0); } catch (e) {}
    let v62;
    try { v62 = builder.instantiate(); } catch (e) {}
    const instance = v62;
    const v65 = (a66) => {
        const v70 = instance?.exports;
        let v71;
        try { v71 = v70.main(1, 2, 3); } catch (e) {}
        return v71;
    };
    try { f0(kTrapMemOutOfBounds, v65); } catch (e) {}
}
try { f6(); } catch (e) {}
