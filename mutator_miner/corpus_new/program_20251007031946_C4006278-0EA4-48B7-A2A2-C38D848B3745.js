try { load("test/mjsunit/wasm/wasm-constants.js"); } catch (e) {}
try { load("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
function f5() {
    let v7;
    try { v7 = new WasmModuleBuilder(); } catch (e) {}
    const builder = v7;
    const v9 = [];
    const v10 = [];
    let v12;
    try { v12 = makeSig(v9, v10); } catch (e) {}
    try { builder.addType(v12); } catch (e) {}
    const v15 = [kWasmI32];
    const v16 = [kWasmI32];
    let v17;
    try { v17 = makeSig(v15, v16); } catch (e) {}
    try { builder.addType(v17); } catch (e) {}
    const v20 = [kExprEnd];
    let v23;
    try { v23 = builder.addFunction(undefined, 0); } catch (e) {}
    try { v23.addBodyWithEnd(v20); } catch (e) {}
    const v33 = [kExprLoop,kWasmStmt,kSimdPrefix,kExprF32x4Min,kExprI64UConvertI32,kExprI64RemS,kExprUnreachable,kExprLoop,2];
    const v35 = { i32_count: 65 };
    let v38;
    try { v38 = builder.addFunction(undefined, 1); } catch (e) {}
    let v39;
    try { v39 = v38.addLocals(v35); } catch (e) {}
    try { v39.addBodyWithEnd(v33); } catch (e) {}
}
