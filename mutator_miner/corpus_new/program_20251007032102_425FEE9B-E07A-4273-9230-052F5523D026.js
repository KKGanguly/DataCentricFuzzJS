try { load("test/mjsunit/wasm/wasm-constants.js"); } catch (e) {}
try { load("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
let v6;
try { v6 = new WasmModuleBuilder(); } catch (e) {}
var builder = v6;
let v10;
try { v10 = builder.addImportedTable("q", "table"); } catch (e) {}
let q_table = v10;
let v15;
try { v15 = builder.addImportedGlobal("q", "base", kWasmI32); } catch (e) {}
let q_base = v15;
let v20;
try { v20 = builder.addImport("q", "fun", kSig_v_v); } catch (e) {}
let q_fun = v20;
try { builder.addType(kSig_i_ii); } catch (e) {}
const v25 = [q_fun];
try { builder.addFunctionTableInit(q_base, true, v25); } catch (e) {}
const v28 = WebAssembly?.Module;
let v29;
try { v29 = builder.toBuffer(); } catch (e) {}
let v30;
try { v30 = new v28(v29); } catch (e) {}
let module = v30;
const v32 = WebAssembly?.Table;
const v35 = { element: "anyfunc", initial: 10 };
let v36;
try { v36 = new v32(v35); } catch (e) {}
let table = v36;
const v38 = WebAssembly?.Instance;
const v40 = () => {
    return 0;
};
const v42 = { base: 0, table: table, fun: v40 };
const v43 = { q: v42 };
let v44;
try { v44 = new v38(module, v43); } catch (e) {}
let instance = v44;
