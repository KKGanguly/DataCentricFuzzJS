try {
    function f0() {
    }
    try { load("test/mjsunit/wasm/wasm-constants.js"); } catch (e) {}
    try { load("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
    let v7;
    try { v7 = new WasmModuleBuilder(); } catch (e) {}
    const builder = v7;
    let v10;
    try { v10 = builder.addType(kSig_i_i); } catch (e) {}
    const sig = v10;
    const v18 = [kExprI32Const,0,kExprI32Const,0,kExprCallIndirect,sig,kTableZero];
    let v21;
    try { v21 = builder.addFunction("call", kSig_i_v); } catch (e) {}
    let v22;
    try { v22 = v21.addBody(v18); } catch (e) {}
    try { v22.exportAs("call"); } catch (e) {}
    try { builder.addImportedTable("imp", "table"); } catch (e) {}
    const v28 = WebAssembly?.Table;
    const v31 = { element: "anyfunc", initial: 1 };
    let v32;
    try { v32 = new v28(v31); } catch (e) {}
    const table = v32;
    const v34 = { table: table };
    const v35 = { imp: v34 };
    let v36;
    try { v36 = builder.instantiate(v35); } catch (e) {}
    const instance = v36;
    const v38 = () => {
        const v39 = instance?.exports;
        let v40;
        try { v40 = v39.call(); } catch (e) {}
        return v40;
    };
    const v41 = WebAssembly?.RuntimeError;
    const v42 = /function signature mismatch/;
    try { f0(v38, v41, v42); } catch (e) {}
} catch(e44) {
}
