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
function ExportedFunctionsImportedOrder() {
    f0(arguments.callee.name);
    const v14 = () => {
        let v13;
        try {
            const v18 = new WasmModuleBuilder();
            v13 = v18;
        } catch(e19) {
        }
        let builder = v13;
        const v17 = [kExprI32Const,1];
        let v20;
        try {
            v20 = builder.addFunction("f1", kSig_i_v);
        } catch(e30) {
        }
        let v21;
        try {
            v21 = v20.addBody(v17);
        } catch(e34) {
        }
        try {
            v21.exportFunc();
        } catch(e36) {
        }
        const v24 = [kExprI32Const,2];
        let v26;
        try {
            v26 = builder.addFunction("f2", kSig_i_v);
        } catch(e45) {
        }
        let v27;
        try {
            v27 = v26.addBody(v24);
        } catch(e49) {
        }
        try {
            v27.exportFunc();
        } catch(e51) {
        }
        let v29;
        try {
            v29 = builder.instantiate();
        } catch(e55) {
        }
        return v29;
    };
    const v11 = v14;
    let v30;
    try {
        v30 = v11();
    } catch(e60) {
    }
    let i1 = v30;
    const v62 = () => {
        let v34;
        try {
            const v66 = new WasmModuleBuilder();
            v34 = v66;
        } catch(e67) {
        }
        let builder = v34;
        try {
            builder.addImport("q", "f2", kSig_i_v);
        } catch(e73) {
        }
        try {
            builder.addImport("q", "f1", kSig_i_v);
        } catch(e78) {
        }
        const v48 = [kExprGetLocal,0,kExprCallIndirect,0,kTableZero];
        let v51;
        try {
            v51 = builder.addFunction("main", kSig_i_i);
        } catch(e91) {
        }
        let v52;
        try {
            v52 = v51.addBody(v48);
        } catch(e95) {
        }
        try {
            v52.exportFunc();
        } catch(e97) {
        }
        const v60 = [0,1,1,0];
        try {
            builder.addFunctionTableInit(0, false, v60);
        } catch(e107) {
        }
        const v63 = i1?.exports?.f2;
        const v65 = i1?.exports?.f1;
        const v66 = { f2: v63, f1: v65 };
        const v67 = { q: v66 };
        let v68;
        try {
            v68 = builder.instantiate(v67);
        } catch(e121) {
        }
        return v68;
    };
    const v32 = v62;
    let v69;
    try {
        v69 = v32();
    } catch(e126) {
    }
    let i2 = v69;
    f0("--->calling 0");
    const v75 = i2?.exports;
    let v76;
    try {
        v76 = v75.main(0);
    } catch(e136) {
    }
    f0(2, v76);
    f0("--->calling 1");
    const v82 = i2?.exports;
    let v83;
    try {
        v83 = v82.main(1);
    } catch(e147) {
    }
    f0(1, v83);
    f0("--->calling 2");
    const v89 = i2?.exports;
    let v90;
    try {
        v90 = v89.main(2);
    } catch(e158) {
    }
    f0(1, v90);
    f0("--->calling 3");
    const v96 = i2?.exports;
    let v97;
    try {
        v97 = v96.main(3);
    } catch(e169) {
    }
    f0(2, v97);
}
ExportedFunctionsImportedOrder();
