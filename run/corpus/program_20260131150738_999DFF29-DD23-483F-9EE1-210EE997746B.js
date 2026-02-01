try {
    try {
        function f0() {
        }
        try {
            try { load("test/mjsunit/wasm/wasm-constants.js"); } catch (e) {}
        } catch(e4) {
        }
        try {
            try { load("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
        } catch(e8) {
        }
        let v7;
        try {
            let v12;
            try { v12 = new WasmModuleBuilder(); } catch (e) {}
            v7 = v12;
        } catch(e13) {
        }
        var module = v7;
        try {
            try { module.addMemory(); } catch (e) {}
        } catch(e16) {
        }
        const v21 = [kExprI32Const,20,kExprI32Const,29,kExprGrowMemory,kMemoryZero,kExprI32StoreMem,0,255,255,122];
        let v24;
        try {
            let v33;
            try { v33 = module.addFunction("main", kSig_v_v); } catch (e) {}
            v24 = v33;
        } catch(e34) {
        }
        let v25;
        try {
            let v37;
            try { v37 = v24.addBody(v21); } catch (e) {}
            v25 = v37;
        } catch(e38) {
        }
        try {
            try { v25.exportAs("main"); } catch (e) {}
        } catch(e41) {
        }
        let v27;
        try {
            let v44;
            try { v44 = module.instantiate(); } catch (e) {}
            v27 = v44;
        } catch(e45) {
        }
        var instance = v27;
        const v31 = instance?.exports?.main;
        try {
            try { f0(kTrapMemOutOfBounds, v31); } catch (e) {}
        } catch(e52) {
        }
    } catch(e53) {
    }
} catch(e54) {
}
