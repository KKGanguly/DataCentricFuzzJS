function f0() {
}
try { load("test/mjsunit/wasm/wasm-constants.js"); } catch (e) {}
try { load("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
function TestTruncatedBrOnExnInLoop() {
    let v8;
    try { v8 = new WasmModuleBuilder(); } catch (e) {}
    let builder = v8;
    const v15 = [kExprLoop,kWasmStmt,kExprGetLocal,0,kExprBrOnExn];
    const v17 = { except_count: 1 };
    let v20;
    try { v20 = builder.addFunction(undefined, kSig_v_v); } catch (e) {}
    let v21;
    try { v21 = v20.addLocals(v17); } catch (e) {}
    let v22;
    try { v22 = v21.addBody(v15); } catch (e) {}
    let v23;
    try { v23 = v22.exportFunc(); } catch (e) {}
    let fun = v23;
    const v25 = fun?.body;
    try { v25.pop(); } catch (e) {}
    const v27 = () => {
        let v28;
        try { v28 = builder.instantiate(); } catch (e) {}
        return v28;
    };
    const v30 = WebAssembly?.CompileError;
    try { f0(v27, v30); } catch (e) {}
}
try { TestTruncatedBrOnExnInLoop(); } catch (e) {}
