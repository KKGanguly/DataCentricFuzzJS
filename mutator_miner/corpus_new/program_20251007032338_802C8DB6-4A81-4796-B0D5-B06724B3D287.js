try {
    function f0() {
    }
    const v3 = d8?.file;
    try { v3.execute("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
    let v6;
    try { v6 = new WasmModuleBuilder(); } catch (e) {}
    const builder = v6;
    let v11;
    try { v11 = makeField(kWasmF32, false); } catch (e) {}
    let v14;
    try { v14 = makeField(kWasmAnyRef, false); } catch (e) {}
    let v17;
    try { v17 = wasmRefType(kWasmI31Ref); } catch (e) {}
    let v19;
    try { v19 = makeField(v17, false); } catch (e) {}
    let v22;
    try { v22 = makeField(kWasmI32, false); } catch (e) {}
    const v23 = [v11,v14,v19,v22];
    try { builder.addStruct(v23); } catch (e) {}
    const v25 = [];
    try { builder.addStruct(v25); } catch (e) {}
    const v27 = [];
    try { builder.addStruct(v27); } catch (e) {}
    const v29 = [];
    try { builder.addStruct(v29); } catch (e) {}
    try { builder.addArray(kWasmI32, true); } catch (e) {}
    try { builder.addArray(kWasmI32, true); } catch (e) {}
    const v35 = [kWasmI32,kWasmI32,kWasmI32];
    const v36 = [kWasmI32];
    let v38;
    try { v38 = makeSig(v35, v36); } catch (e) {}
    try { builder.addType(v38); } catch (e) {}
    const v40 = [];
    const v41 = [];
    let v42;
    try { v42 = makeSig(v40, v41); } catch (e) {}
    try { builder.addType(v42); } catch (e) {}
    const v44 = [];
    const v45 = [];
    let v46;
    try { v46 = makeSig(v44, v45); } catch (e) {}
    try { builder.addType(v46); } catch (e) {}
    try { builder.addMemory(16, 32); } catch (e) {}
    try { builder.addTable(kWasmFuncRef, 3, 3, undefined); } catch (e) {}
    let v59;
    try { v59 = wasmI32Const(0); } catch (e) {}
    const v67 = [[kExprRefFunc,0],[kExprRefFunc,1],[kExprRefFunc,2]];
    try { builder.addActiveElementSegment(0, v59, v67, kWasmFuncRef); } catch (e) {}
    const v69 = [];
    const v70 = [];
    let v71;
    try { v71 = makeSig(v69, v70); } catch (e) {}
    try { builder.addTag(v71); } catch (e) {}
    const v347 = [kExprLoop,124,kExprLoop,124,kExprLoop,124,kExprLoop,124,kExprLoop,124,kExprLoop,124,kExprTry,124,kExprF64Const,120,207,101,142,140,45,140,112,kExprCatch,0,kExprF64Const,234,152,28,56,104,192,61,140,kExprEnd,kExprEnd,kExprEnd,kExprEnd,kExprEnd,kExprEnd,kExprEnd,kExprF64Const,122,49,232,13,99,212,26,19,kExprF64Const,106,93,55,63,141,247,174,212,kExprF64Const,177,251,209,205,185,242,184,204,kExprF64CopySign,kExprF64CopySign,kExprLoop,124,kExprLoop,124,kExprF64Const,3,195,187,167,189,156,63,244,kExprEnd,kExprEnd,kExprF64CopySign,kExprF64Div,kExprLoop,124,kExprLoop,124,kExprLoop,124,kExprRefFunc,0,kExprCallFunction,2,kExprCallFunction,2,kExprF64Const,223,133,206,206,28,70,137,92,kExprI32Const,181,171,254,251,120,kExprI64Const,185,205,143,241,128,142,168,213,121,kExprI64StoreMem,0,144,32,kExprI32Const,159,129,182,181,121,kExprI64Const,172,178,213,194,159,203,181,148,101,kExprI64Const,161,173,175,160,200,201,139,240,125,kExprI64RemS,kExprI64StoreMem,2,144,32,kExprF64Const,22,30,229,170,17,64,4,189,kExprF64Const,188,30,114,34,70,74,9,76,kExprF64Const,54,249,253,119,29,13,147,206,kExprF64CopySign,kExprF64CopySign,kExprF64Const,29,36,61,207,239,142,226,170,kExprF64Const,95,206,237,70,65,228,156,149,kExprF64Div,kExprF64CopySign,kExprF64Div,kExprF64Const,129,3,190,50,20,115,232,164,kExprF64Div,kNumericPrefix,kExprI32UConvertSatF64,kExprRefNull,112,kExprI32Const,203,247,221,146,7,kNumericPrefix,kExprTableGrow,0,kExprI32Const,58,kExprI64Const,181,199,185,183,231,239,166,224,40,kAtomicPrefix,kExprI64AtomicExchange,0,184,112,kAtomicPrefix,kExprI64AtomicOr16U,1,184,112,kAtomicPrefix,kExprI64AtomicExchange,0,184,112,kExprF64ReinterpretI64,kNumericPrefix,kExprI32UConvertSatF64,kExprF64SConvertI32,kExprF64NearestInt,kNumericPrefix,kExprI32UConvertSatF64,kNumericPrefix,kExprTableGrow,0,kExprLocalTee,12,kExprF64SConvertI32,kExprEnd,kExprEnd,kExprEnd,kExprF64Div,kNumericPrefix,kExprI32UConvertSatF64,kGCPrefix,kExprRefI31,kGCPrefix,kExprRefCastNull,108,kGCPrefix,kExprRefCastNull,108,kGCPrefix,kExprRefCast,2,kExprLocalSet,4,kExprRefNull,110,kGCPrefix,kExprRefCast,2,kExprLocalSet,6,kGCPrefix,kExprStructNew,2,kExprLocalSet,7,kGCPrefix,kExprStructNew,2,kExprLocalSet,8,kGCPrefix,kExprStructNew,2,kExprLocalSet,9,kGCPrefix,kExprStructNew,2,kExprLocalSet,11,kExprI32Const,232,217,195,195,1,kExprI32Const,146,144,225,250,121,kExprI32Const,20,kExprI32RemS,kGCPrefix,kExprArrayNew,4,kExprLocalSet,13,kExprRefNull,111,kExprRefAsNonNull,kExprLocalSet,16,kExprRefNull,111,kExprRefAsNonNull,kExprLocalSet,17,kExprRefNull,111,kExprRefAsNonNull,kExprLocalSet,18,kExprRefNull,111,kExprRefAsNonNull,kExprLocalSet,19,kGCPrefix,kExprStructNew,2,kExprLocalSet,21,kGCPrefix,kExprStructNew,2,kExprLocalSet,22,kGCPrefix,kExprStructNew,2,kExprLocalSet,23,kGCPrefix,kExprStructNew,2,kExprLocalSet,24,kGCPrefix,kExprStructNew,2,kExprLocalSet,25,kExprI32Const,159,163,204,197,7,kExprEnd];
    let v350;
    try { v350 = wasmRefNullType(0); } catch (e) {}
    let v353;
    try { v353 = wasmRefType(2); } catch (e) {}
    let v358;
    try { v358 = wasmRefType(kWasmExternRef); } catch (e) {}
    let v361;
    try { v361 = wasmRefNullType(0); } catch (e) {}
    let v364;
    try { v364 = wasmRefNullType(2); } catch (e) {}
    let v367;
    try { v367 = wasmRefType(kWasmArrayRef); } catch (e) {}
    let v371;
    try { v371 = wasmRefType(2); } catch (e) {}
    let v375;
    try { v375 = wasmRefType(2); } catch (e) {}
    let v379;
    try { v379 = wasmRefType(2); } catch (e) {}
    let v382;
    try { v382 = wasmRefNullType(kWasmNullExternRef); } catch (e) {}
    let v386;
    try { v386 = builder.addFunction(undefined, 6); } catch (e) {}
    let v387;
    try { v387 = v386.addLocals(v382, 1); } catch (e) {}
    let v388;
    try { v388 = v387.addLocals(v379, 1); } catch (e) {}
    let v389;
    try { v389 = v388.addLocals(kWasmF32, 1); } catch (e) {}
    let v390;
    try { v390 = v389.addLocals(v375, 4); } catch (e) {}
    let v391;
    try { v391 = v390.addLocals(kWasmI32, 1); } catch (e) {}
    let v392;
    try { v392 = v391.addLocals(v371, 1); } catch (e) {}
    let v393;
    try { v393 = v392.addLocals(kWasmI32, 1); } catch (e) {}
    let v394;
    try { v394 = v393.addLocals(v367, 1); } catch (e) {}
    let v395;
    try { v395 = v394.addLocals(v364, 1); } catch (e) {}
    let v396;
    try { v396 = v395.addLocals(v361, 1); } catch (e) {}
    let v397;
    try { v397 = v396.addLocals(v358, 4); } catch (e) {}
    let v398;
    try { v398 = v397.addLocals(kWasmI64, 1); } catch (e) {}
    let v399;
    try { v399 = v398.addLocals(v353, 5); } catch (e) {}
    let v400;
    try { v400 = v399.addLocals(v350, 1); } catch (e) {}
    try { v400.addBodyWithEnd(v347); } catch (e) {}
    const v416 = [kGCPrefix,kExprStructNew,2,kExprLocalSet,1,kGCPrefix,kExprStructNew,2,kExprLocalSet,2,kExprRefNull,111,kExprRefAsNonNull,kExprLocalSet,8,kExprRefNull,111,kExprRefAsNonNull,kExprLocalSet,9,kGCPrefix,kExprStructNew,2,kExprLocalSet,10,kGCPrefix,kExprStructNew,2,kExprLocalSet,14,kGCPrefix,kExprStructNew,2,kExprLocalSet,15,kExprEnd];
    let v419;
    try { v419 = wasmRefType(2); } catch (e) {}
    let v422;
    try { v422 = wasmRefNullType(0); } catch (e) {}
    let v424;
    try { v424 = wasmRefNullType(kWasmNullExternRef); } catch (e) {}
    let v427;
    try { v427 = wasmRefType(2); } catch (e) {}
    let v429;
    try { v429 = wasmRefType(kWasmExternRef); } catch (e) {}
    let v432;
    try { v432 = wasmRefNullType(4); } catch (e) {}
    let v437;
    try { v437 = wasmRefNullType(1); } catch (e) {}
    let v442;
    try { v442 = wasmRefType(2); } catch (e) {}
    let v444;
    try { v444 = wasmRefNullType(kWasmNullExternRef); } catch (e) {}
    let v448;
    try { v448 = builder.addFunction(undefined, 7); } catch (e) {}
    let v449;
    try { v449 = v448.addLocals(v444, 1); } catch (e) {}
    let v450;
    try { v450 = v449.addLocals(v442, 2); } catch (e) {}
    let v451;
    try { v451 = v450.addLocals(kWasmF64, 1); } catch (e) {}
    let v452;
    try { v452 = v451.addLocals(kWasmI32, 1); } catch (e) {}
    let v453;
    try { v453 = v452.addLocals(v437, 1); } catch (e) {}
    let v454;
    try { v454 = v453.addLocals(kWasmF64, 1); } catch (e) {}
    let v455;
    try { v455 = v454.addLocals(v432, 1); } catch (e) {}
    let v456;
    try { v456 = v455.addLocals(v429, 2); } catch (e) {}
    let v457;
    try { v457 = v456.addLocals(v427, 1); } catch (e) {}
    let v458;
    try { v458 = v457.addLocals(v424, 1); } catch (e) {}
    let v459;
    try { v459 = v458.addLocals(v422, 2); } catch (e) {}
    let v460;
    try { v460 = v459.addLocals(v419, 2); } catch (e) {}
    let v461;
    try { v461 = v460.addLocals(kWasmI32, 4); } catch (e) {}
    try { v461.addBodyWithEnd(v416); } catch (e) {}
    const v595 = [kExprI32Const,0,kSimdPrefix,kExprI8x16Splat,kSimdPrefix,kExprI32x4ExtAddPairwiseI16x8S,kSimdPrefix,kExprI32x4ExtAddPairwiseI16x8S,kSimdPrefix,kExprI32x4ExtAddPairwiseI16x8S,kSimdPrefix,kExprI32x4ExtAddPairwiseI16x8S,kSimdPrefix,kExprI32x4ExtAddPairwiseI16x8S,kSimdPrefix,kExprI32x4ExtAddPairwiseI16x8S,kSimdPrefix,kExprI32x4ExtAddPairwiseI16x8S,kSimdPrefix,kExprI32x4ExtAddPairwiseI16x8S,kSimdPrefix,kExprI32x4ExtAddPairwiseI16x8S,kSimdPrefix,kExprI32x4ExtAddPairwiseI16x8S,kSimdPrefix,kExprI32x4ExtAddPairwiseI16x8S,kExprI32Const,0,kSimdPrefix,kExprI8x16Splat,kExprI32Const,0,kSimdPrefix,kExprI8x16Splat,kExprI32Const,0,kSimdPrefix,kExprI8x16Splat,kSimdPrefix,kExprI16x8SubSatU,1,kExprI32Const,0,kSimdPrefix,kExprI8x16Splat,kSimdPrefix,kExprI16x8Neg,1,kSimdPrefix,kExprI16x8Neg,1,kSimdPrefix,kExprF32x4Neg,1,kSimdPrefix,kExprI16x8Neg,1,kSimdPrefix,kExprI16x8Neg,1,kSimdPrefix,kExprI16x8Neg,1,kSimdPrefix,kExprI16x8Neg,1,kSimdPrefix,kExprI16x8Neg,1,kSimdPrefix,kExprI16x8Neg,1,kSimdPrefix,kExprI16x8Neg,1,kSimdPrefix,kExprI16x8Neg,1,kExprI32Const,0,kSimdPrefix,kExprI8x16Splat,kSimdPrefix,kExprI16x8AddSatS,1,kExprI32Const,0,kSimdPrefix,kExprI8x16Splat,kExprI32Const,0,kSimdPrefix,kExprI8x16Splat,kExprI32Const,0,kSimdPrefix,kExprI8x16Splat,kSimdPrefix,...kExprF32x4Qfma,kExprI64Const,161,188,247,176,159,195,205,139,75,kExprI32ConvertI64,kSimdPrefix,kExprI16x8Shl,1,kSimdPrefix,kExprI16x8Neg,1,kSimdPrefix,kExprI16x8Neg,1,kSimdPrefix,kExprI8x16GeU,kSimdPrefix,kExprI16x8Neg,1,kSimdPrefix,kExprI16x8Neg,1,kSimdPrefix,kExprI16x8Neg,1,kSimdPrefix,kExprI16x8Neg,1,kSimdPrefix,kExprI16x8Neg,1,kSimdPrefix,kExprI16x8Neg,1,kSimdPrefix,kExprI16x8Neg,1,kSimdPrefix,kExprI16x8Neg,1,kSimdPrefix,kExprI16x8Neg,1,kSimdPrefix,kExprI16x8Neg,1,kSimdPrefix,kExprI16x8Neg,1,kSimdPrefix,kExprI16x8Neg,1,kSimdPrefix,kExprI16x8Neg,1,kSimdPrefix,kExprF32x4Max,1,kSimdPrefix,kExprI16x8SubSatU,1,kExprI32Const,0,kSimdPrefix,kExprI8x16Splat,kSimdPrefix,kExprI16x8SubSatU,1,kSimdPrefix,kExprI32x4ExtAddPairwiseI16x8S,kSimdPrefix,kExprI32x4ExtAddPairwiseI16x8S,kSimdPrefix,kExprI32x4ExtAddPairwiseI16x8S,kSimdPrefix,kExprI32x4AllTrue,1,kSimdPrefix,kExprI32x4Splat,kSimdPrefix,kExprI32x4ExtAddPairwiseI16x8S,kSimdPrefix,kExprI8x16GeS,kSimdPrefix,kExprI32x4ExtAddPairwiseI16x8S,kSimdPrefix,kExprI32x4ExtAddPairwiseI16x8S,kSimdPrefix,kExprI32x4ExtAddPairwiseI16x8S,kSimdPrefix,kExprI32x4ExtAddPairwiseI16x8S,kSimdPrefix,kExprI32x4ExtAddPairwiseI16x8S,kSimdPrefix,kExprI32x4ExtAddPairwiseI16x8S,kSimdPrefix,kExprI32x4ExtAddPairwiseI16x8S,kSimdPrefix,kExprI32x4ExtAddPairwiseI16x8S,kSimdPrefix,kExprI32x4ExtAddPairwiseI16x8S,kSimdPrefix,kExprI32x4ExtAddPairwiseI16x8S,kSimdPrefix,kExprI32x4ExtAddPairwiseI16x8S,kSimdPrefix,kExprI32x4ExtAddPairwiseI16x8S,kSimdPrefix,kExprI32x4AllTrue,1,kExprF64Const,173,131,165,118,24,197,85,246,kExprF64Const,134,9,240,143,148,192,73,148,kExprF64Const,217,181,126,105,47,89,134,219,kExprF64Const,138,151,53,49,88,19,74,177,kExprF64Div,kExprF64Div,kExprF64Const,251,156,83,228,75,173,107,95,kExprF64Div,kExprF64Div,kNumericPrefix,kExprI32UConvertSatF64,kAtomicPrefix,kExprI32AtomicAdd8U,0,56,kExprIf,64,kExprI32Const,191,215,175,245,5,kExprI32Const,250,140,143,207,124,kExprI32Const,226,146,236,247,124,kExprRefFunc,0,kExprCallRef,6,kExprDrop,kExprEnd,kExprEnd];
    let v598;
    try { v598 = builder.addFunction(undefined, 8); } catch (e) {}
    try { v598.addBodyWithEnd(v595); } catch (e) {}
    try { builder.addExport("main", 0); } catch (e) {}
    let v603;
    try { v603 = builder.instantiate(); } catch (e) {}
    const instance = v603;
    try {
        const v608 = instance?.exports;
        let v609;
        try { v609 = v608.main(1, 2, 3); } catch (e) {}
        try { f0(v609); } catch (e) {}
    } catch(e611) {
        try { f0("caught exception", e611); } catch (e) {}
    }
} catch(e614) {
}
