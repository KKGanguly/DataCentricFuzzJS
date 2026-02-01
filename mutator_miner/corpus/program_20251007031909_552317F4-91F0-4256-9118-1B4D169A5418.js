function f0() {
}
try { load("test/mjsunit/wasm/wasm-constants.js"); } catch (e) {}
try { load("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
function f6() {
    let v8;
    try { v8 = new WasmModuleBuilder(); } catch (e) {}
    const builder = v8;
    const v11 = [kWasmI32];
    const v12 = [];
    let v14;
    try { v14 = makeSig(v11, v12); } catch (e) {}
    sig1 = v14;
    const v17 = [kExprBlock];
    let v20;
    try { v20 = builder.addFunction("main", sig1); } catch (e) {}
    try { v20.addBodyWithEnd(v17); } catch (e) {}
    function f22() {
        try { builder.instantiate(); } catch (e) {}
    }
    const v25 = WebAssembly?.CompileError;
    try { f0(f22, v25); } catch (e) {}
}
try { f6(); } catch (e) {}
