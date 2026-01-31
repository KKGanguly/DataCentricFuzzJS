try {
    try { load("../../v8/v8/test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
    let v4;
    try { v4 = new WasmModuleBuilder(); } catch (e) {}
    const builder = v4;
    try { builder.addMemory(16, 32, false); } catch (e) {}
    const v28 = [kExprLocalGet,0,kExprI32Const,127,kAtomicPrefix,kExprI32AtomicAdd8U,0,40,kExprI32Const,0,kExprI32LoadMem8S,0,108,kExprI32LoadMem,0,104,kExprI32Const,0,kExprCallFunction,0];
    let v31;
    try { v31 = builder.addFunction("main", kSig_i_iii); } catch (e) {}
    let v32;
    try { v32 = v31.addBody(v28); } catch (e) {}
    try { v32.exportFunc(); } catch (e) {}
    let v34;
    try { v34 = builder.instantiate(); } catch (e) {}
    const instance = v34;
    const v36 = instance?.exports;
    try { v36.main(); } catch (e) {}
} catch(e38) {
}
