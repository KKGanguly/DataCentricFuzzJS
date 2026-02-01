function f0() {
}
try {
    load("test/mjsunit/wasm/wasm-constants.js");
} catch(e4) {
}
try {
    load("test/mjsunit/wasm/wasm-module-builder.js");
} catch(e8) {
}
let v7;
try {
    const v12 = new WasmModuleBuilder();
    v7 = v12;
} catch(e13) {
}
let builder = v7;
try {
    builder.addImport("", "f", kSig_v_v);
} catch(e19) {
}
try {
    builder.addExport("a", 0);
} catch(e23) {
}
try {
    builder.addExport("b", 0);
} catch(e27) {
}
let v19;
try {
    v19 = builder.toBuffer();
} catch(e31) {
}
var bytes = v19;
const v22 = WebAssembly?.Module;
let v23;
try {
    const v38 = new v22(bytes);
    v23 = v38;
} catch(e39) {
}
var m = v23;
const v26 = m instanceof WebAssembly?.Module;
try {
    f0(v26);
} catch(e45) {
}
const v46 = (a47) => {
    const v31 = a47 instanceof WebAssembly?.Module;
    let v32;
    try {
        v32 = f0(v31);
    } catch(e54) {
    }
    return v32;
};
const v28 = v46;
let v33;
try {
    v33 = WebAssembly.compile(bytes);
} catch(e59) {
}
let v34;
try {
    v34 = v33.then(v28, f0);
} catch(e63) {
}
try {
    f0(v34);
} catch(e65) {
}
