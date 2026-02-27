try { load("test/mjsunit/wasm/wasm-constants.js"); } catch (e) {}
try { load("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
function f5() {
    let v7;
    try { v7 = new WasmModuleBuilder(); } catch (e) {}
    var builder = v7;
    try { builder.addMemory(32, 32, false); } catch (e) {}
    const v46 = [kExprI64Const,66,kExprI64Const,66,kExprI32ConvertI64,kExprI64Const,66,kExprI64StoreMem16,0,66,kExprI64Const,84,kExprI64Const,66,kExprI64Const,66,kExprI64Const,66,kExprI64Const,66,kExprI64LeU,kExprI64Const,66,kExprI64Const,66,kExprI64Const,66,kExprI64LeU,kExprI64Const,42,kExprI64Clz,kExprI64Clz,kExprI64Clz,kExprI64Const,66,kExprI64Const,66,kExprF32SConvertI64,kExprI64Const,66,kExprI64Const,66,kExprI64Const,66,kExprI64LeU,kExprI64Const,66,kExprI64Const,66,kExprI64Const,180,66,kExprI64Const,0,kExprUnreachable,kExprI32Eqz,kExprI32Eqz,kExprI32Eqz,kExprI32Eqz,kExprI32Eqz,kExprI32Eqz,kExprEnd];
    let v49;
    try { v49 = builder.addFunction("test", kSig_i_iii); } catch (e) {}
    let v50;
    try { v50 = v49.addBodyWithEnd(v46); } catch (e) {}
    try { v50.exportFunc(); } catch (e) {}
    let v52;
    try { v52 = builder.instantiate(); } catch (e) {}
    var module = v52;
    const v57 = module?.exports;
    try { v57.test(1, 2, 3); } catch (e) {}
}
try { f5(); } catch (e) {}
