function f0() {
}
try {
    load("test/mjsunit/wasm/wasm-module-builder.js");
} catch(e4) {
}
let v5;
try {
    const v8 = new WasmModuleBuilder();
    v5 = v8;
} catch(e9) {
}
const builder = v5;
const v8 = WebAssembly?.Table;
const v11 = { element: "anyfunc", initial: 2 };
let v12;
try {
    const v20 = new v8(v11);
    v12 = v20;
} catch(e21) {
}
let table = v12;
try {
    builder.addImportedTable("m", "table", 4000000000);
} catch(e27) {
}
const v28 = () => {
    const v19 = { table: table };
    const v20 = { m: v19 };
    let v21;
    try {
        v21 = builder.instantiate(v20);
    } catch(e36) {
    }
    return v21;
};
const v18 = v28;
const v22 = WebAssembly?.LinkError;
try {
    f0(v18, v22);
} catch(e41) {
}
