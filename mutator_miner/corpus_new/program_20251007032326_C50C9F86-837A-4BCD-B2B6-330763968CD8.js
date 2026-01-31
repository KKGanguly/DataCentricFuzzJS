try {
    const v2 = d8?.file;
    try { v2.execute("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
    let v5;
    try { v5 = new WasmModuleBuilder(); } catch (e) {}
    const builder = v5;
    const v7 = [];
    const v11 = [kWasmS128,kWasmF64,kWasmS128,kWasmF64,kWasmF64,kWasmF32,kWasmF64,kWasmS128,kWasmF32];
    let v13;
    try { v13 = makeSig(v7, v11); } catch (e) {}
    try { builder.addType(v13); } catch (e) {}
    const v77 = [kExprBlock,0,kExprF64Const,0,0,0,0,0,0,0,0,kExprI32Const,0,kSimdPrefix,kExprI8x16Splat,kExprF64Const,0,0,0,0,0,0,0,0,kExprI32Const,0,kSimdPrefix,kExprI8x16Splat,kExprF64Const,0,0,0,0,0,0,0,0,kExprF64Const,0,0,0,0,0,0,0,0,kExprF32Const,0,0,0,0,kExprF64Const,0,0,0,0,0,0,0,0,kExprI32Const,0,kSimdPrefix,kExprI8x16Splat,kExprF32Const,0,0,0,0,kExprBr,0,kExprUnreachable,kExprEnd,kExprUnreachable];
    let v80;
    try { v80 = builder.addFunction("foo", kSig_v_v); } catch (e) {}
    try { v80.addBody(v77); } catch (e) {}
    try { builder.toModule(); } catch (e) {}
} catch(e83) {
}
