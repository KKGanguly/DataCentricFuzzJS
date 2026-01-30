try {
    function f0() {
    }
    const v3 = d8?.file;
    try { v3.execute("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
    let v6;
    try { v6 = new WasmModuleBuilder(); } catch (e) {}
    const builder = v6;
    let v9;
    try { v9 = builder.addType(kSig_v_v); } catch (e) {}
    let $sig5 = v9;
    let v12;
    try { v12 = builder.addType(kSig_i_i); } catch (e) {}
    let $sig9 = v12;
    const v14 = [];
    let v16;
    try { v16 = builder.addFunction("callee0", $sig5); } catch (e) {}
    let v17;
    try { v17 = v16.addBody(v14); } catch (e) {}
    let callee_017 = v17;
    const v19 = [];
    let v21;
    try { v21 = builder.addFunction("callee1", $sig5); } catch (e) {}
    let v22;
    try { v22 = v21.addBody(v19); } catch (e) {}
    let callee_118 = v22;
    let v25;
    try { v25 = builder.addFunction("main", $sig9); } catch (e) {}
    let v26;
    try { v26 = v25.exportFunc(); } catch (e) {}
    let main25 = v26;
    let v33;
    try { v33 = wasmI32Const(0); } catch (e) {}
    let v34;
    try { v34 = builder.addGlobal(kWasmI32, true, false, v33); } catch (e) {}
    let $global0 = v34;
    let v39;
    try { v39 = builder.addTable(kWasmFuncRef, 8, 8); } catch (e) {}
    let $table0 = v39;
    const v41 = $table0?.index;
    let v43;
    try { v43 = wasmI32Const(0); } catch (e) {}
    const v49 = [[kExprRefFunc,callee_017?.index],[kExprRefFunc,callee_118?.index]];
    let v50;
    try { v50 = builder.addActiveElementSegment(v41, v43, v49, kWasmFuncRef); } catch (e) {}
    let $segment0 = v50;
    let v52;
    try { v52 = builder.addTag($sig5); } catch (e) {}
    let $tag0 = v52;
    const v68 = [kExprTry,kWasmVoid,kExprThrow,$tag0,kExprCatchAll,kExprLocalGet,0,kExprTableGet,$table0?.index,kGCPrefix,kExprRefCast,$sig5,kExprCallRef,$sig5,kExprEnd,kExprI32Const,42];
    try { main25.addBody(v68); } catch (e) {}
    const v70 = {};
    let v71;
    try { v71 = builder.instantiate(v70); } catch (e) {}
    const instance = v71;
    const main = instance?.exports?.main;
    let v78;
    try { v78 = main(0); } catch (e) {}
    try { f0(42, v78); } catch (e) {}
    const v80 = %WasmTierUpFunction(main);
    let v83;
    try { v83 = main(1); } catch (e) {}
    try { f0(42, v83); } catch (e) {}
} catch(e85) {
}
