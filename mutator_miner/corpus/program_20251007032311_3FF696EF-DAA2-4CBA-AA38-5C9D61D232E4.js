try {
    const v2 = d8?.file;
    try { v2.execute("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
    let v5;
    try { v5 = new WasmModuleBuilder(); } catch (e) {}
    const builder = v5;
    let v8;
    try { v8 = builder.addType(kSig_v_v); } catch (e) {}
    let $sig0 = v8;
    try { builder.startRecGroup(); } catch (e) {}
    let v13;
    try { v13 = wasmRefType(6); } catch (e) {}
    let v17;
    try { v17 = builder.addArray(v13, true, kNoSuperType, true); } catch (e) {}
    let $array1 = v17;
    let v21;
    try { v21 = wasmRefNullType(9); } catch (e) {}
    let v24;
    try { v24 = builder.addArray(v21, false, kNoSuperType, false); } catch (e) {}
    let $array2 = v24;
    const v26 = [];
    const v28 = [kWasmF64];
    let v30;
    try { v30 = makeSig(v26, v28); } catch (e) {}
    let v31;
    try { v31 = builder.addType(v30); } catch (e) {}
    let $sig3 = v31;
    let v36;
    try { v36 = makeField(kWasmI64, false); } catch (e) {}
    let v39;
    try { v39 = makeField(kWasmI8, true); } catch (e) {}
    const v40 = [v36,v39];
    let v42;
    try { v42 = builder.addStruct(v40, kNoSuperType, true); } catch (e) {}
    let $struct4 = v42;
    let v45;
    try { v45 = wasmRefType(9); } catch (e) {}
    const v46 = [v45];
    let v47;
    try { v47 = wasmRefType($array2); } catch (e) {}
    const v48 = [v47];
    let v49;
    try { v49 = makeSig(v46, v48); } catch (e) {}
    let v51;
    try { v51 = builder.addType(v49, kNoSuperType, false); } catch (e) {}
    let $sig5 = v51;
    let v55;
    try { v55 = builder.addType(kSig_i_v, kNoSuperType, false); } catch (e) {}
    let $sig6 = v55;
    let v58;
    try { v58 = makeField(kWasmF64, true); } catch (e) {}
    let v61;
    try { v61 = makeField(kWasmEqRef, false); } catch (e) {}
    let v62;
    try { v62 = wasmRefType($sig6); } catch (e) {}
    let v64;
    try { v64 = makeField(v62, false); } catch (e) {}
    let v66;
    try { v66 = makeField(kWasmI8, false); } catch (e) {}
    const v67 = [v58,v61,v64,v66];
    let v69;
    try { v69 = builder.addStruct(v67, kNoSuperType, false); } catch (e) {}
    let $struct7 = v69;
    let v72;
    try { v72 = wasmRefType(9); } catch (e) {}
    const v73 = [v72];
    const v75 = [kWasmF32];
    let v76;
    try { v76 = makeSig(v73, v75); } catch (e) {}
    let v77;
    try { v77 = builder.addType(v76); } catch (e) {}
    let $sig8 = v77;
    let v79;
    try { v79 = wasmRefNullType($array1); } catch (e) {}
    let v82;
    try { v82 = wasmRefType(9); } catch (e) {}
    const v83 = [v79,kWasmI32,v82];
    const v84 = [];
    let v85;
    try { v85 = makeSig(v83, v84); } catch (e) {}
    let v87;
    try { v87 = builder.addType(v85, kNoSuperType, false); } catch (e) {}
    let $sig10 = v87;
    let v90;
    try { v90 = makeField(kWasmI8, false); } catch (e) {}
    let v93;
    try { v93 = makeField(kWasmI16, true); } catch (e) {}
    let v95;
    try { v95 = makeField(kWasmI32, true); } catch (e) {}
    let v97;
    try { v97 = makeField(kWasmI64, true); } catch (e) {}
    let v99;
    try { v99 = makeField(kWasmI16, true); } catch (e) {}
    const v100 = [v90,v93,v95,v97,v99];
    let v102;
    try { v102 = builder.addStruct(v100, kNoSuperType, false); } catch (e) {}
    let $struct15 = v102;
    try { builder.endRecGroup(); } catch (e) {}
    const v106 = [kWasmStructRef,kWasmI32];
    const v108 = [kWasmFuncRef];
    let v109;
    try { v109 = makeSig(v106, v108); } catch (e) {}
    let v110;
    try { v110 = builder.addType(v109); } catch (e) {}
    let $sig175 = v110;
    let v113;
    try { v113 = builder.addFunction("f322", $sig175); } catch (e) {}
    let v114;
    try { v114 = v113.exportFunc(); } catch (e) {}
    let $func322 = v114;
    let v119;
    try { v119 = builder.addMemory(16, 17, true); } catch (e) {}
    let $mem0 = v119;
    const v124 = -2078671;
    let v126;
    try { v126 = wasmI32Const(v124); } catch (e) {}
    let v127;
    try { v127 = builder.addGlobal(kWasmI32, false, false, v126); } catch (e) {}
    let $global14 = v127;
    const v140 = $global14?.index;
    let v143;
    try { v143 = wasmF64Const(524287.133); } catch (e) {}
    const v145 = -120;
    let v146;
    try { v146 = wasmF64Const(v145); } catch (e) {}
    let v164;
    try { v164 = wasmF64Const(0); } catch (e) {}
    const v166 = -2147483648;
    let v167;
    try { v167 = wasmI32Const(v166); } catch (e) {}
    const v172 = -108n;
    let v174;
    try { v174 = wasmI64Const(v172); } catch (e) {}
    const v176 = -32767;
    let v177;
    try { v177 = wasmI32Const(v176); } catch (e) {}
    const v185 = -144115188075855872;
    let v186;
    try { v186 = wasmF64Const(v185); } catch (e) {}
    const v187 = [kGCPrefix,kExprStructNewDefault,$struct15,kExprLocalSet,3,kExprBlock,kFuncRefCode,kExprBlock,kWasmVoid,kExprLoop,kWasmRefNull,kI31RefCode,kExprGlobalGet,v140,...v143,...v146,kExprF64CopySign,kExprF64StoreMem,3,22,kExprLocalGet,3,kGCPrefix,kExprStructGetS,$struct15,4,kExprLocalTee,2,kExprBrIf,1,kExprUnreachable,kExprEnd,kExprDrop,kExprEnd,kExprLocalGet,2,kExprDrop,kExprLoop,kWasmVoid,kExprBlock,kWasmVoid,...v164,kExprLoop,kWasmF64,kExprBlock,kWasmF64,...v167,kExprLocalGet,1,kExprLocalGet,2,kExprLocalTee,1,...v174,...v177,kGCPrefix,kExprStructNew,$struct15,kExprI32Const,0,kExprIf,kWasmVoid,kExprBr,4,kExprEnd,kExprDrop,...v186,kExprEnd,kExprEnd,kExprUnreachable,kExprEnd,kExprEnd,kExprUnreachable,kExprEnd];
    let v188;
    try { v188 = wasmRefType($struct15); } catch (e) {}
    let v191;
    try { v191 = $func322.addLocals(kWasmI32, 1); } catch (e) {}
    let v192;
    try { v192 = v191.addLocals(v188, 1); } catch (e) {}
    try { v192.addBody(v187); } catch (e) {}
    const v194 = {};
    let v195;
    try { v195 = builder.instantiate(v194); } catch (e) {}
    const instance = v195;
} catch(e197) {
}
