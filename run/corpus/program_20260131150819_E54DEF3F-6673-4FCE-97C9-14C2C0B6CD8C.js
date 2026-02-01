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
    function ExportedFunctionsImportedOrder() {
        const v12 = arguments?.callee?.name;
        try { f0(v12); } catch (e) {}
        const v14 = () => {
            let v13;
            try {
                let v18;
                try { v18 = new WasmModuleBuilder(); } catch (e) {}
                v13 = v18;
            } catch(e19) {
            }
            let builder = v13;
            const v17 = [kExprI32Const,1];
            let v20;
            try {
                let v29;
                try { v29 = builder.addFunction("f1", kSig_i_v); } catch (e) {}
                v20 = v29;
            } catch(e30) {
            }
            let v21;
            try {
                let v33;
                try { v33 = v20.addBody(v17); } catch (e) {}
                v21 = v33;
            } catch(e34) {
            }
            try {
                try { v21.exportFunc(); } catch (e) {}
            } catch(e36) {
            }
            const v24 = [kExprI32Const,2];
            let v26;
            try {
                let v44;
                try { v44 = builder.addFunction("f2", kSig_i_v); } catch (e) {}
                v26 = v44;
            } catch(e45) {
            }
            let v27;
            try {
                let v48;
                try { v48 = v26.addBody(v24); } catch (e) {}
                v27 = v48;
            } catch(e49) {
            }
            try {
                try { v27.exportFunc(); } catch (e) {}
            } catch(e51) {
            }
            let v29;
            try {
                let v54;
                try { v54 = builder.instantiate(); } catch (e) {}
                v29 = v54;
            } catch(e55) {
            }
            return v29;
        };
        const v11 = v14;
        let v30;
        try {
            let v59;
            try { v59 = v11(); } catch (e) {}
            v30 = v59;
        } catch(e60) {
        }
        let i1 = v30;
        const v62 = () => {
            let v34;
            try {
                let v66;
                try { v66 = new WasmModuleBuilder(); } catch (e) {}
                v34 = v66;
            } catch(e67) {
            }
            let builder = v34;
            try {
                try { builder.addImport("q", "f2", kSig_i_v); } catch (e) {}
            } catch(e73) {
            }
            try {
                try { builder.addImport("q", "f1", kSig_i_v); } catch (e) {}
            } catch(e78) {
            }
            const v48 = [kExprGetLocal,0,kExprCallIndirect,0,kTableZero];
            let v51;
            try {
                let v90;
                try { v90 = builder.addFunction("main", kSig_i_i); } catch (e) {}
                v51 = v90;
            } catch(e91) {
            }
            let v52;
            try {
                let v94;
                try { v94 = v51.addBody(v48); } catch (e) {}
                v52 = v94;
            } catch(e95) {
            }
            try {
                try { v52.exportFunc(); } catch (e) {}
            } catch(e97) {
            }
            const v60 = [0,1,1,0];
            try {
                try { builder.addFunctionTableInit(0, false, v60); } catch (e) {}
            } catch(e107) {
            }
            const v63 = i1?.exports?.f2;
            const v65 = i1?.exports?.f1;
            const v66 = { f2: v63, f1: v65 };
            const v67 = { q: v66 };
            let v68;
            try {
                let v120;
                try { v120 = builder.instantiate(v67); } catch (e) {}
                v68 = v120;
            } catch(e121) {
            }
            return v68;
        };
        const v32 = v62;
        let v69;
        try {
            let v125;
            try { v125 = v32(); } catch (e) {}
            v69 = v125;
        } catch(e126) {
        }
        let i2 = v69;
        try { f0("--->calling 0"); } catch (e) {}
        const v75 = i2?.exports;
        let v76;
        try {
            let v135;
            try { v135 = v75.main(0); } catch (e) {}
            v76 = v135;
        } catch(e136) {
        }
        try { f0(2, v76); } catch (e) {}
        try { f0("--->calling 1"); } catch (e) {}
        const v82 = i2?.exports;
        let v83;
        try {
            let v146;
            try { v146 = v82.main(1); } catch (e) {}
            v83 = v146;
        } catch(e147) {
        }
        try { f0(1, v83); } catch (e) {}
        try { f0("--->calling 2"); } catch (e) {}
        const v89 = i2?.exports;
        let v90;
        try {
            let v157;
            try { v157 = v89.main(2); } catch (e) {}
            v90 = v157;
        } catch(e158) {
        }
        try { f0(1, v90); } catch (e) {}
        try { f0("--->calling 3"); } catch (e) {}
        const v96 = i2?.exports;
        let v97;
        try {
            let v168;
            try { v168 = v96.main(3); } catch (e) {}
            v97 = v168;
        } catch(e169) {
        }
        try { f0(2, v97); } catch (e) {}
    }
    try { ExportedFunctionsImportedOrder(); } catch (e) {}
} catch(e173) {
}
