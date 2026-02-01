try {
    load("test/mjsunit/wasm/wasm-module-builder.js");
} catch(e3) {
}
const kNopForTestingUnsupportedInLiftoff = 22;
function f5() {
    let v7;
    try {
        const v10 = new WasmModuleBuilder();
        v7 = v10;
    } catch(e11) {
    }
    var builder = v7;
    try {
        builder.addMemory(1, 1, false);
    } catch(e17) {
    }
    const v14 = [kWasmI32,kWasmI32,kWasmI32,kWasmI32,kWasmI32,kWasmI32,kWasmI32,kWasmI32];
    const v15 = [kWasmI32];
    let v17;
    try {
        v17 = makeSig(v14, v15);
    } catch(e27) {
    }
    let v18;
    try {
        v18 = builder.addType(v17);
    } catch(e31) {
    }
    var sig_index = v18;
    let v22;
    try {
        v22 = builder.addFunction("zero", kSig_i_i);
    } catch(e38) {
    }
    var zero = v22;
    let v25;
    try {
        v25 = builder.addFunction("one", sig_index);
    } catch(e44) {
    }
    var one = v25;
    let v28;
    try {
        v28 = builder.addFunction("two", kSig_i_i);
    } catch(e51) {
    }
    var two = v28;
    const v35 = [kExprLocalGet,0,kExprI32LoadMem,0,0];
    try {
        zero.addBody(v35);
    } catch(e61) {
    }
    const v40 = [kNopForTestingUnsupportedInLiftoff,kExprLocalGet,7,kExprCallFunction,zero?.index];
    try {
        one.addBody(v40);
    } catch(e68) {
    }
    const v61 = [kExprLocalGet,0,kExprI32Const,1,kExprI32Add,kExprLocalGet,0,kExprI32Const,2,kExprI32Add,kExprLocalGet,0,kExprI32Const,3,kExprI32Add,kExprLocalGet,0,kExprI32Const,4,kExprI32Add,kExprLocalGet,0,kExprI32Const,5,kExprI32Add,kExprLocalGet,0,kExprI32Const,6,kExprI32Add,kExprLocalGet,0,kExprI32Const,7,kExprI32Add,kExprLocalGet,0,kExprI32Const,8,kExprI32Add,kExprCallFunction,one?.index];
    let v62;
    try {
        v62 = two.addBody(v61);
    } catch(e93) {
    }
    try {
        v62.exportFunc();
    } catch(e95) {
    }
    const v64 = {};
    let v65;
    try {
        v65 = builder.instantiate(v64);
    } catch(e101) {
    }
    return v65;
}
let v66;
try {
    v66 = f5();
} catch(e105) {
}
var instance = v66;
const v69 = instance?.exports;
let v70;
try {
    v70 = v69.two(34);
} catch(e113) {
}
console.log(v70);
