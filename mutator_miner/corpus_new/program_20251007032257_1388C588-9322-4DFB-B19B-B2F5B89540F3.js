try {
    function f0() {
    }
    const v3 = d8?.file;
    try { v3.execute("../../v8/v8/test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
    let v6;
    try { v6 = new WasmModuleBuilder(); } catch (e) {}
    const builder = v6;
    try { builder.startRecGroup(); } catch (e) {}
    let v11;
    try { v11 = wasmRefNullType(kWasmNullExternRef); } catch (e) {}
    let v14;
    try { v14 = makeField(v11, false); } catch (e) {}
    let v17;
    try { v17 = makeField(kWasmI32, false); } catch (e) {}
    let v19;
    try { v19 = makeField(kWasmI32, false); } catch (e) {}
    const v20 = [v14,v17,v19];
    try { builder.addStruct(v20); } catch (e) {}
    const v22 = [];
    try { builder.addStruct(v22); } catch (e) {}
    try { builder.addArray(kWasmI32, true); } catch (e) {}
    try { builder.addArray(kWasmI32, true); } catch (e) {}
    try { builder.endRecGroup(); } catch (e) {}
    const v29 = [kWasmI32,kWasmI32,kWasmI32];
    const v30 = [kWasmI32];
    let v32;
    try { v32 = makeSig(v29, v30); } catch (e) {}
    try { builder.addType(v32); } catch (e) {}
    try { builder.startRecGroup(); } catch (e) {}
    const v35 = [];
    const v36 = [];
    let v37;
    try { v37 = makeSig(v35, v36); } catch (e) {}
    try { builder.addType(v37); } catch (e) {}
    try { builder.endRecGroup(); } catch (e) {}
    try { builder.addMemory(16, 32); } catch (e) {}
    try { builder.addTable(kWasmFuncRef, 2, 2, undefined); } catch (e) {}
    let v51;
    try { v51 = wasmI32Const(0); } catch (e) {}
    const v57 = [[kExprRefFunc,0],[kExprRefFunc,1]];
    try { builder.addActiveElementSegment(0, v51, v57, kWasmFuncRef); } catch (e) {}
    const v59 = [];
    const v60 = [];
    let v61;
    try { v61 = makeSig(v59, v60); } catch (e) {}
    try { builder.addTag(v61); } catch (e) {}
    const v180 = [kExprI32Const,1,kExprCallIndirect,5,0,kExprI32Const,1,kExprCallIndirect,5,0,kExprI32Const,1,kExprCallIndirect,5,0,kExprI32Const,1,kExprCallIndirect,5,0,kExprI32Const,1,kExprCallIndirect,5,0,kExprI32Const,214,0,kExprI32Const,163,43,kExprI32Const,216,0,kExprI32Const,0,kExprReturnCallIndirect,4,0,kExprI32Const,229,185,211,158,1,kExprI32LoadMem8S,0,193,1,kExprI32Const,20,kExprI32RemS,kGCPrefix,kExprArrayNew,3,kGCPrefix,kExprRefCastNull,3,kGCPrefix,kExprRefCastNull,3,kGCPrefix,kExprRefCast,3,kExprLocalSet,4,kExprI32Const,179,231,164,206,2,kGCPrefix,kExprRefI31,kExprLocalSet,5,kGCPrefix,kExprStructNew,1,kExprLocalSet,6,kExprI32Const,174,170,179,163,2,kExprI32Const,208,189,253,168,1,kExprI32Const,20,kExprI32RemS,kGCPrefix,kExprArrayNew,2,kExprLocalSet,10,kExprRefNull,114,kExprI32Const,245,195,155,129,4,kExprI32Const,170,186,156,238,5,kGCPrefix,kExprStructNew,0,kExprLocalSet,13,kExprI32Const,149,250,151,140,120,kExprI32Const,151,243,134,155,120,kExprI32Const,20,kExprI32RemS,kGCPrefix,kExprArrayNew,2,kExprLocalSet,14,kExprRefNull,114,kExprI32Const,248,185,128,156,125,kExprI32Const,146,226,247,231,124,kGCPrefix,kExprStructNew,0,kExprLocalSet,16,kExprI32Const,149,188,236,171,126,kExprEnd];
    let v182;
    try { v182 = wasmRefNullType(2); } catch (e) {}
    let v186;
    try { v186 = wasmRefType(kWasmEqRef); } catch (e) {}
    let v191;
    try { v191 = wasmRefType(2); } catch (e) {}
    let v193;
    try { v193 = wasmRefType(kWasmEqRef); } catch (e) {}
    let v197;
    try { v197 = wasmRefNullType(3); } catch (e) {}
    let v200;
    try { v200 = wasmRefType(kWasmArrayRef); } catch (e) {}
    let v204;
    try { v204 = wasmRefNullType(1); } catch (e) {}
    let v207;
    try { v207 = wasmRefNullType(3); } catch (e) {}
    let v210;
    try { v210 = wasmRefType(1); } catch (e) {}
    let v213;
    try { v213 = wasmRefType(kWasmI31Ref); } catch (e) {}
    let v215;
    try { v215 = wasmRefType(kWasmEqRef); } catch (e) {}
    let v218;
    try { v218 = wasmRefNullType(4); } catch (e) {}
    let v222;
    try { v222 = builder.addFunction(undefined, 4); } catch (e) {}
    let v223;
    try { v223 = v222.addLocals(v218, 1); } catch (e) {}
    let v224;
    try { v224 = v223.addLocals(v215, 1); } catch (e) {}
    let v225;
    try { v225 = v224.addLocals(v213, 1); } catch (e) {}
    let v226;
    try { v226 = v225.addLocals(v210, 1); } catch (e) {}
    let v227;
    try { v227 = v226.addLocals(v207, 1); } catch (e) {}
    let v228;
    try { v228 = v227.addLocals(v204, 1); } catch (e) {}
    let v229;
    try { v229 = v228.addLocals(kWasmI32, 1); } catch (e) {}
    let v230;
    try { v230 = v229.addLocals(v200, 1); } catch (e) {}
    let v231;
    try { v231 = v230.addLocals(v197, 1); } catch (e) {}
    let v232;
    try { v232 = v231.addLocals(kWasmI32, 1); } catch (e) {}
    let v233;
    try { v233 = v232.addLocals(v193, 1); } catch (e) {}
    let v234;
    try { v234 = v233.addLocals(v191, 1); } catch (e) {}
    let v235;
    try { v235 = v234.addLocals(kWasmF32, 1); } catch (e) {}
    let v236;
    try { v236 = v235.addLocals(v186, 1); } catch (e) {}
    let v237;
    try { v237 = v236.addLocals(v182, 1); } catch (e) {}
    try { v237.addBodyWithEnd(v180); } catch (e) {}
    const v690 = [kExprI32Const,140,199,174,141,124,kExprF64Const,138,122,212,44,198,246,243,21,kExprF64Const,237,225,37,22,63,202,136,125,kExprF64Ne,kExprI64Const,185,223,214,218,243,153,53,kExprTry,126,kExprF32Const,179,182,244,146,kExprF32Trunc,kExprF32Trunc,kExprF32NearestInt,kExprI32SConvertF32,kAtomicPrefix,kExprI64AtomicLoad32U,2,224,232,1,kExprEnd,kExprI64ShrS,kAtomicPrefix,kExprI64AtomicStore16U,1,143,212,3,kExprRefNull,110,kGCPrefix,kExprRefCastNull,107,kGCPrefix,kExprExternConvertAny,kExprBrOnNull,0,kExprDrop,kExprI64Const,180,143,137,201,135,253,237,183,197,0,kAtomicPrefix,kExprI64AtomicOr,3,16,kExprI32Const,1,kExprCallIndirect,5,0,kExprI32Const,1,kExprCallIndirect,5,0,kExprI32Const,100,kExprI32Const,189,127,kExprI32Const,255,0,kExprI32Const,0,kExprCallIndirect,4,0,kExprNop,kExprF32Const,165,123,78,152,kExprF32Const,217,104,182,60,kExprF32NearestInt,kExprF32Add,kExprF32NearestInt,kExprF32NearestInt,kExprI32ReinterpretF32,kExprF32Const,101,136,1,94,kExprF32Const,225,203,227,29,kExprF32Eq,kExprI64LoadMem8U,0,149,42,kAtomicPrefix,kExprI64AtomicStore16U,1,180,233,2,kExprI32Const,133,133,201,163,2,kExprI32Const,129,174,248,153,7,kExprI32Const,0,kExprCallIndirect,4,0,kExprNop,kExprI64Const,209,145,248,255,232,132,193,184,18,kExprI64Const,225,130,201,182,216,131,158,191,243,0,kExprI64Shl,kExprI64Const,149,251,228,174,206,178,173,216,71,kExprI64Const,222,255,228,152,150,227,162,153,59,kExprI64Const,139,181,176,135,227,184,244,160,199,0,kExprI64Shl,kExprI64Shl,kExprI64Const,204,145,253,157,191,231,220,191,94,kExprI32Const,199,138,226,213,120,kExprI64Const,190,238,243,205,143,164,157,132,20,kAtomicPrefix,kExprI64AtomicSub16U,1,157,1,kExprI32Const,137,153,134,151,124,kExprI64Const,143,202,202,238,133,129,212,154,67,kAtomicPrefix,kExprI64AtomicSub16U,1,157,187,2,kExprI64Shl,kExprI64Shl,kExprI64Shl,kExprI64Shl,kExprI32Const,175,159,205,137,6,kExprI32Const,177,212,199,138,4,kExprI32Add,kExprI32Const,213,232,187,178,126,kExprI32Const,253,171,159,141,124,kExprI32Add,kExprI32Const,229,234,137,132,5,kExprI64Const,138,241,227,240,171,147,240,248,18,kAtomicPrefix,kExprI64AtomicSub16U,1,157,187,2,kAtomicPrefix,kExprI64AtomicSub16U,1,157,187,2,kAtomicPrefix,kExprI64AtomicSub16U,1,157,187,2,kExprI64Shl,kAtomicPrefix,kExprI64AtomicOr8U,0,250,230,1,kExprI32Const,203,171,139,141,125,kExprI32Const,227,135,226,207,3,kExprI32Add,kExprI32Const,187,237,164,196,123,kExprI32LoadMem8U,0,51,kExprI32LoadMem16U,0,231,202,3,kExprI64Const,52,kExprRefNull,110,kExprBrOnNull,0,kExprDrop,kExprI64Const,180,179,168,222,211,171,198,239,179,127,kExprI64DivU,kAtomicPrefix,kExprI64AtomicXor,3,240,170,1,kAtomicPrefix,kExprI64AtomicAdd32U,2,157,187,2,kExprI64RemS,kExprI64Eq,kSimdPrefix,kExprS128Load32Splat,1,100,kExprI32Const,0,kSimdPrefix,kExprI8x16Splat,kExprI32Const,0,kSimdPrefix,kExprI8x16Splat,kExprI32Const,0,kSimdPrefix,kExprI8x16Splat,kExprI32Const,0,kSimdPrefix,kExprI8x16Splat,kExprI32Const,0,kSimdPrefix,kExprI8x16Splat,kSimdPrefix,kExprI16x8UConvertI32x4,1,kSimdPrefix,kExprI8x16MaxU,kSimdPrefix,kExprI16x8UConvertI32x4,1,kSimdPrefix,kExprI16x8UConvertI32x4,1,kSimdPrefix,kExprI16x8ExtMulLowI8x16S,1,kSimdPrefix,kExprF32x4Neg,1,kSimdPrefix,kExprI16x8Abs,1,kExprI32Const,0,kSimdPrefix,kExprI8x16Splat,kExprI32Const,0,kSimdPrefix,kExprI8x16Splat,kSimdPrefix,kExprI16x8LeU,kSimdPrefix,kExprF64x2Eq,kSimdPrefix,kExprF64x2Trunc,kSimdPrefix,kExprI16x8UConvertI8x16Low,1,kSimdPrefix,kExprF32x4Abs,1,kSimdPrefix,kExprI16x8ExtractLaneS,0,kExprI32LoadMem8S,0,252,194,3,kExprI32Const,0,kSimdPrefix,kExprI8x16Splat,kExprI32Const,0,kSimdPrefix,kExprI8x16Splat,kSimdPrefix,kExprS128Const,243,19,247,138,242,73,197,179,179,194,226,178,80,244,116,35,kSimdPrefix,kExprF32x4SConvertI32x4,1,kSimdPrefix,kExprF32x4SConvertI32x4,1,kSimdPrefix,kExprF32x4Pmin,1,kExprI32Const,0,kSimdPrefix,kExprI8x16Splat,kSimdPrefix,kExprI16x8SubSatU,1,kSimdPrefix,kExprI8x16Shuffle,15,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,kExprI32Const,0,kSimdPrefix,kExprI8x16Splat,kExprI32Const,0,kSimdPrefix,kExprI8x16Splat,kSimdPrefix,kExprF64x2Lt,kSimdPrefix,kExprF32x4SConvertI32x4,1,kSimdPrefix,kExprF32x4SConvertI32x4,1,kSimdPrefix,kExprF32x4SConvertI32x4,1,kSimdPrefix,kExprF32x4SConvertI32x4,1,kSimdPrefix,kExprF32x4SConvertI32x4,1,kSimdPrefix,kExprF32x4SConvertI32x4,1,kSimdPrefix,kExprF32x4SConvertI32x4,1,kSimdPrefix,kExprF32x4SConvertI32x4,1,kSimdPrefix,kExprI16x8AddSatU,1,kExprRefNull,107,kGCPrefix,kExprRefCastNull,1,kGCPrefix,kExprRefCastNull,3,kGCPrefix,kExprRefCastNull,3,kGCPrefix,kExprRefCastNull,3,kExprRefIsNull,kSimdPrefix,kExprS128Load8x8S,2,190,231,3,kSimdPrefix,kExprI16x8SConvertI8x16Low,1,kSimdPrefix,kExprI16x8SConvertI8x16Low,1,kSimdPrefix,kExprI16x8SConvertI8x16Low,1,kSimdPrefix,kExprI16x8SConvertI8x16Low,1,kSimdPrefix,kExprI16x8UConvertI8x16Low,1,kSimdPrefix,kExprI16x8SConvertI8x16Low,1,kSimdPrefix,kExprI16x8SConvertI8x16Low,1,kSimdPrefix,kExprI16x8SConvertI8x16Low,1,kSimdPrefix,kExprI16x8SConvertI8x16Low,1,kSimdPrefix,kExprI16x8SConvertI8x16Low,1,kSimdPrefix,kExprF32x4SConvertI32x4,1,kSimdPrefix,kExprF32x4SConvertI32x4,1,kSimdPrefix,kExprF32x4SConvertI32x4,1,kSimdPrefix,kExprF32x4SConvertI32x4,1,kSimdPrefix,kExprF32x4SConvertI32x4,1,kSimdPrefix,kExprF32x4SConvertI32x4,1,kSimdPrefix,kExprF32x4SConvertI32x4,1,kSimdPrefix,kExprF32x4SConvertI32x4,1,kSimdPrefix,kExprI16x8Ne,kSimdPrefix,kExprS128Store8Lane,0,183,139,1,0,kExprEnd];
    let v695;
    try { v695 = builder.addFunction(undefined, 5); } catch (e) {}
    let v696;
    try { v696 = v695.addLocals(kWasmS128, 1); } catch (e) {}
    try { v696.addBodyWithEnd(v690); } catch (e) {}
    try { builder.addExport("main", 0); } catch (e) {}
    let v701;
    try { v701 = builder.instantiate(); } catch (e) {}
    const instance = v701;
    try {
        const v706 = instance?.exports;
        let v707;
        try { v707 = v706.main(1, 2, 3); } catch (e) {}
        try { f0(v707); } catch (e) {}
    } catch(e709) {
        try { f0("caught exception", e709); } catch (e) {}
    }
} catch(e712) {
}
