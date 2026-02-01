try {
    function f0() {
    }
    try { load("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
    let v5;
    try { v5 = new WasmModuleBuilder(); } catch (e) {}
    const builder = v5;
    const v9 = [kExprBr,255];
    let v12;
    try { v12 = builder.addFunction(undefined, kSig_v_v); } catch (e) {}
    try { v12.addBodyWithEnd(v9); } catch (e) {}
    const v14 = () => {
        let v15;
        try { v15 = builder.instantiate(); } catch (e) {}
        return v15;
    };
    const v17 = WebAssembly?.CompileError;
    try { f0(v14, v17); } catch (e) {}
} catch(e19) {
}
