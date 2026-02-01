try {
    function f0() {
    }
    try { load("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
    let v5;
    try { v5 = new WasmModuleBuilder(); } catch (e) {}
    const builder = v5;
    try { builder.addMemory(16, 32, false); } catch (e) {}
    const v11 = [];
    const v13 = [kWasmI32];
    let v15;
    try { v15 = makeSig(v11, v13); } catch (e) {}
    try { builder.addType(v15); } catch (e) {}
    const v29 = [kExprI32Const,0,kSimdPrefix,kExprI16x8Load8x8U,3,255,255,63,kSimdPrefix,kExprI16x8ExtractLaneS,0,kExprEnd];
    let v32;
    try { v32 = builder.addFunction(undefined, 0); } catch (e) {}
    let v33;
    try { v33 = v32.addBodyWithEnd(v29); } catch (e) {}
    try { v33.exportAs("main"); } catch (e) {}
    let v35;
    try { v35 = builder.instantiate(); } catch (e) {}
    const instance = v35;
    const v38 = () => {
        const v39 = instance?.exports;
        let v40;
        try { v40 = v39.main(); } catch (e) {}
        return v40;
    };
    try { f0(kTrapMemOutOfBounds, v38); } catch (e) {}
} catch(e42) {
}
