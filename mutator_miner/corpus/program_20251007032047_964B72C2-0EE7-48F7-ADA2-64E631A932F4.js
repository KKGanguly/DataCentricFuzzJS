try {
    function f0() {
    }
    try { load("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
    let v5;
    try { v5 = new WasmModuleBuilder(); } catch (e) {}
    const builder = v5;
    const v10 = [kWasmF32,kWasmF32,kWasmI32,kWasmI32,kWasmI32,kWasmExternRef,kWasmI32,kWasmI32,kWasmI32,kWasmI32];
    const v12 = [kWasmI64];
    let v14;
    try { v14 = makeSig(v10, v12); } catch (e) {}
    try { builder.addType(v14); } catch (e) {}
    const v16 = [];
    let v19;
    try { v19 = builder.addFunction(undefined, 0); } catch (e) {}
    try { v19.addBodyWithEnd(v16); } catch (e) {}
    const v50 = [kExprLocalGet,0,kExprLocalGet,1,kExprLocalGet,2,kExprLocalGet,3,kExprI32Const,5,kExprLocalGet,5,kExprLocalGet,6,kExprLocalGet,7,kExprI32Const,91,kExprI32Const,48,kExprCallFunction,1,kExprLocalGet,0,kExprLocalGet,1,kExprLocalGet,2,kExprLocalGet,3,kExprLocalGet,7,kExprLocalGet,5,kExprLocalGet,6,kExprLocalGet,7,kExprI32Const,127,kExprI64DivS,kExprF64Eq,kExprI32DivU,kExprTableGet,127,kExprI64ShrS];
    let v53;
    try { v53 = builder.addFunction(undefined, 0); } catch (e) {}
    try { v53.addBodyWithEnd(v50); } catch (e) {}
    function f55() {
        try { builder.instantiate(); } catch (e) {}
    }
    const v58 = WebAssembly?.CompileError;
    try { f0(f55, v58); } catch (e) {}
} catch(e60) {
}
