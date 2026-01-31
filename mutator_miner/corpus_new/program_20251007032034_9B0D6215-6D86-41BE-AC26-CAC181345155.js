try {
    let v1;
    try { v1 = new WasmModuleBuilder(); } catch (e) {}
    var builder = v1;
    try { builder.addImportedTable("x", "table", 1, 10000000); } catch (e) {}
    const v16 = [kExprI32Const,0,kExprGetLocal,0,kExprCallIndirect,0,kTableZero];
    let v19;
    try { v19 = builder.addFunction("main", kSig_i_i); } catch (e) {}
    let v20;
    try { v20 = v19.addBody(v16); } catch (e) {}
    try { v20.exportAs("main"); } catch (e) {}
    const v23 = WebAssembly?.Module;
    let v24;
    try { v24 = builder.toBuffer(); } catch (e) {}
    let v25;
    try { v25 = new v23(v24); } catch (e) {}
    let module = v25;
    const v27 = WebAssembly?.Table;
    const v31 = { element: "anyfunc", initial: 1, maximum: 1000000 };
    let v32;
    try { v32 = new v27(v31); } catch (e) {}
    let table = v32;
    const v34 = WebAssembly?.Instance;
    const v35 = { table: table };
    const v36 = { x: v35 };
    let v37;
    try { v37 = new v34(module, v36); } catch (e) {}
    let instance = v37;
    for (let i40 = 0; i40 < 4; i40++) {
        try { table.grow(99900); } catch (e) {}
    }
    const v48 = WebAssembly?.Instance;
    const v49 = { table: table };
    const v50 = { x: v49 };
    let v51;
    try { v51 = new v48(module, v50); } catch (e) {}
    let instance2 = v51;
    const v55 = 3223857 / 8;
    const v56 = instance2?.exports;
    try { v56.main(v55); } catch (e) {}
} catch(e58) {
}
