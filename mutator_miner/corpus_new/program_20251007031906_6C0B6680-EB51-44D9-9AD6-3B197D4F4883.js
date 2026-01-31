try {
    function f0() {
    }
    try { load("test/mjsunit/wasm/wasm-constants.js"); } catch (e) {}
    try { load("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
    let v7;
    try { v7 = new WasmModuleBuilder(); } catch (e) {}
    var module = v7;
    try { module.addMemory(); } catch (e) {}
    const v21 = [kExprI32Const,20,kExprI32Const,29,kExprGrowMemory,kMemoryZero,kExprI32StoreMem,0,255,255,122];
    let v24;
    try { v24 = module.addFunction("main", kSig_v_v); } catch (e) {}
    let v25;
    try { v25 = v24.addBody(v21); } catch (e) {}
    try { v25.exportAs("main"); } catch (e) {}
    let v27;
    try { v27 = module.instantiate(); } catch (e) {}
    var instance = v27;
    const v31 = instance?.exports?.main;
    try { f0(kTrapMemOutOfBounds, v31); } catch (e) {}
} catch(e33) {
}
