try {
    try {
        load("test/mjsunit/wasm/wasm-constants.js");
    } catch(e3) {
    }
    try {
        load("test/mjsunit/wasm/wasm-module-builder.js");
    } catch(e7) {
    }
    let v6;
    try {
        const v11 = new WasmModuleBuilder();
        v6 = v11;
    } catch(e12) {
    }
    const builder = v6;
    try {
        builder.addMemory(16, 32);
    } catch(e17) {
    }
    const v13 = [kExprI32Const,12];
    let v16;
    try {
        v16 = builder.addFunction("test", kSig_i_v);
    } catch(e27) {
    }
    try {
        v16.addBody(v13);
    } catch(e29) {
    }
    let bla = 0;
    const v21 = WebAssembly?.Module;
    let v22;
    try {
        v22 = builder.toBuffer();
    } catch(e38) {
    }
    let v23;
    try {
        const v41 = new v21(v22);
        v23 = v41;
    } catch(e42) {
    }
    let module = v23;
    const v44 = (a45) => {
        let v28;
        try {
            v28 = a45(1094795585);
        } catch(e50) {
        }
        return v28;
    };
    const v25 = v44;
    module.then = v25;
    try {
        WebAssembly.instantiate(module);
    } catch(e53) {
    }
} catch(e54) {
}
