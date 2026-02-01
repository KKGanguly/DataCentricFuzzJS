try {
    function f0() {
    }
    try {
        try { load("../../v8/v8/test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
    } catch(e4) {
    }
    let v5;
    try {
        let v8;
        try { v8 = new WasmModuleBuilder(); } catch (e) {}
        v5 = v8;
    } catch(e9) {
    }
    const builder = v5;
    try {
        try { builder.addMemory(16, 32, false, true); } catch (e) {}
    } catch(e16) {
    }
    try {
        try { builder.addGlobal(kWasmI32, 1); } catch (e) {}
    } catch(e20) {
    }
    try {
        try { builder.addGlobal(kWasmI32, 1); } catch (e) {}
    } catch(e24) {
    }
    try {
        try { builder.addGlobal(kWasmF32, 1); } catch (e) {}
    } catch(e28) {
    }
    try {
        try { builder.addGlobal(kWasmI32, 1); } catch (e) {}
    } catch(e32) {
    }
    const v22 = [kWasmI32,kWasmI32,kWasmI32];
    const v23 = [kWasmI32];
    let v25;
    try {
        let v41;
        try { v41 = makeSig(v22, v23); } catch (e) {}
        v25 = v41;
    } catch(e42) {
    }
    try {
        try { builder.addType(v25); } catch (e) {}
    } catch(e44) {
    }
    const v27 = [];
    const v29 = [kWasmF64,kWasmI32,kWasmF64,kWasmF32,kWasmI32];
    let v30;
    try {
        let v54;
        try { v54 = makeSig(v27, v29); } catch (e) {}
        v30 = v54;
    } catch(e55) {
    }
    try {
        try { builder.addType(v30); } catch (e) {}
    } catch(e57) {
    }
    const v33 = [kWasmF64,kWasmI32,kWasmF64,kWasmF32,kWasmI32,kWasmI32,kWasmF32,kWasmF32,kWasmI32,kWasmI32,kWasmI32,kWasmI64,kWasmI64,kWasmF32,kWasmI32];
    const v34 = [];
    let v35;
    try {
        let v66;
        try { v66 = makeSig(v33, v34); } catch (e) {}
        v35 = v66;
    } catch(e67) {
    }
    try {
        try { builder.addType(v35); } catch (e) {}
    } catch(e69) {
    }
    const v101 = [kExprI32Const,0,kExprLocalTee,0,kExprI32Const,0,kExprIf,kWasmStmt,kExprI32Const,0,kExprI64Const,0,kExprI64StoreMem32,0,1,kExprBr,0,kExprBlock,1,kExprF64Const,0,0,0,0,0,0,0,0,kExprI32Const,0,kExprF64Const,0,0,0,0,0,0,0,0,kExprF32Const,0,0,0,0,kExprI32Const,0,kExprEnd,kExprI32Const,0,kExprF32Const,0,0,0,0,kExprF32Const,0,0,0,0,kExprI32Const,0,kExprI32Const,0,kExprI32Const,0,kExprI64Const,0,kExprI64Const,0,kExprF32Const,0,0,0,0,kExprI32Const,0,kExprBlock,2,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprEnd,kExprElse,kExprEnd,kExprEnd];
    const v103 = { i32_count: 4 };
    let v106;
    try {
        let v143;
        try { v143 = builder.addFunction(undefined, 0); } catch (e) {}
        v106 = v143;
    } catch(e144) {
    }
    let v107;
    try {
        let v147;
        try { v147 = v106.addLocals(v103); } catch (e) {}
        v107 = v147;
    } catch(e148) {
    }
    try {
        try { v107.addBodyWithEnd(v101); } catch (e) {}
    } catch(e150) {
    }
    try {
        try { builder.addExport("main", 0); } catch (e) {}
    } catch(e154) {
    }
    let v112;
    try {
        let v157;
        try { v157 = builder.instantiate(); } catch (e) {}
        v112 = v157;
    } catch(e158) {
    }
    const instance = v112;
    const v117 = instance?.exports;
    let v118;
    try {
        let v167;
        try { v167 = v117.main(1, 2, 3); } catch (e) {}
        v118 = v167;
    } catch(e168) {
    }
    try {
        try { f0(v118); } catch (e) {}
    } catch(e170) {
    }
} catch(e171) {
}
