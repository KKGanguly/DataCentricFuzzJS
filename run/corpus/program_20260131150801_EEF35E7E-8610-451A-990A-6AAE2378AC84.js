try {
    try {
        load("test/mjsunit/wasm/wasm-module-builder.js");
    } catch(e3) {
    }
    let v4;
    try {
        const v7 = new WasmModuleBuilder();
        v4 = v7;
    } catch(e8) {
    }
    const builder = v4;
    try {
        builder.addGlobal(kWasmI32, 1);
    } catch(e13) {
    }
    const v9 = [];
    const v11 = [kWasmF64];
    let v13;
    try {
        v13 = makeSig(v9, v11);
    } catch(e23) {
    }
    try {
        builder.addType(v13);
    } catch(e25) {
    }
    const v65 = [kExprGlobalGet,0,kExprLocalSet,0,kExprI32Const,0,kExprI32Eqz,kExprLocalSet,1,kExprGlobalGet,0,kExprLocalSet,2,kExprI32Const,1,kExprI32Const,1,kExprI32Sub,kExprLocalSet,3,kExprGlobalGet,0,kExprLocalSet,4,kExprI32Const,0,kExprI32Eqz,kExprLocalSet,5,kExprGlobalGet,0,kExprLocalSet,6,kExprI32Const,0,kExprI32Const,1,kExprI32Sub,kExprLocalSet,7,kExprBlock,kWasmStmt,kExprI32Const,0,kExprIf,kWasmStmt,kExprLocalGet,10,kExprLocalSet,8,kExprElse,kExprNop,kExprEnd,kExprLocalGet,8,kExprLocalSet,9,kExprLocalGet,9,kExprI64Const,255,1,kExprI64Add,kExprDrop,kExprEnd,kExprF64Const,0,0,0,0,0,0,240,63,kExprEnd];
    let v71;
    try {
        v71 = builder.addFunction(undefined, 0);
    } catch(e83) {
    }
    let v72;
    try {
        v72 = v71.addLocals(kWasmI32, 8);
    } catch(e89) {
    }
    let v73;
    try {
        v73 = v72.addLocals(kWasmI64, 3);
    } catch(e95) {
    }
    try {
        v73.addBodyWithEnd(v65);
    } catch(e97) {
    }
    try {
        builder.instantiate();
    } catch(e99) {
    }
} catch(e100) {
}
