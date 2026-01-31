function f0() {
}
try { load("test/mjsunit/wasm/wasm-constants.js"); } catch (e) {}
try { load("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
function importFromOtherInstance() {
    f0(arguments.callee.name);
    let v12;
    try { v12 = new WasmModuleBuilder(); } catch (e) {}
    const builder1 = v12;
    const v14 = [];
    let v17;
    try { v17 = builder1.addFunction("func", kSig_v_v); } catch (e) {}
    let v18;
    try { v18 = v17.addBody(v14); } catch (e) {}
    try { v18.exportFunc(); } catch (e) {}
    let v20;
    try { v20 = builder1.instantiate(); } catch (e) {}
    const instance1 = v20;
    let v22;
    try { v22 = new WasmModuleBuilder(); } catch (e) {}
    const builder2 = v22;
    try { builder2.addImport("mod", "fn", kSig_v_v); } catch (e) {}
    const v28 = instance1?.exports?.func;
    const v29 = { fn: v28 };
    const v30 = { mod: v29 };
    try { builder2.instantiate(v30); } catch (e) {}
}
try { importFromOtherInstance(); } catch (e) {}
function testWasmToWasmWithDifferentMemory() {
    f0(arguments.callee.name);
    let v39;
    try { v39 = new WasmModuleBuilder(); } catch (e) {}
    const builder1 = v39;
    try { builder1.addMemory(1, 1, true); } catch (e) {}
    const v52 = [kExprI32Const,0,kExprGetLocal,0,kExprI32StoreMem,0,0];
    let v55;
    try { v55 = builder1.addFunction("store", kSig_v_i); } catch (e) {}
    let v56;
    try { v56 = v55.addBody(v52); } catch (e) {}
    try { v56.exportFunc(); } catch (e) {}
    let v58;
    try { v58 = builder1.instantiate(); } catch (e) {}
    const instance1 = v58;
    const v63 = instance1?.exports?.memory?.buffer;
    let v64;
    try { v64 = new Int32Array(v63); } catch (e) {}
    const mem1 = v64;
    let v66;
    try { v66 = new WasmModuleBuilder(); } catch (e) {}
    const builder2 = v66;
    try { builder2.addMemory(1, 1, true); } catch (e) {}
    try { builder2.addImport("mod", "store", kSig_v_i); } catch (e) {}
    const v78 = [kExprGetLocal,0,kExprCallFunction,0];
    let v80;
    try { v80 = builder2.addFunction("call_store", kSig_v_i); } catch (e) {}
    let v81;
    try { v81 = v80.addBody(v78); } catch (e) {}
    try { v81.exportFunc(); } catch (e) {}
    const v84 = instance1?.exports?.store;
    const v85 = { store: v84 };
    const v86 = { mod: v85 };
    let v87;
    try { v87 = builder2.instantiate(v86); } catch (e) {}
    const instance2 = v87;
    const v91 = instance2?.exports?.memory?.buffer;
    let v92;
    try { v92 = new Int32Array(v91); } catch (e) {}
    const mem2 = v92;
    const v95 = mem1?.[0];
    try { f0(0, v95); } catch (e) {}
    const v98 = mem2?.[0];
    try { f0(0, v98); } catch (e) {}
    const v101 = instance2?.exports;
    try { v101.call_store(3); } catch (e) {}
    const v104 = mem1?.[0];
    try { f0(3, v104); } catch (e) {}
    const v107 = mem2?.[0];
    try { f0(0, v107); } catch (e) {}
}
try { testWasmToWasmWithDifferentMemory(); } catch (e) {}
function exportImportedFunction() {
    f0(arguments.callee.name);
    let v116;
    try { v116 = new WasmModuleBuilder(); } catch (e) {}
    const builder1 = v116;
    const v119 = [];
    let v122;
    try { v122 = builder1.addFunction("foo", kSig_v_v); } catch (e) {}
    let v123;
    try { v123 = v122.addBody(v119); } catch (e) {}
    try { v123.exportAs("foo"); } catch (e) {}
    let v125;
    try { v125 = builder1.instantiate(); } catch (e) {}
    const instance1 = v125;
    let v127;
    try { v127 = new WasmModuleBuilder(); } catch (e) {}
    const builder2 = v127;
    let v131;
    try { v131 = builder2.addImport("A", "foo", kSig_v_v); } catch (e) {}
    const imp_idx = v131;
    try { builder2.addExport("foo", imp_idx); } catch (e) {}
    const v135 = instance1?.exports;
    const v136 = { A: v135 };
    let v137;
    try { v137 = builder2.instantiate(v136); } catch (e) {}
    const instance2 = v137;
    const v139 = instance2?.exports;
    try { v139.foo(); } catch (e) {}
}
try { exportImportedFunction(); } catch (e) {}
