try {
    function f0() {
    }
    const v3 = d8?.file;
    try { v3.execute("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
    let v6;
    try { v6 = new WasmModuleBuilder(); } catch (e) {}
    const builder = v6;
    let v11;
    try { v11 = makeField(kWasmI64, true); } catch (e) {}
    let v14;
    try { v14 = makeField(kWasmI32, false); } catch (e) {}
    let v17;
    try { v17 = wasmRefNullType(kWasmNullExternRef); } catch (e) {}
    let v19;
    try { v19 = makeField(v17, true); } catch (e) {}
    const v20 = [v11,v14,v19];
    try { builder.addStruct(v20); } catch (e) {}
    try { builder.startRecGroup(); } catch (e) {}
    let v24;
    try { v24 = makeField(kWasmI64, true); } catch (e) {}
    let v26;
    try { v26 = makeField(kWasmI32, false); } catch (e) {}
    let v27;
    try { v27 = wasmRefNullType(kWasmNullExternRef); } catch (e) {}
    let v29;
    try { v29 = makeField(v27, true); } catch (e) {}
    let v31;
    try { v31 = wasmRefNullType(kWasmNullFuncRef); } catch (e) {}
    let v33;
    try { v33 = makeField(v31, false); } catch (e) {}
    const v34 = [v24,v26,v29,v33];
    try { builder.addStruct(v34, 0); } catch (e) {}
    try { builder.endRecGroup(); } catch (e) {}
    let v39;
    try { v39 = wasmRefNullType(2); } catch (e) {}
    let v41;
    try { v41 = makeField(v39, false); } catch (e) {}
    let v44;
    try { v44 = wasmRefType(kWasmI31Ref); } catch (e) {}
    let v46;
    try { v46 = makeField(v44, false); } catch (e) {}
    let v48;
    try { v48 = makeField(kWasmI32, false); } catch (e) {}
    let v50;
    try { v50 = wasmRefNullType(kWasmArrayRef); } catch (e) {}
    let v52;
    try { v52 = makeField(v50, false); } catch (e) {}
    const v53 = [v41,v46,v48,v52];
    try { builder.addStruct(v53); } catch (e) {}
    try { builder.startRecGroup(); } catch (e) {}
    let v57;
    try { v57 = wasmRefNullType(2); } catch (e) {}
    let v59;
    try { v59 = makeField(v57, false); } catch (e) {}
    let v60;
    try { v60 = wasmRefType(kWasmI31Ref); } catch (e) {}
    let v62;
    try { v62 = makeField(v60, false); } catch (e) {}
    let v64;
    try { v64 = makeField(kWasmI32, false); } catch (e) {}
    let v65;
    try { v65 = wasmRefNullType(kWasmArrayRef); } catch (e) {}
    let v67;
    try { v67 = makeField(v65, false); } catch (e) {}
    const v68 = [v59,v62,v64,v67];
    try { builder.addStruct(v68, 2); } catch (e) {}
    try { builder.endRecGroup(); } catch (e) {}
    let v73;
    try { v73 = wasmRefType(3); } catch (e) {}
    try { builder.addArray(v73, true); } catch (e) {}
    let v77;
    try { v77 = wasmRefType(3); } catch (e) {}
    try { builder.addArray(v77, true, 4); } catch (e) {}
    try { builder.addArray(kWasmI16, true); } catch (e) {}
    try { builder.startRecGroup(); } catch (e) {}
    const v85 = [kWasmI32,kWasmI32,kWasmI32];
    const v86 = [kWasmI32];
    let v88;
    try { v88 = makeSig(v85, v86); } catch (e) {}
    try { builder.addType(v88); } catch (e) {}
    let v91;
    try { v91 = wasmRefType(1); } catch (e) {}
    let v92;
    try { v92 = wasmRefNullType(kWasmNullFuncRef); } catch (e) {}
    let v95;
    try { v95 = wasmRefNullType(0); } catch (e) {}
    let v96;
    try { v96 = wasmRefNullType(kWasmNullExternRef); } catch (e) {}
    let v98;
    try { v98 = wasmRefType(kWasmEqRef); } catch (e) {}
    let v102;
    try { v102 = wasmRefNullType(kWasmStructRef); } catch (e) {}
    const v103 = [v91,v92,kWasmF64,v95,v96,v98,kWasmS128,kWasmFuncRef,v102];
    let v105;
    try { v105 = wasmRefType(6); } catch (e) {}
    let v106;
    try { v106 = wasmRefType(kWasmEqRef); } catch (e) {}
    let v108;
    try { v108 = wasmRefType(kWasmAnyRef); } catch (e) {}
    let v110;
    try { v110 = wasmRefType(8); } catch (e) {}
    let v112;
    try { v112 = wasmRefType(0); } catch (e) {}
    let v113;
    try { v113 = wasmRefType(kWasmAnyRef); } catch (e) {}
    const v114 = [kWasmF64,kWasmFuncRef,v105,v106,v108,kWasmI32,v110,v112,kWasmF64,v113];
    let v115;
    try { v115 = makeSig(v103, v114); } catch (e) {}
    try { builder.addType(v115); } catch (e) {}
    try { builder.endRecGroup(); } catch (e) {}
    let v119;
    try { v119 = wasmRefNullType(4); } catch (e) {}
    let v122;
    try { v122 = wasmRefType(1); } catch (e) {}
    let v123;
    try { v123 = wasmRefNullType(kWasmArrayRef); } catch (e) {}
    let v125;
    try { v125 = wasmRefType(8); } catch (e) {}
    const v126 = [kWasmI32,v119,kWasmS128,kWasmF32,v122,v123,v125];
    const v127 = [kWasmI32];
    let v128;
    try { v128 = makeSig(v126, v127); } catch (e) {}
    try { builder.addType(v128); } catch (e) {}
    let v131;
    try { v131 = wasmRefType(kWasmExternRef); } catch (e) {}
    let v133;
    try { v133 = wasmRefType(1); } catch (e) {}
    let v134;
    try { v134 = wasmRefNullType(kWasmNullFuncRef); } catch (e) {}
    const v135 = [v131,v133,v134,kWasmF64];
    const v136 = [];
    let v137;
    try { v137 = makeSig(v135, v136); } catch (e) {}
    try { builder.addType(v137); } catch (e) {}
    try { builder.addMemory(16, 32); } catch (e) {}
    let v145;
    try { v145 = wasmI32Const(0); } catch (e) {}
    try { builder.addGlobal(kWasmI32, 0, v145); } catch (e) {}
    let v149;
    try { v149 = wasmI32Const(0); } catch (e) {}
    try { builder.addGlobal(kWasmI32, 0, v149); } catch (e) {}
    let v153;
    try { v153 = wasmI32Const(0); } catch (e) {}
    try { builder.addGlobal(kWasmI32, 0, v153); } catch (e) {}
    let v157;
    try { v157 = wasmI32Const(0); } catch (e) {}
    try { builder.addGlobal(kWasmI32, 0, v157); } catch (e) {}
    let v161;
    try { v161 = wasmI32Const(0); } catch (e) {}
    try { builder.addGlobal(kWasmI32, 0, v161); } catch (e) {}
    let v165;
    try { v165 = wasmI32Const(0); } catch (e) {}
    try { builder.addGlobal(kWasmI32, 0, v165); } catch (e) {}
    let v169;
    try { v169 = wasmI32Const(0); } catch (e) {}
    try { builder.addGlobal(kWasmI32, 0, v169); } catch (e) {}
    let v173;
    try { v173 = wasmI32Const(0); } catch (e) {}
    try { builder.addGlobal(kWasmI32, 0, v173); } catch (e) {}
    let v177;
    try { v177 = wasmI32Const(0); } catch (e) {}
    try { builder.addGlobal(kWasmI32, 0, v177); } catch (e) {}
    let v181;
    try { v181 = wasmI32Const(0); } catch (e) {}
    try { builder.addGlobal(kWasmI32, 0, v181); } catch (e) {}
    let v185;
    try { v185 = wasmI32Const(0); } catch (e) {}
    try { builder.addGlobal(kWasmI32, 0, v185); } catch (e) {}
    let v189;
    try { v189 = wasmI32Const(0); } catch (e) {}
    try { builder.addGlobal(kWasmI32, 0, v189); } catch (e) {}
    let v193;
    try { v193 = wasmI32Const(0); } catch (e) {}
    try { builder.addGlobal(kWasmI32, 0, v193); } catch (e) {}
    let v197;
    try { v197 = wasmI32Const(0); } catch (e) {}
    try { builder.addGlobal(kWasmI32, 0, v197); } catch (e) {}
    let v201;
    try { v201 = wasmI32Const(0); } catch (e) {}
    try { builder.addGlobal(kWasmI32, 0, v201); } catch (e) {}
    let v205;
    try { v205 = wasmI32Const(0); } catch (e) {}
    try { builder.addGlobal(kWasmI32, 0, v205); } catch (e) {}
    let v209;
    try { v209 = wasmI32Const(0); } catch (e) {}
    try { builder.addGlobal(kWasmI32, 0, v209); } catch (e) {}
    let v213;
    try { v213 = wasmI32Const(0); } catch (e) {}
    try { builder.addGlobal(kWasmI32, 0, v213); } catch (e) {}
    let v217;
    try { v217 = wasmI32Const(0); } catch (e) {}
    try { builder.addGlobal(kWasmI32, 0, v217); } catch (e) {}
    let v221;
    try { v221 = wasmI32Const(0); } catch (e) {}
    try { builder.addGlobal(kWasmI32, 0, v221); } catch (e) {}
    let v225;
    try { v225 = wasmI32Const(0); } catch (e) {}
    try { builder.addGlobal(kWasmI32, 0, v225); } catch (e) {}
    let v229;
    try { v229 = wasmI32Const(0); } catch (e) {}
    try { builder.addGlobal(kWasmI32, 0, v229); } catch (e) {}
    let v233;
    try { v233 = wasmI32Const(0); } catch (e) {}
    try { builder.addGlobal(kWasmI32, 0, v233); } catch (e) {}
    let v237;
    try { v237 = wasmI32Const(0); } catch (e) {}
    try { builder.addGlobal(kWasmI32, 0, v237); } catch (e) {}
    let v241;
    try { v241 = wasmI32Const(0); } catch (e) {}
    try { builder.addGlobal(kWasmI32, 0, v241); } catch (e) {}
    let v245;
    try { v245 = wasmI32Const(0); } catch (e) {}
    try { builder.addGlobal(kWasmI32, 0, v245); } catch (e) {}
    let v249;
    try { v249 = wasmI32Const(0); } catch (e) {}
    try { builder.addGlobal(kWasmI32, 0, v249); } catch (e) {}
    let v253;
    try { v253 = wasmI32Const(0); } catch (e) {}
    try { builder.addGlobal(kWasmI32, 0, v253); } catch (e) {}
    let v257;
    try { v257 = wasmI32Const(0); } catch (e) {}
    try { builder.addGlobal(kWasmI32, 0, v257); } catch (e) {}
    let v261;
    try { v261 = wasmI32Const(0); } catch (e) {}
    try { builder.addGlobal(kWasmI32, 0, v261); } catch (e) {}
    let v265;
    try { v265 = wasmI32Const(0); } catch (e) {}
    try { builder.addGlobal(kWasmI32, 0, v265); } catch (e) {}
    let v269;
    try { v269 = wasmI32Const(0); } catch (e) {}
    try { builder.addGlobal(kWasmI32, 0, v269); } catch (e) {}
    let v273;
    try { v273 = wasmI32Const(0); } catch (e) {}
    try { builder.addGlobal(kWasmI32, 0, v273); } catch (e) {}
    let v277;
    try { v277 = wasmI32Const(0); } catch (e) {}
    try { builder.addGlobal(kWasmI32, 0, v277); } catch (e) {}
    let v281;
    try { v281 = wasmI32Const(0); } catch (e) {}
    try { builder.addGlobal(kWasmI32, 0, v281); } catch (e) {}
    let v285;
    try { v285 = wasmI32Const(0); } catch (e) {}
    try { builder.addGlobal(kWasmI32, 0, v285); } catch (e) {}
    let v289;
    try { v289 = wasmI32Const(0); } catch (e) {}
    try { builder.addGlobal(kWasmI32, 0, v289); } catch (e) {}
    let v293;
    try { v293 = wasmI32Const(0); } catch (e) {}
    try { builder.addGlobal(kWasmI32, 0, v293); } catch (e) {}
    let v297;
    try { v297 = wasmI32Const(0); } catch (e) {}
    try { builder.addGlobal(kWasmI32, 0, v297); } catch (e) {}
    let v301;
    try { v301 = wasmI32Const(0); } catch (e) {}
    try { builder.addGlobal(kWasmI32, 0, v301); } catch (e) {}
    let v305;
    try { v305 = wasmI32Const(0); } catch (e) {}
    try { builder.addGlobal(kWasmI32, 0, v305); } catch (e) {}
    let v309;
    try { v309 = wasmI32Const(0); } catch (e) {}
    try { builder.addGlobal(kWasmI32, 0, v309); } catch (e) {}
    let v313;
    try { v313 = wasmI32Const(0); } catch (e) {}
    try { builder.addGlobal(kWasmI32, 0, v313); } catch (e) {}
    let v317;
    try { v317 = wasmI32Const(0); } catch (e) {}
    try { builder.addGlobal(kWasmI32, 0, v317); } catch (e) {}
    let v321;
    try { v321 = wasmI32Const(0); } catch (e) {}
    try { builder.addGlobal(kWasmI32, 0, v321); } catch (e) {}
    let v325;
    try { v325 = wasmI32Const(0); } catch (e) {}
    try { builder.addGlobal(kWasmI32, 0, v325); } catch (e) {}
    let v329;
    try { v329 = wasmI32Const(0); } catch (e) {}
    try { builder.addGlobal(kWasmI32, 0, v329); } catch (e) {}
    let v333;
    try { v333 = wasmI32Const(0); } catch (e) {}
    try { builder.addGlobal(kWasmI32, 0, v333); } catch (e) {}
    let v337;
    try { v337 = wasmI32Const(0); } catch (e) {}
    try { builder.addGlobal(kWasmI32, 0, v337); } catch (e) {}
    let v341;
    try { v341 = wasmI32Const(0); } catch (e) {}
    try { builder.addGlobal(kWasmI32, 0, v341); } catch (e) {}
    let v345;
    try { v345 = wasmI32Const(0); } catch (e) {}
    try { builder.addGlobal(kWasmI32, 0, v345); } catch (e) {}
    let v349;
    try { v349 = wasmI32Const(0); } catch (e) {}
    try { builder.addGlobal(kWasmI32, 0, v349); } catch (e) {}
    try { builder.addTable(kWasmFuncRef, 3, 3, undefined); } catch (e) {}
    let v357;
    try { v357 = wasmI32Const(0); } catch (e) {}
    const v365 = [[kExprRefFunc,0],[kExprRefFunc,1],[kExprRefFunc,2]];
    try { builder.addActiveElementSegment(0, v357, v365, kWasmFuncRef); } catch (e) {}
    let v367;
    try { v367 = wasmRefType(kWasmExternRef); } catch (e) {}
    let v369;
    try { v369 = wasmRefType(1); } catch (e) {}
    let v370;
    try { v370 = wasmRefNullType(kWasmNullFuncRef); } catch (e) {}
    const v371 = [v367,v369,v370,kWasmF64];
    const v372 = [];
    let v373;
    try { v373 = makeSig(v371, v372); } catch (e) {}
    try { builder.addTag(v373); } catch (e) {}
    const v875 = [kExprI64Const,228,245,149,219,153,205,141,174,149,127,kExprI64Const,56,kExprI64Ne,kExprIf,125,kExprTry,125,kExprTry,125,kSimdPrefix,kExprS128Const,125,158,58,45,180,4,222,245,66,64,249,146,37,143,45,78,kSimdPrefix,kExprI8x16BitMask,kExprI32Const,211,132,248,4,kExprI32Const,8,kExprI32Const,0,kExprReturnCallIndirect,7,0,kExprCatch,0,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprF32Const,144,134,190,37,kExprCatchAll,kExprF32Const,215,59,100,39,kExprEnd,kExprCatch,0,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprF32Const,220,123,234,146,kExprCatchAll,kExprF32Const,105,190,19,158,kExprEnd,kExprF32Const,130,166,4,152,kExprI32Const,202,226,136,144,120,kExprI32Ctz,kExprI32Const,182,127,kExprI32ShrS,kExprSelect,kExprF32Sqrt,kExprI32SConvertF32,kExprI32Const,151,135,185,149,1,kExprTableGet,0,kGCPrefix,kExprRefCastNull,7,kExprBrOnNull,1,kExprDrop,kExprF32SConvertI32,kExprI32SConvertF32,kExprRefNull,4,kExprI32Const,0,kSimdPrefix,kExprI8x16Splat,kExprF32Const,149,4,4,8,kExprI64Const,182,191,219,243,152,164,195,168,114,kExprI32Const,194,188,248,128,121,kExprRefNull,114,kExprRefNull,115,kGCPrefix,kExprStructNew,1,kExprRefNull,106,kExprRefFunc,1,kExprReturnCall,2,kExprF32SConvertI64,kExprF32Abs,kExprElse,kExprF32Const,52,153,17,183,kExprEnd,kExprF32Neg,kExprTry,125,kExprBlock,126,kExprI32Const,246,175,198,158,120,kExprI64Const,132,163,200,130,221,200,231,224,67,kAtomicPrefix,kExprI64AtomicSub32U,1,195,1,kExprEnd,kExprI64Popcnt,kExprI64Const,128,127,kExprI32Const,164,202,141,220,3,kExprI32Const,223,215,229,236,6,kAtomicPrefix,kExprI32AtomicAnd16U,1,250,115,kExprRefNull,114,kExprRefNull,115,kGCPrefix,kExprStructNew,1,kExprRefNull,115,kExprF64Const,162,181,96,15,195,249,163,180,kExprI64Const,190,153,175,139,131,231,157,223,103,kExprI32Const,205,220,237,183,120,kExprRefNull,114,kGCPrefix,kExprStructNew,0,kExprRefNull,114,kExprI64Const,241,236,193,145,231,141,189,220,51,kExprI32Const,231,230,199,163,1,kExprRefNull,114,kGCPrefix,kExprStructNew,0,kExprI32Const,0,kSimdPrefix,kExprI8x16Splat,kExprRefNull,112,kExprRefNull,107,kExprRefNull,8,kExprCallRef,8,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprNop,kExprF64Neg,kExprF64Neg,kExprF64Neg,kExprF64Neg,kNumericPrefix,kExprI32SConvertSatF64,kExprI64Const,172,58,kAtomicPrefix,kExprI64AtomicAnd16U,0,171,13,kExprF32Const,245,37,142,174,kExprI64Const,188,243,238,178,216,222,230,253,0,kExprI32Const,149,252,215,224,125,kExprLoop,64,kExprEnd,kExprRefNull,114,kExprRefNull,115,kGCPrefix,kExprStructNew,1,kExprRefNull,115,kExprF64Const,6,194,223,108,94,7,192,204,kExprRefNull,0,kExprRefNull,114,kExprI64Const,141,243,198,179,237,232,137,189,75,kExprI32Const,251,166,157,148,6,kExprRefNull,114,kGCPrefix,kExprStructNew,0,kExprI32Const,0,kSimdPrefix,kExprI8x16Splat,kExprRefNull,112,kExprRefNull,107,kExprRefNull,8,kExprCallRef,8,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprF32ConvertF64,kExprF32CopySign,kExprF32Neg,kExprI32SConvertF32,kExprRefNull,114,kExprRefNull,115,kGCPrefix,kExprStructNew,1,kExprRefNull,115,kExprF64Const,44,123,160,20,29,118,158,232,kExprRefNull,0,kExprRefNull,114,kExprI64Const,128,223,160,243,203,141,165,139,82,kExprI32Const,242,182,162,145,1,kExprRefNull,114,kGCPrefix,kExprStructNew,0,kExprI32Const,0,kSimdPrefix,kExprI8x16Splat,kExprRefNull,112,kExprRefNull,107,kExprI32Const,1,kExprCallIndirect,8,0,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprI64SConvertF64,kExprI64DivU,kExprI64Const,144,249,240,246,253,128,160,16,kExprI64DivS,kExprF64UConvertI64,kExprF32ConvertF64,kExprCatch,0,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprBlock,125,kExprGlobalGet,38,kExprF32SConvertI32,kExprEnd,kExprF32Floor,kExprEnd,kExprF32Lt,kExprI32LoadMem8S,0,176,225,2,kExprRefNull,1,kGCPrefix,kExprRefCastNull,4,kExprF64Const,223,10,253,22,214,43,85,78,kExprF64Const,203,186,159,17,26,242,235,61,kExprF64Const,163,18,81,110,114,221,78,173,kExprF64CopySign,kExprF64Lt,kSimdPrefix,kExprS128Load32Splat,0,242,238,3,kSimdPrefix,kExprI8x16Neg,kExprF32Const,84,108,101,203,kExprI64Const,242,219,145,141,139,192,209,207,177,127,kExprI64Const,151,251,190,188,194,188,222,187,154,127,kExprI64ShrS,kExprI32Const,171,204,242,246,4,kExprRefNull,114,kExprRefNull,115,kGCPrefix,kExprStructNew,1,kExprRefNull,106,kExprRefFunc,1,kExprReturnCall,2,kExprI32Const,216,199,134,224,125,kExprRefNull,114,kExprRefNull,115,kGCPrefix,kExprStructNew,1,kExprLocalSet,4,kExprRefNull,2,kExprI32Const,244,134,156,213,3,kGCPrefix,kExprRefI31,kExprI32Const,195,229,141,135,122,kExprRefNull,106,kGCPrefix,kExprStructNew,3,kExprI32Const,195,210,183,255,6,kExprI32Const,20,kExprI32RemS,kGCPrefix,kExprArrayNew,4,kExprLocalSet,8,kExprRefNull,111,kExprRefAsNonNull,kExprLocalSet,12,kExprRefFunc,1,kExprLocalSet,13,kExprI64Const,169,225,133,192,251,198,138,238,10,kExprI32Const,198,244,221,155,121,kExprRefNull,114,kGCPrefix,kExprStructNew,0,kExprLocalSet,15,kExprRefNull,2,kExprI32Const,209,233,255,199,7,kGCPrefix,kExprRefI31,kExprI32Const,137,207,159,149,122,kExprRefNull,106,kGCPrefix,kExprStructNew,2,kExprLocalSet,17,kExprI32Const,205,194,215,178,126,kExprEnd];
    let v877;
    try { v877 = wasmRefType(2); } catch (e) {}
    let v880;
    try { v880 = wasmRefType(kWasmStructRef); } catch (e) {}
    let v882;
    try { v882 = wasmRefNullType(kWasmArrayRef); } catch (e) {}
    let v885;
    try { v885 = wasmRefType(8); } catch (e) {}
    let v887;
    try { v887 = wasmRefType(kWasmExternRef); } catch (e) {}
    let v890;
    try { v890 = wasmRefNullType(kWasmI31Ref); } catch (e) {}
    let v893;
    try { v893 = wasmRefNullType(9); } catch (e) {}
    let v895;
    try { v895 = wasmRefType(kWasmArrayRef); } catch (e) {}
    let v898;
    try { v898 = wasmRefNullType(6); } catch (e) {}
    let v902;
    try { v902 = wasmRefType(1); } catch (e) {}
    let v904;
    try { v904 = wasmRefNullType(kWasmI31Ref); } catch (e) {}
    let v908;
    try { v908 = builder.addFunction(undefined, 7); } catch (e) {}
    let v909;
    try { v909 = v908.addLocals(v904, 1); } catch (e) {}
    let v910;
    try { v910 = v909.addLocals(v902, 1); } catch (e) {}
    let v911;
    try { v911 = v910.addLocals(kWasmI32, 2); } catch (e) {}
    let v912;
    try { v912 = v911.addLocals(v898, 1); } catch (e) {}
    let v913;
    try { v913 = v912.addLocals(v895, 1); } catch (e) {}
    let v914;
    try { v914 = v913.addLocals(v893, 1); } catch (e) {}
    let v915;
    try { v915 = v914.addLocals(v890, 1); } catch (e) {}
    let v916;
    try { v916 = v915.addLocals(kWasmI32, 1); } catch (e) {}
    let v917;
    try { v917 = v916.addLocals(v887, 1); } catch (e) {}
    let v918;
    try { v918 = v917.addLocals(v885, 1); } catch (e) {}
    let v919;
    try { v919 = v918.addLocals(v882, 1); } catch (e) {}
    let v920;
    try { v920 = v919.addLocals(v880, 1); } catch (e) {}
    let v921;
    try { v921 = v920.addLocals(kWasmFuncRef, 1); } catch (e) {}
    let v922;
    try { v922 = v921.addLocals(v877, 1); } catch (e) {}
    try { v922.addBodyWithEnd(v875); } catch (e) {}
    const v1025 = [kExprF64Const,153,168,134,75,220,40,127,183,kExprRefNull,112,kExprI32Const,254,163,241,121,kExprI32Const,172,146,178,210,4,kExprI32Const,20,kExprI32RemS,kGCPrefix,kExprArrayNew,6,kExprI64Const,205,187,218,249,229,207,139,225,225,0,kExprI32Const,254,245,200,142,127,kExprRefNull,114,kGCPrefix,kExprStructNew,0,kExprI64Const,244,176,241,156,181,189,188,162,241,0,kExprI32Const,170,230,227,183,124,kExprRefNull,114,kGCPrefix,kExprStructNew,0,kExprI32Const,202,204,230,182,120,kExprRefFunc,1,kExprI64Const,131,172,196,198,164,217,221,148,236,0,kExprI32Const,223,198,207,135,121,kExprRefNull,114,kGCPrefix,kExprStructNew,0,kExprF64Const,158,244,136,89,16,173,187,139,kExprI64Const,226,249,255,185,223,253,240,251,75,kExprI32Const,195,156,224,181,120,kExprRefNull,114,kGCPrefix,kExprStructNew,0,kExprEnd];
    let v1028;
    try { v1028 = builder.addFunction(undefined, 8); } catch (e) {}
    try { v1028.addBodyWithEnd(v1025); } catch (e) {}
    const v1035 = [kExprI32Const,165,148,233,233,120,kExprEnd];
    let v1039;
    try { v1039 = builder.addFunction(undefined, 9); } catch (e) {}
    let v1040;
    try { v1040 = v1039.addLocals(kWasmI32, 4); } catch (e) {}
    try { v1040.addBodyWithEnd(v1035); } catch (e) {}
    try { builder.addExport("main", 0); } catch (e) {}
    let v1045;
    try { v1045 = builder.instantiate(); } catch (e) {}
    const instance = v1045;
    try {
        const v1050 = instance?.exports;
        let v1051;
        try { v1051 = v1050.main(1, 2, 3); } catch (e) {}
        try { f0(v1051); } catch (e) {}
    } catch(e1053) {
        try { f0("caught exception", e1053); } catch (e) {}
    }
} catch(e1056) {
}
