try {
    load("test/mjsunit/wasm/wasm-constants.js");
} catch(e3) {
}
try {
    load("test/mjsunit/wasm/wasm-module-builder.js");
} catch(e7) {
}
let instance;
function DoTest() {
    function call_main() {
        const v9 = instance?.exports;
        try {
            v9.main();
        } catch(e15) {
        }
    }
    let v12;
    try {
        const v19 = new WasmModuleBuilder();
        v12 = v19;
    } catch(e20) {
    }
    let module = v12;
    try {
        module.addImport("mod", "func", kSig_v_i);
    } catch(e26) {
    }
    const v22 = [kExprGetLocal,0,kExprCallFunction,0];
    let v24;
    try {
        v24 = module.addFunction("main", kSig_v_i);
    } catch(e38) {
    }
    let v25;
    try {
        v25 = v24.addBody(v22);
    } catch(e42) {
    }
    try {
        v25.exportFunc();
    } catch(e44) {
    }
    const v27 = { func: call_main };
    const v28 = { mod: v27 };
    let v29;
    try {
        v29 = module.instantiate(v28);
    } catch(e52) {
    }
    instance = v29;
    try {
        const v30 = instance?.exports;
        try {
            v30.main();
        } catch(e56) {
        }
    } catch(e57) {
    }
}
try {
    DoTest();
} catch(e59) {
}
