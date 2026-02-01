try {
    function f0() {
    }
    const v3 = d8?.file;
    try { v3.execute("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
    let v6;
    try { v6 = new WasmModuleBuilder(); } catch (e) {}
    const builder = v6;
    let v11;
    try { v11 = makeField(kWasmI64, false); } catch (e) {}
    const v12 = [v11];
    try { builder.addStruct(v12); } catch (e) {}
    let v15;
    try { v15 = makeField(kWasmI64, false); } catch (e) {}
    let v18;
    try { v18 = makeField(kWasmS128, false); } catch (e) {}
    let v20;
    try { v20 = makeField(kWasmS128, false); } catch (e) {}
    const v21 = [v15,v18,v20];
    try { builder.addStruct(v21, 0); } catch (e) {}
    let v26;
    try { v26 = makeField(kWasmI16, false); } catch (e) {}
    let v28;
    try { v28 = makeField(kWasmI16, false); } catch (e) {}
    let v30;
    try { v30 = makeField(kWasmI16, false); } catch (e) {}
    let v32;
    try { v32 = makeField(kWasmI16, false); } catch (e) {}
    const v33 = [v26,v28,v30,v32];
    try { builder.addStruct(v33); } catch (e) {}
    try { builder.addArray(kWasmI64, true); } catch (e) {}
    try { builder.startRecGroup(); } catch (e) {}
    try { builder.addArray(kWasmF32, true); } catch (e) {}
    const v42 = [kWasmI32,kWasmI32,kWasmI32];
    const v43 = [kWasmI32];
    let v45;
    try { v45 = makeSig(v42, v43); } catch (e) {}
    try { builder.addType(v45); } catch (e) {}
    try { builder.endRecGroup(); } catch (e) {}
    let v50;
    try { v50 = wasmRefType(4); } catch (e) {}
    const v51 = [v50];
    const v52 = [];
    let v53;
    try { v53 = makeSig(v51, v52); } catch (e) {}
    try { builder.addType(v53); } catch (e) {}
    try { builder.startRecGroup(); } catch (e) {}
    let v58;
    try { v58 = wasmRefNullType(1); } catch (e) {}
    let v60;
    try { v60 = wasmRefType(kWasmI31Ref); } catch (e) {}
    let v62;
    try { v62 = wasmRefNullType(3); } catch (e) {}
    let v64;
    try { v64 = wasmRefType(kWasmExternRef); } catch (e) {}
    let v66;
    try { v66 = wasmRefNullType(1); } catch (e) {}
    let v67;
    try { v67 = wasmRefType(kWasmI31Ref); } catch (e) {}
    let v69;
    try { v69 = wasmRefNullType(2); } catch (e) {}
    let v71;
    try { v71 = wasmRefType(4); } catch (e) {}
    let v73;
    try { v73 = wasmRefType(5); } catch (e) {}
    const v74 = [kWasmF32,v58,v60,v62,kWasmExternRef,v64,v66,v67,v69,kWasmS128,v71,v73];
    let v75;
    try { v75 = wasmRefNullType(kWasmI31Ref); } catch (e) {}
    const v76 = [v75,kWasmI32];
    let v77;
    try { v77 = makeSig(v74, v76); } catch (e) {}
    try { builder.addType(v77); } catch (e) {}
    try { builder.endRecGroup(); } catch (e) {}
    let v81;
    try { v81 = wasmRefType(kWasmArrayRef); } catch (e) {}
    let v82;
    try { v82 = wasmRefType(kWasmExternRef); } catch (e) {}
    const v83 = [kWasmF32,v81,kWasmI32,v82];
    const v84 = [];
    let v85;
    try { v85 = makeSig(v83, v84); } catch (e) {}
    try { builder.addType(v85); } catch (e) {}
    let v88;
    try { v88 = wasmRefType(6); } catch (e) {}
    const v89 = [kWasmI32,v88,kWasmI32,kWasmI32,kWasmI32,kWasmI32,kWasmI32,kWasmI32,kWasmI32,kWasmI32,kWasmI32,kWasmI32,kWasmI32,kWasmI32,kWasmI32];
    let v91;
    try { v91 = wasmRefType(2); } catch (e) {}
    let v93;
    try { v93 = wasmRefType(kWasmAnyRef); } catch (e) {}
    let v94;
    try { v94 = wasmRefType(kWasmArrayRef); } catch (e) {}
    const v95 = [v91,kWasmExternRef,kWasmExternRef,v93,v94,kWasmI64];
    let v96;
    try { v96 = makeSig(v89, v95); } catch (e) {}
    try { builder.addType(v96); } catch (e) {}
    let v100;
    try { v100 = wasmRefType(2); } catch (e) {}
    let v101;
    try { v101 = wasmRefType(kWasmAnyRef); } catch (e) {}
    let v102;
    try { v102 = wasmRefType(kWasmArrayRef); } catch (e) {}
    let v104;
    try { v104 = wasmRefType(kWasmStructRef); } catch (e) {}
    let v106;
    try { v106 = wasmRefNullType(kWasmNullFuncRef); } catch (e) {}
    let v108;
    try { v108 = wasmRefNullType(2); } catch (e) {}
    const v109 = [kWasmAnyRef,kWasmEqRef,v100,kWasmExternRef,kWasmExternRef,v101,v102,kWasmI64,kWasmI32,v104,v106,v108,kWasmI32];
    const v110 = [kWasmI32];
    let v111;
    try { v111 = makeSig(v109, v110); } catch (e) {}
    try { builder.addType(v111); } catch (e) {}
    const v113 = [kWasmI32,kWasmI32,kWasmI32,kWasmI32,kWasmI32,kWasmI32,kWasmI32,kWasmI32,kWasmI32,kWasmI32,kWasmI32,kWasmI32,kWasmI32,kWasmI32];
    const v114 = [kWasmI32];
    let v115;
    try { v115 = makeSig(v113, v114); } catch (e) {}
    try { builder.addType(v115); } catch (e) {}
    try { builder.addMemory(16, 32); } catch (e) {}
    const v151 = [206,147,45,6,115,191,34,34,219,147,251,191,179,172,10,174,187,225,123,31,241,171,153,28,186,151,214,47,248,144,31];
    try { builder.addPassiveDataSegment(v151); } catch (e) {}
    let v154;
    try { v154 = wasmRefType(1); } catch (e) {}
    const v159 = [kGCPrefix,kExprStructNewDefault,1];
    try { builder.addGlobal(v154, 1, v159); } catch (e) {}
    let v161;
    try { v161 = wasmRefNullType(kWasmStructRef); } catch (e) {}
    const v165 = [kExprRefNull,kStructRefCode];
    try { builder.addGlobal(v161, 1, v165); } catch (e) {}
    let v168;
    try { v168 = wasmRefNullType(2); } catch (e) {}
    const v171 = [kExprRefNull,2];
    try { builder.addGlobal(v168, 1, v171); } catch (e) {}
    let v173;
    try { v173 = wasmRefType(kWasmArrayRef); } catch (e) {}
    let v177;
    try { v177 = wasmI64Const(961349193400091136); } catch (e) {}
    const v179 = -7684192766995726336;
    let v180;
    try { v180 = wasmI64Const(v179); } catch (e) {}
    const v182 = -7108474840689805312;
    let v183;
    try { v183 = wasmI64Const(v182); } catch (e) {}
    const v187 = [...v177,...v180,...v183,kGCPrefix,kExprArrayNewFixed,3,3];
    try { builder.addGlobal(v173, 1, v187); } catch (e) {}
    let v191;
    try { v191 = wasmI64Const(349870418256); } catch (e) {}
    const v192 = [...v191];
    try { builder.addGlobal(kWasmI64, 1, v192); } catch (e) {}
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
    let v353;
    try { v353 = wasmI32Const(0); } catch (e) {}
    try { builder.addGlobal(kWasmI32, 0, v353); } catch (e) {}
    let v357;
    try { v357 = wasmI32Const(0); } catch (e) {}
    try { builder.addGlobal(kWasmI32, 0, v357); } catch (e) {}
    let v361;
    try { v361 = wasmI32Const(0); } catch (e) {}
    try { builder.addGlobal(kWasmI32, 0, v361); } catch (e) {}
    let v365;
    try { v365 = wasmI32Const(0); } catch (e) {}
    try { builder.addGlobal(kWasmI32, 0, v365); } catch (e) {}
    let v369;
    try { v369 = wasmI32Const(0); } catch (e) {}
    try { builder.addGlobal(kWasmI32, 0, v369); } catch (e) {}
    let v373;
    try { v373 = wasmI32Const(0); } catch (e) {}
    try { builder.addGlobal(kWasmI32, 0, v373); } catch (e) {}
    let v377;
    try { v377 = wasmI32Const(0); } catch (e) {}
    try { builder.addGlobal(kWasmI32, 0, v377); } catch (e) {}
    let v381;
    try { v381 = wasmI32Const(0); } catch (e) {}
    try { builder.addGlobal(kWasmI32, 0, v381); } catch (e) {}
    let v385;
    try { v385 = wasmI32Const(0); } catch (e) {}
    try { builder.addGlobal(kWasmI32, 0, v385); } catch (e) {}
    let v389;
    try { v389 = wasmI32Const(0); } catch (e) {}
    try { builder.addGlobal(kWasmI32, 0, v389); } catch (e) {}
    let v393;
    try { v393 = wasmI32Const(0); } catch (e) {}
    try { builder.addGlobal(kWasmI32, 0, v393); } catch (e) {}
    let v397;
    try { v397 = wasmI32Const(0); } catch (e) {}
    try { builder.addGlobal(kWasmI32, 0, v397); } catch (e) {}
    let v401;
    try { v401 = wasmI32Const(0); } catch (e) {}
    try { builder.addGlobal(kWasmI32, 0, v401); } catch (e) {}
    let v405;
    try { v405 = wasmI32Const(0); } catch (e) {}
    try { builder.addGlobal(kWasmI32, 0, v405); } catch (e) {}
    let v409;
    try { v409 = wasmI32Const(0); } catch (e) {}
    try { builder.addGlobal(kWasmI32, 0, v409); } catch (e) {}
    try { builder.addTable(kWasmFuncRef, 3, 3, undefined); } catch (e) {}
    let v418;
    try { v418 = wasmI32Const(0); } catch (e) {}
    const v426 = [[kExprRefFunc,0],[kExprRefFunc,1],[kExprRefFunc,2]];
    try { builder.addActiveElementSegment(0, v418, v426, kWasmFuncRef); } catch (e) {}
    let v428;
    try { v428 = wasmRefType(kWasmArrayRef); } catch (e) {}
    let v429;
    try { v429 = wasmRefType(kWasmExternRef); } catch (e) {}
    const v430 = [kWasmF32,v428,kWasmI32,v429];
    const v431 = [];
    let v432;
    try { v432 = makeSig(v430, v431); } catch (e) {}
    try { builder.addTag(v432); } catch (e) {}
    const v729 = [kExprLoop,125,kExprBlock,125,kExprBlock,125,kExprBlock,125,kExprBlock,125,kExprTry,126,kExprTry,126,kExprTry,126,kExprTry,126,kExprTry,126,kExprI64Const,181,220,251,228,226,220,168,249,103,kExprMemorySize,0,kExprI32LoadMem16S,1,235,133,3,kExprIf,126,kExprRefFunc,1,kExprI32Const,0,kSimdPrefix,kExprI8x16Splat,kExprI32Const,154,197,131,161,120,kGCPrefix,kExprRefI31,kGCPrefix,kExprI31GetU,kAtomicPrefix,kExprI32AtomicLoad16U,0,162,152,3,kExprF32Const,127,250,76,149,kExprRefNull,108,kGCPrefix,kExprRefCastNull,1,kExprI32Const,204,226,169,214,0,kGCPrefix,kExprRefI31,kExprRefNull,3,kExprRefNull,111,kExprRefNull,111,kExprRefAsNonNull,kExprRefNull,1,kExprI32Const,206,143,251,169,124,kGCPrefix,kExprRefI31,kExprRefNull,2,kExprI32Const,0,kSimdPrefix,kExprI8x16Splat,kExprF32Const,166,78,121,165,kExprI32Const,235,241,240,169,5,kExprI32Const,20,kExprI32RemS,kGCPrefix,kExprArrayNew,4,kExprRefFunc,0,kExprCallFunction,2,kExprDrop,kExprDrop,kExprI32Const,179,135,129,177,125,kExprI32Add,kExprF32ReinterpretI32,kExprI32Const,208,158,206,183,1,kExprBrIf,6,kExprI32SConvertF32,kSimdPrefix,kExprI8x16ShrU,kSimdPrefix,kExprI16x8BitMask,1,kNumericPrefix,kExprTableGrow,0,kExprI64LoadMem16U,0,175,130,2,kExprElse,kExprI64Const,186,146,232,224,141,220,255,133,240,0,kExprEnd,kExprI64And,kExprEnd,kExprEnd,kExprEnd,kExprEnd,kExprEnd,kExprTry,125,kExprGlobalGet,6,kExprF32SConvertI32,kExprI32ReinterpretF32,kExprF32Const,176,226,117,121,kExprF32Const,87,209,221,90,kExprF32Trunc,kExprF32Add,kExprF32Ceil,kExprI32Const,0,kSimdPrefix,kExprI8x16Splat,kSimdPrefix,kExprI64x2AllTrue,1,kExprI32Const,20,kExprI32RemS,kGCPrefix,kExprArrayNew,4,kExprCallFunction,1,kExprI32Const,0,kSimdPrefix,kExprI8x16Splat,kSimdPrefix,kExprV128AnyTrue,kExprI32Const,237,184,202,150,123,kExprI32Const,240,214,239,234,125,kExprI32Rol,kExprI32Const,0,kExprReturnCallIndirect,5,0,kExprCatch,0,kExprDrop,kExprDrop,kExprDrop,kExprEnd,kExprI32Const,222,148,161,185,127,kExprI32Const,191,231,225,252,126,kGCPrefix,kExprArrayNewData,4,0,kExprRefNull,6,kExprCallRef,6,kExprDrop,kExprDrop,kExprF32Const,28,240,65,86,kExprEnd,kExprEnd,kExprEnd,kExprEnd,kExprEnd,kExprF64Const,43,135,172,28,160,210,92,31,kExprRefNull,0,kExprRefAsNonNull,kGCPrefix,kExprRefCastNull,110,kGCPrefix,kExprRefCast,4,kExprRefNull,6,kExprCallRef,6,kExprF64Const,148,119,179,93,110,190,93,17,kExprI32Const,128,139,175,155,121,kExprI32Ctz,kExprI32Const,197,142,213,131,122,kExprI32StoreMem8,0,179,249,2,kExprF64Trunc,kExprF64Sub,kExprF32ConvertF64,kExprF32Const,129,18,13,144,kExprF32Const,124,36,35,181,kExprF32Mul,kExprF32Div,kExprRefNull,106,kGCPrefix,kExprRefCastNull,1,kExprI32Const,203,203,190,243,4,kGCPrefix,kExprRefI31,kExprRefNull,3,kExprRefNull,111,kExprRefNull,111,kExprRefAsNonNull,kExprRefNull,1,kExprI32Const,167,130,128,174,120,kGCPrefix,kExprRefI31,kExprRefNull,2,kExprI32Const,0,kSimdPrefix,kExprI8x16Splat,kExprF32Const,115,196,92,57,kExprI32Const,175,169,209,232,3,kExprI32Const,20,kExprI32RemS,kGCPrefix,kExprArrayNew,4,kExprRefFunc,0,kExprCallFunction,2,kExprDrop,kExprDrop,kExprI32Const,251,172,191,123,kExprI32Const,173,191,172,210,123,kExprI32Const,212,190,130,101,kExprRefNull,5,kExprCallRef,5,kExprDrop,kExprDrop,kExprI32Const,251,196,144,130,124,kExprEnd];
    let v732;
    try { v732 = builder.addFunction(undefined, 5); } catch (e) {}
    try { v732.addBodyWithEnd(v729); } catch (e) {}
    const v734 = [kExprEnd];
    let v737;
    try { v737 = builder.addFunction(undefined, 6); } catch (e) {}
    try { v737.addBodyWithEnd(v734); } catch (e) {}
    let v741;
    try { v741 = wasmI32Const(1); } catch (e) {}
    const v742 = [kExprRefNull,108,...v741,kExprEnd];
    let v746;
    try { v746 = builder.addFunction(undefined, 7); } catch (e) {}
    let v747;
    try { v747 = v746.addLocals(kWasmI32, 22); } catch (e) {}
    try { v747.addBodyWithEnd(v742); } catch (e) {}
    try { builder.addExport("main", 0); } catch (e) {}
    let v752;
    try { v752 = builder.instantiate(); } catch (e) {}
    const instance = v752;
    try {
        const v757 = instance?.exports;
        let v758;
        try { v758 = v757.main(1, 2, 3); } catch (e) {}
        try { f0(v758); } catch (e) {}
    } catch(e760) {
        try { f0("caught exception", e760); } catch (e) {}
    }
} catch(e763) {
}
