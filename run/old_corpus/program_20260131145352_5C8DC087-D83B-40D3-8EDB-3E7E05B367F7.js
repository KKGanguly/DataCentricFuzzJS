try {
    load("test/mjsunit/wasm/wasm-module-builder.js");
} catch(e3) {
}
let v4;
try {
    const v7 = new WasmModuleBuilder();
    v4 = v7;
} catch(e8) {
}
let builder = v4;
try {
    builder.addImportedTable("ffi", "t1", 5, 5, kWasmAnyFunc);
} catch(e16) {
}
try {
    builder.addImportedTable("ffi", "t2", 9, 9, kWasmAnyFunc);
} catch(e23) {
}
const v17 = [];
let v20;
try {
    v20 = builder.addFunction("foo", kSig_v_v);
} catch(e31) {
}
let v21;
try {
    v21 = v20.addBody(v17);
} catch(e35) {
}
try {
    v21.exportFunc();
} catch(e37) {
}
let v23;
try {
    v23 = builder.toModule();
} catch(e41) {
}
let module = v23;
const v26 = WebAssembly?.Table;
const v30 = { element: "anyfunc", initial: 5, maximum: 5 };
let v31;
try {
    const v53 = new v26(v30);
    v31 = v53;
} catch(e54) {
}
let table1 = v31;
const v33 = WebAssembly?.Table;
const v37 = { element: "anyfunc", initial: 9, maximum: 9 };
let v38;
try {
    const v65 = new v33(v37);
    v38 = v65;
} catch(e66) {
}
let table2 = v38;
const v40 = WebAssembly?.Instance;
const v41 = { t1: table1, t2: table2 };
const v42 = { ffi: v41 };
let v43;
try {
    const v76 = new v40(module, v42);
    v43 = v76;
} catch(e77) {
}
let instance = v43;
const v45 = WebAssembly?.Table;
const v49 = { element: "anyfunc", initial: 9, maximum: 9 };
let v50;
try {
    const v88 = new v45(v49);
    v50 = v88;
} catch(e89) {
}
let table3 = v50;
const v54 = instance?.exports?.foo;
try {
    table3.set(8, v54);
} catch(e96) {
}
const v56 = WebAssembly?.Instance;
const v57 = { t1: table1, t2: table3 };
const v58 = { ffi: v57 };
try {
    new v56(module, v58);
} catch(e104) {
}
