try { load("test/mjsunit/wasm/wasm-constants.js"); } catch (e) {}
try { load("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
function f5() {
    let v7;
    try { v7 = new WasmModuleBuilder(); } catch (e) {}
    var builder = v7;
    try { builder.addMemory(16, 32, false); } catch (e) {}
    const v27 = [kExprI64Const,66,kExprI64Const,1,kExprI64Const,66,kExprI64Const,127,kExprI64DivS,kExprI64Const,66,kExprI64Const,111,kExprI64Shl,kExprI64ShrU,kExprI64Const,127,kExprI64And,kExprI64ShrU,kExprI64DivS,kExprUnreachable,kExprEnd];
    let v30;
    try { v30 = builder.addFunction("test", kSig_i_iii); } catch (e) {}
    let v31;
    try { v31 = v30.addBodyWithEnd(v27); } catch (e) {}
    try { v31.exportFunc(); } catch (e) {}
    let v33;
    try { v33 = builder.instantiate(); } catch (e) {}
    var module = v33;
    const v38 = module?.exports;
    try { v38.test(1, 2, 3); } catch (e) {}
}
try { f5(); } catch (e) {}
