try {
    function f0() {
    }
    try {
        load("test/mjsunit/wasm/wasm-constants.js");
    } catch(e4) {
    }
    try {
        load("test/mjsunit/wasm/wasm-module-builder.js");
    } catch(e8) {
    }
    let v8;
    try {
        const v12 = new Error();
        v8 = v12;
    } catch(e13) {
    }
    const v26 = {
        has(a15, a16, a17) {
            try {
                f0("intercepted has:", a16);
            } catch(e20) {
            }
            let v16;
            try {
                v16 = Reflect.has(a15, a16, a17);
            } catch(e25) {
            }
            return v16;
        },
    };
    const v17 = v26;
    let v18;
    try {
        const v31 = new Proxy(v8, v17);
        v18 = v31;
    } catch(e32) {
    }
    var proxy = v18;
    let v21;
    try {
        const v38 = new Error("my error");
        v21 = v38;
    } catch(e39) {
    }
    var error = v21;
    error.__proto__ = proxy;
    function fun() {
        try {
            f0("throwing");
        } catch(e44) {
        }
        throw error;
    }
    let v27;
    try {
        const v48 = new WasmModuleBuilder();
        v27 = v48;
    } catch(e49) {
    }
    var builder = v27;
    try {
        builder.addException(kSig_v_v);
    } catch(e53) {
    }
    try {
        builder.addImport("mod", "fun", kSig_v_v);
    } catch(e58) {
    }
    const v36 = [kExprCallFunction,0];
    let v38;
    try {
        v38 = builder.addFunction("funnel", kSig_v_v);
    } catch(e68) {
    }
    let v39;
    try {
        v39 = v38.addBody(v36);
    } catch(e72) {
    }
    try {
        v39.exportFunc();
    } catch(e74) {
    }
    const v41 = { fun: fun };
    const v42 = { mod: v41 };
    let v43;
    try {
        v43 = builder.instantiate(v42);
    } catch(e82) {
    }
    var instance = v43;
    const v45 = instance?.exports;
    try {
        v45.funnel();
    } catch(e87) {
    }
} catch(e88) {
}
