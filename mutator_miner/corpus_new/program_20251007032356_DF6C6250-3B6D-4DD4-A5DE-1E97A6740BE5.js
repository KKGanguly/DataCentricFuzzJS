const v2 = d8.file;
try { v2.execute("../../v8/v8/test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
function TierUpIndirectlyCalledFunction() {
    let v6;
    try { v6 = new WasmModuleBuilder(); } catch (e) {}
    let builder = v6;
    let v9;
    try { v9 = builder.addType(kSig_v_v); } catch (e) {}
    let sig = v9;
    let v13;
    try { v13 = builder.addImport("m", "f", sig); } catch (e) {}
    let imp = v13;
    try { builder.addTable(kWasmFuncRef, 1, 1); } catch (e) {}
    const v23 = [kExprRefFunc,0];
    try { builder.addTable(kWasmFuncRef, 3, 3, v23); } catch (e) {}
    const v43 = [kExprLoop,kWasmVoid,kExprI32Const,2,kExprCallIndirect,0,1,kExprLocalGet,0,kExprI32Const,1,kExprI32Sub,kExprLocalTee,0,kExprI32Eqz,kExprI32Eqz,kExprBrIf,0,kExprEnd,kExprI32Const,0];
    let v46;
    try { v46 = builder.addFunction("main", kSig_i_i); } catch (e) {}
    let v47;
    try { v47 = v46.exportFunc(); } catch (e) {}
    try { v47.addBody(v43); } catch (e) {}
    const v49 = (a50) => {
        return a50;
    };
    const v51 = { f: v49 };
    const v52 = { m: v51 };
    let v53;
    try { v53 = builder.instantiate(v52); } catch (e) {}
    let instance = v53;
    const v56 = instance?.exports;
    try { v56.main(2); } catch (e) {}
}
try { TierUpIndirectlyCalledFunction(); } catch (e) {}
