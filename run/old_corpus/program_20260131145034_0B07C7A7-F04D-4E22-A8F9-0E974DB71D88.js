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
function f6() {
    let v8;
    try {
        const v13 = new WasmModuleBuilder();
        v8 = v13;
    } catch(e14) {
    }
    const builder = v8;
    const v11 = [kWasmI32];
    const v12 = [];
    let v14;
    try {
        v14 = makeSig(v11, v12);
    } catch(e25) {
    }
    sig1 = v14;
    const v17 = [kExprBlock];
    let v20;
    try {
        v20 = builder.addFunction("main", sig1);
    } catch(e35) {
    }
    try {
        v20.addBodyWithEnd(v17);
    } catch(e37) {
    }
    function f22() {
        try {
            builder.instantiate();
        } catch(e40) {
        }
    }
    const v25 = WebAssembly?.CompileError;
    try {
        f0(f22, v25);
    } catch(e45) {
    }
}
try {
    f6();
} catch(e47) {
}
