try {
    function f0() {
    }
    const v3 = d8?.file;
    try { v3.execute("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
    let v6;
    try { v6 = new WasmModuleBuilder(); } catch (e) {}
    const builder = v6;
    let v10;
    try { v10 = wasmRefType(kWasmFuncRef); } catch (e) {}
    let v13;
    try { v13 = makeField(v10, true); } catch (e) {}
    let v16;
    try { v16 = makeField(kWasmF32, false); } catch (e) {}
    let v18;
    try { v18 = makeField(kWasmF32, true); } catch (e) {}
    const v19 = [v13,v16,v18];
    try { builder.addStruct(v19); } catch (e) {}
    let v22;
    try { v22 = wasmRefType(kWasmI31Ref); } catch (e) {}
    let v24;
    try { v24 = makeField(v22, true); } catch (e) {}
    let v27;
    try { v27 = wasmRefNullType(kWasmStructRef); } catch (e) {}
    let v29;
    try { v29 = makeField(v27, false); } catch (e) {}
    let v32;
    try { v32 = makeField(kWasmI32, false); } catch (e) {}
    const v33 = [v24,v29,v32];
    try { builder.addStruct(v33); } catch (e) {}
    let v35;
    try { v35 = wasmRefType(kWasmI31Ref); } catch (e) {}
    let v37;
    try { v37 = makeField(v35, true); } catch (e) {}
    let v38;
    try { v38 = wasmRefNullType(kWasmStructRef); } catch (e) {}
    let v40;
    try { v40 = makeField(v38, false); } catch (e) {}
    let v42;
    try { v42 = makeField(kWasmI32, false); } catch (e) {}
    const v43 = [v37,v40,v42];
    try { builder.addStruct(v43, 1); } catch (e) {}
    let v46;
    try { v46 = wasmRefNullType(kWasmStructRef); } catch (e) {}
    try { builder.addArray(v46, true); } catch (e) {}
    try { builder.addArray(kWasmExternRef, true); } catch (e) {}
    try { builder.addArray(kWasmI32, true); } catch (e) {}
    try { builder.addArray(kWasmExternRef, true, 4); } catch (e) {}
    const v57 = [kWasmI32,kWasmI32,kWasmI32];
    const v58 = [];
    let v60;
    try { v60 = makeSig(v57, v58); } catch (e) {}
    try { builder.addType(v60); } catch (e) {}
    const v62 = [];
    const v63 = [];
    let v64;
    try { v64 = makeSig(v62, v63); } catch (e) {}
    try { builder.addType(v64); } catch (e) {}
    const v66 = [];
    let v68;
    try { v68 = wasmRefType(7); } catch (e) {}
    let v70;
    try { v70 = wasmRefType(6); } catch (e) {}
    let v73;
    try { v73 = wasmRefType(kWasmEqRef); } catch (e) {}
    let v75;
    try { v75 = wasmRefType(kWasmArrayRef); } catch (e) {}
    const v76 = [v68,v70,kWasmAnyRef,v73,v75];
    let v77;
    try { v77 = makeSig(v66, v76); } catch (e) {}
    try { builder.addType(v77); } catch (e) {}
    try { builder.addMemory(16, 32); } catch (e) {}
    try { builder.addTable(kWasmFuncRef, 3, 3, undefined); } catch (e) {}
    const v86 = [];
    const v87 = [];
    let v88;
    try { v88 = makeSig(v86, v87); } catch (e) {}
    try { builder.addTag(v88); } catch (e) {}
    const v133 = [kExprLoop,127,kExprLoop,127,kExprTry,124,kExprTry,124,kExprF64Const,67,209,164,82,241,123,241,155,kExprCatchAll,kExprF64Const,67,209,164,82,241,123,241,155,kExprRefNull,8,kExprCallRef,8,kExprEnd,kExprF64Sqrt,kExprEnd,kNumericPrefix,kExprI32UConvertSatF64,kExprCallFunction,2,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprI32Const,192,145,192,182,120,kExprBrIf,1,kExprEnd,kExprEnd,kExprDrop,kExprEnd];
    let v136;
    try { v136 = builder.addFunction(undefined, 7); } catch (e) {}
    try { v136.addBodyWithEnd(v133); } catch (e) {}
    const v138 = [kExprEnd];
    let v141;
    try { v141 = builder.addFunction(undefined, 8); } catch (e) {}
    try { v141.addBodyWithEnd(v138); } catch (e) {}
    const v177 = [kExprRefFunc,0,kExprRefNull,111,kExprI32Const,136,199,185,225,7,kExprI32Const,20,kExprI32RemS,kGCPrefix,kExprArrayNew,6,kExprRefNull,110,kExprRefFunc,0,kExprF32Const,229,90,232,57,kExprF32Const,61,157,61,124,kGCPrefix,kExprStructNew,0,kExprRefNull,107,kExprI32Const,196,237,218,254,2,kExprI32Const,20,kExprI32RemS,kGCPrefix,kExprArrayNew,3,kExprEnd];
    let v180;
    try { v180 = builder.addFunction(undefined, 9); } catch (e) {}
    try { v180.addBodyWithEnd(v177); } catch (e) {}
    try { builder.addExport("main", 0); } catch (e) {}
    let v185;
    try { v185 = builder.instantiate(); } catch (e) {}
    const instance = v185;
    try {
        const v190 = instance?.exports;
        let v191;
        try { v191 = v190.main(1, 2, 3); } catch (e) {}
        try { f0(v191); } catch (e) {}
    } catch(e193) {
        try { f0("caught exception", e193); } catch (e) {}
    }
} catch(e196) {
}
