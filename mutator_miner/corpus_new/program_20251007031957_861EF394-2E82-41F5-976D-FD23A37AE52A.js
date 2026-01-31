try {
    try { load("../../v8/v8/test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
    let v4;
    try { v4 = new WasmModuleBuilder(); } catch (e) {}
    const builder = v4;
    const v9 = [kExprLoop,kWasmVoid,kExprEnd];
    let v14;
    try { v14 = builder.addFunction(undefined, kSig_v_v); } catch (e) {}
    let v15;
    try { v15 = v14.addLocals(kWasmExternRef, 16268); } catch (e) {}
    try { v15.addBody(v9); } catch (e) {}
    try { builder.toModule(); } catch (e) {}
} catch(e18) {
}
