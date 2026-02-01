const v5 = new Uint32Array(1);
const v8 = new Uint16Array(1029);
new Uint8Array(255);
function f12(a13, a14, a15, a16) {
    const v32 = {
        set c(a18) {
            try {
                ("o").endsWith("NgPMJ");
            } catch(e21) {
            }
            let v22 = new WebAssembly.Tag({parameters: ["f64", "i64"]});
        },
        e: a16,
        valueOf(a24, a25) {
            // WasmModule Code:
            // BeginWasmModule
            //     v26 <- WasmDefineMemory [8,94577], memory64
            //     v27 <- WasmDefineTable .wasmFuncRef, (10, nil), []
            //     v28 <- WasmDefineGlobal wasmf64(-977828.1409929987)
            //     v29 <- WasmDefineTag [Fuzzilli.Parameter.plain(.wasmf32), Fuzzilli.Parameter.plain(.wasmi32), Fuzzilli.Parameter.plain(.wasmf64), Fuzzilli.Parameter.plain(.wasmi64), Fuzzilli.Parameter.plain(.wasmi64), Fuzzilli.Parameter.plain(.wasmi32), Fuzzilli.Parameter.plain(.wasmi32), Fuzzilli.Parameter.plain(.wasmi32)]
            // v30 <- EndWasmModule
            // 
            const v30 = new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([
                0x00, 0x61, 0x73, 0x6D, 0x01, 0x00, 0x00, 0x00, 0x01, 0x0C,
                0x01, 0x60, 0x08, 0x7D, 0x7F, 0x7C, 0x7E, 0x7E, 0x7F, 0x7F,
                0x7F, 0x00, 0x03, 0x01, 0x00, 0x04, 0x04, 0x01, 0x70, 0x00,
                0x0A, 0x05, 0x06, 0x01, 0x05, 0x08, 0xF1, 0xE2, 0x05, 0x0D,
                0x03, 0x01, 0x00, 0x00, 0x06, 0x0D, 0x01, 0x7C, 0x01, 0x44,
                0xFD, 0x3B, 0x30, 0x48, 0x48, 0xD7, 0x2D, 0xC1, 0x0B, 0x07,
                0x0D, 0x02, 0x03, 0x77, 0x67, 0x30, 0x03, 0x00, 0x03, 0x77,
                0x74, 0x30, 0x01, 0x00, 0x09, 0x01, 0x00, 0x0A, 0x01, 0x00,
            ])));
            v30.exports;
            return v30;
        },
    };
    return v32;
}
f12("valueOf", 255, 255, 1);
f12("o", 255, v8, 1);
f12("number", 1029, v5, 1029);
function f36() {
}
const key1 = {};
const key2 = {};
const v45 = new Set([,1]);
const set = v45;
f36(set.has(undefined), true);
f36(set.has(1), true);
const v57 = [,1.234];
const v58 = new Set(v57);
const doubleSet = v58;
f36(doubleSet.has(undefined), true);
f36(doubleSet.has(1.234), true);
const v73 = new Map([[,key1],[key2]]);
const map = v73;
f36(map.get(undefined), key1);
const v78 = map.get(key2);
function f79() {
    let __v_25062 = __v_25055.length;
    __v_25055.length = 1;
    return __v_25062;
}
let __v_25059 = { valueOf: f79 };
for (let i87 = 0; i87 < 75; i87++) {
    __v_25055 = v57.slice();
    __v_25056 = __v_25055.slice(0, __v_25059);
}
f36(v78, undefined);
[];
[];
const v105 = new Map();
const doublesMap = v105;
doublesMap.get();
f36();
[key1];
[];
const v114 = new WeakMap();
const weakmap = v114;
weakmap.get();
f36();
const v119 = () => {
    const v122 = {};
    [];
    const v124 = new WeakSet();
    return v124;
};
f36();
const v126 = () => {
    [];
    const v131 = new WeakSet();
    return v131;
};
f36();
const v133 = () => {
    [];
    [];
    const v138 = new Map();
    return v138;
};
f36();
const v140 = () => {
    const v144 = new WeakMap([[,]]);
    return v144;
};
f36(v140);
const v146 = () => {
    const v151 = new WeakMap([,[,key1]]);
    return v151;
};
