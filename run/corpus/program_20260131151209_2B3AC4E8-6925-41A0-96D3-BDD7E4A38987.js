function f0() {
}
try {
    load("test/mjsunit/wasm/wasm-constants.js");
} catch(e4) {
}
try {
    load("test/mjsunit/wasm/wasm-module-builder.js");
} catch(e8) {
}
function AddFunctions(a10) {
    let v9;
    try {
        v9 = a10.addType(kSig_i_ii);
    } catch(e15) {
    }
    let sig_index = v9;
    const v15 = [kExprGetLocal,0,kExprGetLocal,1,kExprI32Mul];
    let v17;
    try {
        v17 = a10.addFunction("mul", sig_index);
    } catch(e27) {
    }
    let v18;
    try {
        v18 = v17.addBody(v15);
    } catch(e31) {
    }
    let mul = v18;
    const v23 = [kExprGetLocal,0,kExprGetLocal,1,kExprI32Add];
    let v25;
    try {
        v25 = a10.addFunction("add", sig_index);
    } catch(e42) {
    }
    let v26;
    try {
        v26 = v25.addBody(v23);
    } catch(e46) {
    }
    let add = v26;
    const v31 = [kExprGetLocal,0,kExprGetLocal,1,kExprI32Sub];
    let v33;
    try {
        v33 = a10.addFunction("sub", sig_index);
    } catch(e57) {
    }
    let v34;
    try {
        v34 = v33.addBody(v31);
    } catch(e61) {
    }
    let sub = v34;
    return { mul: mul, add: add, sub: sub };
}
function js_div(a65, a66) {
    return (a65 / a66) | 0;
}
function ExportedTableTest() {
    f0("ExportedTableTest...");
    let v47;
    try {
        const v76 = new WasmModuleBuilder();
        v47 = v76;
    } catch(e77) {
    }
    let builder = v47;
    let v52;
    try {
        v52 = builder.addImport("q", "js_div", kSig_i_ii);
    } catch(e85) {
    }
    let d = v52;
    let v54;
    try {
        v54 = AddFunctions(builder);
    } catch(e90) {
    }
    let f = v54;
    const v65 = [kExprI32Const,33,kExprGetLocal,0,kExprGetLocal,1,kExprCallIndirect,0,kTableZero];
    let v67;
    try {
        v67 = builder.addFunction("main", kSig_i_ii);
    } catch(e107) {
    }
    let v68;
    try {
        v68 = v67.addBody(v65);
    } catch(e111) {
    }
    try {
        v68.exportAs("main");
    } catch(e114) {
    }
    const v71 = f?.add;
    try {
        v71.exportAs("blarg");
    } catch(e119) {
    }
    try {
        builder.setFunctionTableLength(10);
    } catch(e122) {
    }
    let v78;
    try {
        v78 = builder.addImportedGlobal("q", "base", kWasmI32);
    } catch(e129) {
    }
    let g = v78;
    const v87 = [f?.mul?.index,f?.add?.index,f?.sub?.index,d];
    try {
        builder.addFunctionTableInit(g, true, v87);
    } catch(e141) {
    }
    try {
        builder.addExportOfKind("table", kExternalTable, 0);
    } catch(e146) {
    }
    const v94 = WebAssembly?.Module;
    let v95;
    try {
        v95 = builder.toBuffer();
    } catch(e153) {
    }
    let v96;
    try {
        const v156 = new v94(v95);
        v96 = v156;
    } catch(e157) {
    }
    let module = v96;
    for (let i160 = 0; i160 < 5; i160++) {
        const v106 = " base = " + i160;
        try {
            f0(v106);
        } catch(e170) {
        }
        const v108 = WebAssembly?.Instance;
        const v109 = { base: i160, js_div: js_div };
        const v110 = { q: v109 };
        let v111;
        try {
            const v179 = new v108(module, v110);
            v111 = v179;
        } catch(e180) {
        }
        let instance = v111;
        main = instance?.exports?.main;
        let table = instance?.exports?.table;
        const v120 = table instanceof WebAssembly?.Table;
        try {
            f0(v120);
        } catch(e192) {
        }
        const v123 = table?.length;
        try {
            f0(10, v123);
        } catch(e197) {
        }
        for (let i199 = 0; i199 < i160; i199++) {
            let v132;
            try {
                v132 = table.get(i199);
            } catch(e207) {
            }
            try {
                f0(null, v132);
            } catch(e210) {
            }
        }
        const v135 = i160 + 0;
        let v136;
        try {
            v136 = table.get(v135);
        } catch(e217) {
        }
        let mul = v136;
        const v139 = i160 + 1;
        let v140;
        try {
            v140 = table.get(v139);
        } catch(e225) {
        }
        let add = v140;
        const v143 = i160 + 2;
        let v144;
        try {
            v144 = table.get(v143);
        } catch(e233) {
        }
        let sub = v144;
        const v147 = "  mul=" + mul;
        try {
            f0(v147);
        } catch(e239) {
        }
        const v150 = "  add=" + add;
        try {
            f0(v150);
        } catch(e244) {
        }
        const v153 = "  sub=" + sub;
        try {
            f0(v153);
        } catch(e249) {
        }
        const v156 = typeof mul;
        try {
            f0("function", v156);
        } catch(e254) {
        }
        const v159 = typeof add;
        try {
            f0("function", v159);
        } catch(e259) {
        }
        const v162 = typeof sub;
        try {
            f0("function", v162);
        } catch(e264) {
        }
        const v165 = mul?.length;
        try {
            f0(2, v165);
        } catch(e269) {
        }
        const v168 = add?.length;
        try {
            f0(2, v168);
        } catch(e274) {
        }
        const v171 = sub?.length;
        try {
            f0(2, v171);
        } catch(e279) {
        }
        const v174 = f?.add?.index;
        let v176;
        try {
            v176 = String(v174);
        } catch(e287) {
        }
        const v177 = add?.name;
        try {
            f0(v176, v177);
        } catch(e291) {
        }
        const v180 = i160 + 3;
        let v181;
        try {
            v181 = table.get(v180);
        } catch(e298) {
        }
        let exp_div = v181;
        const v184 = typeof exp_div;
        try {
            f0("function", v184);
        } catch(e304) {
        }
        const v187 = "  js_div=" + exp_div;
        try {
            f0(v187);
        } catch(e309) {
        }
        const v189 = js_div == exp_div;
        try {
            f0(v189);
        } catch(e313) {
        }
        for (let i316 = i160 + 4; i316 < 10; i316++) {
            let v200;
            try {
                v200 = table.get(i316);
            } catch(e325) {
            }
            try {
                f0(null, v200);
            } catch(e328) {
            }
        }
        const v203 = -33;
        const v205 = -11;
        let v207;
        try {
            v207 = mul(v205, 3);
        } catch(e339) {
        }
        try {
            f0(v203, v207);
        } catch(e341) {
        }
        let v212;
        try {
            v212 = add(3333333, 1111111);
        } catch(e347) {
        }
        try {
            f0(4444444, v212);
        } catch(e350) {
        }
        const v215 = -9999;
        let v218;
        try {
            v218 = sub(1, 10000);
        } catch(e359) {
        }
        try {
            f0(v215, v218);
        } catch(e361) {
        }
        const v221 = -44;
        const v223 = -88.1;
        let v225;
        try {
            v225 = exp_div(v223, 2);
        } catch(e372) {
        }
        try {
            f0(v221, v225);
        } catch(e374) {
        }
    }
}
try {
    ExportedTableTest();
} catch(e376) {
}
function ImportedTableTest() {
    let kTableSize = 10;
    try {
        f0("ImportedTableTest...");
    } catch(e382) {
    }
    let v234;
    try {
        const v386 = new WasmModuleBuilder();
        v234 = v386;
    } catch(e387) {
    }
    var builder = v234;
    let v239;
    try {
        v239 = builder.addImport("q", "js_div", kSig_i_ii);
    } catch(e395) {
    }
    let d = v239;
    let v241;
    try {
        v241 = AddFunctions(builder);
    } catch(e400) {
    }
    let f = v241;
    try {
        builder.setFunctionTableLength(kTableSize);
    } catch(e403) {
    }
    let v247;
    try {
        v247 = builder.addImportedGlobal("q", "base", kWasmI32);
    } catch(e410) {
    }
    let g = v247;
    const v256 = [f?.mul?.index,f?.add?.index,f?.sub?.index,d];
    try {
        builder.addFunctionTableInit(g, true, v256);
    } catch(e422) {
    }
    try {
        builder.addExportOfKind("table", kExternalTable, 0);
    } catch(e427) {
    }
    const v263 = WebAssembly?.Module;
    let v264;
    try {
        v264 = builder.toBuffer();
    } catch(e434) {
    }
    let v265;
    try {
        const v437 = new v263(v264);
        v265 = v437;
    } catch(e438) {
    }
    let m1 = v265;
    let v267;
    try {
        const v443 = new WasmModuleBuilder();
        v267 = v443;
    } catch(e444) {
    }
    var builder = v267;
    try {
        builder.addImportedTable("r", "table", kTableSize, kTableSize);
    } catch(e449) {
    }
    const v281 = [kExprI32Const,33,kExprGetLocal,0,kExprGetLocal,1,kExprCallIndirect,0,kTableZero];
    let v283;
    try {
        v283 = builder.addFunction("main", kSig_i_ii);
    } catch(e465) {
    }
    let v284;
    try {
        v284 = v283.addBody(v281);
    } catch(e469) {
    }
    try {
        v284.exportAs("main");
    } catch(e472) {
    }
    const v286 = WebAssembly?.Module;
    let v287;
    try {
        v287 = builder.toBuffer();
    } catch(e478) {
    }
    let v288;
    try {
        const v481 = new v286(v287);
        v288 = v481;
    } catch(e482) {
    }
    let m2 = v288;
    for (let i485 = 0; i485 < 5; i485++) {
        const v298 = " base = " + i485;
        try {
            f0(v298);
        } catch(e495) {
        }
        const v300 = WebAssembly?.Instance;
        const v301 = { base: i485, js_div: js_div };
        const v302 = { q: v301 };
        let v303;
        try {
            const v504 = new v300(m1, v302);
            v303 = v504;
        } catch(e505) {
        }
        let i1 = v303;
        let table = i1?.exports?.table;
        const v309 = table?.length;
        try {
            f0(10, v309);
        } catch(e514) {
        }
        const v311 = WebAssembly?.Instance;
        const v312 = { table: table };
        const v313 = { r: v312 };
        let v314;
        try {
            const v523 = new v311(m2, v313);
            v314 = v523;
        } catch(e524) {
        }
        let i2 = v314;
        let main = i2?.exports?.main;
        for (let i530 = 0; i530 < i485; i530++) {
            const v535 = () => {
                let v327;
                try {
                    v327 = main(0, i530);
                } catch(e540) {
                }
                return v327;
            };
            const v325 = v535;
            try {
                f0(v325);
            } catch(e543) {
            }
            let v330;
            try {
                v330 = table.get(i530);
            } catch(e547) {
            }
            try {
                f0(null, v330);
            } catch(e550) {
            }
        }
        const v334 = i485 + 0;
        let v335;
        try {
            v335 = table.get(v334);
        } catch(e557) {
        }
        const v336 = typeof v335;
        try {
            f0("function", v336);
        } catch(e562) {
        }
        const v341 = i485 + 0;
        let v342;
        try {
            v342 = main(0, v341);
        } catch(e570) {
        }
        try {
            f0(0, v342);
        } catch(e573) {
        }
        const v347 = i485 + 0;
        let v348;
        try {
            v348 = main(2, v347);
        } catch(e581) {
        }
        try {
            f0(66, v348);
        } catch(e584) {
        }
        const v352 = i485 + 1;
        let v353;
        try {
            v353 = table.get(v352);
        } catch(e591) {
        }
        const v354 = typeof v353;
        try {
            f0("function", v354);
        } catch(e596) {
        }
        const v359 = i485 + 1;
        let v360;
        try {
            v360 = main(0, v359);
        } catch(e604) {
        }
        try {
            f0(33, v360);
        } catch(e607) {
        }
        const v365 = i485 + 1;
        let v366;
        try {
            v366 = main(5, v365);
        } catch(e615) {
        }
        try {
            f0(38, v366);
        } catch(e618) {
        }
        const v370 = i485 + 2;
        let v371;
        try {
            v371 = table.get(v370);
        } catch(e625) {
        }
        const v372 = typeof v371;
        try {
            f0("function", v372);
        } catch(e630) {
        }
        const v377 = i485 + 2;
        let v378;
        try {
            v378 = main(1, v377);
        } catch(e638) {
        }
        try {
            f0(32, v378);
        } catch(e641) {
        }
        const v383 = i485 + 2;
        let v384;
        try {
            v384 = main(5, v383);
        } catch(e649) {
        }
        try {
            f0(28, v384);
        } catch(e652) {
        }
        const v388 = i485 + 3;
        let v389;
        try {
            v389 = table.get(v388);
        } catch(e659) {
        }
        const v390 = typeof v389;
        try {
            f0("function", v390);
        } catch(e664) {
        }
        const v395 = i485 + 3;
        let v396;
        try {
            v396 = main(4, v395);
        } catch(e672) {
        }
        try {
            f0(8, v396);
        } catch(e675) {
        }
        const v401 = i485 + 3;
        let v402;
        try {
            v402 = main(11, v401);
        } catch(e683) {
        }
        try {
            f0(3, v402);
        } catch(e686) {
        }
        for (let i689 = i485 + 4; i689 < (kTableSize + 5); i689++) {
            const v696 = (a697) => {
                let v416;
                try {
                    v416 = main(0, i689);
                } catch(e702) {
                }
                return v416;
            };
            const v413 = v696;
            try {
                f0(v413);
            } catch(e705) {
            }
            if (i689 < kTableSize) {
                let v420;
                try {
                    v420 = table.get(i689);
                } catch(e710) {
                }
                try {
                    f0(null, v420);
                } catch(e713) {
                }
            }
        }
    }
}
try {
    ImportedTableTest();
} catch(e715) {
}
function ImportedTableTest() {
    let kTableSize = 10;
    f0("ManualTableTest...");
    let v429;
    try {
        const v724 = new WasmModuleBuilder();
        v429 = v724;
    } catch(e725) {
    }
    var builder = v429;
    let v434;
    try {
        v434 = builder.addImport("q", "js_div", kSig_i_ii);
    } catch(e733) {
    }
    let d = v434;
    try {
        builder.addImportedTable("q", "table", kTableSize, kTableSize);
    } catch(e738) {
    }
    let v442;
    try {
        v442 = builder.addImportedGlobal("q", "base", kWasmI32);
    } catch(e745) {
    }
    let g = v442;
    let v444;
    try {
        v444 = AddFunctions(builder);
    } catch(e750) {
    }
    let f = v444;
    const v453 = [f?.mul?.index,f?.add?.index,f?.sub?.index,d];
    try {
        builder.addFunctionTableInit(g, true, v453);
    } catch(e762) {
    }
    const v464 = [kExprI32Const,55,kExprGetLocal,0,kExprGetLocal,1,kExprCallIndirect,0,kTableZero];
    let v466;
    try {
        v466 = builder.addFunction("main", kSig_i_ii);
    } catch(e778) {
    }
    let v467;
    try {
        v467 = v466.addBody(v464);
    } catch(e782) {
    }
    try {
        v467.exportAs("main");
    } catch(e785) {
    }
    const v470 = WebAssembly?.Module;
    let v471;
    try {
        v471 = builder.toBuffer();
    } catch(e792) {
    }
    let v472;
    try {
        const v795 = new v470(v471);
        v472 = v795;
    } catch(e796) {
    }
    let m2 = v472;
    for (let i799 = 0; i799 < 5; i799++) {
        const v482 = " base = " + i799;
        try {
            f0(v482);
        } catch(e809) {
        }
        const v484 = WebAssembly?.Table;
        const v486 = { element: "anyfunc", initial: kTableSize, maximum: kTableSize };
        let v487;
        try {
            const v817 = new v484(v486);
            v487 = v817;
        } catch(e818) {
        }
        let table = v487;
        const v490 = table?.length;
        try {
            f0(10, v490);
        } catch(e824) {
        }
        const v492 = WebAssembly?.Instance;
        const v493 = { base: i799, table: table, js_div: js_div };
        const v494 = { q: v493 };
        let v495;
        try {
            const v833 = new v492(m2, v494);
            v495 = v833;
        } catch(e834) {
        }
        let i2 = v495;
        let main = i2?.exports?.main;
        for (let i840 = 0; i840 < i799; i840++) {
            const v845 = () => {
                let v508;
                try {
                    v508 = main(0, i840);
                } catch(e850) {
                }
                return v508;
            };
            const v506 = v845;
            try {
                f0(v506);
            } catch(e853) {
            }
            let v511;
            try {
                v511 = table.get(i840);
            } catch(e857) {
            }
            try {
                f0(null, v511);
            } catch(e860) {
            }
        }
        const v515 = i799 + 0;
        let v516;
        try {
            v516 = table.get(v515);
        } catch(e867) {
        }
        const v517 = typeof v516;
        try {
            f0("function", v517);
        } catch(e872) {
        }
        const v522 = i799 + 0;
        let v523;
        try {
            v523 = main(0, v522);
        } catch(e880) {
        }
        try {
            f0(0, v523);
        } catch(e883) {
        }
        const v528 = i799 + 0;
        let v529;
        try {
            v529 = main(2, v528);
        } catch(e891) {
        }
        try {
            f0(110, v529);
        } catch(e894) {
        }
        const v533 = i799 + 1;
        let v534;
        try {
            v534 = table.get(v533);
        } catch(e901) {
        }
        const v535 = typeof v534;
        try {
            f0("function", v535);
        } catch(e906) {
        }
        const v540 = i799 + 1;
        let v541;
        try {
            v541 = main(0, v540);
        } catch(e914) {
        }
        try {
            f0(55, v541);
        } catch(e917) {
        }
        const v546 = i799 + 1;
        let v547;
        try {
            v547 = main(5, v546);
        } catch(e925) {
        }
        try {
            f0(60, v547);
        } catch(e928) {
        }
        const v551 = i799 + 2;
        let v552;
        try {
            v552 = table.get(v551);
        } catch(e935) {
        }
        const v553 = typeof v552;
        try {
            f0("function", v553);
        } catch(e940) {
        }
        const v558 = i799 + 2;
        let v559;
        try {
            v559 = main(1, v558);
        } catch(e948) {
        }
        try {
            f0(54, v559);
        } catch(e951) {
        }
        const v564 = i799 + 2;
        let v565;
        try {
            v565 = main(5, v564);
        } catch(e959) {
        }
        try {
            f0(50, v565);
        } catch(e962) {
        }
        const v569 = i799 + 3;
        let v570;
        try {
            v570 = table.get(v569);
        } catch(e969) {
        }
        const v571 = typeof v570;
        try {
            f0("function", v571);
        } catch(e974) {
        }
        const v576 = i799 + 3;
        let v577;
        try {
            v577 = main(4, v576);
        } catch(e982) {
        }
        try {
            f0(13, v577);
        } catch(e985) {
        }
        const v582 = i799 + 3;
        let v583;
        try {
            v583 = main(11, v582);
        } catch(e993) {
        }
        try {
            f0(5, v583);
        } catch(e996) {
        }
        for (let i999 = i799 + 4; i999 < (kTableSize + 5); i999++) {
            const v1006 = (a1007) => {
                let v597;
                try {
                    v597 = main(0, i999);
                } catch(e1012) {
                }
                return v597;
            };
            const v594 = v1006;
            try {
                f0(v594);
            } catch(e1015) {
            }
            if (i999 < kTableSize) {
                let v601;
                try {
                    v601 = table.get(i999);
                } catch(e1020) {
                }
                try {
                    f0(null, v601);
                } catch(e1023) {
                }
            }
        }
    }
}
try {
    ImportedTableTest();
} catch(e1025) {
}
function CumulativeTest() {
    f0("CumulativeTest...");
    let kTableSize = 10;
    const v610 = WebAssembly.Table;
    const v1036 = new v610({ element: "anyfunc", initial: kTableSize, maximum: kTableSize });
    const v613 = v1036;
    let table = v613;
    let v616;
    try {
        const v1042 = new WasmModuleBuilder();
        v616 = v1042;
    } catch(e1043) {
    }
    var builder = v616;
    try {
        builder.addImportedTable("x", "table", kTableSize, kTableSize);
    } catch(e1048) {
    }
    let v624;
    try {
        v624 = builder.addImportedGlobal("x", "base", kWasmI32);
    } catch(e1055) {
    }
    let g = v624;
    let v627;
    try {
        v627 = builder.addType(kSig_i_v);
    } catch(e1061) {
    }
    let sig_index = v627;
    const v630 = [kExprGetGlobal,g];
    let v632;
    try {
        v632 = builder.addFunction("g", sig_index);
    } catch(e1070) {
    }
    try {
        v632.addBody(v630);
    } catch(e1072) {
    }
    const v639 = [kExprGetLocal,0,kExprCallIndirect,sig_index,kTableZero];
    let v642;
    try {
        v642 = builder.addFunction("main", kSig_i_ii);
    } catch(e1084) {
    }
    let v643;
    try {
        v643 = v642.addBody(v639);
    } catch(e1088) {
    }
    try {
        v643.exportAs("main");
    } catch(e1091) {
    }
    const v646 = [g];
    try {
        builder.addFunctionTableInit(g, true, v646);
    } catch(e1096) {
    }
    const v648 = WebAssembly?.Module;
    let v649;
    try {
        v649 = builder.toBuffer();
    } catch(e1102) {
    }
    let v650;
    try {
        const v1105 = new v648(v649);
        v650 = v1105;
    } catch(e1106) {
    }
    let module = v650;
    for (let i1109 = 0; i1109 < kTableSize; i1109++) {
        const v659 = " base = " + i1109;
        try {
            f0(v659);
        } catch(e1118) {
        }
        const v661 = WebAssembly?.Instance;
        const v662 = { base: i1109, table: table };
        const v663 = { x: v662 };
        let v664;
        try {
            const v1127 = new v661(module, v663);
            v664 = v1127;
        } catch(e1128) {
        }
        let instance = v664;
        for (let i1131 = 0; i1131 < kTableSize; i1131++) {
            let v672;
            try {
                v672 = table.get(i1131);
            } catch(e1139) {
            }
            let func = v672;
            if (i1131 > i1109) {
                try {
                    f0(null, func);
                } catch(e1144) {
                }
                const v1145 = () => {
                    const v679 = instance?.exports;
                    let v680;
                    try {
                        v680 = v679.main(i1131);
                    } catch(e1151) {
                    }
                    return v680;
                };
                const v678 = v1145;
                try {
                    f0(kTrapFuncSigMismatch, v678);
                } catch(e1155) {
                }
            } else {
                const v683 = typeof func;
                try {
                    f0("function", v683);
                } catch(e1160) {
                }
                let v685;
                try {
                    v685 = func();
                } catch(e1164) {
                }
                try {
                    f0(i1131, v685);
                } catch(e1166) {
                }
                const v687 = instance?.exports;
                let v688;
                try {
                    v688 = v687.main(i1131);
                } catch(e1172) {
                }
                try {
                    f0(i1131, v688);
                } catch(e1174) {
                }
            }
        }
    }
}
try {
    CumulativeTest();
} catch(e1176) {
}
function TwoWayTest() {
    f0("TwoWayTest...");
    let kTableSize = 3;
    let v697;
    try {
        const v1185 = new WasmModuleBuilder();
        v697 = v1185;
    } catch(e1186) {
    }
    var builder = v697;
    try {
        builder.addType(kSig_i_i);
    } catch(e1190) {
    }
    try {
        builder.addType(kSig_i_ii);
    } catch(e1193) {
    }
    let v704;
    try {
        v704 = builder.addType(kSig_i_v);
    } catch(e1198) {
    }
    var sig_index1 = v704;
    const v708 = [kExprI32Const,11];
    let v710;
    try {
        v710 = builder.addFunction("f1", sig_index1);
    } catch(e1208) {
    }
    let v711;
    try {
        v711 = v710.addBody(v708);
    } catch(e1212) {
    }
    var f1 = v711;
    const v718 = [kExprGetLocal,0,kExprCallIndirect,sig_index1,kTableZero];
    let v720;
    try {
        v720 = builder.addFunction("main", kSig_i_ii);
    } catch(e1225) {
    }
    let v721;
    try {
        v721 = v720.addBody(v718);
    } catch(e1229) {
    }
    try {
        v721.exportAs("main");
    } catch(e1232) {
    }
    try {
        builder.setFunctionTableLength(kTableSize);
    } catch(e1234) {
    }
    const v727 = [f1?.index];
    try {
        builder.addFunctionTableInit(0, false, v727);
    } catch(e1241) {
    }
    try {
        builder.addExportOfKind("table", kExternalTable, 0);
    } catch(e1246) {
    }
    const v734 = WebAssembly?.Module;
    let v735;
    try {
        v735 = builder.toBuffer();
    } catch(e1253) {
    }
    let v736;
    try {
        const v1256 = new v734(v735);
        v736 = v1256;
    } catch(e1257) {
    }
    var m1 = v736;
    let v738;
    try {
        const v1262 = new WasmModuleBuilder();
        v738 = v1262;
    } catch(e1263) {
    }
    var builder = v738;
    try {
        builder.addType(kSig_i_ii);
    } catch(e1267) {
    }
    let v741;
    try {
        v741 = builder.addType(kSig_i_v);
    } catch(e1272) {
    }
    var sig_index2 = v741;
    const v744 = [kExprI32Const,22];
    let v746;
    try {
        v746 = builder.addFunction("f2", sig_index2);
    } catch(e1281) {
    }
    let v747;
    try {
        v747 = v746.addBody(v744);
    } catch(e1285) {
    }
    var f2 = v747;
    const v751 = [kExprGetLocal,0,kExprCallIndirect,sig_index2,kTableZero];
    let v753;
    try {
        v753 = builder.addFunction("main", kSig_i_ii);
    } catch(e1295) {
    }
    let v754;
    try {
        v754 = v753.addBody(v751);
    } catch(e1299) {
    }
    try {
        v754.exportAs("main");
    } catch(e1302) {
    }
    try {
        builder.addImportedTable("z", "table", kTableSize, kTableSize);
    } catch(e1306) {
    }
    const v762 = [f2?.index];
    try {
        builder.addFunctionTableInit(1, false, v762, true);
    } catch(e1314) {
    }
    const v765 = WebAssembly?.Module;
    let v766;
    try {
        v766 = builder.toBuffer();
    } catch(e1320) {
    }
    let v767;
    try {
        const v1323 = new v765(v766);
        v767 = v1323;
    } catch(e1324) {
    }
    var m2 = v767;
    const v769 = sig_index1 == sig_index2;
    try {
        f0(v769);
    } catch(e1329) {
    }
    const v771 = WebAssembly?.Instance;
    let v772;
    try {
        const v1334 = new v771(m1);
        v772 = v1334;
    } catch(e1335) {
    }
    var i1 = v772;
    const v774 = WebAssembly?.Instance;
    const v776 = i1?.exports?.table;
    const v777 = { table: v776 };
    const v778 = { z: v777 };
    let v779;
    try {
        const v1348 = new v774(m2, v778);
        v779 = v1348;
    } catch(e1349) {
    }
    var i2 = v779;
    const v783 = i1?.exports;
    let v784;
    try {
        v784 = v783.main(0);
    } catch(e1357) {
    }
    try {
        f0(11, v784);
    } catch(e1360) {
    }
    const v788 = i2?.exports;
    let v789;
    try {
        v789 = v788.main(0);
    } catch(e1367) {
    }
    try {
        f0(11, v789);
    } catch(e1370) {
    }
    const v793 = i1?.exports;
    let v794;
    try {
        v794 = v793.main(1);
    } catch(e1377) {
    }
    try {
        f0(22, v794);
    } catch(e1380) {
    }
    const v798 = i2?.exports;
    let v799;
    try {
        v799 = v798.main(1);
    } catch(e1387) {
    }
    try {
        f0(22, v799);
    } catch(e1390) {
    }
    const v1391 = () => {
        const v803 = i1?.exports;
        let v804;
        try {
            v804 = v803.main(2);
        } catch(e1398) {
        }
        return v804;
    };
    const v801 = v1391;
    try {
        f0(v801);
    } catch(e1401) {
    }
    const v1402 = () => {
        const v808 = i2?.exports;
        let v809;
        try {
            v809 = v808.main(2);
        } catch(e1409) {
        }
        return v809;
    };
    const v806 = v1402;
    try {
        f0(v806);
    } catch(e1412) {
    }
    const v1413 = () => {
        const v813 = i1?.exports;
        let v814;
        try {
            v814 = v813.main(3);
        } catch(e1420) {
        }
        return v814;
    };
    const v811 = v1413;
    try {
        f0(v811);
    } catch(e1423) {
    }
    const v1424 = () => {
        const v818 = i2?.exports;
        let v819;
        try {
            v819 = v818.main(3);
        } catch(e1431) {
        }
        return v819;
    };
    const v816 = v1424;
    try {
        f0(v816);
    } catch(e1434) {
    }
}
try {
    TwoWayTest();
} catch(e1436) {
}
function MismatchedTableSize() {
    f0("MismatchedTableSize...");
    let kTableSize = 5;
    for (let i1443 = 1; i1443 < 4; i1443++) {
        for (let i1450 = 1; i1450 < 4; i1450++) {
            f0(((" expsize = " + i1443) + ", impsize = ") + i1450);
            let v848;
            try {
                const v1465 = new WasmModuleBuilder();
                v848 = v1465;
            } catch(e1466) {
            }
            var builder = v848;
            try {
                builder.setFunctionTableLength(i1443);
            } catch(e1469) {
            }
            try {
                builder.addExportOfKind("expfoo", kExternalTable, 0);
            } catch(e1474) {
            }
            const v856 = WebAssembly?.Module;
            let v857;
            try {
                v857 = builder.toBuffer();
            } catch(e1481) {
            }
            let v858;
            try {
                const v1484 = new v856(v857);
                v858 = v1484;
            } catch(e1485) {
            }
            let m1 = v858;
            let v860;
            try {
                const v1490 = new WasmModuleBuilder();
                v860 = v1490;
            } catch(e1491) {
            }
            var builder = v860;
            try {
                builder.addImportedTable("y", "impfoo", i1450, i1450);
            } catch(e1496) {
            }
            const v865 = WebAssembly?.Module;
            let v866;
            try {
                v866 = builder.toBuffer();
            } catch(e1502) {
            }
            let v867;
            try {
                const v1505 = new v865(v866);
                v867 = v1505;
            } catch(e1506) {
            }
            let m2 = v867;
            const v869 = WebAssembly?.Instance;
            let v870;
            try {
                const v1512 = new v869(m1);
                v870 = v1512;
            } catch(e1513) {
            }
            var i1 = v870;
            const v873 = i1?.exports?.expfoo;
            const v874 = { impfoo: v873 };
            var ffi = { y: v874 };
            if (i1443 == i1450) {
                const v878 = WebAssembly?.Instance;
                let v879;
                try {
                    const v1527 = new v878(m2, ffi);
                    v879 = v1527;
                } catch(e1528) {
                }
                var i2 = v879;
            } else {
                const v1530 = () => {
                    const v882 = WebAssembly?.Instance;
                    let v883;
                    try {
                        const v1535 = new v882(m2, ffi);
                        v883 = v1535;
                    } catch(e1536) {
                    }
                    return v883;
                };
                const v881 = v1530;
                try {
                    f0(v881);
                } catch(e1539) {
                }
            }
        }
    }
}
try {
    MismatchedTableSize();
} catch(e1541) {
}
function TableGrowBoundsCheck() {
    f0("TableGrowBoundsCheck");
    var kMaxSize = 30;
    var kInitSize = 5;
    const v894 = WebAssembly.Table;
    const v1554 = new v894({ element: "anyfunc", initial: kInitSize, maximum: kMaxSize });
    const v897 = v1554;
    let table = v897;
    let v900;
    try {
        const v1560 = new WasmModuleBuilder();
        v900 = v1560;
    } catch(e1561) {
    }
    var builder = v900;
    try {
        builder.addImportedTable("x", "table", kInitSize, kMaxSize);
    } catch(e1566) {
    }
    const v905 = WebAssembly?.Module;
    let v906;
    try {
        v906 = builder.toBuffer();
    } catch(e1572) {
    }
    let v907;
    try {
        const v1575 = new v905(v906);
        v907 = v1575;
    } catch(e1576) {
    }
    let module = v907;
    const v909 = WebAssembly?.Instance;
    const v911 = { base: 1, table: table };
    const v912 = { x: v911 };
    let v913;
    try {
        const v1587 = new v909(module, v912);
        v913 = v1587;
    } catch(e1588) {
    }
    let instance = v913;
    for (let i1590 = kInitSize; i1590 < kMaxSize; i1590 += 5) {
        const v920 = table?.length;
        try {
            f0(i1590, v920);
        } catch(e1598) {
        }
        for (let i1600 = 0; i1600 < i1590; i1600++) {
            try {
                table.set(i1600, null);
            } catch(e1607) {
            }
        }
        for (let i1609 = 0; i1609 < i1590; i1609++) {
            let v937;
            try {
                v937 = table.get(i1609);
            } catch(e1617) {
            }
            try {
                f0(null, v937);
            } catch(e1620) {
            }
        }
        const v1621 = () => {
            let v941;
            try {
                v941 = table.set(i1590, null);
            } catch(e1626) {
            }
            return v941;
        };
        const v939 = v1621;
        try {
            f0(v939);
        } catch(e1629) {
        }
        const v1630 = () => {
            let v944;
            try {
                v944 = table.get(i1590);
            } catch(e1634) {
            }
            return v944;
        };
        const v943 = v1630;
        try {
            f0(v943);
        } catch(e1637) {
        }
        let v947;
        try {
            v947 = table.grow(5);
        } catch(e1642) {
        }
        try {
            f0(i1590, v947);
        } catch(e1644) {
        }
    }
    const v950 = table?.length;
    try {
        f0(30, v950);
    } catch(e1649) {
    }
    const v1650 = () => {
        let v954;
        try {
            v954 = table.grow(1);
        } catch(e1655) {
        }
        return v954;
    };
    const v952 = v1650;
    try {
        f0(v952);
    } catch(e1658) {
    }
    const v1659 = () => {
        let v958;
        try {
            v958 = table.set(kMaxSize, null);
        } catch(e1664) {
        }
        return v958;
    };
    const v956 = v1659;
    try {
        f0(v956);
    } catch(e1667) {
    }
    const v1668 = () => {
        let v961;
        try {
            v961 = table.get(kMaxSize);
        } catch(e1672) {
        }
        return v961;
    };
    const v960 = v1668;
    try {
        f0(v960);
    } catch(e1675) {
    }
}
try {
    TableGrowBoundsCheck();
} catch(e1677) {
}
function CumulativeGrowTest() {
    f0("CumulativeGrowTest...");
    const v968 = WebAssembly.Table;
    const v1688 = new v968({ element: "anyfunc", initial: 10, maximum: 30 });
    const v973 = v1688;
    let table = v973;
    let v976;
    try {
        const v1694 = new WasmModuleBuilder();
        v976 = v1694;
    } catch(e1695) {
    }
    var builder = v976;
    try {
        builder.addImportedTable("x", "table", 10, 30);
    } catch(e1702) {
    }
    let v986;
    try {
        v986 = builder.addImportedGlobal("x", "base", kWasmI32);
    } catch(e1709) {
    }
    let g = v986;
    let v989;
    try {
        v989 = builder.addType(kSig_i_v);
    } catch(e1715) {
    }
    let sig_index = v989;
    const v992 = [kExprGetGlobal,g];
    let v994;
    try {
        v994 = builder.addFunction("g", sig_index);
    } catch(e1724) {
    }
    try {
        v994.addBody(v992);
    } catch(e1726) {
    }
    const v1001 = [kExprGetLocal,0,kExprCallIndirect,sig_index,kTableZero];
    let v1004;
    try {
        v1004 = builder.addFunction("main", kSig_i_ii);
    } catch(e1738) {
    }
    let v1005;
    try {
        v1005 = v1004.addBody(v1001);
    } catch(e1742) {
    }
    try {
        v1005.exportAs("main");
    } catch(e1745) {
    }
    const v1008 = [g];
    try {
        builder.addFunctionTableInit(g, true, v1008);
    } catch(e1750) {
    }
    const v1010 = WebAssembly?.Module;
    let v1011;
    try {
        v1011 = builder.toBuffer();
    } catch(e1756) {
    }
    let v1012;
    try {
        const v1759 = new v1010(v1011);
        v1012 = v1759;
    } catch(e1760) {
    }
    let module = v1012;
    var instances = [];
    for (let i1765 = 0; i1765 < 10; i1765++) {
        const v1024 = " base = " + i1765;
        try {
            f0(v1024);
        } catch(e1775) {
        }
        const v1026 = WebAssembly?.Instance;
        const v1027 = { base: i1765, table: table };
        const v1028 = { x: v1027 };
        let v1029;
        try {
            const v1784 = new v1026(module, v1028);
            v1029 = v1784;
        } catch(e1785) {
        }
        try {
            instances.push(v1029);
        } catch(e1787) {
        }
    }
    for (let i1789 = 0; i1789 < 10; i1789++) {
        let v1038;
        try {
            v1038 = table.get(i1789);
        } catch(e1798) {
        }
        let func = v1038;
        const v1041 = typeof func;
        try {
            f0("function", v1041);
        } catch(e1804) {
        }
        let v1043;
        try {
            v1043 = func();
        } catch(e1808) {
        }
        try {
            f0(i1789, v1043);
        } catch(e1810) {
        }
        const v1046 = instances?.[instances]?.exports;
        let v1047;
        try {
            v1047 = v1046.main(i1789);
        } catch(e1817) {
        }
        try {
            f0(i1789, v1047);
        } catch(e1819) {
        }
    }
    let v1051;
    try {
        v1051 = table.grow(10);
    } catch(e1824) {
    }
    try {
        f0(10, v1051);
    } catch(e1827) {
    }
    for (let i1829 = 0; i1829 < 10; i1829++) {
        let v1060;
        try {
            v1060 = table.get(i1829);
        } catch(e1838) {
        }
        let func = v1060;
        const v1063 = typeof func;
        try {
            f0("function", v1063);
        } catch(e1844) {
        }
        let v1065;
        try {
            v1065 = func();
        } catch(e1848) {
        }
        try {
            f0(i1829, v1065);
        } catch(e1850) {
        }
        const v1068 = instances?.[instances]?.exports;
        let v1069;
        try {
            v1069 = v1068.main(i1829);
        } catch(e1857) {
        }
        try {
            f0(i1829, v1069);
        } catch(e1859) {
        }
    }
    let v1071;
    try {
        const v1863 = new WasmModuleBuilder();
        v1071 = v1863;
    } catch(e1864) {
    }
    let new_builder = v1071;
    const v1074 = [];
    let v1077;
    try {
        v1077 = new_builder.addFunction("", kSig_v_v);
    } catch(e1873) {
    }
    let v1078;
    try {
        v1078 = v1077.addBody(v1074);
    } catch(e1877) {
    }
    try {
        new_builder.addExport("wasm", v1078);
    } catch(e1880) {
    }
    try {
        new_builder.addImportedTable("x", "table", 20, 30);
    } catch(e1886) {
    }
    const v1085 = WebAssembly?.Module;
    let v1086;
    try {
        v1086 = new_builder.toBuffer();
    } catch(e1892) {
    }
    let v1087;
    try {
        const v1895 = new v1085(v1086);
        v1087 = v1895;
    } catch(e1896) {
    }
    let new_module = v1087;
    const v1089 = WebAssembly?.Instance;
    const v1090 = { table: table };
    const v1091 = { x: v1090 };
    let v1092;
    try {
        const v1906 = new v1089(new_module, v1091);
        v1092 = v1906;
    } catch(e1907) {
    }
    let instance = v1092;
    let new_func = instance?.exports?.wasm;
    for (let i1913 = 10; i1913 < 20; i1913++) {
        try {
            table.set(i1913, new_func);
        } catch(e1920) {
        }
        let v1105;
        try {
            v1105 = table.get(i1913);
        } catch(e1924) {
        }
        let func = v1105;
        const v1108 = typeof func;
        try {
            f0("function", v1108);
        } catch(e1930) {
        }
        let v1110;
        try {
            v1110 = table.get(i1913);
        } catch(e1934) {
        }
        try {
            f0(new_func, v1110);
        } catch(e1936) {
        }
    }
    const v1937 = () => {
        let v1114;
        try {
            v1114 = table.grow(11);
        } catch(e1942) {
        }
        return v1114;
    };
    const v1112 = v1937;
    try {
        f0(v1112);
    } catch(e1945) {
    }
}
try {
    CumulativeGrowTest();
} catch(e1947) {
}
function TestImportTooLarge() {
    f0("TestImportTooLarge...");
    let v1121;
    try {
        const v1954 = new WasmModuleBuilder();
        v1121 = v1954;
    } catch(e1955) {
    }
    let builder = v1121;
    try {
        builder.addImportedTable("t", "t", 1, 2);
    } catch(e1962) {
    }
    const v1963 = () => {
        const v1130 = WebAssembly?.Table;
        const v1134 = { element: "anyfunc", initial: 3, maximum: 3 };
        let v1135;
        try {
            const v1974 = new v1130(v1134);
            v1135 = v1974;
        } catch(e1975) {
        }
        const v1136 = { t: v1135 };
        const v1137 = { t: v1136 };
        let v1138;
        try {
            v1138 = builder.instantiate(v1137);
        } catch(e1983) {
        }
        return v1138;
    };
    const v1128 = v1963;
    try {
        f0(v1128);
    } catch(e1986) {
    }
    const v1987 = () => {
        const v1142 = WebAssembly?.Table;
        const v1146 = { element: "anyfunc", initial: 1, maximum: 4 };
        let v1147;
        try {
            const v1998 = new v1142(v1146);
            v1147 = v1998;
        } catch(e1999) {
        }
        const v1148 = { t: v1147 };
        const v1149 = { t: v1148 };
        let v1150;
        try {
            v1150 = builder.instantiate(v1149);
        } catch(e2007) {
        }
        return v1150;
    };
    const v1140 = v1987;
    try {
        f0(v1140);
    } catch(e2010) {
    }
    const v2011 = () => {
        const v1154 = WebAssembly?.Table;
        const v1157 = { element: "anyfunc", initial: 1 };
        let v1158;
        try {
            const v2021 = new v1154(v1157);
            v1158 = v2021;
        } catch(e2022) {
        }
        const v1159 = { t: v1158 };
        const v1160 = { t: v1159 };
        let v1161;
        try {
            v1161 = builder.instantiate(v1160);
        } catch(e2030) {
        }
        return v1161;
    };
    const v1152 = v2011;
    try {
        f0(v1152);
    } catch(e2033) {
    }
}
try {
    TestImportTooLarge();
} catch(e2035) {
}
function TableImportLargerThanCompiled() {
    f0("TableImportLargerThanCompiled...");
    var kMaxSize = 30;
    var kInitSize = 5;
    let v1172;
    try {
        const v2046 = new WasmModuleBuilder();
        v1172 = v2046;
    } catch(e2047) {
    }
    var builder = v1172;
    try {
        builder.addImportedTable("x", "table", 1, 35);
    } catch(e2054) {
    }
    const v1180 = WebAssembly?.Table;
    const v1182 = { element: "anyfunc", initial: kInitSize, maximum: kMaxSize };
    let v1183;
    try {
        const v2063 = new v1180(v1182);
        v1183 = v2063;
    } catch(e2064) {
    }
    let table = v1183;
    const v1185 = WebAssembly?.Module;
    let v1186;
    try {
        v1186 = builder.toBuffer();
    } catch(e2071) {
    }
    let v1187;
    try {
        const v2074 = new v1185(v1186);
        v1187 = v2074;
    } catch(e2075) {
    }
    let module = v1187;
    const v1189 = WebAssembly?.Instance;
    const v1191 = { base: 1, table: table };
    const v1192 = { x: v1191 };
    let v1193;
    try {
        const v2086 = new v1189(module, v1192);
        v1193 = v2086;
    } catch(e2087) {
    }
    let instance = v1193;
    for (let i2090 = 0; i2090 < kInitSize; ++i2090) {
        try {
            table.set(i2090, null);
        } catch(e2097) {
        }
    }
    for (let i2099 = 0; i2099 < kInitSize; ++i2099) {
        let v1210;
        try {
            v1210 = table.get(i2099);
        } catch(e2107) {
        }
        try {
            f0(null, v1210);
        } catch(e2110) {
        }
    }
    const v2111 = () => {
        let v1214;
        try {
            v1214 = table.set(kInitSize, null);
        } catch(e2116) {
        }
        return v1214;
    };
    const v1212 = v2111;
    try {
        f0(v1212);
    } catch(e2119) {
    }
}
try {
    TableImportLargerThanCompiled();
} catch(e2121) {
}
function ModulesShareTableAndGrow() {
    f0("ModulesShareTableAndGrow...");
    const v2125 = () => {
        let v1222;
        try {
            const v2129 = new WasmModuleBuilder();
            v1222 = v2129;
        } catch(e2130) {
        }
        let builder = v1222;
        try {
            builder.addImportedTable("x", "table", 1, 35);
        } catch(e2137) {
        }
        const v1230 = WebAssembly?.Module;
        let v1231;
        try {
            v1231 = builder.toBuffer();
        } catch(e2144) {
        }
        let v1232;
        try {
            const v2147 = new v1230(v1231);
            v1232 = v2147;
        } catch(e2148) {
        }
        return v1232;
    };
    const v1220 = v2125;
    let v1233;
    try {
        v1233 = v1220();
    } catch(e2153) {
    }
    let module1 = v1233;
    const v2155 = () => {
        let v1237;
        try {
            const v2159 = new WasmModuleBuilder();
            v1237 = v2159;
        } catch(e2160) {
        }
        let builder = v1237;
        try {
            builder.addImportedTable("x", "table", 2, 40);
        } catch(e2167) {
        }
        const v1245 = WebAssembly?.Module;
        let v1246;
        try {
            v1246 = builder.toBuffer();
        } catch(e2174) {
        }
        let v1247;
        try {
            const v2177 = new v1245(v1246);
            v1247 = v2177;
        } catch(e2178) {
        }
        return v1247;
    };
    const v1235 = v2155;
    let v1248;
    try {
        v1248 = v1235();
    } catch(e2183) {
    }
    let module2 = v1248;
    var kMaxSize = 30;
    var kInitSize = 5;
    const v1255 = WebAssembly.Table;
    const v2194 = new v1255({ element: "anyfunc", initial: kInitSize, maximum: kMaxSize });
    const v1258 = v2194;
    let table = v1258;
    const v1260 = WebAssembly.Instance;
    const v1262 = { base: 1, table: table };
    const v1263 = { x: v1262 };
    let v1264;
    try {
        const v2206 = new v1260(module1, v1263);
        v1264 = v2206;
    } catch(e2207) {
    }
    let instance1 = v1264;
    const v1266 = WebAssembly.Instance;
    const v1268 = { base: 1, table: table };
    const v1269 = { x: v1268 };
    let v1270;
    try {
        const v2218 = new v1266(module2, v1269);
        v1270 = v2218;
    } catch(e2219) {
    }
    let instance2 = v1270;
    for (let i2222 = 0; i2222 < kInitSize; ++i2222) {
        table.set(i2222, null);
    }
    for (let i2230 = 0; i2230 < kInitSize; ++i2230) {
        f0(null, table.get(i2230));
    }
    const v2238 = () => {
        let v1291;
        try {
            v1291 = table.set(kInitSize, null);
        } catch(e2243) {
        }
        return v1291;
    };
    const v1289 = v2238;
    f0(v1289);
    f0(kInitSize, table.grow(5));
    for (let i2250 = 0; i2250 < (2 * kInitSize); ++i2250) {
        table.set(i2250, null);
    }
    for (let i2260 = 0; i2260 < (2 * kInitSize); ++i2260) {
        f0(null, table.get(i2260));
    }
    const v2270 = () => {
        const v1319 = 2 * kInitSize;
        let v1321;
        try {
            v1321 = table.set(v1319, null);
        } catch(e2278) {
        }
        return v1321;
    };
    const v1317 = v2270;
    f0(v1317);
    const v2281 = () => {
        let v1325;
        try {
            v1325 = table.grow(21);
        } catch(e2286) {
        }
        return v1325;
    };
    const v1323 = v2281;
    f0(v1323);
}
ModulesShareTableAndGrow();
function InitImportedTableSignatureMismatch() {
    let v1330;
    try {
        const v2294 = new WasmModuleBuilder();
        v1330 = v2294;
    } catch(e2295) {
    }
    let builder0 = v1330;
    try {
        builder0.setName("module_0");
    } catch(e2299) {
    }
    let v1335;
    try {
        v1335 = builder0.addType(kSig_i_v);
    } catch(e2304) {
    }
    let sig_index = v1335;
    const v1342 = [kExprGetLocal,0,kExprCallIndirect,sig_index,kTableZero];
    let v1345;
    try {
        v1345 = builder0.addFunction("main", kSig_i_i);
    } catch(e2317) {
    }
    let v1346;
    try {
        v1346 = v1345.addBody(v1342);
    } catch(e2321) {
    }
    try {
        v1346.exportAs("main");
    } catch(e2324) {
    }
    try {
        builder0.setFunctionTableLength(3);
    } catch(e2327) {
    }
    try {
        builder0.addExportOfKind("table", kExternalTable);
    } catch(e2331) {
    }
    const v1354 = WebAssembly?.Module;
    let v1355;
    try {
        v1355 = builder0.toBuffer();
    } catch(e2338) {
    }
    let v1356;
    try {
        const v2341 = new v1354(v1355);
        v1356 = v2341;
    } catch(e2342) {
    }
    let module0 = v1356;
    const v1358 = WebAssembly?.Instance;
    let v1359;
    try {
        const v2348 = new v1358(module0);
        v1359 = v2348;
    } catch(e2349) {
    }
    let instance0 = v1359;
    let v1361;
    try {
        const v2354 = new WasmModuleBuilder();
        v1361 = v2354;
    } catch(e2355) {
    }
    let builder1 = v1361;
    try {
        builder1.setName("module_1");
    } catch(e2359) {
    }
    const v1366 = [kExprGetLocal,0];
    let v1368;
    try {
        v1368 = builder1.addFunction("f", kSig_i_i);
    } catch(e2368) {
    }
    try {
        v1368.addBody(v1366);
    } catch(e2370) {
    }
    try {
        builder1.addImportedTable("z", "table");
    } catch(e2374) {
    }
    const v1376 = [0];
    try {
        builder1.addFunctionTableInit(0, false, v1376, true);
    } catch(e2382) {
    }
    const v1379 = WebAssembly?.Module;
    let v1380;
    try {
        v1380 = builder1.toBuffer();
    } catch(e2388) {
    }
    let v1381;
    try {
        const v2391 = new v1379(v1380);
        v1381 = v2391;
    } catch(e2392) {
    }
    let module1 = v1381;
    const v1383 = WebAssembly?.Instance;
    const v1385 = instance0?.exports?.table;
    const v1386 = { table: v1385 };
    const v1387 = { z: v1386 };
    let v1388;
    try {
        const v2405 = new v1383(module1, v1387);
        v1388 = v2405;
    } catch(e2406) {
    }
    let instance1 = v1388;
    const v2408 = () => {
        const v1392 = instance0?.exports;
        let v1393;
        try {
            v1393 = v1392.main(0);
        } catch(e2415) {
        }
        return v1393;
    };
    const v1390 = v2408;
    const v1394 = WebAssembly?.RuntimeError;
    const v1395 = /signature mismatch/;
    try {
        f0(v1390, v1394, v1395);
    } catch(e2422) {
    }
}
try {
    InitImportedTableSignatureMismatch();
} catch(e2424) {
}
