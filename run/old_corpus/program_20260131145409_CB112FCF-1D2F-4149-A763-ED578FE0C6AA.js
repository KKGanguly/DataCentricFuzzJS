try {
    try {
        load("test/mjsunit/wasm/wasm-constants.js");
    } catch(e3) {
    }
    try {
        load("test/mjsunit/wasm/wasm-module-builder.js");
    } catch(e7) {
    }
    let kTableSize = 3;
    let v8;
    try {
        const v13 = new WasmModuleBuilder();
        v8 = v13;
    } catch(e14) {
    }
    var builder = v8;
    let v11;
    try {
        v11 = builder.addType(kSig_i_v);
    } catch(e20) {
    }
    var sig_index1 = v11;
    const v18 = [kExprGetLocal,0,kExprCallIndirect,sig_index1,kTableZero];
    let v21;
    try {
        v21 = builder.addFunction("main", kSig_i_ii);
    } catch(e33) {
    }
    let v22;
    try {
        v22 = v21.addBody(v18);
    } catch(e37) {
    }
    try {
        v22.exportAs("main");
    } catch(e40) {
    }
    try {
        builder.setFunctionTableBounds(kTableSize, kTableSize);
    } catch(e42) {
    }
    let v25;
    try {
        v25 = builder.toBuffer();
    } catch(e46) {
    }
    var m1_bytes = v25;
    const v28 = WebAssembly?.Module;
    let v29;
    try {
        const v53 = new v28(m1_bytes);
        v29 = v53;
    } catch(e54) {
    }
    var m1 = v29;
    const v56 = %SerializeWasmModule(m1);
    const v31 = v56;
    var serialized_m1 = v31;
    const v59 = %DeserializeWasmModule(serialized_m1, m1_bytes);
    const v33 = v59;
    var m1_clone = v33;
    const v35 = WebAssembly?.Instance;
    let v36;
    try {
        const v66 = new v35(m1_clone);
        v36 = v66;
    } catch(e67) {
    }
    var i1 = v36;
    const v39 = i1?.exports;
    try {
        v39.main(123123);
    } catch(e73) {
    }
} catch(e74) {
}
