function f0() {
}
try { load("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
function f4() {
    let v6;
    try { v6 = new WasmModuleBuilder(); } catch (e) {}
    const builder = v6;
    try { builder.addMemory(16, 32, false, true); } catch (e) {}
    const v14 = [kWasmI32,kWasmI32,kWasmI32];
    const v15 = [kWasmI32];
    let v17;
    try { v17 = makeSig(v14, v15); } catch (e) {}
    try { builder.addType(v17); } catch (e) {}
    const v31 = [kExprI32Const,128,1,kExprI32Clz,kExprI32Const,0,kExprI64Const,0,kAtomicPrefix,kExprI64AtomicStore8U,0,0,kExprEnd];
    let v34;
    try { v34 = builder.addFunction(undefined, 0); } catch (e) {}
    try { v34.addBodyWithEnd(v31); } catch (e) {}
    try { builder.addExport("main", 0); } catch (e) {}
    let v39;
    try { v39 = builder.instantiate(); } catch (e) {}
    const instance = v39;
    const v44 = instance?.exports;
    let v45;
    try { v45 = v44.main(1, 2, 3); } catch (e) {}
    try { f0(v45); } catch (e) {}
}
try { f4(); } catch (e) {}
