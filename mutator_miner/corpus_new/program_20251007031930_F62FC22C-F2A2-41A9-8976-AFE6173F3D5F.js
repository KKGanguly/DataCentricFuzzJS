try {
    try { load("test/mjsunit/wasm/wasm-constants.js"); } catch (e) {}
    try { load("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
    let v6;
    try { v6 = new WasmModuleBuilder(); } catch (e) {}
    const builder1 = v6;
    const v12 = [kExprGetLocal,0,kExprGetLocal,1,kExprI32Mul];
    let v15;
    try { v15 = builder1.addFunction("mul", kSig_i_ii); } catch (e) {}
    let v16;
    try { v16 = v15.addBody(v12); } catch (e) {}
    try { v16.exportFunc(); } catch (e) {}
    let v18;
    try { v18 = builder1.instantiate(); } catch (e) {}
    const mul = v18?.exports?.mul;
    const v23 = WebAssembly?.Table;
    const v26 = { element: "anyfunc", initial: 10 };
    let v27;
    try { v27 = new v23(v26); } catch (e) {}
    const table = v27;
    let v29;
    try { v29 = new WasmModuleBuilder(); } catch (e) {}
    const builder2 = v29;
    let v33;
    try { v33 = builder2.addImport("q", "wasm_mul", kSig_i_ii); } catch (e) {}
    const mul_import = v33;
    try { builder2.addImportedTable("q", "table"); } catch (e) {}
    let v41;
    try { v41 = builder2.addImportedGlobal("q", "glob", kWasmI32); } catch (e) {}
    const glob_import = v41;
    const v44 = [mul_import];
    try { builder2.addFunctionTableInit(glob_import, true, v44); } catch (e) {}
    const v47 = (a48) => {
        return a48;
    };
    const v49 = { glob: 0, js_div: v47, wasm_mul: mul, table: table };
    const v50 = { q: v49 };
    try { builder2.instantiate(v50); } catch (e) {}
} catch(e52) {
}
