try {
    function foo0() {
        try { console.log("foo0"); } catch (e) {}
    }
    function foo1() {
        try { console.log("foo1"); } catch (e) {}
    }
    const v10 = d8?.file;
    try { v10.execute("wasm-module-builder.js"); } catch (e) {}
    let v13;
    try { v13 = new WasmModuleBuilder(); } catch (e) {}
    const builder = v13;
    const v15 = [];
    try { builder.addStruct(v15); } catch (e) {}
    try { builder.addArray(kWasmFuncRef, true); } catch (e) {}
    try { builder.startRecGroup(); } catch (e) {}
    const v22 = [kWasmI32,kWasmI32,kWasmI32];
    const v23 = [kWasmI32];
    let v25;
    try { v25 = makeSig(v22, v23); } catch (e) {}
    try { builder.addType(v25); } catch (e) {}
    let v30;
    try { v30 = wasmRefType(2); } catch (e) {}
    const v31 = [kWasmS128,kWasmS128,kWasmI32,kWasmI32,v30,kWasmS128,kWasmS128,kWasmS128,kWasmI32,kWasmI32,kWasmI32,kWasmI32,kWasmI32,kWasmI32,kWasmI32];
    let v34;
    try { v34 = wasmRefNullType(kWasmNullExternRef); } catch (e) {}
    let v36;
    try { v36 = wasmRefType(kWasmArrayRef); } catch (e) {}
    let v39;
    try { v39 = wasmRefType(kWasmFuncRef); } catch (e) {}
    let v41;
    try { v41 = wasmRefNullType(kWasmNullExternRef); } catch (e) {}
    let v43;
    try { v43 = wasmRefType(3); } catch (e) {}
    let v44;
    try { v44 = wasmRefType(kWasmExternRef); } catch (e) {}
    const v45 = [v34,kWasmI32,kWasmI32,kWasmI32,v36,kWasmI32,kWasmExternRef,kWasmI32,kWasmI32,kWasmF32,v39,kWasmEqRef,v41,v43,v44];
    let v46;
    try { v46 = makeSig(v31, v45); } catch (e) {}
    try { builder.addType(v46); } catch (e) {}
    try { builder.endRecGroup(); } catch (e) {}
    const v49 = [];
    const v50 = [];
    let v51;
    try { v51 = makeSig(v49, v50); } catch (e) {}
    try { builder.addType(v51); } catch (e) {}
    try { builder.addMemory(16, 32); } catch (e) {}
    try { builder.addTable(kWasmFuncRef, 2, 2, undefined); } catch (e) {}
    let v63;
    try { v63 = wasmI32Const(0); } catch (e) {}
    const v69 = [[kExprRefFunc,0],[kExprRefFunc,1]];
    try { builder.addActiveElementSegment(0, v63, v69, kWasmFuncRef); } catch (e) {}
    const v71 = [];
    const v72 = [];
    let v73;
    try { v73 = makeSig(v71, v72); } catch (e) {}
    try { builder.addTag(v73); } catch (e) {}
    try { builder.addImport("mod", "foo0", 2); } catch (e) {}
    try { builder.addImport("mod", "foo1", 3); } catch (e) {}
    const v382 = [kExprF32Const,196,244,202,55,kExprF32Const,198,33,199,247,kExprI32Const,0,kSimdPrefix,kExprI8x16Splat,kExprI32Const,246,150,140,198,121,kNumericPrefix,kExprTableSize,0,kExprI32GeS,kSimdPrefix,kExprI16x8Shl,1,kExprI32Const,0,kSimdPrefix,kExprI8x16Splat,kExprI32Const,104,kSimdPrefix,kExprI8x16ShrU,kExprI32Const,179,138,1,kSimdPrefix,kExprI8x16ShrU,kSimdPrefix,kExprI32x4Mul,1,kSimdPrefix,kExprS128Const,253,222,199,88,113,13,7,48,90,167,86,184,63,223,159,187,kExprI32Const,92,kExprI32Const,193,0,kExprRefFunc,0,kSimdPrefix,kExprS128Const,111,174,251,44,92,215,207,239,237,16,228,146,238,215,62,80,kExprI32Const,0,kSimdPrefix,kExprI8x16Splat,kExprI32Const,0,kSimdPrefix,kExprI8x16Splat,kExprI32Const,247,211,194,191,121,kExprI32Const,157,226,210,148,127,kExprI32DivU,kExprI32Const,225,201,228,250,2,kExprI32Const,239,175,163,191,2,kExprI32Const,173,226,255,251,120,kExprI32Const,212,226,247,246,0,kExprI32Const,162,192,183,219,121,kExprI32Const,151,230,200,235,120,kExprRefFunc,1,kExprCallRef,3,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprBlock,64,kExprTry,127,kExprF32Const,167,89,213,152,kExprI32Const,173,225,132,146,124,kExprI64Const,250,218,146,155,243,149,209,131,240,0,kAtomicPrefix,kExprI64AtomicStore32U,2,181,235,2,kExprF32Sqrt,kExprF32Sqrt,kExprF32Sqrt,kExprF32Sqrt,kExprF32Sqrt,kExprF32Sqrt,kExprF32Sqrt,kNumericPrefix,kExprI32SConvertSatF32,kExprI32Const,232,206,189,242,124,kAtomicPrefix,kExprI32AtomicXor16U,1,186,234,2,kExprCatch,0,kExprI32Const,242,235,139,223,1,kExprCatchAll,kExprI32Const,154,219,175,138,4,kExprEnd,kExprF32Const,165,205,0,255,kExprI32Const,139,240,229,179,7,kExprRefNull,112,kExprI32Const,197,254,182,210,120,kNumericPrefix,kExprTableFill,0,kExprI32Const,133,186,183,221,3,kExprIf,64,kExprEnd,kNumericPrefix,kExprTableSize,0,kExprI32Const,162,212,182,228,120,kExprI32Const,175,171,165,196,122,kNumericPrefix,kExprTableCopy,0,0,kExprLoop,64,kExprLoop,64,kExprLoop,64,kExprLoop,64,kExprEnd,kExprEnd,kExprEnd,kExprEnd,kNumericPrefix,kExprTableSize,0,kExprIf,125,kExprBlock,125,kSimdPrefix,kExprS128Const,118,189,212,35,127,190,141,174,115,59,20,32,160,209,153,206,kSimdPrefix,kExprI16x8ExtractLaneU,0,kExprF32UConvertI32,kExprEnd,kExprElse,kExprF32Const,176,21,27,102,kExprEnd,kExprF32Min,kExprF32Const,84,122,138,51,kExprI32Const,230,226,175,150,7,kExprF32Const,222,160,136,41,kExprF32StoreMem,0,1,kExprF32Min,kExprF32Sqrt,kExprF32Sqrt,kExprF32Sqrt,kExprF32Sqrt,kExprF32Sqrt,kExprF32Sqrt,kExprF32Sqrt,kExprF32Sqrt,kExprF32Sqrt,kExprF32Sqrt,kExprF32Sqrt,kExprF32Sqrt,kExprF32Sqrt,kExprF32Sqrt,kExprF32Sqrt,kExprF32StoreMem,1,1,kExprThrow,0,kExprI32Const,201,130,196,154,2,kExprI32Const,0,kSimdPrefix,kExprI8x16Splat,kExprI32Const,251,0,kSimdPrefix,kExprI8x16ReplaceLane,0,kSimdPrefix,kExprI16x8SConvertI8x16Low,1,kSimdPrefix,kExprI16x8SConvertI8x16Low,1,kSimdPrefix,kExprI16x8SConvertI8x16Low,1,kSimdPrefix,kExprI16x8SConvertI8x16Low,1,kSimdPrefix,kExprI16x8SConvertI8x16Low,1,kSimdPrefix,kExprI16x8SConvertI8x16Low,1,kSimdPrefix,kExprI16x8SConvertI8x16Low,1,kSimdPrefix,kExprI16x8SConvertI8x16Low,1,kSimdPrefix,kExprI16x8SConvertI8x16Low,1,kSimdPrefix,kExprI16x8SConvertI8x16Low,1,kExprI32Const,0,kSimdPrefix,kExprI8x16Splat,kSimdPrefix,kExprI16x8SConvertI8x16Low,1,kSimdPrefix,kExprI16x8SConvertI8x16Low,1,kSimdPrefix,kExprI16x8SConvertI8x16Low,1,kSimdPrefix,kExprI16x8SConvertI8x16Low,1,kSimdPrefix,kExprI32x4MinU,1,kSimdPrefix,kExprS128Store64Lane,0,245,235,3,1,kExprEnd,kExprF32CopySign,kExprF32Sqrt,kExprF32Sqrt,kNumericPrefix,kExprI32SConvertSatF32,kExprEnd];
    let v384;
    try { v384 = wasmRefNullType(kWasmStructRef); } catch (e) {}
    let v387;
    try { v387 = wasmRefNullType(kWasmNullRef); } catch (e) {}
    let v389;
    try { v389 = wasmRefNullType(kWasmStructRef); } catch (e) {}
    let v393;
    try { v393 = builder.addFunction(undefined, 2); } catch (e) {}
    let v394;
    try { v394 = v393.addLocals(v389, 6); } catch (e) {}
    let v395;
    try { v395 = v394.addLocals(v387, 1); } catch (e) {}
    let v396;
    try { v396 = v395.addLocals(v384, 14); } catch (e) {}
    try { v396.addBodyWithEnd(v382); } catch (e) {}
    const v463 = [kGCPrefix,kExprStructNew,0,kExprLocalSet,21,kExprRefFunc,0,kExprLocalSet,22,kExprI32Const,245,230,244,233,0,kGCPrefix,kExprRefI31,kExprLocalSet,24,kExprRefNull,114,kExprI32Const,167,214,140,232,121,kExprI32Const,225,170,179,251,1,kExprI32Const,221,194,198,246,5,kExprRefNull,112,kExprI32Const,247,128,209,14,kExprI32Const,20,kExprI32RemS,kGCPrefix,kExprArrayNew,1,kExprI32Const,166,231,131,202,120,kExprRefNull,111,kExprI32Const,234,221,168,245,123,kExprI32Const,245,245,154,219,122,kExprF32Const,246,41,45,47,kExprRefFunc,0,kExprRefNull,109,kExprRefNull,114,kExprRefFunc,1,kExprRefNull,111,kExprRefAsNonNull,kExprEnd];
    let v466;
    try { v466 = wasmRefNullType(2); } catch (e) {}
    let v469;
    try { v469 = wasmRefType(kWasmI31Ref); } catch (e) {}
    let v472;
    try { v472 = wasmRefNullType(1); } catch (e) {}
    let v475;
    try { v475 = wasmRefType(2); } catch (e) {}
    let v478;
    try { v478 = wasmRefType(0); } catch (e) {}
    let v481;
    try { v481 = wasmRefNullType(kWasmI31Ref); } catch (e) {}
    let v483;
    try { v483 = wasmRefNullType(kWasmStructRef); } catch (e) {}
    let v487;
    try { v487 = builder.addFunction(undefined, 3); } catch (e) {}
    let v488;
    try { v488 = v487.addLocals(v483, 4); } catch (e) {}
    let v489;
    try { v489 = v488.addLocals(v481, 1); } catch (e) {}
    let v490;
    try { v490 = v489.addLocals(kWasmS128, 1); } catch (e) {}
    let v491;
    try { v491 = v490.addLocals(v478, 1); } catch (e) {}
    let v492;
    try { v492 = v491.addLocals(v475, 1); } catch (e) {}
    let v493;
    try { v493 = v492.addLocals(v472, 1); } catch (e) {}
    let v494;
    try { v494 = v493.addLocals(v469, 1); } catch (e) {}
    let v495;
    try { v495 = v494.addLocals(v466, 1); } catch (e) {}
    let v496;
    try { v496 = v495.addLocals(kWasmI32, 10); } catch (e) {}
    try { v496.addBodyWithEnd(v463); } catch (e) {}
    try { builder.addExport("main", 2); } catch (e) {}
    let v501;
    try { v501 = builder.toBuffer(); } catch (e) {}
    x = v501;
    const v504 = WebAssembly?.Module;
    let v506;
    try { v506 = new v504(x); } catch (e) {}
    const v4 = v506;
    function foo() {
    }
    const o15 = { foo0: foo, foo1: foo };
    const o16 = { mod: o15 };
    const v513 = WebAssembly?.Instance;
    let v514;
    try { v514 = new v513(v4, o16); } catch (e) {}
    const v18 = v514;
    const t172 = v18?.exports?.main;
    try { t172(1, 2, 3); } catch (e) {}
} catch(e523) {
}
