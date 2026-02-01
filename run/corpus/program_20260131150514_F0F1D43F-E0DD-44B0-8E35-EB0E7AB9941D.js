function f0() {
}
try {
    load("test/mjsunit/wasm/wasm-module-builder.js");
} catch(e4) {
}
function Regress1137608() {
    f0(arguments.callee.name);
    let v10;
    try {
        const v13 = new WasmModuleBuilder();
        v10 = v13;
    } catch(e14) {
    }
    let builder = v10;
    let v13;
    try {
        v13 = builder.addType(kSig_i_iii);
    } catch(e20) {
    }
    let sig0 = v13;
    const v18 = [kWasmF64,kWasmF64,kWasmI32,kWasmI32,kWasmI32,kWasmF32,kWasmI32,kWasmF64,kWasmI32,kWasmF32,kWasmI32,kWasmF32,kWasmI32,kWasmF64,kWasmI32];
    const v19 = [kWasmI32];
    let v21;
    try {
        v21 = makeSig(v18, v19);
    } catch(e33) {
    }
    let v22;
    try {
        v22 = builder.addType(v21);
    } catch(e37) {
    }
    let sig1 = v22;
    const v102 = [kExprI64Const,0,kExprF64UConvertI64,kExprF64Const,48,48,48,48,48,48,0,0,kExprF64Const,48,48,48,0,0,0,0,0,kExprF64Mul,kExprI32Const,0,kExprF64Const,48,48,0,0,0,0,0,0,kExprF64StoreMem,0,176,224,192,129,3,kExprI32Const,0,kExprI32Const,0,kExprI32Const,0,kExprF32Const,0,0,0,0,kExprI32Const,0,kExprF64Const,0,0,0,0,0,0,0,0,kExprI32Const,0,kExprF32Const,0,0,0,0,kExprI32Const,0,kExprF32Const,0,0,0,0,kExprI32Const,0,kExprF64Const,0,0,0,0,0,0,0,0,kExprI32Const,0,kExprI32Const,2,kExprReturnCallIndirect,sig1,kTableZero];
    let v104;
    try {
        v104 = builder.addFunction("main", sig0);
    } catch(e123) {
    }
    let v105;
    try {
        v105 = v104.addBody(v102);
    } catch(e127) {
    }
    let v106;
    try {
        v106 = v105.exportFunc();
    } catch(e131) {
    }
    let main = v106;
    const v109 = [kExprI32Const,0];
    let v111;
    try {
        v111 = builder.addFunction("f", sig1);
    } catch(e140) {
    }
    try {
        v111.addBody(v109);
    } catch(e142) {
    }
    try {
        builder.addTable(kWasmAnyFunc, 4, 4);
    } catch(e147) {
    }
    try {
        builder.addMemory(16, 32, false, true);
    } catch(e153) {
    }
    const v123 = WebAssembly?.Module;
    let v124;
    try {
        v124 = builder.toBuffer();
    } catch(e160) {
    }
    let v125;
    try {
        const v163 = new v123(v124);
        v125 = v163;
    } catch(e164) {
    }
    let module = v125;
    const v127 = WebAssembly?.Instance;
    let v128;
    try {
        const v170 = new v127(module);
        v128 = v170;
    } catch(e171) {
    }
    let instance = v128;
}
try {
    Regress1137608();
} catch(e174) {
}
