try {
    function f0() {
    }
    try { load("test/mjsunit/wasm/wasm-constants.js"); } catch (e) {}
    try { load("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
    let v7;
    try { v7 = new WasmModuleBuilder(); } catch (e) {}
    const builder = v7;
    const v10 = [kWasmI32,kWasmI32,kWasmI32];
    const v11 = [kWasmI32];
    let v13;
    try { v13 = makeSig(v10, v11); } catch (e) {}
    let v14;
    try { v14 = builder.addType(v13); } catch (e) {}
    const sig = v14;
    const v21 = [kExprGetLocal,2,kExprIf,kWasmStmt,kExprBlock,kWasmStmt];
    let v23;
    try { v23 = builder.addFunction(undefined, sig); } catch (e) {}
    try { v23.addBody(v21); } catch (e) {}
    try { builder.addExport("main", 0); } catch (e) {}
    const v28 = () => {
        let v29;
        try { v29 = builder.instantiate(); } catch (e) {}
        return v29;
    };
    const v31 = WebAssembly?.CompileError;
    try { f0(v28, v31); } catch (e) {}
} catch(e33) {
}
