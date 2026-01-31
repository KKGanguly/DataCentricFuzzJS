try { load("test/mjsunit/wasm/wasm-constants.js"); } catch (e) {}
try { load("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
function f5() {
    let v7;
    try { v7 = new WasmModuleBuilder(); } catch (e) {}
    var builder = v7;
    try { builder.addMemory(32, 32, false); } catch (e) {}
    const v26 = [kExprI64Const,127,kExprI64Const,66,kExprI64DivS,kExprI64Const,66,kExprI64Const,66,kExprI64ShrU,kExprI64ShrU,kExprI64Const,66,kExprI64Const,66,kExprI64ShrU,kExprI64Sub,kExprI64Const,127,kExprI64DivS,kExprUnreachable,kExprEnd];
    let v29;
    try { v29 = builder.addFunction("test", kSig_i_iii); } catch (e) {}
    let v30;
    try { v30 = v29.addBodyWithEnd(v26); } catch (e) {}
    try { v30.exportFunc(); } catch (e) {}
    let v32;
    try { v32 = builder.instantiate(); } catch (e) {}
    var module = v32;
    const v37 = module?.exports;
    try { v37.test(1, 2, 3); } catch (e) {}
}
try { f5(); } catch (e) {}
