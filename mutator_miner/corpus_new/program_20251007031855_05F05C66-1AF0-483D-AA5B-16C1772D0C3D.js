try { load("test/mjsunit/wasm/wasm-constants.js"); } catch (e) {}
try { load("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
let instance;
function DoTest() {
    function call_main() {
        const v9 = instance?.exports;
        try { v9.main(); } catch (e) {}
    }
    let v12;
    try { v12 = new WasmModuleBuilder(); } catch (e) {}
    let module = v12;
    try { module.addImport("mod", "func", kSig_v_i); } catch (e) {}
    const v22 = [kExprGetLocal,0,kExprCallFunction,0];
    let v24;
    try { v24 = module.addFunction("main", kSig_v_i); } catch (e) {}
    let v25;
    try { v25 = v24.addBody(v22); } catch (e) {}
    try { v25.exportFunc(); } catch (e) {}
    const v27 = { func: call_main };
    const v28 = { mod: v27 };
    let v29;
    try { v29 = module.instantiate(v28); } catch (e) {}
    instance = v29;
    try {
        const v30 = instance?.exports;
        try { v30.main(); } catch (e) {}
    } catch(e32) {
    }
}
try { DoTest(); } catch (e) {}
