try { load("test/mjsunit/wasm/wasm-constants.js"); } catch (e) {}
try { load("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
try {
    function f5() {
        let v7;
        try { v7 = new WasmModuleBuilder(); } catch (e) {}
        let m = v7;
        try { m.addFunction("sub", kSig_i_ii); } catch (e) {}
        try { m.instantiate(); } catch (e) {}
    }
    try { f5(); } catch (e) {}
} catch(e14) {
    try { console.info("caught exception"); } catch (e) {}
    try { console.info(e14); } catch (e) {}
}
for (let i20 = 0; i20 < 150; i20++) {
    let v27;
    try { v27 = new WasmModuleBuilder(); } catch (e) {}
    var m = v27;
    try { m.addMemory(2); } catch (e) {}
    try { m.instantiate(); } catch (e) {}
}
