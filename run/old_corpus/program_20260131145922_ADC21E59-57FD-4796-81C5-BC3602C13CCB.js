const v1 = /la(?=b)cabc?/vmigs;
[-11];
class C3 {
    static #valueOf(a5, a6) {
        [1.0,1e-15];
        return v1;
    }
    static {
    }
}
new C3();
function f10() {
    return 1024;
}
const v12 = Symbol.iterator;
const v21 = {
    [v12]() {
        let v14 = 10;
        const v20 = {
            next() {
                v14--;
                const v18 = v14 == 0;
                return { done: v18, value: v14 };
            },
        };
        return v20;
    },
};
[0.41287619882996474,0.7116212029021399,-417.37015512187315,-2.220446049250313e-16,1.1980204865839898e+308,1000.0,-724152.0778774992];
[-2147483649,1073741824,9007199254740991,-3,1934152975,2,2,35320659];
[4294967297,1,2147483647,-159786571,9007199254740990,-2147483649,-1];
const v27 = Symbol.iterator;
const v36 = {
    [v27]() {
        let v29 = 10;
        const v35 = {
            next() {
                v29--;
                const v33 = v29 == 0;
                return { done: v33, value: v29 };
            },
        };
        return v35;
    },
};
new Float32Array(2918);
[1.2502485810048448e+308,2,-2.220446049250313e-16];
const v2 = [1000000,127.5605142305808,-1.3923112304545701e+308];
const v52 = -2.2250738585072014e-308;
const v55 = -847.4982439911087;
const v57 = -4;
function opt() {
    let tmp = [];
    tmp[0] = tmp;
    return tmp[0];
}
function main() {
    for (let i65 = 0; i65 < 4096; i65++) {
        opt();
    }
    print(opt());
}
main();
[v52,0.4886628150535324,v55,v57,-1000000,889.2863358360332];
[852554753,3,1344985463];
[1073741825,-9.223372036854776e+18,-9007199254740991,1030325783,1456192899,-2120128231,-1192784483,255,-60696,10000];
[14,-2147483648,536870888,268435456,5];
try {
    try {
        load("test/mjsunit/wasm/wasm-constants.js");
    } catch(e109) {
    }
    try {
        load("test/mjsunit/wasm/wasm-module-builder.js");
    } catch(e113) {
    }
    let v13;
    try {
        const v117 = new WasmModuleBuilder();
        v13 = v117;
    } catch(e118) {
    }
    const builder = v13;
    try {
        builder.addMemory(1, 1);
    } catch(e123) {
    }
    const v25 = [kExprGetLocal,0,kExprI32Const,0,kExprI32StoreMem,0,0];
    let v28;
    try {
        v28 = builder.addFunction(undefined, kSig_v_i);
    } catch(e138) {
    }
    "" + { toString: undefined };
    try {
        v28.addBody(v25);
    } catch(e144) {
    }
    [kExprGetLocal,5,kExprCallFunction,0];
    let v40;
    try {
        const v153 = new Array(6);
        v40 = v153;
    } catch(e154) {
    }
    const v41 = [v2,v2];
    let v43;
    try {
        v43 = makeSig(v40, v41);
        function main(a162) {
            class C163 {
                m() {
                    return super.length;
                }
            }
            let v9;
            try {
                const v172 = new OfflineAudioContext(1, 38400, 38400);
                v9 = v172;
            } catch(e173) {
            }
            var node = v9;
            node["a" + a162] = 1;
            if (a162 < (256 - 1)) {
                const v18 = {};
                const t12 = C163?.prototype;
                t12.__proto__ = v18;
            } else {
                const t15 = C163?.prototype;
                t15.__proto__ = node;
            }
            let v21;
            try {
                const v190 = new C163();
                v21 = v190;
            } catch(e191) {
            }
            let b = v21;
            b.x0 = 1;
            b.x1 = 2;
            b.x2 = 3;
            b.x3 = 4;
            node?.length;
            let v28;
            try {
                v28 = b.m();
            } catch(e201) {
            }
            try {
                console.log(v28);
            } catch(e204) {
            }
        }
        for (let i206 = 0; i206 < 256; i206++) {
            try {
                main(i206);
            } catch(e213) {
            }
        }
    } catch(e214) {
    }
    try {
        builder.addFunction(undefined, v43);
    } catch(e217) {
    }
    const gen_i32_code = [kExprTeeLocal,0,kExprGetLocal,0,kExprI32Const,1,kExprI32Add];
    let v54;
    try {
        v54 = wasmI32Const(0);
    } catch(e230) {
    }
    let v56;
    try {
        v56 = wasmI32Const(1);
    } catch(e236) {
    }
    const v57 = [...v54,...v56,kExprI32Add,...gen_i32_code,...gen_i32_code,...gen_i32_code,...gen_i32_code,...gen_i32_code,...gen_i32_code,...gen_i32_code,...gen_i32_code];
    ({}).addBody(v57);
} catch(e241) {
}
