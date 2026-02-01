try {
    try { load("lib.js"); } catch (e) {}
    let v4;
    try { v4 = new WasmModuleBuilder(); } catch (e) {}
    let builder1 = v4;
    function test() {
        try { c(); } catch (e) {}
    }
    let v12;
    try { v12 = new Array(8); } catch (e) {}
    let v13;
    try { v13 = v12.fill(kWasmI32); } catch (e) {}
    const v14 = [kWasmI32];
    let v16;
    try { v16 = makeSig(v13, v14); } catch (e) {}
    let func1_sig = v16;
    let v21;
    try { v21 = builder1.addImport("q", "func", kSig_v_v); } catch (e) {}
    let imp = v21;
    const v26 = [kExprGetLocal,0,kExprCallFunction,imp];
    let v28;
    try { v28 = builder1.addFunction("func1", func1_sig); } catch (e) {}
    let v29;
    try { v29 = v28.addBody(v26); } catch (e) {}
    let v30;
    try { v30 = v29.exportFunc(); } catch (e) {}
    let func1 = v30;
    const v32 = { func: test };
    const v33 = { q: v32 };
    let v34;
    try { v34 = builder1.instantiate(v33); } catch (e) {}
    let instance1 = v34;
    let v36;
    try { v36 = new WasmModuleBuilder(); } catch (e) {}
    let builder2 = v36;
    let v40;
    try { v40 = builder2.addImport("q", "func1", func1_sig); } catch (e) {}
    let func1_imp = v40;
    const v50 = [kExprGetLocal,0,kExprGetLocal,0,kExprGetLocal,0,kExprGetLocal,0,kExprGetLocal,0,kExprGetLocal,0,kExprGetLocal,0,kExprGetLocal,0,kExprCallFunction,func1_imp];
    let v53;
    try { v53 = builder2.addFunction("func2", kSig_i_i); } catch (e) {}
    let v54;
    try { v54 = v53.addBody(v50); } catch (e) {}
    let v55;
    try { v55 = v54.exportFunc(); } catch (e) {}
    let func2 = v55;
    const v58 = instance1?.exports?.func1;
    const v59 = { func1: v58 };
    const v60 = { q: v59 };
    let v61;
    try { v61 = builder2.instantiate(v60); } catch (e) {}
    let instance2 = v61;
    const v65 = instance2?.exports?.func2?.name;
    let v67;
    try { v67 = parseInt(v65); } catch (e) {}
    const v68 = %RedirectToWasmInterpreter(instance2, v67);
    const v70 = instance2?.exports;
    try { v70.func2(1); } catch (e) {}
} catch(e72) {
}
