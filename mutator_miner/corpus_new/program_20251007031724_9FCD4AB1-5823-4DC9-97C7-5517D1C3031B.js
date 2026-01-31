function f0() {
}
try { load("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
function testQuitWithActiveInterpreterActivations() {
    f0(arguments.callee.name);
    if (quit !== undefined) {
        let v13;
        try { v13 = new WasmModuleBuilder(); } catch (e) {}
        const builder = v13;
        try { builder.addImport("d8", "quit", kSig_v_v); } catch (e) {}
        const v21 = [kExprCallFunction,0];
        let v23;
        try { v23 = builder.addFunction("do_not_crash", kSig_v_v); } catch (e) {}
        let v24;
        try { v24 = v23.addBody(v21); } catch (e) {}
        try { v24.exportFunc(); } catch (e) {}
        const v26 = { quit: quit };
        const v27 = { d8: v26 };
        let v28;
        try { v28 = builder.instantiate(v27); } catch (e) {}
        const v29 = v28?.exports;
        try { v29.do_not_crash(); } catch (e) {}
    }
}
try { testQuitWithActiveInterpreterActivations(); } catch (e) {}
