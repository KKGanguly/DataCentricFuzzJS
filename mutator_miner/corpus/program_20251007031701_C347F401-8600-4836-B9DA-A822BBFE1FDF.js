try { load("test/mjsunit/wasm/wasm-constants.js"); } catch (e) {}
try { load("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
function testCallImportedWithParameters() {
    const v6 = (a7) => {
        return a7 + 1;
    };
    let func1 = v6;
    const v11 = (a12) => {
        return a12 + 2;
    };
    let func2 = v11;
    let v17;
    try { v17 = new WasmModuleBuilder(); } catch (e) {}
    var builder = v17;
    const v22 = [kWasmF32];
    const v24 = [kWasmI32];
    let v26;
    try { v26 = makeSig(v22, v24); } catch (e) {}
    try { builder.addImport("mod", "func1", v26); } catch (e) {}
    const v31 = [kWasmI64];
    const v33 = [kWasmF64];
    let v34;
    try { v34 = makeSig(v31, v33); } catch (e) {}
    try { builder.addImport("mod", "func2", v34); } catch (e) {}
    const v46 = [kExprGetLocal,0,kExprCallFunction,0,kExprF32UConvertI32,kExprGetLocal,1,kExprI64UConvertI32,kExprCallFunction,1,kExprF32ConvertF64,kExprF32Add];
    const v48 = [kWasmF32,kWasmI32];
    const v49 = [kWasmF32];
    let v50;
    try { v50 = makeSig(v48, v49); } catch (e) {}
    let v51;
    try { v51 = builder.addFunction("main", v50); } catch (e) {}
    let v52;
    try { v52 = v51.addBody(v46); } catch (e) {}
    try { v52.exportFunc(); } catch (e) {}
    const v54 = { func1: func1, func2: func2 };
    const v55 = { mod: v54 };
    try { builder.instantiate(v55); } catch (e) {}
}
try { testCallImportedWithParameters(); } catch (e) {}
