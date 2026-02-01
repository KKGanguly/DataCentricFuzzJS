try {
    try {
        let v1;
        try {
            let v3;
            try { v3 = new WasmModuleBuilder(); } catch (e) {}
            v1 = v3;
        } catch(e4) {
        }
        var builder = v1;
        try {
            try { builder.addImportedTable("x", "table", 1, 10000000); } catch (e) {}
        } catch(e11) {
        }
        const v16 = [kExprI32Const,0,kExprGetLocal,0,kExprCallIndirect,0,kTableZero];
        let v19;
        try {
            let v25;
            try { v25 = builder.addFunction("main", kSig_i_i); } catch (e) {}
            v19 = v25;
        } catch(e26) {
        }
        let v20;
        try {
            let v29;
            try { v29 = v19.addBody(v16); } catch (e) {}
            v20 = v29;
        } catch(e30) {
        }
        try {
            try { v20.exportAs("main"); } catch (e) {}
        } catch(e33) {
        }
        const v23 = WebAssembly?.Module;
        let v24;
        try {
            let v39;
            try { v39 = builder.toBuffer(); } catch (e) {}
            v24 = v39;
        } catch(e40) {
        }
        let v25;
        try {
            let v43;
            try { v43 = new v23(v24); } catch (e) {}
            v25 = v43;
        } catch(e44) {
        }
        let module = v25;
        const v27 = WebAssembly?.Table;
        const v31 = { element: "anyfunc", initial: 1, maximum: 1000000 };
        let v32;
        try {
            let v55;
            try { v55 = new v27(v31); } catch (e) {}
            v32 = v55;
        } catch(e56) {
        }
        let table = v32;
        const v34 = WebAssembly?.Instance;
        const v35 = { table: table };
        const v36 = { x: v35 };
        let v37;
        try {
            let v66;
            try { v66 = new v34(module, v36); } catch (e) {}
            v37 = v66;
        } catch(e67) {
        }
        let instance = v37;
        for (let i70 = 0; i70 < 4; i70++) {
            try {
                try { table.grow(99900); } catch (e) {}
            } catch(e78) {
            }
        }
        const v48 = WebAssembly?.Instance;
        const v49 = { table: table };
        const v50 = { x: v49 };
        let v51;
        try {
            let v87;
            try { v87 = new v48(module, v50); } catch (e) {}
            v51 = v87;
        } catch(e88) {
        }
        let instance2 = v51;
        const v55 = 3223857 / 8;
        const v56 = instance2?.exports;
        try {
            try { v56.main(v55); } catch (e) {}
        } catch(e97) {
        }
    } catch(e98) {
    }
} catch(e99) {
}
