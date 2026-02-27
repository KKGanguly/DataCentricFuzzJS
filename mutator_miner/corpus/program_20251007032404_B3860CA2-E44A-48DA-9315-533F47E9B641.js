try {
    const v1 = d8?.test;
    try { v1.enableJSPI(); } catch (e) {}
    const v3 = d8?.test;
    try { v3.installConditionalFeatures(); } catch (e) {}
    const v6 = d8?.file;
    try { v6.execute("../../v8/v8/test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
    const v9 = [kWasmI32];
    const v10 = [];
    let v12;
    try { v12 = makeSig(v9, v10); } catch (e) {}
    const sig = v12;
    let v15;
    try { v15 = new WasmModuleBuilder(); } catch (e) {}
    const builder = v15;
    let v17;
    try { v17 = builder.addType(sig); } catch (e) {}
    const _type = v17;
    let v21;
    try { v21 = builder.addImport("m", "foo", _type); } catch (e) {}
    const _import = v21;
    let v25;
    try { v25 = builder.addTable(kWasmAnyFunc, 10); } catch (e) {}
    const _table = v25?.index;
    try { builder.addExportOfKind(sig, builder, _import, _table); } catch (e) {}
    const v37 = [kExprLocalGet,0,kExprI32Const,0,kExprTableGet,_table,kGCPrefix,kExprRefCast,_type,kExprCallRef,_type];
    let v39;
    try { v39 = builder.addFunction("main", _type); } catch (e) {}
    let v40;
    try { v40 = v39.addBody(v37); } catch (e) {}
    try { v40.exportFunc(); } catch (e) {}
    const v43 = WebAssembly?.Function;
    const v45 = ["i32"];
    const v46 = [];
    const v47 = { parameters: v45, results: v46 };
    const v48 = () => {
        return 12;
    };
    let v50;
    try { v50 = new v43(v47, v48); } catch (e) {}
    const func = v50;
    const v52 = { foo: func };
    const v53 = { m: v52 };
    let v54;
    try { v54 = builder.instantiate(v53); } catch (e) {}
    const instance = v54;
    const v57 = instance?.exports;
    try { v57.main(15); } catch (e) {}
} catch(e59) {
}
