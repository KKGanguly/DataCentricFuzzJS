const v78 = new Uint8Array([0,97,115,109,1,0,0,0,1,16,3,80,0,95,1,108,103,1,96,0,0,96,1,108,0,0,3,3,2,1,2,4,5,1,112,1,2,2,7,8,1,4,109,97,105,110,0,0,10,26,2,6,0,208,0,16,1,11,17,0,32,0,251,113,32,0,251,3,0,0,251,65,0,26,26,11]);
var wasm_code = v78;
const v81 = WebAssembly.Module;
let v82;
try { v82 = new v81(wasm_code); } catch (e) {}
var wasm_module = v82;
const v84 = WebAssembly.Instance;
let v85;
try { v85 = new v84(wasm_module); } catch (e) {}
var wasm_instance = v85;
var wasm_function = wasm_instance?.exports?.main;
try { wasm_function(); } catch (e) {}
