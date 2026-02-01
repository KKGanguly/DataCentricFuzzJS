new Array(3111);
const v3 = [32318,512,536870888,-2147483648,-9223372036854775807,-44077848];
[1073741824,-6];
const v6 = Symbol.iterator;
const v15 = {
    [v6]() {
        let v8 = 10;
        const v14 = {
            next() {
                v8--;
                const v12 = v8 == 0;
                return { done: v12, value: v8 };
            },
        };
        return v14;
    },
};
[-1000000000000.0,-5.76269473348936,-Infinity,1.7531149234459343e+308,1.7512195372686388e+308,2.220446049250313e-16,-5.005267368986475,4.0];
[536870888,268435440,4,-1370972590,-47414];
try {
    load("test/mjsunit/wasm/wasm-module-builder.js");
} catch(e24) {
}
const kNopForTestingUnsupportedInLiftoff = 22;
function f5() {
    v3 != kNopForTestingUnsupportedInLiftoff ? v3 : kNopForTestingUnsupportedInLiftoff;
    [2.220446049250313e-16,-2.220446049250313e-16,-8.285661597528933e+307];
    for (let v31 = 0; v31 < 100; v31++) {
        f5();
    }
    let v7;
    try {
        const v36 = new WasmModuleBuilder();
        v7 = v36;
    } catch(e37) {
    }
    var builder = v7;
    try {
        builder.addMemory(1, 1, false);
    } catch(e43) {
    }
    const v14 = [kWasmI32,kWasmI32,kWasmI32,kWasmI32,kWasmI32,kWasmI32,kWasmI32,kWasmI32];
    const v15 = [kWasmI32];
    let v17;
    try {
        v17 = makeSig(v14, v15);
    } catch(e53) {
    }
    let v18;
    try {
        v18 = builder.addType(v17);
    } catch(e57) {
    }
    var sig_index = v18;
    let v22;
    try {
        v22 = builder.addFunction("zero", kSig_i_i);
    } catch(e64) {
    }
    var zero = v22;
    let v25;
    try {
        v25 = builder.addFunction("one", sig_index);
    } catch(e70) {
    }
    var one = v25;
    let v28;
    try {
        v28 = builder.addFunction("two", kSig_i_i);
    } catch(e77) {
    }
    var two = v28;
    const v35 = [kExprLocalGet,0,kExprI32LoadMem,0,0];
    try {
        zero.addBody(v35);
        const v87 = %WasmArray();
        {
            const v88 = (a89, a90, a91) => {
            };
        }
    } catch(e92) {
    }
    const v40 = [kNopForTestingUnsupportedInLiftoff,kExprLocalGet,7,kExprCallFunction,zero?.index];
    try {
        one.addBody(v40);
    } catch(e99) {
    }
    const v61 = [kExprLocalGet,0,kExprI32Const,1,kExprI32Add,kExprLocalGet,0,kExprI32Const,2,kExprI32Add,kExprLocalGet,0,kExprI32Const,3,kExprI32Add,kExprLocalGet,0,kExprI32Const,4,kExprI32Add,kExprLocalGet,0,kExprI32Const,5,kExprI32Add,kExprLocalGet,0,kExprI32Const,6,kExprI32Add,kExprLocalGet,0,kExprI32Const,7,kExprI32Add,kExprLocalGet,0,kExprI32Const,8,kExprI32Add,kExprCallFunction,one?.index];
    let v62;
    try {
        v62 = two.addBody(v61);
    } catch(e124) {
    }
    try {
        v62.exportFunc();
    } catch(e126) {
    }
    const v64 = {};
    let v65;
    try {
        v65 = builder.instantiate(v64);
    } catch(e132) {
    }
    return v65;
}
let v66;
try {
    v66 = f5();
} catch(e136) {
}
var instance = v66;
const v69 = instance?.exports;
let v70;
try {
    v70 = v69.two(34);
} catch(e144) {
}
