let v9;
var node = v9;
function f3() {
    print("haha");
}
new Array(3111);
const v10 = [32318,512,536870888,-2147483648,-9223372036854775807,-44077848];
[1073741824,-6];
const v13 = Symbol.iterator;
let v22 = {
    [v13]() {
        let v15 = 10;
        const v21 = {
            next() {
                v15--;
                const v19 = v15 == 0;
                return { done: v19, value: v15 };
            },
        };
        return v21;
    },
};
[-1000000000000.0,-5.76269473348936,-Infinity,1.7531149234459343e+308,1.7512195372686388e+308,2.220446049250313e-16,-5.005267368986475,4.0];
[536870888,268435440,4,-1370972590,-47414];
try {
    load("test/mjsunit/wasm/wasm-module-builder.js");
} catch(e31) {
}
const kNopForTestingUnsupportedInLiftoff = 22;
function f5() {
    v10 != kNopForTestingUnsupportedInLiftoff ? v10 : kNopForTestingUnsupportedInLiftoff;
    [2.220446049250313e-16,-2.220446049250313e-16,-8.285661597528933e+307];
    for (let v38 = 0; v38 < 100; v38++) {
        f5();
    }
    let v7;
    try {
        const v43 = new WasmModuleBuilder();
        v7 = v43;
    } catch(e44) {
    }
    var builder = v7;
    try {
        builder.addMemory(1, 1, false);
    } catch(e50) {
    }
    const v14 = [kWasmI32,kWasmI32,kWasmI32,kWasmI32,kWasmI32,kWasmI32,kWasmI32,kWasmI32];
    const v15 = [kWasmI32];
    let v17;
    try {
        v17 = makeSig(v14, v15);
    } catch(e60) {
    }
    let v18;
    try {
        v18 = builder.addType(v17);
    } catch(e64) {
    }
    var sig_index = v18;
    let v22;
    try {
        v22 = builder.addFunction("zero", kSig_i_i);
    } catch(e71) {
    }
    var zero = v22;
    let v25;
    try {
        function f80() {
        }
        o.__defineSetter__("y", f80);
        o.x = 0.1;
        v25 = builder.addFunction("one", sig_index);
    } catch(e82) {
    }
    var one = v25;
    let v28;
    try {
        try {
            for (const v89 in __v_6) {
                try {
                    v22 = 4;
                } catch(e91) {
                }
                __v_6 = v89;
                try {
                    if (v89 === "0") {
                        try {
                            Object.defineProperties();
                        } catch(e96) {
                        }
                    }
                } catch(e97) {
                }
            }
        } catch(e98) {
        }
        v28 = builder.addFunction("two", kSig_i_i);
    } catch(e100) {
    }
    var two = v28;
    const v35 = [kExprLocalGet,0,kExprI32LoadMem,0,0];
    try {
        zero.addBody(v35);
        const v110 = %WasmArray();
        {
            const v111 = (a112, a113, a114) => {
            };
        }
    } catch(e115) {
    }
    const v40 = [kNopForTestingUnsupportedInLiftoff,kExprLocalGet,7,kExprCallFunction,zero?.index];
    try {
        one.addBody(v40);
    } catch(e122) {
    }
    const v61 = [kExprLocalGet,0,kExprI32Const,1,kExprI32Add,kExprLocalGet,0,kExprI32Const,2,kExprI32Add,kExprLocalGet,0,kExprI32Const,3,kExprI32Add,kExprLocalGet,0,kExprI32Const,4,kExprI32Add,kExprLocalGet,0,kExprI32Const,5,kExprI32Add,kExprLocalGet,0,kExprI32Const,6,kExprI32Add,kExprLocalGet,0,kExprI32Const,7,kExprI32Add,kExprLocalGet,0,kExprI32Const,8,kExprI32Add,kExprCallFunction,one?.index];
    let v62;
    try {
        v62 = two.addBody(v61);
    } catch(e147) {
    }
    try {
        v62.exportFunc();
    } catch(e149) {
    }
    const v64 = {};
    let v65;
    try {
        v65 = builder.instantiate(v64);
    } catch(e155) {
    }
    return v65;
}
let v66;
try {
    v66 = f5();
} catch(e159) {
}
var instance = v66;
const v3 = Array(65536);
Array.isArray(Array.of.apply(Array, v3));
Array.isArray(v13);
const v69 = instance?.exports;
let v70;
try {
    v70 = v69.two(34);
} catch(e175) {
}
console.log(v70);
