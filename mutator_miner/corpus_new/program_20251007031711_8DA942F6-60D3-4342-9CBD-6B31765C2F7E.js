try {
    function f0() {
    }
    try { load("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
    let v5;
    try { v5 = new WasmModuleBuilder(); } catch (e) {}
    const builder = v5;
    try { builder.addMemory(16, 32, false); } catch (e) {}
    const v12 = [kWasmI32,kWasmI32,kWasmI32];
    const v13 = [kWasmI32];
    let v15;
    try { v15 = makeSig(v12, v13); } catch (e) {}
    try { builder.addType(v15); } catch (e) {}
    const v29 = [kExprI32Const,117,kExprI32Const,116,kExprI32Const,24,kSimdPrefix,kExprS8x16LoadSplat,kExprUnreachable,kExprUnreachable,kExprI32Const,111,kExprI32Const,127,kExprI32Const,111,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprEnd];
    let v32;
    try { v32 = builder.addFunction(undefined, 0); } catch (e) {}
    try { v32.addBodyWithEnd(v29); } catch (e) {}
    try { builder.addExport("main", 0); } catch (e) {}
    let v37;
    try { v37 = builder.instantiate(); } catch (e) {}
    const instance = v37;
    const v42 = instance?.exports;
    let v43;
    try { v43 = v42.main(1, 2, 3); } catch (e) {}
    try { f0(v43); } catch (e) {}
} catch(e45) {
}
