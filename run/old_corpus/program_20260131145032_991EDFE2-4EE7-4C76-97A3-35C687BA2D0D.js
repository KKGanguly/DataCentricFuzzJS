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
var builder = v7;
try {
    builder.addImportedTable("x", "table", 1, 10000000);
} catch(e20) {
}
const v15 = WebAssembly?.Module;
let v16;
try {
    v16 = builder.toBuffer();
} catch(e27) {
}
let v17;
try {
    const v30 = new v15(v16);
    v17 = v30;
} catch(e31) {
}
let module = v17;
const v19 = WebAssembly?.Table;
const v23 = { element: "anyfunc", initial: 1, maximum: 1000000 };
let v24;
try {
    const v42 = new v19(v23);
    v24 = v42;
} catch(e43) {
}
let table = v24;
const v26 = WebAssembly?.Instance;
const v27 = { table: table };
const v28 = { x: v27 };
let v29;
try {
    const v53 = new v26(module, v28);
    v29 = v53;
} catch(e54) {
}
let instance = v29;
const v56 = () => {
    let v33;
    try {
        v33 = table.grow(Infinity);
    } catch(e61) {
    }
    return v33;
};
const v31 = v56;
try {
    f0(v31, RangeError);
} catch(e65) {
}
