try {
    try {
        try { load("../../v8/v8/test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
    } catch(e3) {
    }
    let v4;
    try {
        let v7;
        try { v7 = new WasmModuleBuilder(); } catch (e) {}
        v4 = v7;
    } catch(e8) {
    }
    const builder = v4;
    try {
        try { builder.addMemory(16, 32, false); } catch (e) {}
    } catch(e14) {
    }
    const v28 = [kExprLocalGet,0,kExprI32Const,127,kAtomicPrefix,kExprI32AtomicAdd8U,0,40,kExprI32Const,0,kExprI32LoadMem8S,0,108,kExprI32LoadMem,0,104,kExprI32Const,0,kExprCallFunction,0];
    let v31;
    try {
        let v39;
        try { v39 = builder.addFunction("main", kSig_i_iii); } catch (e) {}
        v31 = v39;
    } catch(e40) {
    }
    let v32;
    try {
        let v43;
        try { v43 = v31.addBody(v28); } catch (e) {}
        v32 = v43;
    } catch(e44) {
    }
    try {
        try { v32.exportFunc(); } catch (e) {}
    } catch(e46) {
    }
    let v34;
    try {
        let v49;
        try { v49 = builder.instantiate(); } catch (e) {}
        v34 = v49;
    } catch(e50) {
    }
    const instance = v34;
    const v36 = instance?.exports;
    try {
        try { v36.main(); } catch (e) {}
    } catch(e55) {
    }
} catch(e56) {
}
