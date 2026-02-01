function f0() {
}
try {
    load("../../test/mjsunit/wasm/wasm-module-builder.js");
} catch(e4) {
}
function f4() {
    let v6;
    try {
        const v9 = new WasmModuleBuilder();
        v6 = v9;
    } catch(e10) {
    }
    const builder = v6;
    try {
        builder.addMemory(16, 32, false, true);
    } catch(e17) {
    }
    const v14 = [kWasmI32,kWasmI32,kWasmI32];
    const v15 = [kWasmI32];
    let v17;
    try {
        v17 = makeSig(v14, v15);
    } catch(e27) {
    }
    try {
        builder.addType(v17);
    } catch(e29) {
    }
    const v21 = [kWasmF64,kWasmI64,kWasmI32,kWasmF64];
    const v22 = [];
    let v23;
    try {
        v23 = makeSig(v21, v22);
    } catch(e40) {
    }
    try {
        builder.addType(v23);
    } catch(e42) {
    }
    const v28 = [kExprI32Const,0,kExprEnd];
    let v31;
    try {
        v31 = builder.addFunction(undefined, 0);
    } catch(e53) {
    }
    try {
        v31.addBodyWithEnd(v28);
    } catch(e55) {
    }
    const v43 = [kExprI32Const,0,kExprI32Const,0,kExprI32Const,0,kAtomicPrefix,kExprI32AtomicXor16U,1,0,kAtomicPrefix,kExprI32AtomicStore8U,0,0,kExprEnd];
    let v46;
    try {
        v46 = builder.addFunction(undefined, 1);
    } catch(e73) {
    }
    try {
        v46.addBodyWithEnd(v43);
    } catch(e75) {
    }
    try {
        builder.addExport("main", 0);
    } catch(e79) {
    }
    let v51;
    try {
        v51 = builder.instantiate();
    } catch(e83) {
    }
    const instance = v51;
    const v56 = instance?.exports;
    let v57;
    try {
        v57 = v56.main(1, 2, 3);
    } catch(e93) {
    }
    try {
        f0(v57);
    } catch(e95) {
    }
}
try {
    f4();
} catch(e97) {
}
