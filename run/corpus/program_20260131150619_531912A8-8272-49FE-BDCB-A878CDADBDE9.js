try {
    function f0() {
    }
    try {
        try { load("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
    } catch(e4) {
    }
    function Regress1137608() {
        f0(arguments.callee.name);
        let v10;
        try {
            let v13;
            try { v13 = new WasmModuleBuilder(); } catch (e) {}
            v10 = v13;
        } catch(e14) {
        }
        let builder = v10;
        let v13;
        try {
            let v19;
            try { v19 = builder.addType(kSig_i_iii); } catch (e) {}
            v13 = v19;
        } catch(e20) {
        }
        let sig0 = v13;
        const v18 = [kWasmF64,kWasmF64,kWasmI32,kWasmI32,kWasmI32,kWasmF32,kWasmI32,kWasmF64,kWasmI32,kWasmF32,kWasmI32,kWasmF32,kWasmI32,kWasmF64,kWasmI32];
        const v19 = [kWasmI32];
        let v21;
        try {
            let v32;
            try { v32 = makeSig(v18, v19); } catch (e) {}
            v21 = v32;
        } catch(e33) {
        }
        let v22;
        try {
            let v36;
            try { v36 = builder.addType(v21); } catch (e) {}
            v22 = v36;
        } catch(e37) {
        }
        let sig1 = v22;
        const v102 = [kExprI64Const,0,kExprF64UConvertI64,kExprF64Const,48,48,48,48,48,48,0,0,kExprF64Const,48,48,48,0,0,0,0,0,kExprF64Mul,kExprI32Const,0,kExprF64Const,48,48,0,0,0,0,0,0,kExprF64StoreMem,0,176,224,192,129,3,kExprI32Const,0,kExprI32Const,0,kExprI32Const,0,kExprF32Const,0,0,0,0,kExprI32Const,0,kExprF64Const,0,0,0,0,0,0,0,0,kExprI32Const,0,kExprF32Const,0,0,0,0,kExprI32Const,0,kExprF32Const,0,0,0,0,kExprI32Const,0,kExprF64Const,0,0,0,0,0,0,0,0,kExprI32Const,0,kExprI32Const,2,kExprReturnCallIndirect,sig1,kTableZero];
        let v104;
        try {
            let v122;
            try { v122 = builder.addFunction("main", sig0); } catch (e) {}
            v104 = v122;
        } catch(e123) {
        }
        let v105;
        try {
            let v126;
            try { v126 = v104.addBody(v102); } catch (e) {}
            v105 = v126;
        } catch(e127) {
        }
        let v106;
        try {
            let v130;
            try { v130 = v105.exportFunc(); } catch (e) {}
            v106 = v130;
        } catch(e131) {
        }
        let main = v106;
        const v109 = [kExprI32Const,0];
        let v111;
        try {
            let v139;
            try { v139 = builder.addFunction("f", sig1); } catch (e) {}
            v111 = v139;
        } catch(e140) {
        }
        try {
            try { v111.addBody(v109); } catch (e) {}
        } catch(e142) {
        }
        try {
            try { builder.addTable(kWasmAnyFunc, 4, 4); } catch (e) {}
        } catch(e147) {
        }
        try {
            try { builder.addMemory(16, 32, false, true); } catch (e) {}
        } catch(e153) {
        }
        const v123 = WebAssembly?.Module;
        let v124;
        try {
            let v159;
            try { v159 = builder.toBuffer(); } catch (e) {}
            v124 = v159;
        } catch(e160) {
        }
        let v125;
        try {
            let v163;
            try { v163 = new v123(v124); } catch (e) {}
            v125 = v163;
        } catch(e164) {
        }
        let module = v125;
        const v127 = WebAssembly?.Instance;
        let v128;
        try {
            let v170;
            try { v170 = new v127(module); } catch (e) {}
            v128 = v170;
        } catch(e171) {
        }
        let instance = v128;
    }
    try {
        try { Regress1137608(); } catch (e) {}
    } catch(e174) {
    }
} catch(e175) {
}
