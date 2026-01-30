try {
    try { load("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
    let v4;
    try { v4 = new WasmModuleBuilder(); } catch (e) {}
    var builder = v4;
    let v6;
    try { v6 = builder.instantiate(); } catch (e) {}
    var instance = v6;
    instance[1] = undefined;
    try { gc(); } catch (e) {}
    try { Object.getOwnPropertyNames(instance); } catch (e) {}
} catch(e13) {
}
