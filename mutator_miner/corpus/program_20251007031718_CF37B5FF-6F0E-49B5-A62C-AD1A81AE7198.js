try {
    function f0() {
    }
    try { load("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
    let v5;
    try { v5 = new WasmModuleBuilder(); } catch (e) {}
    const builder = v5;
    try { builder.addMemory(16, 32, false, true); } catch (e) {}
    const v14 = [kWasmI64,kWasmI32,kWasmI64,kWasmI32,kWasmI32,kWasmI32,kWasmI32,kWasmI32,kWasmI32,kWasmI64,kWasmI64,kWasmI64];
    const v15 = [kWasmI64];
    let v17;
    try { v17 = makeSig(v14, v15); } catch (e) {}
    let v18;
    try { v18 = builder.addType(v17); } catch (e) {}
    const sig = v18;
    const v30 = [kExprI32Const,0,kExprI64Const,0,kExprI64Const,0,kAtomicPrefix,kExprI64AtomicCompareExchange,0,8,kExprEnd];
    const v32 = { i32_count: 15 };
    const v34 = { f64_count: 1 };
    const v36 = { i32_count: 4 };
    const v38 = { f32_count: 10 };
    let v40;
    try { v40 = builder.addFunction(undefined, sig); } catch (e) {}
    let v41;
    try { v41 = v40.addLocals(v38); } catch (e) {}
    let v42;
    try { v42 = v41.addLocals(v36); } catch (e) {}
    let v43;
    try { v43 = v42.addLocals(v34); } catch (e) {}
    let v44;
    try { v44 = v43.addLocals(v32); } catch (e) {}
    try { v44.addBodyWithEnd(v30); } catch (e) {}
    try { builder.addExport("main", 0); } catch (e) {}
    let v49;
    try { v49 = builder.instantiate(); } catch (e) {}
    const instance = v49;
    const v65 = instance?.exports;
    let v66;
    try { v66 = v65.main(1n, 2, 3n, 4, 5, 6, 7, 8, 9, 10n, 11n, 12n, 13n); } catch (e) {}
    try { f0(0n, v66); } catch (e) {}
} catch(e68) {
}
