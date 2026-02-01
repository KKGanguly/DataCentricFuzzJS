try {
    try {
        try { load("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
    } catch(e3) {
    }
    const kNopForTestingUnsupportedInLiftoff = 22;
    function f5() {
        let v7;
        try {
            let v10;
            try { v10 = new WasmModuleBuilder(); } catch (e) {}
            v7 = v10;
        } catch(e11) {
        }
        var builder = v7;
        try {
            try { builder.addMemory(1, 1, false); } catch (e) {}
        } catch(e17) {
        }
        const v14 = [kWasmI32,kWasmI32,kWasmI32,kWasmI32,kWasmI32,kWasmI32,kWasmI32,kWasmI32];
        const v15 = [kWasmI32];
        let v17;
        try {
            let v26;
            try { v26 = makeSig(v14, v15); } catch (e) {}
            v17 = v26;
        } catch(e27) {
        }
        let v18;
        try {
            let v30;
            try { v30 = builder.addType(v17); } catch (e) {}
            v18 = v30;
        } catch(e31) {
        }
        var sig_index = v18;
        let v22;
        try {
            let v37;
            try { v37 = builder.addFunction("zero", kSig_i_i); } catch (e) {}
            v22 = v37;
        } catch(e38) {
        }
        var zero = v22;
        let v25;
        try {
            let v43;
            try { v43 = builder.addFunction("one", sig_index); } catch (e) {}
            v25 = v43;
        } catch(e44) {
        }
        var one = v25;
        let v28;
        try {
            let v50;
            try { v50 = builder.addFunction("two", kSig_i_i); } catch (e) {}
            v28 = v50;
        } catch(e51) {
        }
        var two = v28;
        const v35 = [kExprLocalGet,0,kExprI32LoadMem,0,0];
        try {
            try { zero.addBody(v35); } catch (e) {}
        } catch(e61) {
        }
        const v40 = [kNopForTestingUnsupportedInLiftoff,kExprLocalGet,7,kExprCallFunction,zero?.index];
        try {
            try { one.addBody(v40); } catch (e) {}
        } catch(e68) {
        }
        const v61 = [kExprLocalGet,0,kExprI32Const,1,kExprI32Add,kExprLocalGet,0,kExprI32Const,2,kExprI32Add,kExprLocalGet,0,kExprI32Const,3,kExprI32Add,kExprLocalGet,0,kExprI32Const,4,kExprI32Add,kExprLocalGet,0,kExprI32Const,5,kExprI32Add,kExprLocalGet,0,kExprI32Const,6,kExprI32Add,kExprLocalGet,0,kExprI32Const,7,kExprI32Add,kExprLocalGet,0,kExprI32Const,8,kExprI32Add,kExprCallFunction,one?.index];
        let v62;
        try {
            let v92;
            try { v92 = two.addBody(v61); } catch (e) {}
            v62 = v92;
        } catch(e93) {
        }
        try {
            try { v62.exportFunc(); } catch (e) {}
        } catch(e95) {
        }
        const v64 = {};
        let v65;
        try {
            let v100;
            try { v100 = builder.instantiate(v64); } catch (e) {}
            v65 = v100;
        } catch(e101) {
        }
        return v65;
    }
    let v66;
    try {
        let v104;
        try { v104 = f5(); } catch (e) {}
        v66 = v104;
    } catch(e105) {
    }
    var instance = v66;
    const v69 = instance?.exports;
    let v70;
    try {
        let v112;
        try { v112 = v69.two(34); } catch (e) {}
        v70 = v112;
    } catch(e113) {
    }
    try { console.log(v70); } catch (e) {}
} catch(e116) {
}
