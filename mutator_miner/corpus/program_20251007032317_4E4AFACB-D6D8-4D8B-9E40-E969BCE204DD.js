const v66 = new Uint8Array([0,97,115,109,1,0,0,0,1,12,2,80,0,95,1,99,116,0,96,0,1,116,3,2,1,1,4,12,1,64,0,100,0,1,1,2,251,1,0,11,7,8,1,4,109,97,105,110,0,0,10,12,1,10,0,65,0,37,0,251,2,0,0,11]);
var wasm_code = v66;
const t2 = WebAssembly.Module;
const v70 = new t2(wasm_code);
var wasm_module = v70;
const t5 = WebAssembly.Instance;
const v73 = new t5(wasm_module);
var wasm_instance = v73;
var wasm_function = wasm_instance.exports.main;
let v78;
try { v78 = wasm_function(); } catch (e) {}
var wasm_null = v78;
const v80 = %DebugPrint(wasm_null);
