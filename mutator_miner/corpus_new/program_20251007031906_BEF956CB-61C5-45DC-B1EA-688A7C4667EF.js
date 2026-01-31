try { load("test/mjsunit/wasm/wasm-constants.js"); } catch (e) {}
try { load("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
function f5() {
    let v7;
    try { v7 = new WasmModuleBuilder(); } catch (e) {}
    var builder = v7;
    try { builder.addMemory(31, 31, false); } catch (e) {}
    const v15 = [kExprUnreachable,kExprEnd];
    let v18;
    try { v18 = builder.addFunction("test", kSig_l_v); } catch (e) {}
    let v19;
    try { v19 = v18.addBodyWithEnd(v15); } catch (e) {}
    try { v19.exportFunc(); } catch (e) {}
    let v21;
    try { v21 = builder.instantiate(); } catch (e) {}
    var module = v21;
}
try { f5(); } catch (e) {}
