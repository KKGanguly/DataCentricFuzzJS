function f0() {
}
try {
    load("test/mjsunit/wasm/wasm-module-builder.js");
} catch(e4) {
}
function MultiBlockResultTest() {
    f0("MultiBlockResultTest");
    let v8;
    try {
        const v11 = new WasmModuleBuilder();
        v8 = v11;
    } catch(e12) {
    }
    let builder = v8;
    let v11;
    try {
        v11 = builder.addType(kSig_i_ii);
    } catch(e18) {
    }
    let sig_i_ii = v11;
    let v14;
    try {
        v14 = builder.addType(kSig_ii_v);
    } catch(e24) {
    }
    let sig_ii_v = v14;
    const v23 = [kExprBlock,sig_ii_v,kExprLocalGet,0,kExprLocalGet,1,kExprEnd,kExprI32Add];
    let v25;
    try {
        v25 = builder.addFunction("main", kSig_i_ii);
    } catch(e39) {
    }
    let v26;
    try {
        v26 = v25.addBody(v23);
    } catch(e43) {
    }
    try {
        v26.exportAs("main");
    } catch(e46) {
    }
    const v29 = WebAssembly?.Module;
    let v30;
    try {
        v30 = builder.toBuffer();
    } catch(e53) {
    }
    let v31;
    try {
        const v56 = new v29(v30);
        v31 = v56;
    } catch(e57) {
    }
    let module = v31;
    const v33 = WebAssembly?.Instance;
    let v34;
    try {
        const v63 = new v33(module);
        v34 = v63;
    } catch(e64) {
    }
    let instance = v34;
    const v38 = instance?.exports;
    let v39;
    try {
        v39 = v38.main(1, 4);
    } catch(e73) {
    }
    try {
        f0(v39, 5);
    } catch(e76) {
    }
}
try {
    MultiBlockResultTest();
} catch(e78) {
}
function MultiBlockParamTest() {
    f0("MultiBlockParamTest");
    let v47;
    try {
        const v85 = new WasmModuleBuilder();
        v47 = v85;
    } catch(e86) {
    }
    let builder = v47;
    let v50;
    try {
        v50 = builder.addType(kSig_i_ii);
    } catch(e92) {
    }
    let sig_i_ii = v50;
    const v59 = [kExprLocalGet,0,kExprLocalGet,1,kExprBlock,sig_i_ii,kExprI32Add,kExprEnd];
    let v61;
    try {
        v61 = builder.addFunction("main", kSig_i_ii);
    } catch(e107) {
    }
    let v62;
    try {
        v62 = v61.addBody(v59);
    } catch(e111) {
    }
    try {
        v62.exportAs("main");
    } catch(e114) {
    }
    const v65 = WebAssembly?.Module;
    let v66;
    try {
        v66 = builder.toBuffer();
    } catch(e121) {
    }
    let v67;
    try {
        const v124 = new v65(v66);
        v67 = v124;
    } catch(e125) {
    }
    let module = v67;
    const v69 = WebAssembly?.Instance;
    let v70;
    try {
        const v131 = new v69(module);
        v70 = v131;
    } catch(e132) {
    }
    let instance = v70;
    const v74 = instance?.exports;
    let v75;
    try {
        v75 = v74.main(1, 4);
    } catch(e141) {
    }
    try {
        f0(v75, 5);
    } catch(e144) {
    }
}
try {
    MultiBlockParamTest();
} catch(e146) {
}
function MultiBlockBrTest() {
    f0("MultiBlockBrTest");
    let v83;
    try {
        const v153 = new WasmModuleBuilder();
        v83 = v153;
    } catch(e154) {
    }
    let builder = v83;
    let v86;
    try {
        v86 = builder.addType(kSig_i_ii);
    } catch(e160) {
    }
    let sig_i_ii = v86;
    let v89;
    try {
        v89 = builder.addType(kSig_ii_v);
    } catch(e166) {
    }
    let sig_ii_v = v89;
    const v100 = [kExprBlock,sig_ii_v,kExprLocalGet,0,kExprLocalGet,1,kExprBr,0,kExprEnd,kExprI32Add];
    let v102;
    try {
        v102 = builder.addFunction("main", kSig_i_ii);
    } catch(e183) {
    }
    let v103;
    try {
        v103 = v102.addBody(v100);
    } catch(e187) {
    }
    try {
        v103.exportAs("main");
    } catch(e190) {
    }
    const v106 = WebAssembly?.Module;
    let v107;
    try {
        v107 = builder.toBuffer();
    } catch(e197) {
    }
    let v108;
    try {
        const v200 = new v106(v107);
        v108 = v200;
    } catch(e201) {
    }
    let module = v108;
    const v110 = WebAssembly?.Instance;
    let v111;
    try {
        const v207 = new v110(module);
        v111 = v207;
    } catch(e208) {
    }
    let instance = v111;
    const v115 = instance?.exports;
    let v116;
    try {
        v116 = v115.main(1, 4);
    } catch(e217) {
    }
    try {
        f0(v116, 5);
    } catch(e220) {
    }
}
try {
    MultiBlockBrTest();
} catch(e222) {
}
function MultiBlockUnreachableTest() {
    f0(arguments.callee.name);
    let v126;
    try {
        const v231 = new WasmModuleBuilder();
        v126 = v231;
    } catch(e232) {
    }
    let builder = v126;
    const v128 = [];
    const v131 = [kWasmI32,kWasmI64];
    let v133;
    try {
        v133 = makeSig(v128, v131);
    } catch(e244) {
    }
    let v134;
    try {
        v134 = builder.addType(v133);
    } catch(e248) {
    }
    let sig_il_v = v134;
    const v148 = [kExprBlock,sig_il_v,kExprI32Const,1,kExprI64Const,1,kExprBr,0,kExprI32Const,1,kExprI64Const,1,kExprEnd,kExprDrop];
    let v151;
    try {
        v151 = builder.addFunction("main", kSig_i_v);
    } catch(e268) {
    }
    let v152;
    try {
        v152 = v151.addBody(v148);
    } catch(e272) {
    }
    try {
        v152.exportAs("main");
    } catch(e275) {
    }
    const v155 = WebAssembly?.Module;
    let v156;
    try {
        v156 = builder.toBuffer();
    } catch(e282) {
    }
    let v157;
    try {
        const v285 = new v155(v156);
        v157 = v285;
    } catch(e286) {
    }
    let module = v157;
    const v159 = WebAssembly?.Instance;
    let v160;
    try {
        const v292 = new v159(module);
        v160 = v292;
    } catch(e293) {
    }
    let instance = v160;
    const v164 = instance?.exports;
    let v165;
    try {
        v165 = v164.main(1, 2);
    } catch(e302) {
    }
    try {
        f0(v165, 1);
    } catch(e305) {
    }
}
try {
    MultiBlockUnreachableTest();
} catch(e307) {
}
function MultiBlockUnreachableTypeErrorTest() {
    f0(arguments.callee.name);
    let v175;
    try {
        const v316 = new WasmModuleBuilder();
        v175 = v316;
    } catch(e317) {
    }
    let builder = v175;
    const v177 = [];
    const v180 = [kWasmI32,kWasmI64];
    let v182;
    try {
        v182 = makeSig(v177, v180);
    } catch(e329) {
    }
    let v183;
    try {
        v183 = builder.addType(v182);
    } catch(e333) {
    }
    let sig_il_v = v183;
    const v197 = [kExprBlock,sig_il_v,kExprI32Const,1,kExprI64Const,1,kExprBr,0,kExprI64Const,1,kExprI32Const,1,kExprEnd,kExprDrop];
    let v200;
    try {
        v200 = builder.addFunction("main", kSig_i_v);
    } catch(e353) {
    }
    let v201;
    try {
        v201 = v200.addBody(v197);
    } catch(e357) {
    }
    try {
        v201.exportAs("main");
    } catch(e360) {
    }
    const v361 = () => {
        const v205 = WebAssembly?.Module;
        let v206;
        try {
            v206 = builder.toBuffer();
        } catch(e368) {
        }
        let v207;
        try {
            const v371 = new v205(v206);
            v207 = v371;
        } catch(e372) {
        }
        return v207;
    };
    const v203 = v361;
    const v209 = WebAssembly?.CompileError;
    const v210 = /expected type i64, found i32.const/;
    try {
        f0(v203, v209, v210);
    } catch(e380) {
    }
}
try {
    MultiBlockUnreachableTypeErrorTest();
} catch(e382) {
}
function MultiLoopResultTest() {
    f0("MultiLoopResultTest");
    let v217;
    try {
        const v389 = new WasmModuleBuilder();
        v217 = v389;
    } catch(e390) {
    }
    let builder = v217;
    let v220;
    try {
        v220 = builder.addType(kSig_i_ii);
    } catch(e396) {
    }
    let sig_i_ii = v220;
    let v223;
    try {
        v223 = builder.addType(kSig_ii_v);
    } catch(e402) {
    }
    let sig_ii_v = v223;
    const v232 = [kExprLoop,sig_ii_v,kExprLocalGet,0,kExprLocalGet,1,kExprEnd,kExprI32Add];
    let v234;
    try {
        v234 = builder.addFunction("main", kSig_i_ii);
    } catch(e417) {
    }
    let v235;
    try {
        v235 = v234.addBody(v232);
    } catch(e421) {
    }
    try {
        v235.exportAs("main");
    } catch(e424) {
    }
    const v238 = WebAssembly?.Module;
    let v239;
    try {
        v239 = builder.toBuffer();
    } catch(e431) {
    }
    let v240;
    try {
        const v434 = new v238(v239);
        v240 = v434;
    } catch(e435) {
    }
    let module = v240;
    const v242 = WebAssembly?.Instance;
    let v243;
    try {
        const v441 = new v242(module);
        v243 = v441;
    } catch(e442) {
    }
    let instance = v243;
    const v247 = instance?.exports;
    let v248;
    try {
        v248 = v247.main(1, 4);
    } catch(e451) {
    }
    try {
        f0(v248, 5);
    } catch(e454) {
    }
}
try {
    MultiLoopResultTest();
} catch(e456) {
}
function MultiLoopParamTest() {
    f0("MultiLoopParamTest");
    let v256;
    try {
        const v463 = new WasmModuleBuilder();
        v256 = v463;
    } catch(e464) {
    }
    let builder = v256;
    let v259;
    try {
        v259 = builder.addType(kSig_i_ii);
    } catch(e470) {
    }
    let sig_i_ii = v259;
    const v268 = [kExprLocalGet,0,kExprLocalGet,1,kExprLoop,sig_i_ii,kExprI32Add,kExprEnd];
    let v270;
    try {
        v270 = builder.addFunction("main", kSig_i_ii);
    } catch(e485) {
    }
    let v271;
    try {
        v271 = v270.addBody(v268);
    } catch(e489) {
    }
    try {
        v271.exportAs("main");
    } catch(e492) {
    }
    const v274 = WebAssembly?.Module;
    let v275;
    try {
        v275 = builder.toBuffer();
    } catch(e499) {
    }
    let v276;
    try {
        const v502 = new v274(v275);
        v276 = v502;
    } catch(e503) {
    }
    let module = v276;
    const v278 = WebAssembly?.Instance;
    let v279;
    try {
        const v509 = new v278(module);
        v279 = v509;
    } catch(e510) {
    }
    let instance = v279;
    const v283 = instance?.exports;
    let v284;
    try {
        v284 = v283.main(1, 4);
    } catch(e519) {
    }
    try {
        f0(v284, 5);
    } catch(e522) {
    }
}
try {
    MultiLoopParamTest();
} catch(e524) {
}
function MultiLoopBrTest() {
    f0("MultiLoopBrTest");
    let v292;
    try {
        const v531 = new WasmModuleBuilder();
        v292 = v531;
    } catch(e532) {
    }
    let builder = v292;
    let v295;
    try {
        v295 = builder.addType(kSig_i_ii);
    } catch(e538) {
    }
    let sig_i_ii = v295;
    let v298;
    try {
        v298 = builder.addType(kSig_ii_i);
    } catch(e544) {
    }
    let sig_ii_i = v298;
    let v301;
    try {
        v301 = builder.addType(kSig_ii_ii);
    } catch(e550) {
    }
    let sig_ii_ii = v301;
    const v306 = [kExprLocalGet,0,kExprLocalGet,0];
    let v308;
    try {
        v308 = builder.addFunction("dup", kSig_ii_i);
    } catch(e562) {
    }
    try {
        v308.addBody(v306);
    } catch(e564) {
    }
    const v312 = [kExprLocalGet,1,kExprLocalGet,0];
    let v314;
    try {
        v314 = builder.addFunction("swap", kSig_ii_ii);
    } catch(e574) {
    }
    try {
        v314.addBody(v312);
    } catch(e576) {
    }
    const v332 = [kExprLocalGet,0,kExprLocalGet,1,kExprLoop,sig_ii_ii,kExprCallFunction,1,kExprCallFunction,0,kExprI32Add,kExprCallFunction,0,kExprI32Const,20,kExprI32LeU,kExprBrIf,0,kExprEnd,kExprDrop];
    let v334;
    try {
        v334 = builder.addFunction("main", kSig_i_ii);
    } catch(e599) {
    }
    let v335;
    try {
        v335 = v334.addBody(v332);
    } catch(e603) {
    }
    try {
        v335.exportAs("main");
    } catch(e606) {
    }
    const v338 = WebAssembly?.Module;
    let v339;
    try {
        v339 = builder.toBuffer();
    } catch(e613) {
    }
    let v340;
    try {
        const v616 = new v338(v339);
        v340 = v616;
    } catch(e617) {
    }
    let module = v340;
    const v342 = WebAssembly?.Instance;
    let v343;
    try {
        const v623 = new v342(module);
        v343 = v623;
    } catch(e624) {
    }
    let instance = v343;
    const v348 = instance?.exports;
    let v349;
    try {
        v349 = v348.main(0, 1);
    } catch(e633) {
    }
    try {
        f0(0, v349);
    } catch(e636) {
    }
    const v354 = instance?.exports;
    let v355;
    try {
        v355 = v354.main(1, 1);
    } catch(e644) {
    }
    try {
        f0(16, v355);
    } catch(e647) {
    }
    const v360 = instance?.exports;
    let v361;
    try {
        v361 = v360.main(3, 1);
    } catch(e655) {
    }
    try {
        f0(4, v361);
    } catch(e658) {
    }
    const v366 = instance?.exports;
    let v367;
    try {
        v367 = v366.main(4, 1);
    } catch(e666) {
    }
    try {
        f0(4, v367);
    } catch(e669) {
    }
    const v372 = instance?.exports;
    let v373;
    try {
        v373 = v372.main(0, 2);
    } catch(e677) {
    }
    try {
        f0(0, v373);
    } catch(e680) {
    }
    const v378 = instance?.exports;
    let v379;
    try {
        v379 = v378.main(1, 2);
    } catch(e688) {
    }
    try {
        f0(16, v379);
    } catch(e691) {
    }
    const v384 = instance?.exports;
    let v385;
    try {
        v385 = v384.main(3, 2);
    } catch(e699) {
    }
    try {
        f0(8, v385);
    } catch(e702) {
    }
    const v390 = instance?.exports;
    let v391;
    try {
        v391 = v390.main(4, 2);
    } catch(e710) {
    }
    try {
        f0(8, v391);
    } catch(e713) {
    }
    const v396 = instance?.exports;
    let v397;
    try {
        v397 = v396.main(0, 3);
    } catch(e721) {
    }
    try {
        f0(0, v397);
    } catch(e724) {
    }
    const v402 = instance?.exports;
    let v403;
    try {
        v403 = v402.main(1, 3);
    } catch(e732) {
    }
    try {
        f0(8, v403);
    } catch(e735) {
    }
    const v408 = instance?.exports;
    let v409;
    try {
        v409 = v408.main(3, 3);
    } catch(e743) {
    }
    try {
        f0(12, v409);
    } catch(e746) {
    }
    const v414 = instance?.exports;
    let v415;
    try {
        v415 = v414.main(4, 3);
    } catch(e754) {
    }
    try {
        f0(12, v415);
    } catch(e757) {
    }
    const v420 = instance?.exports;
    let v421;
    try {
        v421 = v420.main(0, 4);
    } catch(e765) {
    }
    try {
        f0(0, v421);
    } catch(e768) {
    }
    const v426 = instance?.exports;
    let v427;
    try {
        v427 = v426.main(1, 4);
    } catch(e776) {
    }
    try {
        f0(8, v427);
    } catch(e779) {
    }
    const v432 = instance?.exports;
    let v433;
    try {
        v433 = v432.main(3, 4);
    } catch(e787) {
    }
    try {
        f0(16, v433);
    } catch(e790) {
    }
    const v438 = instance?.exports;
    let v439;
    try {
        v439 = v438.main(4, 4);
    } catch(e798) {
    }
    try {
        f0(16, v439);
    } catch(e801) {
    }
    const v444 = instance?.exports;
    let v445;
    try {
        v445 = v444.main(100, 3);
    } catch(e809) {
    }
    try {
        f0(3, v445);
    } catch(e812) {
    }
    const v450 = instance?.exports;
    let v451;
    try {
        v451 = v450.main(3, 100);
    } catch(e820) {
    }
    try {
        f0(6, v451);
    } catch(e823) {
    }
}
try {
    MultiLoopBrTest();
} catch(e825) {
}
function MultiIfResultTest() {
    f0("MultiIfResultTest");
    let v458;
    try {
        const v832 = new WasmModuleBuilder();
        v458 = v832;
    } catch(e833) {
    }
    let builder = v458;
    let v461;
    try {
        v461 = builder.addType(kSig_i_ii);
    } catch(e839) {
    }
    let sig_i_ii = v461;
    let v464;
    try {
        v464 = builder.addType(kSig_ii_v);
    } catch(e845) {
    }
    let sig_ii_v = v464;
    const v477 = [kExprLocalGet,0,kExprIf,sig_ii_v,kExprLocalGet,0,kExprLocalGet,1,kExprElse,kExprLocalGet,1,kExprLocalGet,0,kExprEnd,kExprI32Sub];
    let v479;
    try {
        v479 = builder.addFunction("main", kSig_i_ii);
    } catch(e864) {
    }
    let v480;
    try {
        v480 = v479.addBody(v477);
    } catch(e868) {
    }
    try {
        v480.exportAs("main");
    } catch(e871) {
    }
    const v483 = WebAssembly?.Module;
    let v484;
    try {
        v484 = builder.toBuffer();
    } catch(e878) {
    }
    let v485;
    try {
        const v881 = new v483(v484);
        v485 = v881;
    } catch(e882) {
    }
    let module = v485;
    const v487 = WebAssembly?.Instance;
    let v488;
    try {
        const v888 = new v487(module);
        v488 = v888;
    } catch(e889) {
    }
    let instance = v488;
    const v492 = instance?.exports;
    let v493;
    try {
        v493 = v492.main(8, 3);
    } catch(e898) {
    }
    try {
        f0(v493, 5);
    } catch(e901) {
    }
    const v498 = instance?.exports;
    let v499;
    try {
        v499 = v498.main(0, 3);
    } catch(e909) {
    }
    try {
        f0(v499, 3);
    } catch(e912) {
    }
}
try {
    MultiIfResultTest();
} catch(e914) {
}
function MultiIfParamTest() {
    f0("MultiIfParamTest");
    let v507;
    try {
        const v921 = new WasmModuleBuilder();
        v507 = v921;
    } catch(e922) {
    }
    let builder = v507;
    let v510;
    try {
        v510 = builder.addType(kSig_i_ii);
    } catch(e928) {
    }
    let sig_i_ii = v510;
    const v522 = [kExprLocalGet,0,kExprLocalGet,1,kExprLocalGet,0,kExprIf,sig_i_ii,kExprI32Add,kExprElse,kExprI32Sub,kExprEnd];
    let v524;
    try {
        v524 = builder.addFunction("main", kSig_i_ii);
    } catch(e946) {
    }
    let v525;
    try {
        v525 = v524.addBody(v522);
    } catch(e950) {
    }
    try {
        v525.exportAs("main");
    } catch(e953) {
    }
    const v528 = WebAssembly?.Module;
    let v529;
    try {
        v529 = builder.toBuffer();
    } catch(e960) {
    }
    let v530;
    try {
        const v963 = new v528(v529);
        v530 = v963;
    } catch(e964) {
    }
    let module = v530;
    const v532 = WebAssembly?.Instance;
    let v533;
    try {
        const v970 = new v532(module);
        v533 = v970;
    } catch(e971) {
    }
    let instance = v533;
    const v537 = instance?.exports;
    let v538;
    try {
        v538 = v537.main(1, 4);
    } catch(e980) {
    }
    try {
        f0(v538, 5);
    } catch(e983) {
    }
    const v543 = instance?.exports;
    let v544;
    try {
        v544 = v543.main(0, 4);
    } catch(e991) {
    }
    const v546 = -4;
    try {
        f0(v544, v546);
    } catch(e996) {
    }
}
try {
    MultiIfParamTest();
} catch(e998) {
}
function MultiIfBrTest() {
    f0("MultiIfBrTest");
    let v553;
    try {
        const v1005 = new WasmModuleBuilder();
        v553 = v1005;
    } catch(e1006) {
    }
    let builder = v553;
    let v556;
    try {
        v556 = builder.addType(kSig_i_ii);
    } catch(e1012) {
    }
    let sig_i_ii = v556;
    let v559;
    try {
        v559 = builder.addType(kSig_ii_v);
    } catch(e1018) {
    }
    let sig_ii_v = v559;
    const v575 = [kExprLocalGet,0,kExprIf,sig_ii_v,kExprLocalGet,0,kExprLocalGet,1,kExprBr,0,kExprElse,kExprLocalGet,1,kExprLocalGet,0,kExprBr,0,kExprEnd,kExprI32Sub];
    let v577;
    try {
        v577 = builder.addFunction("main", kSig_i_ii);
    } catch(e1040) {
    }
    let v578;
    try {
        v578 = v577.addBody(v575);
    } catch(e1044) {
    }
    try {
        v578.exportAs("main");
    } catch(e1047) {
    }
    const v581 = WebAssembly?.Module;
    let v582;
    try {
        v582 = builder.toBuffer();
    } catch(e1054) {
    }
    let v583;
    try {
        const v1057 = new v581(v582);
        v583 = v1057;
    } catch(e1058) {
    }
    let module = v583;
    const v585 = WebAssembly?.Instance;
    let v586;
    try {
        const v1064 = new v585(module);
        v586 = v1064;
    } catch(e1065) {
    }
    let instance = v586;
    const v590 = instance?.exports;
    let v591;
    try {
        v591 = v590.main(8, 3);
    } catch(e1074) {
    }
    try {
        f0(v591, 5);
    } catch(e1077) {
    }
    const v596 = instance?.exports;
    let v597;
    try {
        v597 = v596.main(0, 3);
    } catch(e1085) {
    }
    try {
        f0(v597, 3);
    } catch(e1088) {
    }
}
try {
    MultiIfBrTest();
} catch(e1090) {
}
function MultiIfParamOneArmedTest() {
    f0("MultiIfParamOneArmedTest");
    let v605;
    try {
        const v1097 = new WasmModuleBuilder();
        v605 = v1097;
    } catch(e1098) {
    }
    let builder = v605;
    let v608;
    try {
        v608 = builder.addType(kSig_i_i);
    } catch(e1104) {
    }
    let sig_i_i = v608;
    const v619 = [kExprLocalGet,0,kExprLocalGet,0,kExprIf,sig_i_i,kExprI32Const,5,kExprI32Add,kExprEnd];
    let v621;
    try {
        v621 = builder.addFunction("main", kSig_i_i);
    } catch(e1121) {
    }
    let v622;
    try {
        v622 = v621.addBody(v619);
    } catch(e1125) {
    }
    try {
        v622.exportAs("main");
    } catch(e1128) {
    }
    const v625 = WebAssembly?.Module;
    let v626;
    try {
        v626 = builder.toBuffer();
    } catch(e1135) {
    }
    let v627;
    try {
        const v1138 = new v625(v626);
        v627 = v1138;
    } catch(e1139) {
    }
    let module = v627;
    const v629 = WebAssembly?.Instance;
    let v630;
    try {
        const v1145 = new v629(module);
        v630 = v1145;
    } catch(e1146) {
    }
    let instance = v630;
    const v633 = instance?.exports;
    let v634;
    try {
        v634 = v633.main(0);
    } catch(e1154) {
    }
    try {
        f0(v634, 0);
    } catch(e1157) {
    }
    const v638 = instance?.exports;
    let v639;
    try {
        v639 = v638.main(1);
    } catch(e1164) {
    }
    try {
        f0(v639, 6);
    } catch(e1167) {
    }
}
try {
    MultiIfParamOneArmedTest();
} catch(e1169) {
}
function MultiIfOneArmedNoTypeCheckTest() {
    f0(arguments.callee.name);
    let v649;
    try {
        const v1178 = new WasmModuleBuilder();
        v649 = v1178;
    } catch(e1179) {
    }
    let builder = v649;
    let v652;
    try {
        v652 = builder.addType(kSig_i_l);
    } catch(e1185) {
    }
    let sig_i_l = v652;
    const v662 = [kExprI64Const,0,kExprI32Const,0,kExprIf,sig_i_l,kExprDrop,kExprI32Const,0,kExprEnd];
    let v665;
    try {
        v665 = builder.addFunction("main", kSig_i_v);
    } catch(e1202) {
    }
    try {
        v665.addBody(v662);
    } catch(e1204) {
    }
    const v1205 = () => {
        const v669 = WebAssembly?.Module;
        let v670;
        try {
            v670 = builder.toBuffer();
        } catch(e1212) {
        }
        let v671;
        try {
            const v1215 = new v669(v670);
            v671 = v1215;
        } catch(e1216) {
        }
        return v671;
    };
    const v667 = v1205;
    const v673 = WebAssembly?.CompileError;
    const v674 = /expected i32, got i64/;
    try {
        f0(v667, v673, v674);
    } catch(e1224) {
    }
}
try {
    MultiIfOneArmedNoTypeCheckTest();
} catch(e1226) {
}
function MultiResultTest() {
    f0("MultiResultTest");
    let v681;
    try {
        const v1233 = new WasmModuleBuilder();
        v681 = v1233;
    } catch(e1234) {
    }
    let builder = v681;
    let v684;
    try {
        v684 = builder.addType(kSig_i_ii);
    } catch(e1240) {
    }
    let sig_i_ii = v684;
    let v687;
    try {
        v687 = builder.addType(kSig_iii_ii);
    } catch(e1246) {
    }
    let sig_iii_ii = v687;
    const v695 = [kExprLocalGet,0,kExprLocalGet,1,kExprLocalGet,0,kExprLocalGet,1,kExprI32Sub];
    let v697;
    try {
        v697 = builder.addFunction("callee", kSig_iii_ii);
    } catch(e1261) {
    }
    try {
        v697.addBody(v695);
    } catch(e1263) {
    }
    const v706 = [kExprLocalGet,0,kExprLocalGet,1,kExprCallFunction,0,kExprI32Mul,kExprI32Add];
    let v708;
    try {
        v708 = builder.addFunction("main", kSig_i_ii);
    } catch(e1277) {
    }
    let v709;
    try {
        v709 = v708.addBody(v706);
    } catch(e1281) {
    }
    try {
        v709.exportAs("main");
    } catch(e1284) {
    }
    const v712 = WebAssembly?.Module;
    let v713;
    try {
        v713 = builder.toBuffer();
    } catch(e1291) {
    }
    let v714;
    try {
        const v1294 = new v712(v713);
        v714 = v1294;
    } catch(e1295) {
    }
    let module = v714;
    const v716 = WebAssembly?.Instance;
    let v717;
    try {
        const v1301 = new v716(module);
        v717 = v1301;
    } catch(e1302) {
    }
    let instance = v717;
    const v721 = instance?.exports;
    let v722;
    try {
        v722 = v721.main(0, 0);
    } catch(e1311) {
    }
    try {
        f0(v722, 0);
    } catch(e1314) {
    }
    const v727 = instance?.exports;
    let v728;
    try {
        v728 = v727.main(1, 0);
    } catch(e1322) {
    }
    try {
        f0(v728, 1);
    } catch(e1325) {
    }
    const v733 = instance?.exports;
    let v734;
    try {
        v734 = v733.main(2, 0);
    } catch(e1333) {
    }
    try {
        f0(v734, 2);
    } catch(e1336) {
    }
    const v739 = instance?.exports;
    let v740;
    try {
        v740 = v739.main(0, 1);
    } catch(e1344) {
    }
    const v742 = -1;
    try {
        f0(v740, v742);
    } catch(e1349) {
    }
    const v746 = instance?.exports;
    let v747;
    try {
        v747 = v746.main(0, 2);
    } catch(e1357) {
    }
    const v749 = -4;
    try {
        f0(v747, v749);
    } catch(e1362) {
    }
    const v753 = instance?.exports;
    let v754;
    try {
        v754 = v753.main(3, 4);
    } catch(e1370) {
    }
    const v756 = -1;
    try {
        f0(v754, v756);
    } catch(e1375) {
    }
    const v760 = instance?.exports;
    let v761;
    try {
        v761 = v760.main(4, 3);
    } catch(e1383) {
    }
    try {
        f0(v761, 7);
    } catch(e1386) {
    }
}
try {
    MultiResultTest();
} catch(e1388) {
}
function MultiReturnTest() {
    f0("MultiReturnTest");
    let v769;
    try {
        const v1395 = new WasmModuleBuilder();
        v769 = v1395;
    } catch(e1396) {
    }
    let builder = v769;
    let v772;
    try {
        v772 = builder.addType(kSig_i_i);
    } catch(e1402) {
    }
    let sig_i_i = v772;
    let v775;
    try {
        v775 = builder.addType(kSig_ii_i);
    } catch(e1408) {
    }
    let sig_ii_i = v775;
    const v783 = [kExprLocalGet,0,kExprLocalGet,0,kExprLocalGet,0,kExprI32Add,kExprReturn];
    let v785;
    try {
        v785 = builder.addFunction("callee", kSig_ii_i);
    } catch(e1423) {
    }
    try {
        v785.addBody(v783);
    } catch(e1425) {
    }
    const v792 = [kExprLocalGet,0,kExprCallFunction,0,kExprI32Mul];
    let v794;
    try {
        v794 = builder.addFunction("main", kSig_i_i);
    } catch(e1437) {
    }
    let v795;
    try {
        v795 = v794.addBody(v792);
    } catch(e1441) {
    }
    try {
        v795.exportAs("main");
    } catch(e1444) {
    }
    const v798 = WebAssembly?.Module;
    let v799;
    try {
        v799 = builder.toBuffer();
    } catch(e1451) {
    }
    let v800;
    try {
        const v1454 = new v798(v799);
        v800 = v1454;
    } catch(e1455) {
    }
    let module = v800;
    const v802 = WebAssembly?.Instance;
    let v803;
    try {
        const v1461 = new v802(module);
        v803 = v1461;
    } catch(e1462) {
    }
    let instance = v803;
    const v806 = instance?.exports;
    let v807;
    try {
        v807 = v806.main(0);
    } catch(e1470) {
    }
    try {
        f0(v807, 0);
    } catch(e1473) {
    }
    const v811 = instance?.exports;
    let v812;
    try {
        v812 = v811.main(1);
    } catch(e1480) {
    }
    try {
        f0(v812, 2);
    } catch(e1483) {
    }
    const v816 = instance?.exports;
    let v817;
    try {
        v817 = v816.main(2);
    } catch(e1490) {
    }
    try {
        f0(v817, 8);
    } catch(e1493) {
    }
    const v821 = instance?.exports;
    let v822;
    try {
        v822 = v821.main(10);
    } catch(e1500) {
    }
    try {
        f0(v822, 200);
    } catch(e1503) {
    }
}
try {
    MultiReturnTest();
} catch(e1505) {
}
function MultiBrReturnTest() {
    f0("MultiBrReturnTest");
    let v830;
    try {
        const v1512 = new WasmModuleBuilder();
        v830 = v1512;
    } catch(e1513) {
    }
    let builder = v830;
    let v833;
    try {
        v833 = builder.addType(kSig_i_i);
    } catch(e1519) {
    }
    let sig_i_i = v833;
    let v836;
    try {
        v836 = builder.addType(kSig_ii_i);
    } catch(e1525) {
    }
    let sig_ii_i = v836;
    const v845 = [kExprLocalGet,0,kExprLocalGet,0,kExprLocalGet,0,kExprI32Add,kExprBr,0];
    let v847;
    try {
        v847 = builder.addFunction("callee", kSig_ii_i);
    } catch(e1541) {
    }
    try {
        v847.addBody(v845);
    } catch(e1543) {
    }
    const v854 = [kExprLocalGet,0,kExprCallFunction,0,kExprI32Mul];
    let v856;
    try {
        v856 = builder.addFunction("main", kSig_i_i);
    } catch(e1555) {
    }
    let v857;
    try {
        v857 = v856.addBody(v854);
    } catch(e1559) {
    }
    try {
        v857.exportAs("main");
    } catch(e1562) {
    }
    const v860 = WebAssembly?.Module;
    let v861;
    try {
        v861 = builder.toBuffer();
    } catch(e1569) {
    }
    let v862;
    try {
        const v1572 = new v860(v861);
        v862 = v1572;
    } catch(e1573) {
    }
    let module = v862;
    const v864 = WebAssembly?.Instance;
    let v865;
    try {
        const v1579 = new v864(module);
        v865 = v1579;
    } catch(e1580) {
    }
    let instance = v865;
    const v868 = instance?.exports;
    let v869;
    try {
        v869 = v868.main(0);
    } catch(e1588) {
    }
    try {
        f0(v869, 0);
    } catch(e1591) {
    }
    const v873 = instance?.exports;
    let v874;
    try {
        v874 = v873.main(1);
    } catch(e1598) {
    }
    try {
        f0(v874, 2);
    } catch(e1601) {
    }
    const v878 = instance?.exports;
    let v879;
    try {
        v879 = v878.main(2);
    } catch(e1608) {
    }
    try {
        f0(v879, 8);
    } catch(e1611) {
    }
    const v883 = instance?.exports;
    let v884;
    try {
        v884 = v883.main(10);
    } catch(e1618) {
    }
    try {
        f0(v884, 200);
    } catch(e1621) {
    }
}
try {
    MultiBrReturnTest();
} catch(e1623) {
}
function MultiBrTableTest() {
    f0(arguments.callee.name);
    let v894;
    try {
        const v1632 = new WasmModuleBuilder();
        v894 = v1632;
    } catch(e1633) {
    }
    let builder = v894;
    let v897;
    try {
        v897 = builder.addType(kSig_v_v);
    } catch(e1639) {
    }
    let sig_ii_v = v897;
    const v908 = [kExprI32Const,1,kExprI32Const,2,kExprI32Const,0,kExprBrTable,1,0,0];
    let v911;
    try {
        v911 = builder.addFunction("main", kSig_ii_v);
    } catch(e1656) {
    }
    let v912;
    try {
        v912 = v911.addBody(v908);
    } catch(e1660) {
    }
    try {
        v912.exportAs("main");
    } catch(e1663) {
    }
    let v914;
    try {
        v914 = builder.instantiate();
    } catch(e1667) {
    }
    let instance = v914;
    const v916 = instance?.exports;
    let v917;
    try {
        v917 = v916.main();
    } catch(e1674) {
    }
    const v920 = [1,2];
    try {
        f0(v917, v920);
    } catch(e1680) {
    }
}
try {
    MultiBrTableTest();
} catch(e1682) {
}
function MultiUnreachablePolymorphicTest() {
    f0(arguments.callee.name);
    let v929;
    try {
        const v1691 = new WasmModuleBuilder();
        v929 = v1691;
    } catch(e1692) {
    }
    let builder = v929;
    let v932;
    try {
        v932 = builder.addType(kSig_v_i);
    } catch(e1698) {
    }
    let sig_v_i = v932;
    let v935;
    try {
        v935 = builder.addType(kSig_i_i);
    } catch(e1704) {
    }
    let sig_i_i = v935;
    const v942 = [kExprReturn,kExprBlock,sig_v_i,kExprDrop,kExprEnd];
    let v945;
    try {
        v945 = builder.addFunction("block", kSig_v_v);
    } catch(e1717) {
    }
    let v946;
    try {
        v946 = v945.addBody(v942);
    } catch(e1721) {
    }
    try {
        v946.exportAs("block");
    } catch(e1724) {
    }
    const v951 = [kExprReturn,kExprIf,sig_v_i,kExprDrop,kExprElse,kExprDrop,kExprEnd];
    let v953;
    try {
        v953 = builder.addFunction("if_else", kSig_v_v);
    } catch(e1734) {
    }
    let v954;
    try {
        v954 = v953.addBody(v951);
    } catch(e1738) {
    }
    try {
        v954.exportAs("if_else");
    } catch(e1741) {
    }
    const v958 = [kExprReturn,kExprLoop,sig_i_i,kExprEnd,kExprDrop];
    let v960;
    try {
        v960 = builder.addFunction("loop", kSig_v_v);
    } catch(e1750) {
    }
    let v961;
    try {
        v961 = v960.addBody(v958);
    } catch(e1754) {
    }
    try {
        v961.exportAs("loop");
    } catch(e1757) {
    }
    let v963;
    try {
        v963 = builder.instantiate();
    } catch(e1761) {
    }
    let instance = v963;
    const v965 = instance?.exports;
    try {
        v965.block();
    } catch(e1766) {
    }
    const v967 = instance?.exports;
    try {
        v967.if_else();
    } catch(e1770) {
    }
    const v969 = instance?.exports;
    try {
        v969.loop();
    } catch(e1774) {
    }
}
try {
    MultiUnreachablePolymorphicTest();
} catch(e1776) {
}
function MultiWasmToJSReturnTest() {
    f0(arguments.callee.name);
    let v978;
    try {
        const v1785 = new WasmModuleBuilder();
        v978 = v1785;
    } catch(e1786) {
    }
    let builder = v978;
    const v982 = [kWasmI32,kWasmF32];
    const v983 = [kWasmF32,kWasmI32];
    let v985;
    try {
        v985 = makeSig(v982, v983);
    } catch(e1798) {
    }
    let sig_fi_if = v985;
    const v991 = [kExprLocalGet,1,kExprLocalGet,0];
    let v993;
    try {
        v993 = builder.addFunction("swap", sig_fi_if);
    } catch(e1809) {
    }
    let v994;
    try {
        v994 = v993.addBody(v991);
    } catch(e1813) {
    }
    try {
        v994.exportAs("swap");
    } catch(e1816) {
    }
    const v1006 = [kExprLocalGet,0,kExprLocalGet,0,kExprI32Add,kExprLocalGet,0,kExprLocalGet,0,kExprI32Sub,kExprLocalGet,0,kExprLocalGet,0,kExprI32Mul];
    let v1009;
    try {
        v1009 = builder.addFunction("addsubmul", kSig_iii_i);
    } catch(e1833) {
    }
    let v1010;
    try {
        v1010 = v1009.addBody(v1006);
    } catch(e1837) {
    }
    try {
        v1010.exportAs("addsubmul");
    } catch(e1840) {
    }
    const v1013 = WebAssembly?.Module;
    let v1014;
    try {
        v1014 = builder.toBuffer();
    } catch(e1847) {
    }
    let v1015;
    try {
        const v1850 = new v1013(v1014);
        v1015 = v1850;
    } catch(e1851) {
    }
    let module = v1015;
    const v1017 = WebAssembly?.Instance;
    let v1018;
    try {
        const v1857 = new v1017(module);
        v1018 = v1857;
    } catch(e1858) {
    }
    let instance = v1018;
    const v1022 = instance?.exports;
    let v1023;
    try {
        v1023 = v1022.swap(0, 1.5);
    } catch(e1867) {
    }
    const v1026 = [1.5,0];
    try {
        f0(v1023, v1026);
    } catch(e1873) {
    }
    const v1030 = instance?.exports;
    let v1031;
    try {
        v1031 = v1030.swap(2, 3.75);
    } catch(e1881) {
    }
    const v1034 = [3.75,2];
    try {
        f0(v1031, v1034);
    } catch(e1887) {
    }
    const v1037 = instance?.exports;
    let v1038;
    try {
        v1038 = v1037.addsubmul(4);
    } catch(e1894) {
    }
    const v1042 = [8,0,16];
    try {
        f0(v1038, v1042);
    } catch(e1901) {
    }
    const v1045 = instance?.exports;
    let v1046;
    try {
        v1046 = v1045.addsubmul(5);
    } catch(e1908) {
    }
    const v1050 = [10,0,25];
    try {
        f0(v1046, v1050);
    } catch(e1915) {
    }
}
try {
    MultiWasmToJSReturnTest();
} catch(e1917) {
}
function MultiJSToWasmReturnTest() {
    f0(arguments.callee.name);
    let v1059;
    try {
        const v1926 = new WasmModuleBuilder();
        v1059 = v1926;
    } catch(e1927) {
    }
    let builder = v1059;
    function swap(a1930, a1931) {
        return [a1931,a1930];
    }
    function swap_proxy(a1934, a1935) {
        const v1069 = [a1935,a1934];
        function f1070(a1939, a1940) {
            let v1074;
            try {
                v1074 = Reflect.get(a1939, a1940);
            } catch(e1945) {
            }
            return v1074;
        }
        const v1075 = { get: f1070 };
        let v1076;
        try {
            const v1951 = new Proxy(v1069, v1075);
            v1076 = v1951;
        } catch(e1952) {
        }
        return v1076;
    }
    function proxy_throw(a1954, a1955) {
        const v1081 = [a1955,a1954];
        function f1082(a1959, a1960) {
            if (a1960 == 1) {
                let v1089;
                try {
                    const v1967 = new Error("abc");
                    v1089 = v1967;
                } catch(e1968) {
                }
                throw v1089;
            }
            let v1091;
            try {
                v1091 = Reflect.get(a1959, a1960);
            } catch(e1973) {
            }
            return v1091;
        }
        const v1092 = { get: f1082 };
        let v1093;
        try {
            const v1979 = new Proxy(v1081, v1092);
            v1093 = v1979;
        } catch(e1980) {
        }
        return v1093;
    }
    function drop_first(a1982, a1983) {
        return [a1983];
    }
    function repeat(a1986, a1987) {
        return [a1986,a1987,a1986,a1987];
    }
    function not_receiver(a1990, a1991) {
        return 0;
    }
    function not_iterable(a1994, a1995) {
        a = [a1994,a1995];
        a[Symbol?.iterator] = undefined;
        return a;
    }
    function* generator(a2003, a2004) {
        yield a2003;
        yield a2004;
    }
    function* generator_throw(a2008, a2009) {
        yield a2008;
        let v1126;
        try {
            const v2015 = new Error("def");
            v1126 = v2015;
        } catch(e2016) {
        }
        throw v1126;
    }
    try {
        builder.addImport("imports", "f", kSig_ii_ii);
    } catch(e2021) {
    }
    const v1137 = [kExprLocalGet,0,kExprLocalGet,1,kExprCallFunction,0];
    let v1139;
    try {
        v1139 = builder.addFunction("main", kSig_ii_ii);
    } catch(e2034) {
    }
    let v1140;
    try {
        v1140 = v1139.addBody(v1137);
    } catch(e2038) {
    }
    try {
        v1140.exportAs("main");
    } catch(e2041) {
    }
    const v1143 = WebAssembly?.Module;
    let v1144;
    try {
        v1144 = builder.toBuffer();
    } catch(e2048) {
    }
    let v1145;
    try {
        const v2051 = new v1143(v1144);
        v1145 = v2051;
    } catch(e2052) {
    }
    let module = v1145;
    const v1147 = WebAssembly?.Instance;
    const v1148 = { f: swap };
    const v1149 = { imports: v1148 };
    let v1150;
    try {
        const v2062 = new v1147(module, v1149);
        v1150 = v2062;
    } catch(e2063) {
    }
    var instance = v1150;
    const v1154 = instance?.exports;
    let v1155;
    try {
        v1155 = v1154.main(1, 2);
    } catch(e2072) {
    }
    const v1158 = [2,1];
    try {
        f0(v1155, v1158);
    } catch(e2078) {
    }
    const v1160 = WebAssembly?.Instance;
    const v1161 = { f: swap_proxy };
    const v1162 = { imports: v1161 };
    let v1163;
    try {
        const v2087 = new v1160(module, v1162);
        v1163 = v2087;
    } catch(e2088) {
    }
    instance = v1163;
    const v1166 = instance?.exports;
    let v1167;
    try {
        v1167 = v1166.main(1, 2);
    } catch(e2096) {
    }
    const v1170 = [2,1];
    try {
        f0(v1167, v1170);
    } catch(e2102) {
    }
    const v1172 = WebAssembly?.Instance;
    const v1173 = { f: generator };
    const v1174 = { imports: v1173 };
    let v1175;
    try {
        const v2111 = new v1172(module, v1174);
        v1175 = v2111;
    } catch(e2112) {
    }
    instance = v1175;
    const v1178 = instance?.exports;
    let v1179;
    try {
        v1179 = v1178.main(1, 2);
    } catch(e2120) {
    }
    const v1182 = [1,2];
    try {
        f0(v1179, v1182);
    } catch(e2126) {
    }
    const v1184 = WebAssembly?.Instance;
    const v1185 = { f: drop_first };
    const v1186 = { imports: v1185 };
    let v1187;
    try {
        const v2135 = new v1184(module, v1186);
        v1187 = v2135;
    } catch(e2136) {
    }
    instance = v1187;
    const v2137 = () => {
        const v1191 = instance?.exports;
        let v1192;
        try {
            v1192 = v1191.main(1, 2);
        } catch(e2145) {
        }
        return v1192;
    };
    const v1188 = v2137;
    try {
        f0(v1188, TypeError, "multi-return length mismatch");
    } catch(e2150) {
    }
    const v1196 = WebAssembly?.Instance;
    const v1197 = { f: repeat };
    const v1198 = { imports: v1197 };
    let v1199;
    try {
        const v2159 = new v1196(module, v1198);
        v1199 = v2159;
    } catch(e2160) {
    }
    instance = v1199;
    const v2161 = () => {
        const v1203 = instance?.exports;
        let v1204;
        try {
            v1204 = v1203.main(1, 2);
        } catch(e2169) {
        }
        return v1204;
    };
    const v1200 = v2161;
    try {
        f0(v1200, TypeError, "multi-return length mismatch");
    } catch(e2174) {
    }
    const v1207 = WebAssembly?.Instance;
    const v1208 = { f: proxy_throw };
    const v1209 = { imports: v1208 };
    let v1210;
    try {
        const v2183 = new v1207(module, v1209);
        v1210 = v2183;
    } catch(e2184) {
    }
    instance = v1210;
    const v2185 = () => {
        const v1214 = instance?.exports;
        let v1215;
        try {
            v1215 = v1214.main(1, 2);
        } catch(e2193) {
        }
        return v1215;
    };
    const v1211 = v2185;
    try {
        f0(v1211, Error, "abc");
    } catch(e2198) {
    }
    const v1219 = WebAssembly?.Instance;
    const v1220 = { f: not_receiver };
    const v1221 = { imports: v1220 };
    let v1222;
    try {
        const v2207 = new v1219(module, v1221);
        v1222 = v2207;
    } catch(e2208) {
    }
    instance = v1222;
    const v2209 = () => {
        const v1226 = instance?.exports;
        let v1227;
        try {
            v1227 = v1226.main(1, 2);
        } catch(e2217) {
        }
        return v1227;
    };
    const v1223 = v2209;
    const v1228 = /not iterable/;
    try {
        f0(v1223, TypeError, v1228);
    } catch(e2223) {
    }
    const v1230 = WebAssembly?.Instance;
    const v1231 = { f: not_iterable };
    const v1232 = { imports: v1231 };
    let v1233;
    try {
        const v2232 = new v1230(module, v1232);
        v1233 = v2232;
    } catch(e2233) {
    }
    instance = v1233;
    const v2234 = () => {
        const v1237 = instance?.exports;
        let v1238;
        try {
            v1238 = v1237.main(1, 2);
        } catch(e2242) {
        }
        return v1238;
    };
    const v1234 = v2234;
    const v1239 = /not iterable/;
    try {
        f0(v1234, TypeError, v1239);
    } catch(e2248) {
    }
    const v1241 = WebAssembly?.Instance;
    const v1242 = { f: generator_throw };
    const v1243 = { imports: v1242 };
    let v1244;
    try {
        const v2257 = new v1241(module, v1243);
        v1244 = v2257;
    } catch(e2258) {
    }
    instance = v1244;
    const v2259 = () => {
        const v1248 = instance?.exports;
        let v1249;
        try {
            v1249 = v1248.main(1, 2);
        } catch(e2267) {
        }
        return v1249;
    };
    const v1245 = v2259;
    try {
        f0(v1245, Error, "def");
    } catch(e2272) {
    }
}
try {
    MultiJSToWasmReturnTest();
} catch(e2274) {
}
