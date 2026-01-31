const v108 = new Uint8Array([0,97,115,109,1,0,0,0,1,38,6,80,0,95,1,127,1,80,0,95,1,108,0,1,80,0,95,1,108,1,0,80,0,95,1,108,2,0,80,0,95,1,108,3,0,96,0,0,3,2,1,5,4,11,1,64,107,4,1,1,2,251,8,4,11,7,8,1,4,109,97,105,110,0,0,10,29,1,27,0,65,0,37,0,251,3,4,0,251,3,3,0,251,3,2,0,251,3,1,0,251,3,0,0,26,11]);
var wasm_code = v108;
const v111 = WebAssembly.Module;
let v112;
try { v112 = new v111(wasm_code); } catch (e) {}
var wasm_module = v112;
const v114 = WebAssembly.Instance;
let v115;
try { v115 = new v114(wasm_module); } catch (e) {}
var wasm_instance = v115;
var wasm_function = wasm_instance?.exports?.main;
try { wasm_function(); } catch (e) {}
