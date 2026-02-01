function f0() {
}
const v3 = d8.file;
try {
    v3.execute("../../v8/v8/test/mjsunit/wasm/wasm-module-builder.js");
} catch(e6) {
}
function MultiResultTest() {
    f0("MultiResultTest");
    let v9;
    try {
        const v13 = new WasmModuleBuilder();
        v9 = v13;
    } catch(e14) {
    }
    let builder = v9;
    let v12;
    try {
        v12 = builder.addType(kSig_i_ii);
    } catch(e20) {
    }
    let sig_i_ii = v12;
    let v15;
    try {
        v15 = builder.addType(kSig_iii_ii);
    } catch(e26) {
    }
    let sig_iii_ii = v15;
    let v18;
    try {
        v18 = builder.addTag(kSig_v_v);
    } catch(e32) {
    }
    let except = v18;
    const v33 = [kExprBlock,kWasmVoid,kExprLocalGet,0,kExprBrIf,0,kExprThrow,except,kExprEnd,kExprLocalGet,0,kExprLocalGet,1,kExprLocalGet,0,kExprLocalGet,1,kExprI32Sub];
    let v35;
    try {
        v35 = builder.addFunction("callee", kSig_iii_ii);
    } catch(e54) {
    }
    try {
        v35.addBody(v33);
    } catch(e56) {
    }
    const v49 = [kExprTry,kWasmVoid,kExprLocalGet,0,kExprLocalGet,1,kExprCallFunction,0,kExprI32Mul,kExprI32Add,kExprReturn,kExprCatch,except,kExprEnd,kExprI32Const,12];
    let v51;
    try {
        v51 = builder.addFunction("main", kSig_i_ii);
    } catch(e75) {
    }
    let v52;
    try {
        v52 = v51.addBody(v49);
    } catch(e79) {
    }
    try {
        v52.exportAs("main");
    } catch(e82) {
    }
    const v55 = WebAssembly?.Module;
    let v56;
    try {
        v56 = builder.toBuffer();
    } catch(e89) {
    }
    let v57;
    try {
        const v92 = new v55(v56);
        v57 = v92;
    } catch(e93) {
    }
    let module = v57;
    const v59 = WebAssembly?.Instance;
    let v60;
    try {
        const v99 = new v59(module);
        v60 = v99;
    } catch(e100) {
    }
    let instance = v60;
    const v64 = instance?.exports;
    let v65;
    try {
        v65 = v64.main(0, 2);
    } catch(e109) {
    }
    try {
        f0(v65);
    } catch(e111) {
    }
    const v69 = instance?.exports;
    let v70;
    try {
        v70 = v69.main(3, 5);
    } catch(e119) {
    }
    try {
        f0(v70);
    } catch(e121) {
    }
}
try {
    MultiResultTest();
} catch(e123) {
}
