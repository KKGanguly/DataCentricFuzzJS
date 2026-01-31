try { load("test/mjsunit/wasm/wasm-constants.js"); } catch (e) {}
try { load("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
function f5() {
    let v7;
    try { v7 = new WasmModuleBuilder(); } catch (e) {}
    var builder = v7;
    try { builder.addMemory(16, 32, false); } catch (e) {}
    const v58 = [kExprI64Const,128,128,128,128,128,128,128,128,128,0,kExprI64Const,128,128,128,128,128,128,128,128,128,0,kExprI64And,kExprI64Const,192,128,128,128,128,128,128,128,128,0,kExprI64ShrU,kExprI64Const,192,128,128,128,128,128,128,128,128,0,kExprI64GeU,kExprEnd];
    let v61;
    try { v61 = builder.addFunction("test", kSig_i_iii); } catch (e) {}
    let v62;
    try { v62 = v61.addBodyWithEnd(v58); } catch (e) {}
    try { v62.exportFunc(); } catch (e) {}
    let v64;
    try { v64 = builder.instantiate(); } catch (e) {}
    var module = v64;
    const v69 = module?.exports;
    try { v69.test(1, 2, 3); } catch (e) {}
}
try { f5(); } catch (e) {}
