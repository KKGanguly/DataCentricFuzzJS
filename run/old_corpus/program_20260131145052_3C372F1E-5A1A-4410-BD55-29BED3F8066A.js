try {
    load("../../v8/v8/test/mjsunit/mjsunit.js");
} catch(e3) {
}
try {
    load("../../v8/v8/test/mjsunit/wasm/wasm-module-builder.js");
} catch(e7) {
}
function I64RorLoweringTest() {
    let v7;
    try {
        const v12 = new WasmModuleBuilder();
        v7 = v12;
    } catch(e13) {
    }
    let builder = v7;
    try {
        builder.addMemory(1000, 1000);
    } catch(e18) {
    }
    const v26 = [kExprLoop,kWasmStmt,kExprLocalGet,0,kExprI32LoadMem,0,0,kExprI64UConvertI32,kExprLocalGet,1,kExprI64Ror,kExprI32ConvertI64,kExprBrIf,0,kExprEnd];
    const v30 = [kWasmI32,kWasmI64];
    const v31 = [];
    let v33;
    try {
        v33 = makeSig(v30, v31);
    } catch(e45) {
    }
    let v34;
    try {
        v34 = builder.addFunction("main", v33);
    } catch(e50) {
    }
    let v35;
    try {
        v35 = v34.addBody(v26);
    } catch(e54) {
    }
    try {
        v35.exportFunc();
    } catch(e56) {
    }
    const v38 = WebAssembly?.Module;
    let v39;
    try {
        v39 = builder.toBuffer();
    } catch(e63) {
    }
    let v40;
    try {
        const v66 = new v38(v39);
        v40 = v66;
    } catch(e67) {
    }
    let module = v40;
    const v42 = WebAssembly?.Instance;
    try {
        new v42(module);
    } catch(e72) {
    }
}
try {
    I64RorLoweringTest();
} catch(e74) {
}
