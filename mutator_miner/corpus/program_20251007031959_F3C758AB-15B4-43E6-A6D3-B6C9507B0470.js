function f0() {
}
try { load("test/mjsunit/wasm/wasm-constants.js"); } catch (e) {}
try { load("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
let v7;
try { v7 = new WasmModuleBuilder(); } catch (e) {}
var builder = v7;
try { builder.addImportedTable("x", "table", 1, 10000000); } catch (e) {}
const v15 = WebAssembly?.Module;
let v16;
try { v16 = builder.toBuffer(); } catch (e) {}
let v17;
try { v17 = new v15(v16); } catch (e) {}
let module = v17;
const v19 = WebAssembly?.Table;
const v23 = { element: "anyfunc", initial: 1, maximum: 1000000 };
let v24;
try { v24 = new v19(v23); } catch (e) {}
let table = v24;
const v26 = WebAssembly?.Instance;
const v27 = { table: table };
const v28 = { x: v27 };
let v29;
try { v29 = new v26(module, v28); } catch (e) {}
let instance = v29;
const v31 = () => {
    let v33;
    try { v33 = table.grow(Infinity); } catch (e) {}
    return v33;
};
try { f0(v31, RangeError); } catch (e) {}
