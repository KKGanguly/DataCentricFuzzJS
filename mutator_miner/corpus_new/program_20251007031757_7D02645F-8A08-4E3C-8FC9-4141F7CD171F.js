let code = [0,97,115,109,1,0,0,0];
let v12;
try { v12 = new Uint8Array(code); } catch (e) {}
const v13 = [v12];
const v15 = { type: "application/wasm" };
let v16;
try { v16 = new Blob(v13, v15); } catch (e) {}
let v18;
try { v18 = URL.createObjectURL(v16); } catch (e) {}
let wasm_blob = v18;
let v21;
try { v21 = new AbortController(); } catch (e) {}
let controller = v21;
let signal = controller?.signal;
const v27 = WebAssembly?.Module?.prototype;
function f29() {
    try { controller.abort(); } catch (e) {}
}
const v31 = { get: f29 };
try { Object.defineProperty(v27, "then", v31); } catch (e) {}
const v34 = { signal: signal };
let v36;
try { v36 = fetch(wasm_blob, v34); } catch (e) {}
try { WebAssembly.compileStreaming(v36); } catch (e) {}
