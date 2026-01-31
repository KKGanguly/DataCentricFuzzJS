try {
    try { load("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
    let v4;
    try { v4 = new WasmModuleBuilder(); } catch (e) {}
    const builder = v4;
    try { builder.addMemory(16, 32, false, true); } catch (e) {}
    const v14 = [kWasmF64,kWasmI64,kWasmI32,kWasmF64];
    const v15 = [];
    let v17;
    try { v17 = makeSig(v14, v15); } catch (e) {}
    const sig = v17;
    const v30 = [kExprI32Const,0,kExprI32Const,0,kExprI32Const,0,kAtomicPrefix,kExprI32AtomicXor16U,1,0,kAtomicPrefix,kExprI32AtomicStore8U,0,0];
    let v32;
    try { v32 = builder.addFunction(undefined, sig); } catch (e) {}
    try { v32.addBody(v30); } catch (e) {}
    try { builder.instantiate(); } catch (e) {}
} catch(e35) {
}
