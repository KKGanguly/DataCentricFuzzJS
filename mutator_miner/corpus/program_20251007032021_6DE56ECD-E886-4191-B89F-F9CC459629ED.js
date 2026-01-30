function f0() {
}
try { load("test/mjsunit/wasm/wasm-constants.js"); } catch (e) {}
try { load("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
function f6() {
    let v8;
    try { v8 = new WasmModuleBuilder(); } catch (e) {}
    var builder = v8;
    try { builder.addMemory(16, 32, false); } catch (e) {}
    const v43 = [kExprI32Const,65,kExprI32Const,69,kExprI32Const,65,kExprI32DivU,kExprI32LoadMem8S,0,58,kExprI32Const,117,kExprI32Const,117,kExprI32Const,110,kExprI32Eqz,kExprI32LoadMem8S,0,58,kExprI32Add,kExprI32DivU,kExprI32LoadMem8S,0,116,kExprI32And,kExprI32Eqz,kExprI32And,kExprGrowMemory,0,kExprI32Const,85,kExprI32LoadMem8S,0,58,kExprI32LoadMem16U,0,113,kExprI32Const,0,kExprI32RemU,kExprI32And,kExprI32Eqz,kExprEnd];
    let v46;
    try { v46 = builder.addFunction("test", kSig_i_i); } catch (e) {}
    let v47;
    try { v47 = v46.addBodyWithEnd(v43); } catch (e) {}
    try { v47.exportFunc(); } catch (e) {}
    let v49;
    try { v49 = builder.instantiate(); } catch (e) {}
    var module = v49;
    const v51 = () => {
        const v53 = module?.exports;
        try { v53.test(1); } catch (e) {}
    };
    try { f0(v51); } catch (e) {}
}
try { f6(); } catch (e) {}
