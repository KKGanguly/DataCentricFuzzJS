try {
    const v2 = d8?.file;
    try { v2.execute("../../v8/v8/test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
    let v5;
    try { v5 = new WasmModuleBuilder(); } catch (e) {}
    const builder = v5;
    const v8 = [kWasmI32,kWasmI32,kWasmI32,kWasmI32,kWasmI32,kWasmI32];
    const v9 = [kWasmI32];
    let v11;
    try { v11 = makeSig(v8, v9); } catch (e) {}
    let v12;
    try { v12 = builder.addType(v11); } catch (e) {}
    let $sig0 = v12;
    let v16;
    try { v16 = builder.addImport("m", "f", $sig0); } catch (e) {}
    let f0 = v16;
    try { builder.addExport("boom", f0); } catch (e) {}
    const v20 = () => {
    };
    const v21 = { f: v20 };
    const v22 = { m: v21 };
    let v23;
    try { v23 = builder.instantiate(v22); } catch (e) {}
    const instance = v23;
    while (true) {
        const v32 = instance?.exports;
        try { v32.boom(0, 0, 0, 0, 1575672810, 3735928495); } catch (e) {}
    }
} catch(e34) {
}
