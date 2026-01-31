try { load("../../v8/v8/test/mjsunit/mjsunit.js"); } catch (e) {}
try { load("../../v8/v8/test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
function I64RorLoweringTest() {
    let v7;
    try { v7 = new WasmModuleBuilder(); } catch (e) {}
    let builder = v7;
    try { builder.addMemory(1000, 1000); } catch (e) {}
    const v26 = [kExprLoop,kWasmStmt,kExprLocalGet,0,kExprI32LoadMem,0,0,kExprI64UConvertI32,kExprLocalGet,1,kExprI64Ror,kExprI32ConvertI64,kExprBrIf,0,kExprEnd];
    const v30 = [kWasmI32,kWasmI64];
    const v31 = [];
    let v33;
    try { v33 = makeSig(v30, v31); } catch (e) {}
    let v34;
    try { v34 = builder.addFunction("main", v33); } catch (e) {}
    let v35;
    try { v35 = v34.addBody(v26); } catch (e) {}
    try { v35.exportFunc(); } catch (e) {}
    const v38 = WebAssembly?.Module;
    let v39;
    try { v39 = builder.toBuffer(); } catch (e) {}
    let v40;
    try { v40 = new v38(v39); } catch (e) {}
    let module = v40;
    const v42 = WebAssembly?.Instance;
    try { new v42(module); } catch (e) {}
}
try { I64RorLoweringTest(); } catch (e) {}
