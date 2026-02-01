try {
    load("test/mjsunit/wasm/wasm-constants.js");
} catch(e3) {
}
try {
    load("test/mjsunit/wasm/wasm-module-builder.js");
} catch(e7) {
}
try {
    function f5() {
        let v7;
        try {
            const v12 = new WasmModuleBuilder();
            v7 = v12;
        } catch(e13) {
        }
        let m = v7;
        try {
            m.addFunction("sub", kSig_i_ii);
        } catch(e18) {
        }
        try {
            m.instantiate();
        } catch(e20) {
        }
    }
    try {
        f5();
    } catch(e22) {
    }
} catch(e23) {
    try {
        console.info("caught exception");
    } catch(e27) {
    }
    try {
        console.info(e23);
    } catch(e30) {
    }
}
for (let i32 = 0; i32 < 150; i32++) {
    let v27;
    try {
        const v41 = new WasmModuleBuilder();
        v27 = v41;
    } catch(e42) {
    }
    var m = v27;
    try {
        m.addMemory(2);
    } catch(e46) {
    }
    try {
        m.instantiate();
    } catch(e48) {
    }
}
