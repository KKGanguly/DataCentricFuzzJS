try { load("test/mjsunit/wasm/wasm-constants.js"); } catch (e) {}
try { load("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
function f5() {
    let v7;
    try { v7 = new WasmModuleBuilder(); } catch (e) {}
    var builder = v7;
    try { builder.addMemory(16, 32, false); } catch (e) {}
    const v42 = [kExprGetLocal,0,kExprGrowMemory,0,kExprGetLocal,0,kExprGrowMemory,0,kExprGetLocal,1,kExprGrowMemory,0,kExprGetLocal,1,kExprGrowMemory,0,kExprGetLocal,0,kExprGrowMemory,0,kExprGetLocal,1,kExprGrowMemory,0,kExprGetLocal,1,kExprGrowMemory,0,kExprGetLocal,0,kExprGrowMemory,0,kExprGetLocal,0,kExprGrowMemory,0,kExprGetLocal,1,kExprGrowMemory,0,kExprI32StoreMem16,0,255,255,63,kExprUnreachable,kExprEnd];
    let v45;
    try { v45 = builder.addFunction("test", kSig_i_iii); } catch (e) {}
    let v46;
    try { v46 = v45.addBodyWithEnd(v42); } catch (e) {}
    try { v46.exportFunc(); } catch (e) {}
    let v48;
    try { v48 = builder.instantiate(); } catch (e) {}
    var module = v48;
    const v53 = module?.exports;
    try { v53.test(1, 2, 3); } catch (e) {}
}
try { f5(); } catch (e) {}
