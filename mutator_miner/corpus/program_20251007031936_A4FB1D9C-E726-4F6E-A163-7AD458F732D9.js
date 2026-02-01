try {
    function f0() {
    }
    try { load("test/mjsunit/wasm/wasm-constants.js"); } catch (e) {}
    try { load("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
    let v8;
    try { v8 = new Error(); } catch (e) {}
    const v17 = {
        has(a10, a11, a12) {
            try { f0("intercepted has:", a11); } catch (e) {}
            let v16;
            try { v16 = Reflect.has(a10, a11, a12); } catch (e) {}
            return v16;
        },
    };
    let v18;
    try { v18 = new Proxy(v8, v17); } catch (e) {}
    var proxy = v18;
    let v21;
    try { v21 = new Error("my error"); } catch (e) {}
    var error = v21;
    error.__proto__ = proxy;
    function fun() {
        try { f0("throwing"); } catch (e) {}
        throw error;
    }
    let v27;
    try { v27 = new WasmModuleBuilder(); } catch (e) {}
    var builder = v27;
    try { builder.addException(kSig_v_v); } catch (e) {}
    try { builder.addImport("mod", "fun", kSig_v_v); } catch (e) {}
    const v36 = [kExprCallFunction,0];
    let v38;
    try { v38 = builder.addFunction("funnel", kSig_v_v); } catch (e) {}
    let v39;
    try { v39 = v38.addBody(v36); } catch (e) {}
    try { v39.exportFunc(); } catch (e) {}
    const v41 = { fun: fun };
    const v42 = { mod: v41 };
    let v43;
    try { v43 = builder.instantiate(v42); } catch (e) {}
    var instance = v43;
    const v45 = instance?.exports;
    try { v45.funnel(); } catch (e) {}
} catch(e47) {
}
