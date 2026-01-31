try {
    try { load("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
    let v4;
    try { v4 = new WasmModuleBuilder(); } catch (e) {}
    let builder = v4;
    let v7;
    try { v7 = builder.addType(kSig_i_iii); } catch (e) {}
    let sig_i_iii = v7;
    const v24 = [kExprLocalGet,1,kExprLocalGet,1,kExprI32Const,5,kExprLoop,sig_i_iii,kExprLocalGet,1,kExprBlock,sig_i_iii,kExprLocalGet,1,kExprLocalGet,2,kExprBrIf,1,kExprDrop,kExprDrop,kExprDrop,kExprEnd,kExprDrop,kExprEnd];
    let v26;
    try { v26 = builder.addFunction("main", sig_i_iii); } catch (e) {}
    let v27;
    try { v27 = v26.addBody(v24); } catch (e) {}
    try { v27.exportAs("main"); } catch (e) {}
    const v30 = WebAssembly?.Module;
    let v31;
    try { v31 = builder.toBuffer(); } catch (e) {}
    let v32;
    try { v32 = new v30(v31); } catch (e) {}
    let module = v32;
} catch(e34) {
}
