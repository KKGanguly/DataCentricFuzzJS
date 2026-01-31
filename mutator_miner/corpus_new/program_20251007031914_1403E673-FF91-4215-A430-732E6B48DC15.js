try {
    function f0() {
    }
    try { load("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
    let v5;
    try { v5 = new WasmModuleBuilder(); } catch (e) {}
    const builder = v5;
    const v69 = [kExprI32Const,55,kSimdPrefix,kExprI8x16Splat,kExprI32Const,185,242,216,1,kSimdPrefix,kExprI8x16Splat,kSimdPrefix,kExprS128AndNot,kExprI32Const,178,242,0,kSimdPrefix,kExprI8x16Splat,kExprI32Const,0,kSimdPrefix,kExprI8x16Splat,kExprI32Const,242,130,2,kSimdPrefix,kExprI8x16Splat,kSimdPrefix,kExprF64x2Max,1,kSimdPrefix,kExprI16x8Add,1,kSimdPrefix,kExprS128Or,kSimdPrefix,kExprI8x16Neg,kExprI32Const,142,28,kSimdPrefix,kExprI8x16Splat,kExprI32Const,0,kSimdPrefix,kExprI8x16Splat,kExprI32Const,157,38,kSimdPrefix,kExprI8x16Splat,kExprI32Const,240,224,1,kSimdPrefix,kExprI8x16Splat,kSimdPrefix,kExprI8x16LeS,kSimdPrefix,kExprI8x16LeS,kExprI32Const,255,251,3,kSimdPrefix,kExprI8x16Splat,kExprI32Const,147,38,kSimdPrefix,kExprI8x16Splat,kExprI32Const,157,38,kSimdPrefix,kExprI8x16Splat,kSimdPrefix,kExprI8x16GtU,kExprI32Const,240,0,kSimdPrefix,kExprI8x16Splat,kSimdPrefix,kExprI16x8Mul,1,kSimdPrefix,kExprF32x4Ge,kSimdPrefix,kExprI8x16LeS,kSimdPrefix,kExprI8x16LeS,kExprI32Const,0,kSimdPrefix,kExprI8x16Splat,kExprI32Const,193,142,53,kSimdPrefix,kExprI8x16Splat,kExprI32Const,13,kSimdPrefix,kExprI8x16Splat,kSimdPrefix,kExprI32x4Ne,kSimdPrefix,kExprF32x4Ge,kSimdPrefix,kExprI8x16LeS,kExprI32Const,193,142,53,kSimdPrefix,kExprI8x16Splat,kExprI32Const,13,kSimdPrefix,kExprI8x16Splat,kSimdPrefix,kExprS128Select,kSimdPrefix,kExprF64x2Div,1,kSimdPrefix,kExprF64x2ExtractLane,0,kNumericPrefix,kExprI32SConvertSatF64,kExprEnd];
    let v72;
    try { v72 = builder.addFunction(undefined, kSig_i_v); } catch (e) {}
    try { v72.addBodyWithEnd(v69); } catch (e) {}
    try { builder.addExport("main", 0); } catch (e) {}
    let v77;
    try { v77 = builder.instantiate(); } catch (e) {}
    const instance = v77;
    const v79 = instance?.exports;
    let v80;
    try { v80 = v79.main(); } catch (e) {}
    try { f0(v80); } catch (e) {}
} catch(e82) {
}
