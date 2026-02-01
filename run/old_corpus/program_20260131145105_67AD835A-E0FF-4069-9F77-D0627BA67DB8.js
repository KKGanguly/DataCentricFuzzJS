try {
    try { load("test/mjsunit/wasm/wasm-constants.js"); } catch (e) {}
} catch(e3) {
}
try {
    try { load("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
} catch(e7) {
}
function f5() {
    let v7;
    try {
        let v12;
        try { v12 = new WasmModuleBuilder(); } catch (e) {}
        v7 = v12;
    } catch(e13) {
    }
    var builder = v7;
    try {
        try { builder.addMemory(32, 32, false); } catch (e) {}
    } catch(e19) {
    }
    const v26 = [kExprI64Const,127,kExprI64Const,66,kExprI64DivS,kExprI64Const,66,kExprI64Const,66,kExprI64ShrU,kExprI64ShrU,kExprI64Const,66,kExprI64Const,66,kExprI64ShrU,kExprI64Sub,kExprI64Const,127,kExprI64DivS,kExprUnreachable,kExprEnd];
    let v29;
    try {
        let v39;
        try { v39 = builder.addFunction("test", kSig_i_iii); } catch (e) {}
        v29 = v39;
    } catch(e40) {
    }
    let v30;
    try {
        let v43;
        try { v43 = v29.addBodyWithEnd(v26); } catch (e) {}
        v30 = v43;
    } catch(e44) {
    }
    try {
        try { v30.exportFunc(); } catch (e) {}
    } catch(e46) {
    }
    let v32;
    try {
        let v49;
        try { v49 = builder.instantiate(); } catch (e) {}
        v32 = v49;
    } catch(e50) {
    }
    var module = v32;
    const v37 = module?.exports;
    try {
        try { v37.test(1, 2, 3); } catch (e) {}
    } catch(e58) {
    }
}
try {
    try { f5(); } catch (e) {}
} catch(e60) {
}
