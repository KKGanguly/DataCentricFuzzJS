try {
    function f0() {
    }
    try { load("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
    let v5;
    try { v5 = new WasmModuleBuilder(); } catch (e) {}
    const builder = v5;
    try { builder.addMemory(16, 32, false, true); } catch (e) {}
    const v39 = [kExprI32Const,0,kExprI32Const,0,kExprI32Const,0,kExprSelectWithType,1,127,kExprMemoryGrow,0,kExprI32Const,176,222,201,3,kSimdPrefix,kExprI8x16Splat,kExprI32Const,0,kSimdPrefix,kExprI8x16Splat,kExprI32Const,176,224,192,1,kSimdPrefix,kExprI8x16Splat,kSimdPrefix,kExprI64x2ExtMulHighI32x4U,1,kSimdPrefix,kExprF32x4Le,kSimdPrefix,kExprI32x4ExtractLane,0,kExprI32DivS,kExprEnd];
    let v44;
    try { v44 = builder.addFunction(undefined, kSig_i_v); } catch (e) {}
    let v45;
    try { v45 = v44.addLocals(kWasmI64, 1); } catch (e) {}
    try { v45.addBodyWithEnd(v39); } catch (e) {}
    try { builder.addExport("main", 0); } catch (e) {}
    let v50;
    try { v50 = builder.instantiate(); } catch (e) {}
    const instance = v50;
    const v52 = () => {
        const v53 = instance?.exports;
        let v54;
        try { v54 = v53.main(); } catch (e) {}
        return v54;
    };
    const v56 = WebAssembly?.RuntimeError;
    try { f0(v52, v56, "divide by zero"); } catch (e) {}
} catch(e59) {
}
