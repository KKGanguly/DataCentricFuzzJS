try {
    function f0() {
    }
    const v3 = d8?.file;
    try { v3.execute("v8/test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
    let v6;
    try { v6 = new WasmModuleBuilder(); } catch (e) {}
    const builder = v6;
    let v10;
    try { v10 = wasmRefNullType(kWasmI31Ref); } catch (e) {}
    let v13;
    try { v13 = makeField(v10, true); } catch (e) {}
    let v14;
    try { v14 = wasmRefNullType(kWasmI31Ref); } catch (e) {}
    let v16;
    try { v16 = makeField(v14, true); } catch (e) {}
    let v17;
    try { v17 = wasmRefNullType(kWasmI31Ref); } catch (e) {}
    let v19;
    try { v19 = makeField(v17, true); } catch (e) {}
    const v20 = [v13,v16,v19];
    try { builder.addStruct(v20); } catch (e) {}
    let v22;
    try { v22 = wasmRefNullType(kWasmI31Ref); } catch (e) {}
    let v24;
    try { v24 = makeField(v22, true); } catch (e) {}
    let v25;
    try { v25 = wasmRefNullType(kWasmI31Ref); } catch (e) {}
    let v27;
    try { v27 = makeField(v25, true); } catch (e) {}
    let v28;
    try { v28 = wasmRefNullType(kWasmI31Ref); } catch (e) {}
    let v30;
    try { v30 = makeField(v28, true); } catch (e) {}
    let v33;
    try { v33 = makeField(kWasmI8, true); } catch (e) {}
    let v35;
    try { v35 = makeField(kWasmI8, true); } catch (e) {}
    let v38;
    try { v38 = makeField(kWasmI64, true); } catch (e) {}
    const v39 = [v24,v27,v30,v33,v35,v38];
    try { builder.addStruct(v39, 0); } catch (e) {}
    let v44;
    try { v44 = makeField(kWasmF32, false); } catch (e) {}
    const v45 = [v44];
    try { builder.addStruct(v45); } catch (e) {}
    let v48;
    try { v48 = makeField(kWasmI8, false); } catch (e) {}
    let v50;
    try { v50 = makeField(kWasmI64, false); } catch (e) {}
    let v52;
    try { v52 = wasmRefNullType(kWasmNullRef); } catch (e) {}
    let v54;
    try { v54 = makeField(v52, false); } catch (e) {}
    const v55 = [v48,v50,v54];
    try { builder.addStruct(v55); } catch (e) {}
    try { builder.startRecGroup(); } catch (e) {}
    let v59;
    try { v59 = wasmRefNullType(7); } catch (e) {}
    try { builder.addArray(v59, true); } catch (e) {}
    try { builder.addArray(kWasmI16, true); } catch (e) {}
    let v65;
    try { v65 = wasmRefNullType(kWasmI31Ref); } catch (e) {}
    try { builder.addArray(v65, true); } catch (e) {}
    try { builder.addArray(kWasmI16, true); } catch (e) {}
    try { builder.endRecGroup(); } catch (e) {}
    const v72 = [kWasmI32,kWasmI32,kWasmI32];
    const v73 = [kWasmI32];
    let v75;
    try { v75 = makeSig(v72, v73); } catch (e) {}
    try { builder.addType(v75); } catch (e) {}
    let v79;
    try { v79 = wasmRefNullType(6); } catch (e) {}
    const v80 = [kWasmF64,v79,kWasmI32];
    let v84;
    try { v84 = wasmRefType(2); } catch (e) {}
    let v86;
    try { v86 = wasmRefType(9); } catch (e) {}
    let v88;
    try { v88 = wasmRefNullType(kWasmNullExternRef); } catch (e) {}
    let v91;
    try { v91 = wasmRefNullType(kWasmStructRef); } catch (e) {}
    let v93;
    try { v93 = wasmRefNullType(0); } catch (e) {}
    let v95;
    try { v95 = wasmRefType(0); } catch (e) {}
    let v97;
    try { v97 = wasmRefType(kWasmArrayRef); } catch (e) {}
    let v98;
    try { v98 = wasmRefType(kWasmI31Ref); } catch (e) {}
    const v99 = [kWasmEqRef,v84,v86,v88,kWasmF64,kWasmFuncRef,v91,v93,v95,kWasmI32,v97,v98];
    let v100;
    try { v100 = makeSig(v80, v99); } catch (e) {}
    try { builder.addType(v100); } catch (e) {}
    const v102 = [];
    const v103 = [];
    let v104;
    try { v104 = makeSig(v102, v103); } catch (e) {}
    try { builder.addType(v104); } catch (e) {}
    try { builder.startRecGroup(); } catch (e) {}
    const v107 = [];
    const v108 = [];
    let v109;
    try { v109 = makeSig(v107, v108); } catch (e) {}
    try { builder.addType(v109); } catch (e) {}
    try { builder.endRecGroup(); } catch (e) {}
    let v113;
    try { v113 = wasmRefType(kWasmExternRef); } catch (e) {}
    let v115;
    try { v115 = wasmRefType(3); } catch (e) {}
    let v117;
    try { v117 = wasmRefNullType(9); } catch (e) {}
    let v119;
    try { v119 = wasmRefType(5); } catch (e) {}
    let v121;
    try { v121 = wasmRefNullType(6); } catch (e) {}
    const v122 = [v113,v115,v117,v119,v121];
    let v124;
    try { v124 = wasmRefType(2); } catch (e) {}
    let v126;
    try { v126 = wasmRefType(9); } catch (e) {}
    let v127;
    try { v127 = wasmRefNullType(kWasmNullExternRef); } catch (e) {}
    let v128;
    try { v128 = wasmRefNullType(kWasmStructRef); } catch (e) {}
    let v130;
    try { v130 = wasmRefNullType(0); } catch (e) {}
    let v132;
    try { v132 = wasmRefType(0); } catch (e) {}
    let v133;
    try { v133 = wasmRefType(kWasmArrayRef); } catch (e) {}
    const v134 = [kWasmEqRef,v124,v126,v127,kWasmF64,kWasmFuncRef,v128,v130,v132,kWasmI32,v133];
    let v135;
    try { v135 = makeSig(v122, v134); } catch (e) {}
    try { builder.addType(v135); } catch (e) {}
    try { builder.addMemory(16, 32); } catch (e) {}
    try { builder.addTable(kWasmFuncRef, 4, 4, undefined); } catch (e) {}
    let v147;
    try { v147 = wasmI32Const(0); } catch (e) {}
    const v157 = [[kExprRefFunc,0],[kExprRefFunc,1],[kExprRefFunc,2],[kExprRefFunc,3]];
    try { builder.addActiveElementSegment(0, v147, v157, kWasmFuncRef); } catch (e) {}
    const v159 = [];
    const v160 = [];
    let v161;
    try { v161 = makeSig(v159, v160); } catch (e) {}
    try { builder.addTag(v161); } catch (e) {}
    const v462 = [kExprI32Const,142,245,189,136,125,kExprLoop,125,kExprTry,64,kExprCatchAll,kExprTry,127,kExprI32Const,222,178,179,194,125,kExprCatchAll,kExprI32Const,135,142,141,215,5,kExprEnd,kExprF64Const,106,147,225,197,164,161,114,218,kExprRefNull,107,kGCPrefix,kExprRefCastNull,6,kExprI32Const,141,149,206,219,120,kExprRefNull,9,kExprCallRef,9,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprI32Const,194,249,128,207,2,kAtomicPrefix,kExprI32AtomicOr8U,0,221,105,kGCPrefix,kExprRefI31,kGCPrefix,kExprRefCastNull,5,kExprDrop,kExprI32Const,242,240,171,134,5,kExprBrIf,0,kExprF32Const,206,63,91,155,kExprI32ReinterpretF32,kExprI32Const,210,138,176,201,121,kExprI32Const,152,243,217,171,4,kExprRefNull,8,kExprReturnCallRef,8,kExprEnd,kExprRefNull,110,kExprBrOnNull,0,kExprDrop,kExprF32Const,252,141,66,121,kExprEnd,kExprI32UConvertF32,kExprRefNull,110,kExprBrOnNull,0,kExprDrop,kExprF32SConvertI32,kExprTry,125,kExprI64Const,151,130,205,208,229,246,135,132,92,kExprI32Const,97,kExprI64Const,128,156,223,183,192,195,204,159,10,kExprI64Const,162,151,241,227,134,158,185,237,194,0,kExprI64ShrS,kExprI64Const,245,0,kExprI32Const,220,165,212,218,6,kExprSelect,kExprI64Const,181,209,151,244,174,174,177,245,90,kAtomicPrefix,kExprI64AtomicCompareExchange8U,0,100,kExprI64GeS,kExprI32Const,154,245,248,244,124,kExprI32Const,251,239,213,202,4,kExprRefNull,112,kGCPrefix,kExprRefCastNull,8,kExprCallRef,8,kExprF32SConvertI32,kExprF32Floor,kExprCatch,0,kExprF32Const,190,222,219,174,kExprCatchAll,kExprF32Const,214,180,234,183,kExprEnd,kExprF32CopySign,kExprF64ConvertF32,kExprBlock,127,kExprI64Const,128,204,182,210,172,195,162,11,kExprTry,127,kExprI32Const,0,kSimdPrefix,kExprI8x16Splat,kSimdPrefix,kExprI64x2BitMask,1,kExprI32Const,146,136,131,135,3,kAtomicPrefix,kExprI32AtomicOr16U,1,144,252,1,kExprCallFunction,3,kExprI32Const,201,215,151,129,6,kExprTry,126,kExprI64Const,210,240,209,171,253,190,149,249,44,kExprI64Const,235,169,168,148,144,167,240,215,6,kExprI64And,kExprDelegate,1,kExprI64Const,242,212,199,166,244,241,157,134,200,0,kExprI64Const,164,217,236,245,203,145,156,238,133,127,kExprI32Const,221,160,155,244,5,kExprI32Const,220,160,136,235,122,kAtomicPrefix,kExprI32AtomicExchange,0,163,159,2,kExprSelect,kExprI64Eq,kExprI32GeS,kExprI32Sub,kExprCatchAll,kExprI32Const,180,152,159,197,124,kExprEnd,kExprI64LoadMem8S,0,238,200,3,kExprI64GeU,kExprEnd,kExprRefNull,112,kExprBrOnNull,0,kExprDrop,kExprF64SConvertI32,kExprRefNull,6,kExprI32Const,254,181,220,183,127,kExprRefNull,9,kExprCallRef,9,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprF64Const,92,67,199,82,242,236,13,111,kExprF64Ge,kExprI32RemU,kExprEnd];
    let v463;
    try { v463 = wasmRefNullType(kWasmNullExternRef); } catch (e) {}
    let v467;
    try { v467 = builder.addFunction(undefined, 8); } catch (e) {}
    let v468;
    try { v468 = v467.addLocals(v463, 5); } catch (e) {}
    try { v468.addBodyWithEnd(v462); } catch (e) {}
    const v887 = [kExprRefNull,109,kExprRefNull,0,kGCPrefix,kExprRefCastNull,0,kGCPrefix,kExprRefCast,2,kExprRefNull,11,kGCPrefix,kExprRefCast,9,kExprRefNull,114,kExprTry,124,kExprF64Const,118,131,51,239,245,229,129,190,kExprF32Const,109,166,203,151,kExprF32Const,134,5,102,122,kExprF32Div,kExprBlock,125,kExprF32Const,113,22,123,105,kExprI32Const,0,kSimdPrefix,kExprI8x16Splat,kExprI32Const,0,kSimdPrefix,kExprI8x16Splat,kSimdPrefix,kExprI8x16Add,kSimdPrefix,kExprF32x4ExtractLane,1,kExprF32Mul,kExprF32Sqrt,kExprEnd,kExprF32Ge,kExprI64LoadMem16U,0,218,148,1,kExprF64UConvertI64,kExprF64Max,kExprRefNull,6,kExprI32Const,209,238,165,216,125,kExprCallFunction,1,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprF64Const,143,57,32,123,159,39,149,178,kExprCatch,0,kExprF64Const,47,189,35,105,124,47,213,188,kExprEnd,kExprF64Sqrt,kExprRefNull,111,kExprRefAsNonNull,kExprI32Const,179,198,149,217,7,kExprI64Const,218,253,140,214,234,150,144,136,163,127,kExprRefNull,113,kGCPrefix,kExprStructNew,3,kExprRefNull,9,kExprF32Const,100,110,26,200,kGCPrefix,kExprStructNew,2,kGCPrefix,kExprRefCast,5,kExprRefNull,109,kExprF32Const,79,202,129,33,kGCPrefix,kExprStructNew,2,kExprRefFunc,1,kExprRefNull,114,kExprF64Const,89,179,220,187,173,100,197,187,kExprRefNull,112,kExprRefNull,107,kExprRefNull,0,kExprRefNull,108,kExprRefNull,108,kExprRefNull,108,kGCPrefix,kExprStructNew,0,kExprI32Const,238,139,130,238,121,kExprRefNull,7,kExprI32Const,237,212,240,154,1,kExprI32Const,20,kExprI32RemS,kGCPrefix,kExprArrayNew,4,kExprI32Const,146,152,239,135,122,kGCPrefix,kExprRefI31,kGCPrefix,kExprBrOnCastFailGeneric,0,0,108,108,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprRefNull,6,kExprBlock,12,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprRefNull,109,kExprF32Const,48,15,225,65,kGCPrefix,kExprStructNew,2,kExprRefFunc,1,kExprRefNull,114,kExprF64Const,79,46,69,1,83,110,220,25,kExprRefNull,112,kExprRefNull,107,kExprRefNull,0,kExprRefNull,108,kExprRefNull,108,kExprRefNull,108,kGCPrefix,kExprStructNew,0,kExprI32Const,134,224,254,218,123,kExprRefNull,7,kExprI32Const,163,160,216,187,125,kExprI32Const,20,kExprI32RemS,kGCPrefix,kExprArrayNew,4,kExprEnd,kGCPrefix,kExprStructNewDefault,1,kExprRefAsNonNull,kGCPrefix,kExprRefCast,108,kExprBrOnNonNull,0,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprF64Const,217,30,47,148,154,176,133,60,kExprI32Const,0,kSimdPrefix,kExprI8x16Splat,kExprI32Const,0,kSimdPrefix,kExprI8x16Splat,kSimdPrefix,kExprI16x8ExtMulHighI8x16S,1,kSimdPrefix,kExprF64x2ExtractLane,1,kExprF64Const,191,63,4,197,96,56,57,100,kExprF64Const,6,106,18,15,137,185,202,50,kExprF64Div,kExprF64Min,kExprF64Div,kExprRefNull,109,kExprF32Const,228,213,246,78,kGCPrefix,kExprStructNew,2,kExprRefFunc,1,kExprRefNull,114,kExprF64Const,81,65,225,221,234,238,130,218,kExprRefNull,112,kExprRefNull,107,kExprRefNull,0,kExprRefNull,108,kExprRefNull,108,kExprRefNull,108,kGCPrefix,kExprStructNew,0,kExprI32Const,229,140,129,238,2,kExprRefNull,7,kExprI32Const,129,182,229,174,7,kExprI32Const,20,kExprI32RemS,kGCPrefix,kExprArrayNew,4,kExprI32Const,172,205,203,254,4,kGCPrefix,kExprRefI31,kGCPrefix,kExprBrOnCastFailGeneric,0,0,108,108,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprRefNull,6,kExprI32Const,206,170,208,219,0,kExprI32Const,1,kExprReturnCallIndirect,9,0,kExprF64Trunc,kExprLocalTee,0,kExprF64Max,kExprRefNull,6,kExprI32Const,177,235,198,195,5,kExprRefNull,9,kExprCallRef,9,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprF64Const,8,148,91,161,1,106,147,240,kExprRefNull,112,kExprRefNull,107,kExprRefNull,0,kExprRefNull,108,kExprRefNull,108,kExprRefNull,108,kGCPrefix,kExprStructNew,0,kExprI32Const,243,255,163,223,1,kExprRefNull,7,kExprI32Const,175,170,220,139,7,kExprI32Const,20,kExprI32RemS,kGCPrefix,kExprArrayNew,4,kExprI32Const,156,145,163,191,5,kGCPrefix,kExprRefI31,kGCPrefix,kExprBrOnCastFailGeneric,0,0,108,108,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprRefNull,112,kGCPrefix,kExprRefCastNull,9,kGCPrefix,kExprRefCastNull,10,kGCPrefix,kExprRefCast,112,kExprLocalSet,6,kExprRefFunc,1,kExprLocalSet,7,kExprRefFunc,0,kExprLocalSet,8,kExprRefNull,108,kExprRefNull,108,kExprRefNull,108,kGCPrefix,kExprStructNew,0,kExprLocalSet,9,kExprRefNull,108,kExprRefNull,108,kExprRefNull,108,kExprI32Const,209,223,251,206,120,kExprI32Const,169,163,187,187,127,kExprI64Const,246,212,249,191,144,223,238,141,21,kGCPrefix,kExprStructNew,1,kExprLocalSet,11,kExprRefNull,108,kExprRefNull,108,kExprRefNull,108,kGCPrefix,kExprStructNew,0,kExprLocalSet,12,kExprRefNull,7,kExprI32Const,224,171,253,233,1,kExprI32Const,20,kExprI32RemS,kGCPrefix,kExprArrayNew,4,kExprLocalSet,21,kExprRefNull,109,kExprF32Const,159,189,168,170,kGCPrefix,kExprStructNew,2,kExprRefFunc,1,kExprRefNull,114,kExprF64Const,5,99,206,52,226,159,154,160,kExprRefNull,112,kExprRefNull,107,kExprRefNull,0,kExprRefNull,108,kExprRefNull,108,kExprRefNull,108,kGCPrefix,kExprStructNew,0,kExprI32Const,138,164,254,0,kExprRefNull,7,kExprI32Const,171,140,197,159,124,kExprI32Const,20,kExprI32RemS,kGCPrefix,kExprArrayNew,4,kExprI32Const,191,206,169,229,5,kGCPrefix,kExprRefI31,kExprEnd];
    let v888;
    try { v888 = wasmRefType(kWasmArrayRef); } catch (e) {}
    let v891;
    try { v891 = wasmRefNullType(2); } catch (e) {}
    let v893;
    try { v893 = wasmRefNullType(kWasmArrayRef); } catch (e) {}
    let v896;
    try { v896 = wasmRefNullType(kWasmStructRef); } catch (e) {}
    let v900;
    try { v900 = wasmRefNullType(11); } catch (e) {}
    let v903;
    try { v903 = wasmRefNullType(3); } catch (e) {}
    let v906;
    try { v906 = wasmRefNullType(11); } catch (e) {}
    let v908;
    try { v908 = wasmRefType(kWasmEqRef); } catch (e) {}
    let v911;
    try { v911 = wasmRefType(1); } catch (e) {}
    let v914;
    try { v914 = wasmRefNullType(3); } catch (e) {}
    let v917;
    try { v917 = wasmRefType(kWasmAnyRef); } catch (e) {}
    let v919;
    try { v919 = wasmRefType(kWasmFuncRef); } catch (e) {}
    let v922;
    try { v922 = wasmRefType(9); } catch (e) {}
    let v924;
    try { v924 = wasmRefType(kWasmFuncRef); } catch (e) {}
    let v926;
    try { v926 = wasmRefNullType(kWasmNullExternRef); } catch (e) {}
    let v933;
    try { v933 = builder.addFunction(undefined, 9); } catch (e) {}
    let v934;
    try { v934 = v933.addLocals(kWasmEqRef, 1); } catch (e) {}
    let v935;
    try { v935 = v934.addLocals(kWasmS128, 1); } catch (e) {}
    let v936;
    try { v936 = v935.addLocals(v926, 1); } catch (e) {}
    let v937;
    try { v937 = v936.addLocals(v924, 1); } catch (e) {}
    let v938;
    try { v938 = v937.addLocals(v922, 1); } catch (e) {}
    let v939;
    try { v939 = v938.addLocals(v919, 1); } catch (e) {}
    let v940;
    try { v940 = v939.addLocals(v917, 1); } catch (e) {}
    let v941;
    try { v941 = v940.addLocals(v914, 1); } catch (e) {}
    let v942;
    try { v942 = v941.addLocals(v911, 1); } catch (e) {}
    let v943;
    try { v943 = v942.addLocals(v908, 1); } catch (e) {}
    let v944;
    try { v944 = v943.addLocals(v906, 1); } catch (e) {}
    let v945;
    try { v945 = v944.addLocals(v903, 1); } catch (e) {}
    let v946;
    try { v946 = v945.addLocals(v900, 1); } catch (e) {}
    let v947;
    try { v947 = v946.addLocals(kWasmI64, 1); } catch (e) {}
    let v948;
    try { v948 = v947.addLocals(v896, 1); } catch (e) {}
    let v949;
    try { v949 = v948.addLocals(kWasmF32, 1); } catch (e) {}
    let v950;
    try { v950 = v949.addLocals(v893, 1); } catch (e) {}
    let v951;
    try { v951 = v950.addLocals(v891, 1); } catch (e) {}
    let v952;
    try { v952 = v951.addLocals(v888, 1); } catch (e) {}
    try { v952.addBodyWithEnd(v887); } catch (e) {}
    const v954 = [kExprEnd];
    let v958;
    try { v958 = builder.addFunction(undefined, 10); } catch (e) {}
    let v959;
    try { v959 = v958.addLocals(kWasmI32, 22); } catch (e) {}
    try { v959.addBodyWithEnd(v954); } catch (e) {}
    const v961 = [kExprEnd];
    let v964;
    try { v964 = wasmRefNullType(1); } catch (e) {}
    let v968;
    try { v968 = builder.addFunction(undefined, 11); } catch (e) {}
    let v969;
    try { v969 = v968.addLocals(v964, 2); } catch (e) {}
    let v970;
    try { v970 = v969.addLocals(kWasmI32, 27); } catch (e) {}
    try { v970.addBodyWithEnd(v961); } catch (e) {}
    try { builder.addExport("main", 0); } catch (e) {}
    let v975;
    try { v975 = builder.instantiate(); } catch (e) {}
    const instance = v975;
    try {
        const v980 = instance?.exports;
        let v981;
        try { v981 = v980.main(1, 2, 3); } catch (e) {}
        try { f0(v981); } catch (e) {}
    } catch(e983) {
        try { f0("caught exception", e983); } catch (e) {}
    }
} catch(e986) {
}
