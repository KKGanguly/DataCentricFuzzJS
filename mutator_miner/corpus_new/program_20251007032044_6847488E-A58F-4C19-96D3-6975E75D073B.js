try {
    try { load("test/mjsunit/wasm/wasm-constants.js"); } catch (e) {}
    try { load("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
    let v6;
    try { v6 = new WasmModuleBuilder(); } catch (e) {}
    var builder = v6;
    const v11 = [kExprCallFunction,kArity0,0];
    let v14;
    try { v14 = builder.addFunction("recursion", kSig_v_v); } catch (e) {}
    let v15;
    try { v15 = v14.addBody(v11); } catch (e) {}
    try { v15.exportFunc(); } catch (e) {}
    let v17;
    try { v17 = builder.instantiate(); } catch (e) {}
    var module = v17;
    try {
        const v19 = module?.exports;
        try { v19.recursion(); } catch (e) {}
    } catch(e21) {
    }
} catch(e22) {
}
