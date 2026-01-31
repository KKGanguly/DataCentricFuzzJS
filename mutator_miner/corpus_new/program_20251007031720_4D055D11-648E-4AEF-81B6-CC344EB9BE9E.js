try {
    function f0() {
    }
    try { load("test/mjsunit/wasm/wasm-constants.js"); } catch (e) {}
    try { load("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
    let v7;
    try { v7 = new WasmModuleBuilder(); } catch (e) {}
    const builder = v7;
    const v10 = [kWasmI32,kWasmI32,kWasmI32];
    const v11 = [kWasmI32];
    let v13;
    try { v13 = makeSig(v10, v11); } catch (e) {}
    sig1 = v13;
    let v18;
    try { v18 = builder.addImport("q", "imp", kSig_i_i); } catch (e) {}
    const imp_idx = v18;
    try { builder.addExport("exp", imp_idx); } catch (e) {}
    let v22;
    try { v22 = builder.toModule(); } catch (e) {}
    const module = v22;
    function bad(a25, a26, a27, a28, a29, a30, a31, a32) {
        const v33 = [a25,a26,a27,a28,a29,a30,a31,a32];
        let v35;
        try { v35 = JSON.stringify(v33); } catch (e) {}
        try { f0(v35); } catch (e) {}
    }
    const v38 = WebAssembly?.Instance;
    const v39 = { imp: bad };
    const v40 = { q: v39 };
    let v41;
    try { v41 = new v38(module, v40); } catch (e) {}
    const instance1 = v41;
    const v43 = WebAssembly?.Instance;
    const v44 = (a45) => {
        return a45;
    };
    const v46 = { imp: v44 };
    const v47 = { q: v46 };
    let v48;
    try { v48 = new v43(module, v47); } catch (e) {}
    const instance2 = v48;
    const v51 = instance1?.exports;
    let v52;
    try { v52 = v51.exp(5); } catch (e) {}
    try { f0(v52); } catch (e) {}
} catch(e54) {
}
