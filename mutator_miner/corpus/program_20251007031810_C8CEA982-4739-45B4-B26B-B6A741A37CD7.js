try {
    try { load("test/mjsunit/wasm/wasm-constants.js"); } catch (e) {}
    try { load("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
    let kTableSize = 3;
    let v8;
    try { v8 = new WasmModuleBuilder(); } catch (e) {}
    var builder = v8;
    let v11;
    try { v11 = builder.addType(kSig_i_v); } catch (e) {}
    var sig_index1 = v11;
    const v18 = [kExprGetLocal,0,kExprCallIndirect,sig_index1,kTableZero];
    let v21;
    try { v21 = builder.addFunction("main", kSig_i_ii); } catch (e) {}
    let v22;
    try { v22 = v21.addBody(v18); } catch (e) {}
    try { v22.exportAs("main"); } catch (e) {}
    try { builder.setFunctionTableBounds(kTableSize, kTableSize); } catch (e) {}
    let v25;
    try { v25 = builder.toBuffer(); } catch (e) {}
    var m1_bytes = v25;
    const v28 = WebAssembly?.Module;
    let v29;
    try { v29 = new v28(m1_bytes); } catch (e) {}
    var m1 = v29;
    const v31 = %SerializeWasmModule(m1);
    var serialized_m1 = v31;
    const v33 = %DeserializeWasmModule(serialized_m1, m1_bytes);
    var m1_clone = v33;
    const v35 = WebAssembly?.Instance;
    let v36;
    try { v36 = new v35(m1_clone); } catch (e) {}
    var i1 = v36;
    const v39 = i1?.exports;
    try { v39.main(123123); } catch (e) {}
} catch(e41) {
}
