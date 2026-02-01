try {
    try { load("test/mjsunit/wasm/wasm-constants.js"); } catch (e) {}
    try { load("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
    let v6;
    try { v6 = new WasmModuleBuilder(); } catch (e) {}
    const builder = v6;
    try { builder.addGlobal(kWasmI32, 1); } catch (e) {}
    try { builder.addGlobal(kWasmF32, 1); } catch (e) {}
    const v15 = [kWasmI32,kWasmF32,kWasmF32,kWasmF64];
    const v16 = [kWasmI32];
    let v18;
    try { v18 = makeSig(v15, v16); } catch (e) {}
    try { builder.addType(v18); } catch (e) {}
    const v42 = [kExprGetGlobal,0,kExprSetLocal,4,kExprGetLocal,4,kExprI32Const,1,kExprI32Sub,kExprGetGlobal,0,kExprI32Const,0,kExprI32Eqz,kExprGetGlobal,0,kExprI32Const,1,kExprI32Const,1,kExprI32Sub,kExprGetGlobal,0,kExprI32Const,0,kExprI32Eqz,kExprGetGlobal,0,kExprI32Const,0,kExprI32Const,1,kExprI32Sub,kExprGetGlobal,1,kExprUnreachable];
    const v44 = { i32_count: 504 };
    let v47;
    try { v47 = builder.addFunction(undefined, 0); } catch (e) {}
    let v48;
    try { v48 = v47.addLocals(v44); } catch (e) {}
    try { v48.addBody(v42); } catch (e) {}
    try { builder.instantiate(); } catch (e) {}
} catch(e51) {
}
