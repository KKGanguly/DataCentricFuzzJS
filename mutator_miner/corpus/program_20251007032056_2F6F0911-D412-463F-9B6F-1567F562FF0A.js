try {
    function f0() {
    }
    try { load("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
    let v5;
    try { v5 = new WasmModuleBuilder(); } catch (e) {}
    const builder = v5;
    try { builder.addMemory(16, 32, false, true); } catch (e) {}
    const v12 = [];
    const v13 = [];
    let v15;
    try { v15 = makeSig(v12, v13); } catch (e) {}
    try { builder.addType(v15); } catch (e) {}
    const v28 = [kExprI32Const,0,kExprI32Const,0,kExprI32Const,0,kAtomicPrefix,kExprI32AtomicCompareExchange8U,0,195,1,kExprDrop,kExprEnd];
    let v31;
    try { v31 = builder.addFunction(undefined, 0); } catch (e) {}
    try { v31.addBodyWithEnd(v28); } catch (e) {}
    try { builder.addExport("main", 0); } catch (e) {}
    let v36;
    try { v36 = builder.instantiate(); } catch (e) {}
    const instance = v36;
    const v41 = instance?.exports;
    let v42;
    try { v42 = v41.main(1, 2, 3); } catch (e) {}
    try { f0(v42); } catch (e) {}
} catch(e44) {
}
