try {
    try { load("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
    let v4;
    try { v4 = new WasmModuleBuilder(); } catch (e) {}
    const builder = v4;
    let v9;
    try { v9 = new Array(9); } catch (e) {}
    let v10;
    try { v10 = v9.fill(kWasmI32); } catch (e) {}
    const results = v10;
    const v13 = [kExprUnreachable];
    const v15 = [];
    let v17;
    try { v17 = makeSig(v15, results); } catch (e) {}
    let v18;
    try { v18 = builder.addFunction("foo", v17); } catch (e) {}
    try { v18.addBody(v13); } catch (e) {}
    try { builder.instantiate(); } catch (e) {}
} catch(e21) {
}
