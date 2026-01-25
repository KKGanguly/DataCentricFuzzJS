try {
    function f0() {
    }
    const v3 = d8?.file;
    try { v3.execute("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
    let v6;
    try { v6 = new WasmModuleBuilder(); } catch (e) {}
    const builder = v6;
    let v11;
    try { v11 = makeField(kWasmI32, true); } catch (e) {}
    const v12 = [v11];
    try { builder.addStruct(v12); } catch (e) {}
    let v16;
    try { v16 = wasmRefNullType(0); } catch (e) {}
    let v18;
    try { v18 = makeField(v16, true); } catch (e) {}
    const v19 = [v18];
    try { builder.addStruct(v19); } catch (e) {}
    let v22;
    try { v22 = wasmRefNullType(1); } catch (e) {}
    let v24;
    try { v24 = makeField(v22, false); } catch (e) {}
    const v25 = [v24];
    try { builder.addStruct(v25); } catch (e) {}
    let v28;
    try { v28 = wasmRefNullType(2); } catch (e) {}
    let v30;
    try { v30 = makeField(v28, false); } catch (e) {}
    const v31 = [v30];
    try { builder.addStruct(v31); } catch (e) {}
    let v34;
    try { v34 = wasmRefNullType(3); } catch (e) {}
    let v36;
    try { v36 = makeField(v34, false); } catch (e) {}
    const v37 = [v36];
    try { builder.addStruct(v37); } catch (e) {}
    let v41;
    try { v41 = wasmRefType(4); } catch (e) {}
    const v47 = [kGCPrefix,kExprStructNewDefault,4];
    try { builder.addTable(v41, 1, 2, v47); } catch (e) {}
    const v66 = [kExprI32Const,0,kExprTableGet,0,kGCPrefix,kExprStructGet,4,0,kGCPrefix,kExprStructGet,3,0,kGCPrefix,kExprStructGet,2,0,kGCPrefix,kExprStructGet,1,0,kGCPrefix,kExprStructGet,0,0,kExprDrop,kExprEnd];
    const v68 = [];
    const v69 = [];
    let v71;
    try { v71 = makeSig(v68, v69); } catch (e) {}
    let v72;
    try { v72 = builder.addFunction(undefined, v71); } catch (e) {}
    try { v72.addBodyWithEnd(v66); } catch (e) {}
    try { builder.addExport("main", 0); } catch (e) {}
    let v77;
    try { v77 = builder.instantiate(); } catch (e) {}
    const instance = v77;
    const v79 = instance?.exports;
    let v80;
    try { v80 = v79.main(); } catch (e) {}
    try { f0(v80); } catch (e) {}
} catch(e82) {
}
