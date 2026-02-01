try {
    load("test/mjsunit/wasm/wasm-constants.js");
} catch(e3) {
}
try {
    load("test/mjsunit/wasm/wasm-module-builder.js");
} catch(e7) {
}
function f5() {
    let v7;
    try {
        const v12 = new WasmModuleBuilder();
        v7 = v12;
    } catch(e13) {
    }
    var builder = v7;
    try {
        builder.addMemory(16, 32, false);
    } catch(e19) {
    }
    const v27 = [kExprI64Const,66,kExprI64Const,1,kExprI64Const,66,kExprI64Const,127,kExprI64DivS,kExprI64Const,66,kExprI64Const,111,kExprI64Shl,kExprI64ShrU,kExprI64Const,127,kExprI64And,kExprI64ShrU,kExprI64DivS,kExprUnreachable,kExprEnd];
    let v30;
    try {
        v30 = builder.addFunction("test", kSig_i_iii);
    } catch(e41) {
    }
    let v31;
    try {
        v31 = v30.addBodyWithEnd(v27);
    } catch(e45) {
    }
    try {
        v31.exportFunc();
    } catch(e47) {
    }
    let v33;
    try {
        v33 = builder.instantiate();
    } catch(e51) {
    }
    var module = v33;
    const v38 = module?.exports;
    try {
        v38.test(1, 2, 3);
    } catch(e59) {
    }
}
try {
    f5();
} catch(e61) {
}
