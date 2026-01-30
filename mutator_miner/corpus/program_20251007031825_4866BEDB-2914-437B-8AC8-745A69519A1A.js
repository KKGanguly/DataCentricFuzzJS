function f0() {
}
try { load("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
let v5;
try { v5 = new WasmModuleBuilder(); } catch (e) {}
const builder = v5;
const v8 = WebAssembly?.Table;
const v11 = { element: "anyfunc", initial: 2 };
let v12;
try { v12 = new v8(v11); } catch (e) {}
let table = v12;
try { builder.addImportedTable("m", "table", 4000000000); } catch (e) {}
const v18 = () => {
    const v19 = { table: table };
    const v20 = { m: v19 };
    let v21;
    try { v21 = builder.instantiate(v20); } catch (e) {}
    return v21;
};
try { f0(v18, RangeError); } catch (e) {}
