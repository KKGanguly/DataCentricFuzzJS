try {
    try {
        load("test/mjsunit/wasm/wasm-module-builder.js");
    } catch(e3) {
    }
    let v4;
    try {
        const v7 = new WasmModuleBuilder();
        v4 = v7;
    } catch(e8) {
    }
    var builder = v4;
    let v6;
    try {
        v6 = builder.instantiate();
    } catch(e13) {
    }
    var instance = v6;
    instance[1] = undefined;
    try {
        gc();
    } catch(e18) {
    }
    try {
        Object.getOwnPropertyNames(instance);
    } catch(e21) {
    }
} catch(e22) {
}
