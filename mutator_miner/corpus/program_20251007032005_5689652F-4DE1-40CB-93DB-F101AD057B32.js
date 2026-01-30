try { load("test/mjsunit/wasm/wasm-constants.js"); } catch (e) {}
try { load("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
let v6;
try { v6 = new WasmModuleBuilder(); } catch (e) {}
var builder = v6;
const v9 = WebAssembly?.Module;
let v10;
try { v10 = builder.toBuffer(); } catch (e) {}
let v11;
try { v11 = new v9(v10); } catch (e) {}
let module = v11;
let v15;
try { v15 = new Worker("onmessage = function() {};"); } catch (e) {}
var worker = v15;
try { worker.postMessage(module); } catch (e) {}
