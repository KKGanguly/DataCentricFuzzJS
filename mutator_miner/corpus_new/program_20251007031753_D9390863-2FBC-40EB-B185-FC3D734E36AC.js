try { load("test/mjsunit/wasm/wasm-constants.js"); } catch (e) {}
try { load("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
function f5() {
    let v7;
    try { v7 = new WasmModuleBuilder(); } catch (e) {}
    var builder = v7;
    try { builder.addMemory(32, 32, false); } catch (e) {}
    const v36 = [kExprF32Const,67,67,39,67,kExprF32Const,103,18,67,67,kExprF32Const,139,139,139,139,kExprF32Sqrt,kExprF32Abs,kExprF32Min,kExprF32Neg,kExprF32CopySign,kExprI64UConvertF32,kExprI32Const,15,kExprReturn,kExprEnd];
    let v39;
    try { v39 = builder.addFunction("test", kSig_i_iii); } catch (e) {}
    let v40;
    try { v40 = v39.addBodyWithEnd(v36); } catch (e) {}
    try { v40.exportFunc(); } catch (e) {}
    let v42;
    try { v42 = builder.instantiate(); } catch (e) {}
    var module = v42;
    const v47 = module?.exports;
    try { v47.test(1, 2, 3); } catch (e) {}
}
try { f5(); } catch (e) {}
