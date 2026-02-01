try {
    load("test/mjsunit/wasm/wasm-constants.js");
} catch(e3) {
}
try {
    load("test/mjsunit/wasm/wasm-module-builder.js");
} catch(e7) {
}
let v6;
try {
    const v11 = new WasmModuleBuilder();
    v6 = v11;
} catch(e12) {
}
var builder = v6;
const v8 = [];
let v11;
try {
    v11 = builder.addFunction("f0", kSig_v_v);
} catch(e21) {
}
try {
    v11.addBody(v8);
} catch(e23) {
}
const v13 = [];
let v15;
try {
    v15 = builder.addFunction("f1", kSig_v_v);
} catch(e31) {
}
try {
    v15.addBody(v13);
} catch(e33) {
}
try {
    builder.instantiate();
} catch(e35) {
}
