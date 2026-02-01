[1.2502485810048448e+308,2,-2.220446049250313e-16];
const v2 = [1000000,127.5605142305808,-1.3923112304545701e+308];
[-2.2250738585072014e-308,0.4886628150535324,-847.4982439911087,-4,-1000000,889.2863358360332];
[852554753,3,1344985463];
[1073741825,-9.223372036854776e+18,-9007199254740991,1030325783,1456192899,-2120128231,-1192784483,255,-60696,10000];
[14,-2147483648,536870888,268435456,5];
try {
    try {
        load("test/mjsunit/wasm/wasm-constants.js");
    } catch(e52) {
    }
    try {
        load("test/mjsunit/wasm/wasm-module-builder.js");
    } catch(e56) {
    }
    let v13;
    try {
        const v60 = new WasmModuleBuilder();
        v13 = v60;
    } catch(e61) {
    }
    const builder = v13;
    try {
        builder.addMemory(1, 1);
    } catch(e66) {
    }
    const v25 = [kExprGetLocal,0,kExprI32Const,0,kExprI32StoreMem,0,0];
    let v28;
    try {
        v28 = builder.addFunction(undefined, kSig_v_i);
    } catch(e81) {
    }
    "" + { toString: undefined };
    try {
        v28.addBody(v25);
    } catch(e87) {
    }
    [kExprGetLocal,5,kExprCallFunction,0];
    let v40;
    try {
        const v96 = new Array(6);
        v40 = v96;
    } catch(e97) {
    }
    const v41 = [v2,v2];
    let v43;
    try {
        v43 = makeSig(v40, v41);
    } catch(e104) {
    }
    try {
        builder.addFunction(undefined, v43);
    } catch(e107) {
    }
    const gen_i32_code = [kExprTeeLocal,0,kExprGetLocal,0,kExprI32Const,1,kExprI32Add];
    let v54;
    try {
        v54 = wasmI32Const(0);
    } catch(e120) {
    }
    let v56;
    try {
        v56 = wasmI32Const(1);
    } catch(e126) {
    }
    const v57 = [...v54,...v56,kExprI32Add,...gen_i32_code,...gen_i32_code,...gen_i32_code,...gen_i32_code,...gen_i32_code,...gen_i32_code,...gen_i32_code,...gen_i32_code];
    ({}).addBody(v57);
} catch(e131) {
}
