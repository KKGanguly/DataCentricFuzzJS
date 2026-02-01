try {
    function f0() {
    }
    try {
        try { load("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
    } catch(e4) {
    }
    function f4() {
        let v6;
        try {
            let v9;
            try { v9 = new WasmModuleBuilder(); } catch (e) {}
            v6 = v9;
        } catch(e10) {
        }
        const builder = v6;
        try {
            try { builder.addMemory(16, 32, false, true); } catch (e) {}
        } catch(e17) {
        }
        const v14 = [kWasmI32,kWasmI32,kWasmI32];
        const v15 = [kWasmI32];
        let v17;
        try {
            let v26;
            try { v26 = makeSig(v14, v15); } catch (e) {}
            v17 = v26;
        } catch(e27) {
        }
        try {
            try { builder.addType(v17); } catch (e) {}
        } catch(e29) {
        }
        const v31 = [kExprI32Const,128,1,kExprI32Clz,kExprI32Const,0,kExprI64Const,0,kAtomicPrefix,kExprI64AtomicStore8U,0,0,kExprEnd];
        let v34;
        try {
            let v48;
            try { v48 = builder.addFunction(undefined, 0); } catch (e) {}
            v34 = v48;
        } catch(e49) {
        }
        try {
            try { v34.addBodyWithEnd(v31); } catch (e) {}
        } catch(e51) {
        }
        try {
            try { builder.addExport("main", 0); } catch (e) {}
        } catch(e55) {
        }
        let v39;
        try {
            let v58;
            try { v58 = builder.instantiate(); } catch (e) {}
            v39 = v58;
        } catch(e59) {
        }
        const instance = v39;
        const v44 = instance?.exports;
        let v45;
        try {
            let v68;
            try { v68 = v44.main(1, 2, 3); } catch (e) {}
            v45 = v68;
        } catch(e69) {
        }
        try {
            try { f0(v45); } catch (e) {}
        } catch(e71) {
        }
    }
    try {
        try { f4(); } catch (e) {}
    } catch(e73) {
    }
} catch(e74) {
}
