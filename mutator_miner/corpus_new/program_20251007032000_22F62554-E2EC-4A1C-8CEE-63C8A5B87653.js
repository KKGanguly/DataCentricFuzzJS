try {
    let v2;
    try { v2 = WebAssembly.Module(raw_wasm); } catch (e) {}
    var mod = v2;
    const v15 = {
        get imp() {
            function f5() {
            }
            const v6 = { imp: f5 };
            const v7 = { mod: v6 };
            let v8;
            try { v8 = WebAssembly.Instance(mod, v7); } catch (e) {}
            wasm2 = v8;
            let v12;
            try { v12 = new ArrayBuffer(65536); } catch (e) {}
            spacer = v12;
            function f14() {
            }
            return f14;
        },
    };
    var ffi = { mod: v15 };
    let v18;
    try { v18 = WebAssembly.Instance(mod, ffi); } catch (e) {}
    wasm = v18;
    const v23 = wasm2?.exports?.memory;
    try { v23.grow(1); } catch (e) {}
} catch(e25) {
}
