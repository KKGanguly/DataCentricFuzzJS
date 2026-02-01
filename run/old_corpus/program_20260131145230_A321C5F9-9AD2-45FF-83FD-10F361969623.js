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
const v9 = WebAssembly?.Module;
let v10;
try {
    v10 = builder.toBuffer();
} catch(e20) {
}
let v11;
try {
    const v23 = new v9(v10);
    v11 = v23;
} catch(e24) {
}
let module = v11;
let v15;
try {
    const v30 = new Worker("onmessage = function() {};");
    v15 = v30;
} catch(e31) {
}
var worker = v15;
try {
    worker.postMessage(module);
} catch(e34) {
}
