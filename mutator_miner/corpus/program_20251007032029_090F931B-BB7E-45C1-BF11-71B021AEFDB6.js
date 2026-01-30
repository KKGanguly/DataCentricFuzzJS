try { load("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
let v4;
try { v4 = new WasmModuleBuilder(); } catch (e) {}
let builder = v4;
try { builder.addImportedTable("ffi", "t1", 5, 5, kWasmAnyFunc); } catch (e) {}
try { builder.addImportedTable("ffi", "t2", 9, 9, kWasmAnyFunc); } catch (e) {}
const v17 = [];
let v20;
try { v20 = builder.addFunction("foo", kSig_v_v); } catch (e) {}
let v21;
try { v21 = v20.addBody(v17); } catch (e) {}
try { v21.exportFunc(); } catch (e) {}
let v23;
try { v23 = builder.toModule(); } catch (e) {}
let module = v23;
const v26 = WebAssembly?.Table;
const v30 = { element: "anyfunc", initial: 5, maximum: 5 };
let v31;
try { v31 = new v26(v30); } catch (e) {}
let table1 = v31;
const v33 = WebAssembly?.Table;
const v37 = { element: "anyfunc", initial: 9, maximum: 9 };
let v38;
try { v38 = new v33(v37); } catch (e) {}
let table2 = v38;
const v40 = WebAssembly?.Instance;
const v41 = { t1: table1, t2: table2 };
const v42 = { ffi: v41 };
let v43;
try { v43 = new v40(module, v42); } catch (e) {}
let instance = v43;
const v45 = WebAssembly?.Table;
const v49 = { element: "anyfunc", initial: 9, maximum: 9 };
let v50;
try { v50 = new v45(v49); } catch (e) {}
let table3 = v50;
const v54 = instance?.exports?.foo;
try { table3.set(8, v54); } catch (e) {}
const v56 = WebAssembly?.Instance;
const v57 = { t1: table1, t2: table3 };
const v58 = { ffi: v57 };
try { new v56(module, v58); } catch (e) {}
