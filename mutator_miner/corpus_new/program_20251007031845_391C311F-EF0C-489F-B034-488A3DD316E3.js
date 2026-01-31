try {
    function f0() {
    }
    try { load("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
    let v5;
    try { v5 = new WasmModuleBuilder(); } catch (e) {}
    var builder = v5;
    const v9 = [kExprI32Const,1];
    const v11 = { i32_count: 1 };
    let v14;
    try { v14 = builder.addFunction("helper", kSig_i_v); } catch (e) {}
    let v15;
    try { v15 = v14.addLocals(v11); } catch (e) {}
    let v16;
    try { v16 = v15.addBody(v9); } catch (e) {}
    var func_idx = v16?.index;
    var large_function_body = [];
    const num_temporaries = 16 * 1024;
    for (let i26 = 0; i26 < num_temporaries; ++i26) {
        try { large_function_body.push(kExprCallFunction, func_idx); } catch (e) {}
    }
    for (let i34 = 1; i34 < num_temporaries; ++i34) {
        try { large_function_body.push(kExprI32Add); } catch (e) {}
    }
    let v42;
    try { v42 = builder.addFunction("test", kSig_i_v); } catch (e) {}
    let v43;
    try { v43 = v42.addBody(large_function_body); } catch (e) {}
    try { v43.exportFunc(); } catch (e) {}
    let v45;
    try { v45 = builder.instantiate(); } catch (e) {}
    var module = v45;
    const v47 = module?.exports;
    let v48;
    try { v48 = v47.test(); } catch (e) {}
    try { f0(num_temporaries, v48); } catch (e) {}
} catch(e50) {
}
