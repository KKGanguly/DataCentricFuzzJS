function f0() {
}
try { load("test/mjsunit/wasm/wasm-constants.js"); } catch (e) {}
try { load("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
function AddFunctions(a7) {
    let v9;
    try { v9 = a7.addType(kSig_i_ii); } catch (e) {}
    let sig_index = v9;
    const v15 = [kExprGetLocal,0,kExprGetLocal,1,kExprI32Mul];
    let v17;
    try { v17 = a7.addFunction("mul", sig_index); } catch (e) {}
    let v18;
    try { v18 = v17.addBody(v15); } catch (e) {}
    let mul = v18;
    const v23 = [kExprGetLocal,0,kExprGetLocal,1,kExprI32Add];
    let v25;
    try { v25 = a7.addFunction("add", sig_index); } catch (e) {}
    let v26;
    try { v26 = v25.addBody(v23); } catch (e) {}
    let add = v26;
    const v31 = [kExprGetLocal,0,kExprGetLocal,1,kExprI32Sub];
    let v33;
    try { v33 = a7.addFunction("sub", sig_index); } catch (e) {}
    let v34;
    try { v34 = v33.addBody(v31); } catch (e) {}
    let sub = v34;
    return { mul: mul, add: add, sub: sub };
}
function js_div(a38, a39) {
    return (a38 / a39) | 0;
}
function ExportedTableTest() {
    f0("ExportedTableTest...");
    let v47;
    try { v47 = new WasmModuleBuilder(); } catch (e) {}
    let builder = v47;
    let v52;
    try { v52 = builder.addImport("q", "js_div", kSig_i_ii); } catch (e) {}
    let d = v52;
    let v54;
    try { v54 = AddFunctions(builder); } catch (e) {}
    let f = v54;
    const v65 = [kExprI32Const,33,kExprGetLocal,0,kExprGetLocal,1,kExprCallIndirect,0,kTableZero];
    let v67;
    try { v67 = builder.addFunction("main", kSig_i_ii); } catch (e) {}
    let v68;
    try { v68 = v67.addBody(v65); } catch (e) {}
    try { v68.exportAs("main"); } catch (e) {}
    const v71 = f?.add;
    try { v71.exportAs("blarg"); } catch (e) {}
    try { builder.setFunctionTableLength(10); } catch (e) {}
    let v78;
    try { v78 = builder.addImportedGlobal("q", "base", kWasmI32); } catch (e) {}
    let g = v78;
    const v87 = [f?.mul?.index,f?.add?.index,f?.sub?.index,d];
    try { builder.addFunctionTableInit(g, true, v87); } catch (e) {}
    try { builder.addExportOfKind("table", kExternalTable, 0); } catch (e) {}
    const v94 = WebAssembly?.Module;
    let v95;
    try { v95 = builder.toBuffer(); } catch (e) {}
    let v96;
    try { v96 = new v94(v95); } catch (e) {}
    let module = v96;
    for (let i99 = 0; i99 < 5; i99++) {
        const v106 = " base = " + i99;
        try { f0(v106); } catch (e) {}
        const v108 = WebAssembly?.Instance;
        const v109 = { base: i99, js_div: js_div };
        const v110 = { q: v109 };
        let v111;
        try { v111 = new v108(module, v110); } catch (e) {}
        let instance = v111;
        main = instance?.exports?.main;
        let table = instance?.exports?.table;
        const v120 = table instanceof WebAssembly?.Table;
        try { f0(v120); } catch (e) {}
        const v123 = table?.length;
        try { f0(10, v123); } catch (e) {}
        for (let i126 = 0; i126 < i99; i126++) {
            let v132;
            try { v132 = table.get(i126); } catch (e) {}
            try { f0(null, v132); } catch (e) {}
        }
        const v135 = i99 + 0;
        let v136;
        try { v136 = table.get(v135); } catch (e) {}
        let mul = v136;
        const v139 = i99 + 1;
        let v140;
        try { v140 = table.get(v139); } catch (e) {}
        let add = v140;
        const v143 = i99 + 2;
        let v144;
        try { v144 = table.get(v143); } catch (e) {}
        let sub = v144;
        const v147 = "  mul=" + mul;
        try { f0(v147); } catch (e) {}
        const v150 = "  add=" + add;
        try { f0(v150); } catch (e) {}
        const v153 = "  sub=" + sub;
        try { f0(v153); } catch (e) {}
        const v156 = typeof mul;
        try { f0("function", v156); } catch (e) {}
        const v159 = typeof add;
        try { f0("function", v159); } catch (e) {}
        const v162 = typeof sub;
        try { f0("function", v162); } catch (e) {}
        const v165 = mul?.length;
        try { f0(2, v165); } catch (e) {}
        const v168 = add?.length;
        try { f0(2, v168); } catch (e) {}
        const v171 = sub?.length;
        try { f0(2, v171); } catch (e) {}
        const v174 = f?.add?.index;
        let v176;
        try { v176 = String(v174); } catch (e) {}
        const v177 = add?.name;
        try { f0(v176, v177); } catch (e) {}
        const v180 = i99 + 3;
        let v181;
        try { v181 = table.get(v180); } catch (e) {}
        let exp_div = v181;
        const v184 = typeof exp_div;
        try { f0("function", v184); } catch (e) {}
        const v187 = "  js_div=" + exp_div;
        try { f0(v187); } catch (e) {}
        const v189 = js_div == exp_div;
        try { f0(v189); } catch (e) {}
        for (let i193 = i99 + 4; i193 < 10; i193++) {
            let v200;
            try { v200 = table.get(i193); } catch (e) {}
            try { f0(null, v200); } catch (e) {}
        }
        const v203 = -33;
        const v205 = -11;
        let v207;
        try { v207 = mul(v205, 3); } catch (e) {}
        try { f0(v203, v207); } catch (e) {}
        let v212;
        try { v212 = add(3333333, 1111111); } catch (e) {}
        try { f0(4444444, v212); } catch (e) {}
        const v215 = -9999;
        let v218;
        try { v218 = sub(1, 10000); } catch (e) {}
        try { f0(v215, v218); } catch (e) {}
        const v221 = -44;
        const v223 = -88.1;
        let v225;
        try { v225 = exp_div(v223, 2); } catch (e) {}
        try { f0(v221, v225); } catch (e) {}
    }
}
try { ExportedTableTest(); } catch (e) {}
function ImportedTableTest() {
    let kTableSize = 10;
    try { f0("ImportedTableTest..."); } catch (e) {}
    let v234;
    try { v234 = new WasmModuleBuilder(); } catch (e) {}
    var builder = v234;
    let v239;
    try { v239 = builder.addImport("q", "js_div", kSig_i_ii); } catch (e) {}
    let d = v239;
    let v241;
    try { v241 = AddFunctions(builder); } catch (e) {}
    let f = v241;
    try { builder.setFunctionTableLength(kTableSize); } catch (e) {}
    let v247;
    try { v247 = builder.addImportedGlobal("q", "base", kWasmI32); } catch (e) {}
    let g = v247;
    const v256 = [f?.mul?.index,f?.add?.index,f?.sub?.index,d];
    try { builder.addFunctionTableInit(g, true, v256); } catch (e) {}
    try { builder.addExportOfKind("table", kExternalTable, 0); } catch (e) {}
    const v263 = WebAssembly?.Module;
    let v264;
    try { v264 = builder.toBuffer(); } catch (e) {}
    let v265;
    try { v265 = new v263(v264); } catch (e) {}
    let m1 = v265;
    let v267;
    try { v267 = new WasmModuleBuilder(); } catch (e) {}
    var builder = v267;
    try { builder.addImportedTable("r", "table", kTableSize, kTableSize); } catch (e) {}
    const v281 = [kExprI32Const,33,kExprGetLocal,0,kExprGetLocal,1,kExprCallIndirect,0,kTableZero];
    let v283;
    try { v283 = builder.addFunction("main", kSig_i_ii); } catch (e) {}
    let v284;
    try { v284 = v283.addBody(v281); } catch (e) {}
    try { v284.exportAs("main"); } catch (e) {}
    const v286 = WebAssembly?.Module;
    let v287;
    try { v287 = builder.toBuffer(); } catch (e) {}
    let v288;
    try { v288 = new v286(v287); } catch (e) {}
    let m2 = v288;
    for (let i291 = 0; i291 < 5; i291++) {
        const v298 = " base = " + i291;
        try { f0(v298); } catch (e) {}
        const v300 = WebAssembly?.Instance;
        const v301 = { base: i291, js_div: js_div };
        const v302 = { q: v301 };
        let v303;
        try { v303 = new v300(m1, v302); } catch (e) {}
        let i1 = v303;
        let table = i1?.exports?.table;
        const v309 = table?.length;
        try { f0(10, v309); } catch (e) {}
        const v311 = WebAssembly?.Instance;
        const v312 = { table: table };
        const v313 = { r: v312 };
        let v314;
        try { v314 = new v311(m2, v313); } catch (e) {}
        let i2 = v314;
        let main = i2?.exports?.main;
        for (let i320 = 0; i320 < i291; i320++) {
            const v325 = () => {
                let v327;
                try { v327 = main(0, i320); } catch (e) {}
                return v327;
            };
            try { f0(v325); } catch (e) {}
            let v330;
            try { v330 = table.get(i320); } catch (e) {}
            try { f0(null, v330); } catch (e) {}
        }
        const v334 = i291 + 0;
        let v335;
        try { v335 = table.get(v334); } catch (e) {}
        const v336 = typeof v335;
        try { f0("function", v336); } catch (e) {}
        const v341 = i291 + 0;
        let v342;
        try { v342 = main(0, v341); } catch (e) {}
        try { f0(0, v342); } catch (e) {}
        const v347 = i291 + 0;
        let v348;
        try { v348 = main(2, v347); } catch (e) {}
        try { f0(66, v348); } catch (e) {}
        const v352 = i291 + 1;
        let v353;
        try { v353 = table.get(v352); } catch (e) {}
        const v354 = typeof v353;
        try { f0("function", v354); } catch (e) {}
        const v359 = i291 + 1;
        let v360;
        try { v360 = main(0, v359); } catch (e) {}
        try { f0(33, v360); } catch (e) {}
        const v365 = i291 + 1;
        let v366;
        try { v366 = main(5, v365); } catch (e) {}
        try { f0(38, v366); } catch (e) {}
        const v370 = i291 + 2;
        let v371;
        try { v371 = table.get(v370); } catch (e) {}
        const v372 = typeof v371;
        try { f0("function", v372); } catch (e) {}
        const v377 = i291 + 2;
        let v378;
        try { v378 = main(1, v377); } catch (e) {}
        try { f0(32, v378); } catch (e) {}
        const v383 = i291 + 2;
        let v384;
        try { v384 = main(5, v383); } catch (e) {}
        try { f0(28, v384); } catch (e) {}
        const v388 = i291 + 3;
        let v389;
        try { v389 = table.get(v388); } catch (e) {}
        const v390 = typeof v389;
        try { f0("function", v390); } catch (e) {}
        const v395 = i291 + 3;
        let v396;
        try { v396 = main(4, v395); } catch (e) {}
        try { f0(8, v396); } catch (e) {}
        const v401 = i291 + 3;
        let v402;
        try { v402 = main(11, v401); } catch (e) {}
        try { f0(3, v402); } catch (e) {}
        for (let i406 = i291 + 4; i406 < (kTableSize + 5); i406++) {
            const v413 = (a414) => {
                let v416;
                try { v416 = main(0, i406); } catch (e) {}
                return v416;
            };
            try { f0(v413); } catch (e) {}
            if (i406 < kTableSize) {
                let v420;
                try { v420 = table.get(i406); } catch (e) {}
                try { f0(null, v420); } catch (e) {}
            }
        }
    }
}
try { ImportedTableTest(); } catch (e) {}
function ImportedTableTest() {
    let kTableSize = 10;
    f0("ManualTableTest...");
    let v429;
    try { v429 = new WasmModuleBuilder(); } catch (e) {}
    var builder = v429;
    let v434;
    try { v434 = builder.addImport("q", "js_div", kSig_i_ii); } catch (e) {}
    let d = v434;
    try { builder.addImportedTable("q", "table", kTableSize, kTableSize); } catch (e) {}
    let v442;
    try { v442 = builder.addImportedGlobal("q", "base", kWasmI32); } catch (e) {}
    let g = v442;
    let v444;
    try { v444 = AddFunctions(builder); } catch (e) {}
    let f = v444;
    const v453 = [f?.mul?.index,f?.add?.index,f?.sub?.index,d];
    try { builder.addFunctionTableInit(g, true, v453); } catch (e) {}
    const v464 = [kExprI32Const,55,kExprGetLocal,0,kExprGetLocal,1,kExprCallIndirect,0,kTableZero];
    let v466;
    try { v466 = builder.addFunction("main", kSig_i_ii); } catch (e) {}
    let v467;
    try { v467 = v466.addBody(v464); } catch (e) {}
    try { v467.exportAs("main"); } catch (e) {}
    const v470 = WebAssembly?.Module;
    let v471;
    try { v471 = builder.toBuffer(); } catch (e) {}
    let v472;
    try { v472 = new v470(v471); } catch (e) {}
    let m2 = v472;
    for (let i475 = 0; i475 < 5; i475++) {
        const v482 = " base = " + i475;
        try { f0(v482); } catch (e) {}
        const v484 = WebAssembly?.Table;
        const v486 = { element: "anyfunc", initial: kTableSize, maximum: kTableSize };
        let v487;
        try { v487 = new v484(v486); } catch (e) {}
        let table = v487;
        const v490 = table?.length;
        try { f0(10, v490); } catch (e) {}
        const v492 = WebAssembly?.Instance;
        const v493 = { base: i475, table: table, js_div: js_div };
        const v494 = { q: v493 };
        let v495;
        try { v495 = new v492(m2, v494); } catch (e) {}
        let i2 = v495;
        let main = i2?.exports?.main;
        for (let i501 = 0; i501 < i475; i501++) {
            const v506 = () => {
                let v508;
                try { v508 = main(0, i501); } catch (e) {}
                return v508;
            };
            try { f0(v506); } catch (e) {}
            let v511;
            try { v511 = table.get(i501); } catch (e) {}
            try { f0(null, v511); } catch (e) {}
        }
        const v515 = i475 + 0;
        let v516;
        try { v516 = table.get(v515); } catch (e) {}
        const v517 = typeof v516;
        try { f0("function", v517); } catch (e) {}
        const v522 = i475 + 0;
        let v523;
        try { v523 = main(0, v522); } catch (e) {}
        try { f0(0, v523); } catch (e) {}
        const v528 = i475 + 0;
        let v529;
        try { v529 = main(2, v528); } catch (e) {}
        try { f0(110, v529); } catch (e) {}
        const v533 = i475 + 1;
        let v534;
        try { v534 = table.get(v533); } catch (e) {}
        const v535 = typeof v534;
        try { f0("function", v535); } catch (e) {}
        const v540 = i475 + 1;
        let v541;
        try { v541 = main(0, v540); } catch (e) {}
        try { f0(55, v541); } catch (e) {}
        const v546 = i475 + 1;
        let v547;
        try { v547 = main(5, v546); } catch (e) {}
        try { f0(60, v547); } catch (e) {}
        const v551 = i475 + 2;
        let v552;
        try { v552 = table.get(v551); } catch (e) {}
        const v553 = typeof v552;
        try { f0("function", v553); } catch (e) {}
        const v558 = i475 + 2;
        let v559;
        try { v559 = main(1, v558); } catch (e) {}
        try { f0(54, v559); } catch (e) {}
        const v564 = i475 + 2;
        let v565;
        try { v565 = main(5, v564); } catch (e) {}
        try { f0(50, v565); } catch (e) {}
        const v569 = i475 + 3;
        let v570;
        try { v570 = table.get(v569); } catch (e) {}
        const v571 = typeof v570;
        try { f0("function", v571); } catch (e) {}
        const v576 = i475 + 3;
        let v577;
        try { v577 = main(4, v576); } catch (e) {}
        try { f0(13, v577); } catch (e) {}
        const v582 = i475 + 3;
        let v583;
        try { v583 = main(11, v582); } catch (e) {}
        try { f0(5, v583); } catch (e) {}
        for (let i587 = i475 + 4; i587 < (kTableSize + 5); i587++) {
            const v594 = (a595) => {
                let v597;
                try { v597 = main(0, i587); } catch (e) {}
                return v597;
            };
            try { f0(v594); } catch (e) {}
            if (i587 < kTableSize) {
                let v601;
                try { v601 = table.get(i587); } catch (e) {}
                try { f0(null, v601); } catch (e) {}
            }
        }
    }
}
try { ImportedTableTest(); } catch (e) {}
function CumulativeTest() {
    f0("CumulativeTest...");
    let kTableSize = 10;
    const v610 = WebAssembly.Table;
    const v613 = new v610({ element: "anyfunc", initial: kTableSize, maximum: kTableSize });
    let table = v613;
    let v616;
    try { v616 = new WasmModuleBuilder(); } catch (e) {}
    var builder = v616;
    try { builder.addImportedTable("x", "table", kTableSize, kTableSize); } catch (e) {}
    let v624;
    try { v624 = builder.addImportedGlobal("x", "base", kWasmI32); } catch (e) {}
    let g = v624;
    let v627;
    try { v627 = builder.addType(kSig_i_v); } catch (e) {}
    let sig_index = v627;
    const v630 = [kExprGetGlobal,g];
    let v632;
    try { v632 = builder.addFunction("g", sig_index); } catch (e) {}
    try { v632.addBody(v630); } catch (e) {}
    const v639 = [kExprGetLocal,0,kExprCallIndirect,sig_index,kTableZero];
    let v642;
    try { v642 = builder.addFunction("main", kSig_i_ii); } catch (e) {}
    let v643;
    try { v643 = v642.addBody(v639); } catch (e) {}
    try { v643.exportAs("main"); } catch (e) {}
    const v646 = [g];
    try { builder.addFunctionTableInit(g, true, v646); } catch (e) {}
    const v648 = WebAssembly?.Module;
    let v649;
    try { v649 = builder.toBuffer(); } catch (e) {}
    let v650;
    try { v650 = new v648(v649); } catch (e) {}
    let module = v650;
    for (let i653 = 0; i653 < kTableSize; i653++) {
        const v659 = " base = " + i653;
        try { f0(v659); } catch (e) {}
        const v661 = WebAssembly?.Instance;
        const v662 = { base: i653, table: table };
        const v663 = { x: v662 };
        let v664;
        try { v664 = new v661(module, v663); } catch (e) {}
        let instance = v664;
        for (let i667 = 0; i667 < kTableSize; i667++) {
            let v672;
            try { v672 = table.get(i667); } catch (e) {}
            let func = v672;
            if (i667 > i653) {
                try { f0(null, func); } catch (e) {}
                const v678 = () => {
                    const v679 = instance?.exports;
                    let v680;
                    try { v680 = v679.main(i667); } catch (e) {}
                    return v680;
                };
                try { f0(kTrapFuncSigMismatch, v678); } catch (e) {}
            } else {
                const v683 = typeof func;
                try { f0("function", v683); } catch (e) {}
                let v685;
                try { v685 = func(); } catch (e) {}
                try { f0(i667, v685); } catch (e) {}
                const v687 = instance?.exports;
                let v688;
                try { v688 = v687.main(i667); } catch (e) {}
                try { f0(i667, v688); } catch (e) {}
            }
        }
    }
}
try { CumulativeTest(); } catch (e) {}
function TwoWayTest() {
    f0("TwoWayTest...");
    let kTableSize = 3;
    let v697;
    try { v697 = new WasmModuleBuilder(); } catch (e) {}
    var builder = v697;
    try { builder.addType(kSig_i_i); } catch (e) {}
    try { builder.addType(kSig_i_ii); } catch (e) {}
    let v704;
    try { v704 = builder.addType(kSig_i_v); } catch (e) {}
    var sig_index1 = v704;
    const v708 = [kExprI32Const,11];
    let v710;
    try { v710 = builder.addFunction("f1", sig_index1); } catch (e) {}
    let v711;
    try { v711 = v710.addBody(v708); } catch (e) {}
    var f1 = v711;
    const v718 = [kExprGetLocal,0,kExprCallIndirect,sig_index1,kTableZero];
    let v720;
    try { v720 = builder.addFunction("main", kSig_i_ii); } catch (e) {}
    let v721;
    try { v721 = v720.addBody(v718); } catch (e) {}
    try { v721.exportAs("main"); } catch (e) {}
    try { builder.setFunctionTableLength(kTableSize); } catch (e) {}
    const v727 = [f1?.index];
    try { builder.addFunctionTableInit(0, false, v727); } catch (e) {}
    try { builder.addExportOfKind("table", kExternalTable, 0); } catch (e) {}
    const v734 = WebAssembly?.Module;
    let v735;
    try { v735 = builder.toBuffer(); } catch (e) {}
    let v736;
    try { v736 = new v734(v735); } catch (e) {}
    var m1 = v736;
    let v738;
    try { v738 = new WasmModuleBuilder(); } catch (e) {}
    var builder = v738;
    try { builder.addType(kSig_i_ii); } catch (e) {}
    let v741;
    try { v741 = builder.addType(kSig_i_v); } catch (e) {}
    var sig_index2 = v741;
    const v744 = [kExprI32Const,22];
    let v746;
    try { v746 = builder.addFunction("f2", sig_index2); } catch (e) {}
    let v747;
    try { v747 = v746.addBody(v744); } catch (e) {}
    var f2 = v747;
    const v751 = [kExprGetLocal,0,kExprCallIndirect,sig_index2,kTableZero];
    let v753;
    try { v753 = builder.addFunction("main", kSig_i_ii); } catch (e) {}
    let v754;
    try { v754 = v753.addBody(v751); } catch (e) {}
    try { v754.exportAs("main"); } catch (e) {}
    try { builder.addImportedTable("z", "table", kTableSize, kTableSize); } catch (e) {}
    const v762 = [f2?.index];
    try { builder.addFunctionTableInit(1, false, v762, true); } catch (e) {}
    const v765 = WebAssembly?.Module;
    let v766;
    try { v766 = builder.toBuffer(); } catch (e) {}
    let v767;
    try { v767 = new v765(v766); } catch (e) {}
    var m2 = v767;
    const v769 = sig_index1 == sig_index2;
    try { f0(v769); } catch (e) {}
    const v771 = WebAssembly?.Instance;
    let v772;
    try { v772 = new v771(m1); } catch (e) {}
    var i1 = v772;
    const v774 = WebAssembly?.Instance;
    const v776 = i1?.exports?.table;
    const v777 = { table: v776 };
    const v778 = { z: v777 };
    let v779;
    try { v779 = new v774(m2, v778); } catch (e) {}
    var i2 = v779;
    const v783 = i1?.exports;
    let v784;
    try { v784 = v783.main(0); } catch (e) {}
    try { f0(11, v784); } catch (e) {}
    const v788 = i2?.exports;
    let v789;
    try { v789 = v788.main(0); } catch (e) {}
    try { f0(11, v789); } catch (e) {}
    const v793 = i1?.exports;
    let v794;
    try { v794 = v793.main(1); } catch (e) {}
    try { f0(22, v794); } catch (e) {}
    const v798 = i2?.exports;
    let v799;
    try { v799 = v798.main(1); } catch (e) {}
    try { f0(22, v799); } catch (e) {}
    const v801 = () => {
        const v803 = i1?.exports;
        let v804;
        try { v804 = v803.main(2); } catch (e) {}
        return v804;
    };
    try { f0(v801); } catch (e) {}
    const v806 = () => {
        const v808 = i2?.exports;
        let v809;
        try { v809 = v808.main(2); } catch (e) {}
        return v809;
    };
    try { f0(v806); } catch (e) {}
    const v811 = () => {
        const v813 = i1?.exports;
        let v814;
        try { v814 = v813.main(3); } catch (e) {}
        return v814;
    };
    try { f0(v811); } catch (e) {}
    const v816 = () => {
        const v818 = i2?.exports;
        let v819;
        try { v819 = v818.main(3); } catch (e) {}
        return v819;
    };
    try { f0(v816); } catch (e) {}
}
try { TwoWayTest(); } catch (e) {}
function MismatchedTableSize() {
    f0("MismatchedTableSize...");
    let kTableSize = 5;
    for (let i828 = 1; i828 < 4; i828++) {
        for (let i835 = 1; i835 < 4; i835++) {
            f0(((" expsize = " + i828) + ", impsize = ") + i835);
            let v848;
            try { v848 = new WasmModuleBuilder(); } catch (e) {}
            var builder = v848;
            try { builder.setFunctionTableLength(i828); } catch (e) {}
            try { builder.addExportOfKind("expfoo", kExternalTable, 0); } catch (e) {}
            const v856 = WebAssembly?.Module;
            let v857;
            try { v857 = builder.toBuffer(); } catch (e) {}
            let v858;
            try { v858 = new v856(v857); } catch (e) {}
            let m1 = v858;
            let v860;
            try { v860 = new WasmModuleBuilder(); } catch (e) {}
            var builder = v860;
            try { builder.addImportedTable("y", "impfoo", i835, i835); } catch (e) {}
            const v865 = WebAssembly?.Module;
            let v866;
            try { v866 = builder.toBuffer(); } catch (e) {}
            let v867;
            try { v867 = new v865(v866); } catch (e) {}
            let m2 = v867;
            const v869 = WebAssembly?.Instance;
            let v870;
            try { v870 = new v869(m1); } catch (e) {}
            var i1 = v870;
            const v873 = i1?.exports?.expfoo;
            const v874 = { impfoo: v873 };
            var ffi = { y: v874 };
            if (i828 == i835) {
                const v878 = WebAssembly?.Instance;
                let v879;
                try { v879 = new v878(m2, ffi); } catch (e) {}
                var i2 = v879;
            } else {
                const v881 = () => {
                    const v882 = WebAssembly?.Instance;
                    let v883;
                    try { v883 = new v882(m2, ffi); } catch (e) {}
                    return v883;
                };
                try { f0(v881); } catch (e) {}
            }
        }
    }
}
try { MismatchedTableSize(); } catch (e) {}
function TableGrowBoundsCheck() {
    f0("TableGrowBoundsCheck");
    var kMaxSize = 30;
    var kInitSize = 5;
    const v894 = WebAssembly.Table;
    const v897 = new v894({ element: "anyfunc", initial: kInitSize, maximum: kMaxSize });
    let table = v897;
    let v900;
    try { v900 = new WasmModuleBuilder(); } catch (e) {}
    var builder = v900;
    try { builder.addImportedTable("x", "table", kInitSize, kMaxSize); } catch (e) {}
    const v905 = WebAssembly?.Module;
    let v906;
    try { v906 = builder.toBuffer(); } catch (e) {}
    let v907;
    try { v907 = new v905(v906); } catch (e) {}
    let module = v907;
    const v909 = WebAssembly?.Instance;
    const v911 = { base: 1, table: table };
    const v912 = { x: v911 };
    let v913;
    try { v913 = new v909(module, v912); } catch (e) {}
    let instance = v913;
    for (let i915 = kInitSize; i915 < kMaxSize; i915 += 5) {
        const v920 = table?.length;
        try { f0(i915, v920); } catch (e) {}
        for (let i923 = 0; i923 < i915; i923++) {
            try { table.set(i923, null); } catch (e) {}
        }
        for (let i931 = 0; i931 < i915; i931++) {
            let v937;
            try { v937 = table.get(i931); } catch (e) {}
            try { f0(null, v937); } catch (e) {}
        }
        const v939 = () => {
            let v941;
            try { v941 = table.set(i915, null); } catch (e) {}
            return v941;
        };
        try { f0(v939); } catch (e) {}
        const v943 = () => {
            let v944;
            try { v944 = table.get(i915); } catch (e) {}
            return v944;
        };
        try { f0(v943); } catch (e) {}
        let v947;
        try { v947 = table.grow(5); } catch (e) {}
        try { f0(i915, v947); } catch (e) {}
    }
    const v950 = table?.length;
    try { f0(30, v950); } catch (e) {}
    const v952 = () => {
        let v954;
        try { v954 = table.grow(1); } catch (e) {}
        return v954;
    };
    try { f0(v952); } catch (e) {}
    const v956 = () => {
        let v958;
        try { v958 = table.set(kMaxSize, null); } catch (e) {}
        return v958;
    };
    try { f0(v956); } catch (e) {}
    const v960 = () => {
        let v961;
        try { v961 = table.get(kMaxSize); } catch (e) {}
        return v961;
    };
    try { f0(v960); } catch (e) {}
}
try { TableGrowBoundsCheck(); } catch (e) {}
function CumulativeGrowTest() {
    f0("CumulativeGrowTest...");
    const v968 = WebAssembly.Table;
    const v973 = new v968({ element: "anyfunc", initial: 10, maximum: 30 });
    let table = v973;
    let v976;
    try { v976 = new WasmModuleBuilder(); } catch (e) {}
    var builder = v976;
    try { builder.addImportedTable("x", "table", 10, 30); } catch (e) {}
    let v986;
    try { v986 = builder.addImportedGlobal("x", "base", kWasmI32); } catch (e) {}
    let g = v986;
    let v989;
    try { v989 = builder.addType(kSig_i_v); } catch (e) {}
    let sig_index = v989;
    const v992 = [kExprGetGlobal,g];
    let v994;
    try { v994 = builder.addFunction("g", sig_index); } catch (e) {}
    try { v994.addBody(v992); } catch (e) {}
    const v1001 = [kExprGetLocal,0,kExprCallIndirect,sig_index,kTableZero];
    let v1004;
    try { v1004 = builder.addFunction("main", kSig_i_ii); } catch (e) {}
    let v1005;
    try { v1005 = v1004.addBody(v1001); } catch (e) {}
    try { v1005.exportAs("main"); } catch (e) {}
    const v1008 = [g];
    try { builder.addFunctionTableInit(g, true, v1008); } catch (e) {}
    const v1010 = WebAssembly?.Module;
    let v1011;
    try { v1011 = builder.toBuffer(); } catch (e) {}
    let v1012;
    try { v1012 = new v1010(v1011); } catch (e) {}
    let module = v1012;
    var instances = [];
    for (let i1017 = 0; i1017 < 10; i1017++) {
        const v1024 = " base = " + i1017;
        try { f0(v1024); } catch (e) {}
        const v1026 = WebAssembly?.Instance;
        const v1027 = { base: i1017, table: table };
        const v1028 = { x: v1027 };
        let v1029;
        try { v1029 = new v1026(module, v1028); } catch (e) {}
        try { instances.push(v1029); } catch (e) {}
    }
    for (let i1032 = 0; i1032 < 10; i1032++) {
        let v1038;
        try { v1038 = table.get(i1032); } catch (e) {}
        let func = v1038;
        const v1041 = typeof func;
        try { f0("function", v1041); } catch (e) {}
        let v1043;
        try { v1043 = func(); } catch (e) {}
        try { f0(i1032, v1043); } catch (e) {}
        const v1046 = instances?.[instances]?.exports;
        let v1047;
        try { v1047 = v1046.main(i1032); } catch (e) {}
        try { f0(i1032, v1047); } catch (e) {}
    }
    let v1051;
    try { v1051 = table.grow(10); } catch (e) {}
    try { f0(10, v1051); } catch (e) {}
    for (let i1054 = 0; i1054 < 10; i1054++) {
        let v1060;
        try { v1060 = table.get(i1054); } catch (e) {}
        let func = v1060;
        const v1063 = typeof func;
        try { f0("function", v1063); } catch (e) {}
        let v1065;
        try { v1065 = func(); } catch (e) {}
        try { f0(i1054, v1065); } catch (e) {}
        const v1068 = instances?.[instances]?.exports;
        let v1069;
        try { v1069 = v1068.main(i1054); } catch (e) {}
        try { f0(i1054, v1069); } catch (e) {}
    }
    let v1071;
    try { v1071 = new WasmModuleBuilder(); } catch (e) {}
    let new_builder = v1071;
    const v1074 = [];
    let v1077;
    try { v1077 = new_builder.addFunction("", kSig_v_v); } catch (e) {}
    let v1078;
    try { v1078 = v1077.addBody(v1074); } catch (e) {}
    try { new_builder.addExport("wasm", v1078); } catch (e) {}
    try { new_builder.addImportedTable("x", "table", 20, 30); } catch (e) {}
    const v1085 = WebAssembly?.Module;
    let v1086;
    try { v1086 = new_builder.toBuffer(); } catch (e) {}
    let v1087;
    try { v1087 = new v1085(v1086); } catch (e) {}
    let new_module = v1087;
    const v1089 = WebAssembly?.Instance;
    const v1090 = { table: table };
    const v1091 = { x: v1090 };
    let v1092;
    try { v1092 = new v1089(new_module, v1091); } catch (e) {}
    let instance = v1092;
    let new_func = instance?.exports?.wasm;
    for (let i1098 = 10; i1098 < 20; i1098++) {
        try { table.set(i1098, new_func); } catch (e) {}
        let v1105;
        try { v1105 = table.get(i1098); } catch (e) {}
        let func = v1105;
        const v1108 = typeof func;
        try { f0("function", v1108); } catch (e) {}
        let v1110;
        try { v1110 = table.get(i1098); } catch (e) {}
        try { f0(new_func, v1110); } catch (e) {}
    }
    const v1112 = () => {
        let v1114;
        try { v1114 = table.grow(11); } catch (e) {}
        return v1114;
    };
    try { f0(v1112); } catch (e) {}
}
try { CumulativeGrowTest(); } catch (e) {}
function TestImportTooLarge() {
    f0("TestImportTooLarge...");
    let v1121;
    try { v1121 = new WasmModuleBuilder(); } catch (e) {}
    let builder = v1121;
    try { builder.addImportedTable("t", "t", 1, 2); } catch (e) {}
    const v1128 = () => {
        const v1130 = WebAssembly?.Table;
        const v1134 = { element: "anyfunc", initial: 3, maximum: 3 };
        let v1135;
        try { v1135 = new v1130(v1134); } catch (e) {}
        const v1136 = { t: v1135 };
        const v1137 = { t: v1136 };
        let v1138;
        try { v1138 = builder.instantiate(v1137); } catch (e) {}
        return v1138;
    };
    try { f0(v1128); } catch (e) {}
    const v1140 = () => {
        const v1142 = WebAssembly?.Table;
        const v1146 = { element: "anyfunc", initial: 1, maximum: 4 };
        let v1147;
        try { v1147 = new v1142(v1146); } catch (e) {}
        const v1148 = { t: v1147 };
        const v1149 = { t: v1148 };
        let v1150;
        try { v1150 = builder.instantiate(v1149); } catch (e) {}
        return v1150;
    };
    try { f0(v1140); } catch (e) {}
    const v1152 = () => {
        const v1154 = WebAssembly?.Table;
        const v1157 = { element: "anyfunc", initial: 1 };
        let v1158;
        try { v1158 = new v1154(v1157); } catch (e) {}
        const v1159 = { t: v1158 };
        const v1160 = { t: v1159 };
        let v1161;
        try { v1161 = builder.instantiate(v1160); } catch (e) {}
        return v1161;
    };
    try { f0(v1152); } catch (e) {}
}
try { TestImportTooLarge(); } catch (e) {}
function TableImportLargerThanCompiled() {
    f0("TableImportLargerThanCompiled...");
    var kMaxSize = 30;
    var kInitSize = 5;
    let v1172;
    try { v1172 = new WasmModuleBuilder(); } catch (e) {}
    var builder = v1172;
    try { builder.addImportedTable("x", "table", 1, 35); } catch (e) {}
    const v1180 = WebAssembly?.Table;
    const v1182 = { element: "anyfunc", initial: kInitSize, maximum: kMaxSize };
    let v1183;
    try { v1183 = new v1180(v1182); } catch (e) {}
    let table = v1183;
    const v1185 = WebAssembly?.Module;
    let v1186;
    try { v1186 = builder.toBuffer(); } catch (e) {}
    let v1187;
    try { v1187 = new v1185(v1186); } catch (e) {}
    let module = v1187;
    const v1189 = WebAssembly?.Instance;
    const v1191 = { base: 1, table: table };
    const v1192 = { x: v1191 };
    let v1193;
    try { v1193 = new v1189(module, v1192); } catch (e) {}
    let instance = v1193;
    for (let i1196 = 0; i1196 < kInitSize; ++i1196) {
        try { table.set(i1196, null); } catch (e) {}
    }
    for (let i1204 = 0; i1204 < kInitSize; ++i1204) {
        let v1210;
        try { v1210 = table.get(i1204); } catch (e) {}
        try { f0(null, v1210); } catch (e) {}
    }
    const v1212 = () => {
        let v1214;
        try { v1214 = table.set(kInitSize, null); } catch (e) {}
        return v1214;
    };
    try { f0(v1212); } catch (e) {}
}
try { TableImportLargerThanCompiled(); } catch (e) {}
function ModulesShareTableAndGrow() {
    f0("ModulesShareTableAndGrow...");
    const v1220 = () => {
        let v1222;
        try { v1222 = new WasmModuleBuilder(); } catch (e) {}
        let builder = v1222;
        try { builder.addImportedTable("x", "table", 1, 35); } catch (e) {}
        const v1230 = WebAssembly?.Module;
        let v1231;
        try { v1231 = builder.toBuffer(); } catch (e) {}
        let v1232;
        try { v1232 = new v1230(v1231); } catch (e) {}
        return v1232;
    };
    let v1233;
    try { v1233 = v1220(); } catch (e) {}
    let module1 = v1233;
    const v1235 = () => {
        let v1237;
        try { v1237 = new WasmModuleBuilder(); } catch (e) {}
        let builder = v1237;
        try { builder.addImportedTable("x", "table", 2, 40); } catch (e) {}
        const v1245 = WebAssembly?.Module;
        let v1246;
        try { v1246 = builder.toBuffer(); } catch (e) {}
        let v1247;
        try { v1247 = new v1245(v1246); } catch (e) {}
        return v1247;
    };
    let v1248;
    try { v1248 = v1235(); } catch (e) {}
    let module2 = v1248;
    var kMaxSize = 30;
    var kInitSize = 5;
    const v1255 = WebAssembly.Table;
    const v1258 = new v1255({ element: "anyfunc", initial: kInitSize, maximum: kMaxSize });
    let table = v1258;
    const v1260 = WebAssembly.Instance;
    const v1262 = { base: 1, table: table };
    const v1263 = { x: v1262 };
    let v1264;
    try { v1264 = new v1260(module1, v1263); } catch (e) {}
    let instance1 = v1264;
    const v1266 = WebAssembly.Instance;
    const v1268 = { base: 1, table: table };
    const v1269 = { x: v1268 };
    let v1270;
    try { v1270 = new v1266(module2, v1269); } catch (e) {}
    let instance2 = v1270;
    for (let i1273 = 0; i1273 < kInitSize; ++i1273) {
        table.set(i1273, null);
    }
    for (let i1281 = 0; i1281 < kInitSize; ++i1281) {
        f0(null, table.get(i1281));
    }
    const v1289 = () => {
        let v1291;
        try { v1291 = table.set(kInitSize, null); } catch (e) {}
        return v1291;
    };
    f0(v1289);
    f0(kInitSize, table.grow(5));
    for (let i1297 = 0; i1297 < (2 * kInitSize); ++i1297) {
        table.set(i1297, null);
    }
    for (let i1307 = 0; i1307 < (2 * kInitSize); ++i1307) {
        f0(null, table.get(i1307));
    }
    const v1317 = () => {
        const v1319 = 2 * kInitSize;
        let v1321;
        try { v1321 = table.set(v1319, null); } catch (e) {}
        return v1321;
    };
    f0(v1317);
    const v1323 = () => {
        let v1325;
        try { v1325 = table.grow(21); } catch (e) {}
        return v1325;
    };
    f0(v1323);
}
ModulesShareTableAndGrow();
function InitImportedTableSignatureMismatch() {
    let v1330;
    try { v1330 = new WasmModuleBuilder(); } catch (e) {}
    let builder0 = v1330;
    try { builder0.setName("module_0"); } catch (e) {}
    let v1335;
    try { v1335 = builder0.addType(kSig_i_v); } catch (e) {}
    let sig_index = v1335;
    const v1342 = [kExprGetLocal,0,kExprCallIndirect,sig_index,kTableZero];
    let v1345;
    try { v1345 = builder0.addFunction("main", kSig_i_i); } catch (e) {}
    let v1346;
    try { v1346 = v1345.addBody(v1342); } catch (e) {}
    try { v1346.exportAs("main"); } catch (e) {}
    try { builder0.setFunctionTableLength(3); } catch (e) {}
    try { builder0.addExportOfKind("table", kExternalTable); } catch (e) {}
    const v1354 = WebAssembly?.Module;
    let v1355;
    try { v1355 = builder0.toBuffer(); } catch (e) {}
    let v1356;
    try { v1356 = new v1354(v1355); } catch (e) {}
    let module0 = v1356;
    const v1358 = WebAssembly?.Instance;
    let v1359;
    try { v1359 = new v1358(module0); } catch (e) {}
    let instance0 = v1359;
    let v1361;
    try { v1361 = new WasmModuleBuilder(); } catch (e) {}
    let builder1 = v1361;
    try { builder1.setName("module_1"); } catch (e) {}
    const v1366 = [kExprGetLocal,0];
    let v1368;
    try { v1368 = builder1.addFunction("f", kSig_i_i); } catch (e) {}
    try { v1368.addBody(v1366); } catch (e) {}
    try { builder1.addImportedTable("z", "table"); } catch (e) {}
    const v1376 = [0];
    try { builder1.addFunctionTableInit(0, false, v1376, true); } catch (e) {}
    const v1379 = WebAssembly?.Module;
    let v1380;
    try { v1380 = builder1.toBuffer(); } catch (e) {}
    let v1381;
    try { v1381 = new v1379(v1380); } catch (e) {}
    let module1 = v1381;
    const v1383 = WebAssembly?.Instance;
    const v1385 = instance0?.exports?.table;
    const v1386 = { table: v1385 };
    const v1387 = { z: v1386 };
    let v1388;
    try { v1388 = new v1383(module1, v1387); } catch (e) {}
    let instance1 = v1388;
    const v1390 = () => {
        const v1392 = instance0?.exports;
        let v1393;
        try { v1393 = v1392.main(0); } catch (e) {}
        return v1393;
    };
    const v1394 = WebAssembly?.RuntimeError;
    const v1395 = /signature mismatch/;
    try { f0(v1390, v1394, v1395); } catch (e) {}
}
try { InitImportedTableSignatureMismatch(); } catch (e) {}
