try {
    try { load("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
    let v4;
    try { v4 = new WasmModuleBuilder(); } catch (e) {}
    const builder = v4;
    try { builder.addMemory(1); } catch (e) {}
    const v13 = [kExprI32Const,1,kExprMemoryGrow,kMemoryZero,kNumericPrefix];
    let v16;
    try { v16 = builder.addFunction(undefined, kSig_v_i); } catch (e) {}
    try { v16.addBodyWithEnd(v13); } catch (e) {}
    let v18;
    try { v18 = builder.toBuffer(); } catch (e) {}
    const b = v18;
    try { WebAssembly.compile(b); } catch (e) {}
} catch(e22) {
}
