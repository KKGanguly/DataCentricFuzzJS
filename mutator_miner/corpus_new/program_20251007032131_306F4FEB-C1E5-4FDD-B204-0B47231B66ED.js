function f0() {
}
try { load("test/mjsunit/wasm/wasm-constants.js"); } catch (e) {}
try { load("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
let v7;
try { v7 = new WasmModuleBuilder(); } catch (e) {}
let builder = v7;
try { builder.addImport("", "f", kSig_v_v); } catch (e) {}
try { builder.addExport("a", 0); } catch (e) {}
try { builder.addExport("b", 0); } catch (e) {}
let v19;
try { v19 = builder.toBuffer(); } catch (e) {}
var bytes = v19;
const v22 = WebAssembly?.Module;
let v23;
try { v23 = new v22(bytes); } catch (e) {}
var m = v23;
const v26 = m instanceof WebAssembly?.Module;
try { f0(v26); } catch (e) {}
const v28 = (a29) => {
    const v31 = a29 instanceof WebAssembly?.Module;
    let v32;
    try { v32 = f0(v31); } catch (e) {}
    return v32;
};
let v33;
try { v33 = WebAssembly.compile(bytes); } catch (e) {}
let v34;
try { v34 = v33.then(v28, f0); } catch (e) {}
try { f0(v34); } catch (e) {}
