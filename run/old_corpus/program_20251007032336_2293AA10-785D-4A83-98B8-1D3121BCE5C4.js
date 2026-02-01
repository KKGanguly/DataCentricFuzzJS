try {
    function f0() {
    }
    const v3 = d8?.file;
    try { v3.execute("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
    let v6;
    try { v6 = new WasmModuleBuilder(); } catch (e) {}
    const builder = v6;
    const v9 = [kWasmI32,kWasmI32,kWasmI32];
    const v10 = [kWasmI32];
    let v12;
    try { v12 = makeSig(v9, v10); } catch (e) {}
    try { builder.addType(v12); } catch (e) {}
    try { builder.addMemory(1, 32); } catch (e) {}
    let v19;
    try { v19 = wasmRefType(0); } catch (e) {}
    const v24 = [kExprRefFunc,0];
    try { builder.addTable(v19, 2, 22, v24); } catch (e) {}
    const v35 = [kExprRefFunc,0,kExprI32Const,0,kExprMemoryGrow,0,kNumericPrefix,kExprTableGrow,0,kExprUnreachable];
    let v38;
    try { v38 = builder.addFunction("main", 0); } catch (e) {}
    let v39;
    try { v39 = v38.addBody(v35); } catch (e) {}
    try { v39.exportFunc(); } catch (e) {}
    let v41;
    try { v41 = builder.instantiate(); } catch (e) {}
    const instance = v41;
    const v45 = instance?.exports?.main;
    try { f0(kTrapUnreachable, v45); } catch (e) {}
} catch(e47) {
}
