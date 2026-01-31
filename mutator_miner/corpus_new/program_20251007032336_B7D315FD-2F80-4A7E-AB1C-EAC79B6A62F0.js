try {
    function f0() {
    }
    const v3 = d8?.file;
    try { v3.execute("../../v8/v8/test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
    let v6;
    try { v6 = new WasmModuleBuilder(); } catch (e) {}
    const builder = v6;
    let v11;
    try { v11 = makeField(kWasmF32, false); } catch (e) {}
    let v14;
    try { v14 = makeField(kWasmF64, false); } catch (e) {}
    const v15 = [v11,v14];
    try { builder.addStruct(v15); } catch (e) {}
    const v17 = [];
    try { builder.addStruct(v17); } catch (e) {}
    let v20;
    try { v20 = makeField(kWasmF32, false); } catch (e) {}
    let v22;
    try { v22 = makeField(kWasmF64, false); } catch (e) {}
    let v25;
    try { v25 = wasmRefNullType(kWasmArrayRef); } catch (e) {}
    let v27;
    try { v27 = makeField(v25, false); } catch (e) {}
    let v30;
    try { v30 = makeField(kWasmEqRef, true); } catch (e) {}
    let v33;
    try { v33 = makeField(kWasmS128, true); } catch (e) {}
    let v36;
    try { v36 = wasmRefType(kWasmFuncRef); } catch (e) {}
    let v38;
    try { v38 = makeField(v36, true); } catch (e) {}
    const v39 = [v20,v22,v27,v30,v33,v38];
    try { builder.addStruct(v39, 0); } catch (e) {}
    const v42 = [];
    try { builder.addStruct(v42); } catch (e) {}
    try { builder.addArray(kWasmS128, true); } catch (e) {}
    let v46;
    try { v46 = wasmRefType(kWasmFuncRef); } catch (e) {}
    try { builder.addArray(v46, true); } catch (e) {}
    try { builder.addArray(kWasmS128, true, 4); } catch (e) {}
    try { builder.addArray(kWasmI32, true); } catch (e) {}
    const v55 = [kWasmI32,kWasmI32,kWasmI32];
    const v56 = [kWasmI32];
    let v58;
    try { v58 = makeSig(v55, v56); } catch (e) {}
    try { builder.addType(v58); } catch (e) {}
    const v60 = [];
    const v61 = [];
    let v62;
    try { v62 = makeSig(v60, v61); } catch (e) {}
    try { builder.addType(v62); } catch (e) {}
    try { builder.startRecGroup(); } catch (e) {}
    const v65 = [];
    const v66 = [];
    let v67;
    try { v67 = makeSig(v65, v66); } catch (e) {}
    try { builder.addType(v67); } catch (e) {}
    try { builder.endRecGroup(); } catch (e) {}
    try { builder.addMemory(16, 32); } catch (e) {}
    try { builder.addTable(kWasmFuncRef, 3, 3, undefined); } catch (e) {}
    let v80;
    try { v80 = wasmI32Const(0); } catch (e) {}
    const v88 = [[kExprRefFunc,0],[kExprRefFunc,1],[kExprRefFunc,2]];
    try { builder.addActiveElementSegment(0, v80, v88, kWasmFuncRef); } catch (e) {}
    const v90 = [];
    const v91 = [];
    let v92;
    try { v92 = makeSig(v90, v91); } catch (e) {}
    try { builder.addTag(v92); } catch (e) {}
    const v171 = [kExprCallFunction,2,kExprRefFunc,1,kGCPrefix,kExprRefCastNull,10,kExprCallRef,10,kExprF64Const,43,18,23,194,150,138,213,43,kExprF64Const,138,14,202,129,100,9,152,131,kExprF64Ne,kExprI32Const,208,206,251,185,123,kExprI32Const,236,132,226,242,124,kExprI32RemU,kExprI32Const,132,168,161,222,121,kExprCallFunction,0,kExprNop,kExprF64UConvertI32,kNumericPrefix,kExprI32UConvertSatF64,kExprI32Const,207,154,245,202,2,kExprBlock,127,kExprI32Const,198,202,195,252,120,kExprI32Const,213,196,153,199,126,kExprBrTable,1,0,0,kExprEnd,kAtomicPrefix,kExprI32AtomicOr16U,1,192,149,2,kExprI32ShrS,kExprEnd];
    let v175;
    try { v175 = builder.addFunction(undefined, 8); } catch (e) {}
    let v176;
    try { v176 = v175.addLocals(kWasmF32, 1); } catch (e) {}
    try { v176.addBodyWithEnd(v171); } catch (e) {}
    const v178 = [kExprEnd];
    let v181;
    try { v181 = builder.addFunction(undefined, 9); } catch (e) {}
    try { v181.addBodyWithEnd(v178); } catch (e) {}
    const v318 = [kExprI32Const,0,kSimdPrefix,kExprI8x16Splat,kSimdPrefix,kExprS128Const,169,155,52,254,37,39,12,187,104,18,134,189,209,61,32,218,kSimdPrefix,kExprS128AndNot,kSimdPrefix,kExprI8x16ExtractLaneS,4,kExprIf,64,kExprTry,64,kExprI32Const,239,0,kExprI32Const,182,154,180,255,1,kExprI32Const,158,253,143,213,121,kExprI32Const,153,175,204,229,123,kAtomicPrefix,kExprI64AtomicLoad,3,145,239,3,kExprI64StoreMem,2,132,132,3,kExprI32Const,213,143,207,250,1,kExprI32Const,0,kExprCallIndirect,8,0,kExprDrop,kExprI32Const,168,186,172,228,125,kExprI32Const,157,240,196,207,122,kAtomicPrefix,kExprI32AtomicExchange16U,1,172,228,1,kExprI32Const,130,219,151,38,kExprI32Shl,kExprF64Const,96,9,208,141,168,84,247,103,kExprF32ConvertF64,kExprF32Const,17,238,232,19,kExprF32Sub,kSimdPrefix,kExprF32x4Splat,kSimdPrefix,kExprI64x2BitMask,1,kExprI32Const,144,169,202,164,6,kExprI64Const,208,188,189,251,231,144,180,178,90,kAtomicPrefix,kExprI64AtomicSub32U,2,192,128,1,kAtomicPrefix,kExprI64AtomicExchange32U,2,190,175,3,kAtomicPrefix,kExprI64AtomicStore,3,242,211,3,kExprCatch,0,kExprCatchAll,kExprEnd,kExprEnd,kExprEnd];
    let v321;
    try { v321 = builder.addFunction(undefined, 10); } catch (e) {}
    try { v321.addBodyWithEnd(v318); } catch (e) {}
    try { builder.addExport("main", 0); } catch (e) {}
    let v326;
    try { v326 = builder.instantiate(); } catch (e) {}
    const instance = v326;
    try {
        const v331 = instance?.exports;
        let v332;
        try { v332 = v331.main(1, 2, 3); } catch (e) {}
        try { f0(v332); } catch (e) {}
    } catch(e334) {
        try { f0("caught exception", e334); } catch (e) {}
    }
} catch(e337) {
}
