function f0() {
}
try { load("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
function MultiBlockResultTest() {
    f0("MultiBlockResultTest");
    let v8;
    try { v8 = new WasmModuleBuilder(); } catch (e) {}
    let builder = v8;
    let v11;
    try { v11 = builder.addType(kSig_i_ii); } catch (e) {}
    let sig_i_ii = v11;
    let v14;
    try { v14 = builder.addType(kSig_ii_v); } catch (e) {}
    let sig_ii_v = v14;
    const v23 = [kExprBlock,sig_ii_v,kExprLocalGet,0,kExprLocalGet,1,kExprEnd,kExprI32Add];
    let v25;
    try { v25 = builder.addFunction("main", kSig_i_ii); } catch (e) {}
    let v26;
    try { v26 = v25.addBody(v23); } catch (e) {}
    try { v26.exportAs("main"); } catch (e) {}
    const v29 = WebAssembly?.Module;
    let v30;
    try { v30 = builder.toBuffer(); } catch (e) {}
    let v31;
    try { v31 = new v29(v30); } catch (e) {}
    let module = v31;
    const v33 = WebAssembly?.Instance;
    let v34;
    try { v34 = new v33(module); } catch (e) {}
    let instance = v34;
    const v38 = instance?.exports;
    let v39;
    try { v39 = v38.main(1, 4); } catch (e) {}
    try { f0(v39, 5); } catch (e) {}
}
try { MultiBlockResultTest(); } catch (e) {}
function MultiBlockParamTest() {
    f0("MultiBlockParamTest");
    let v47;
    try { v47 = new WasmModuleBuilder(); } catch (e) {}
    let builder = v47;
    let v50;
    try { v50 = builder.addType(kSig_i_ii); } catch (e) {}
    let sig_i_ii = v50;
    const v59 = [kExprLocalGet,0,kExprLocalGet,1,kExprBlock,sig_i_ii,kExprI32Add,kExprEnd];
    let v61;
    try { v61 = builder.addFunction("main", kSig_i_ii); } catch (e) {}
    let v62;
    try { v62 = v61.addBody(v59); } catch (e) {}
    try { v62.exportAs("main"); } catch (e) {}
    const v65 = WebAssembly?.Module;
    let v66;
    try { v66 = builder.toBuffer(); } catch (e) {}
    let v67;
    try { v67 = new v65(v66); } catch (e) {}
    let module = v67;
    const v69 = WebAssembly?.Instance;
    let v70;
    try { v70 = new v69(module); } catch (e) {}
    let instance = v70;
    const v74 = instance?.exports;
    let v75;
    try { v75 = v74.main(1, 4); } catch (e) {}
    try { f0(v75, 5); } catch (e) {}
}
try { MultiBlockParamTest(); } catch (e) {}
function MultiBlockBrTest() {
    f0("MultiBlockBrTest");
    let v83;
    try { v83 = new WasmModuleBuilder(); } catch (e) {}
    let builder = v83;
    let v86;
    try { v86 = builder.addType(kSig_i_ii); } catch (e) {}
    let sig_i_ii = v86;
    let v89;
    try { v89 = builder.addType(kSig_ii_v); } catch (e) {}
    let sig_ii_v = v89;
    const v100 = [kExprBlock,sig_ii_v,kExprLocalGet,0,kExprLocalGet,1,kExprBr,0,kExprEnd,kExprI32Add];
    let v102;
    try { v102 = builder.addFunction("main", kSig_i_ii); } catch (e) {}
    let v103;
    try { v103 = v102.addBody(v100); } catch (e) {}
    try { v103.exportAs("main"); } catch (e) {}
    const v106 = WebAssembly?.Module;
    let v107;
    try { v107 = builder.toBuffer(); } catch (e) {}
    let v108;
    try { v108 = new v106(v107); } catch (e) {}
    let module = v108;
    const v110 = WebAssembly?.Instance;
    let v111;
    try { v111 = new v110(module); } catch (e) {}
    let instance = v111;
    const v115 = instance?.exports;
    let v116;
    try { v116 = v115.main(1, 4); } catch (e) {}
    try { f0(v116, 5); } catch (e) {}
}
try { MultiBlockBrTest(); } catch (e) {}
function MultiBlockUnreachableTest() {
    f0(arguments.callee.name);
    let v126;
    try { v126 = new WasmModuleBuilder(); } catch (e) {}
    let builder = v126;
    const v128 = [];
    const v131 = [kWasmI32,kWasmI64];
    let v133;
    try { v133 = makeSig(v128, v131); } catch (e) {}
    let v134;
    try { v134 = builder.addType(v133); } catch (e) {}
    let sig_il_v = v134;
    const v148 = [kExprBlock,sig_il_v,kExprI32Const,1,kExprI64Const,1,kExprBr,0,kExprI32Const,1,kExprI64Const,1,kExprEnd,kExprDrop];
    let v151;
    try { v151 = builder.addFunction("main", kSig_i_v); } catch (e) {}
    let v152;
    try { v152 = v151.addBody(v148); } catch (e) {}
    try { v152.exportAs("main"); } catch (e) {}
    const v155 = WebAssembly?.Module;
    let v156;
    try { v156 = builder.toBuffer(); } catch (e) {}
    let v157;
    try { v157 = new v155(v156); } catch (e) {}
    let module = v157;
    const v159 = WebAssembly?.Instance;
    let v160;
    try { v160 = new v159(module); } catch (e) {}
    let instance = v160;
    const v164 = instance?.exports;
    let v165;
    try { v165 = v164.main(1, 2); } catch (e) {}
    try { f0(v165, 1); } catch (e) {}
}
try { MultiBlockUnreachableTest(); } catch (e) {}
function MultiBlockUnreachableTypeErrorTest() {
    f0(arguments.callee.name);
    let v175;
    try { v175 = new WasmModuleBuilder(); } catch (e) {}
    let builder = v175;
    const v177 = [];
    const v180 = [kWasmI32,kWasmI64];
    let v182;
    try { v182 = makeSig(v177, v180); } catch (e) {}
    let v183;
    try { v183 = builder.addType(v182); } catch (e) {}
    let sig_il_v = v183;
    const v197 = [kExprBlock,sig_il_v,kExprI32Const,1,kExprI64Const,1,kExprBr,0,kExprI64Const,1,kExprI32Const,1,kExprEnd,kExprDrop];
    let v200;
    try { v200 = builder.addFunction("main", kSig_i_v); } catch (e) {}
    let v201;
    try { v201 = v200.addBody(v197); } catch (e) {}
    try { v201.exportAs("main"); } catch (e) {}
    const v203 = () => {
        const v205 = WebAssembly?.Module;
        let v206;
        try { v206 = builder.toBuffer(); } catch (e) {}
        let v207;
        try { v207 = new v205(v206); } catch (e) {}
        return v207;
    };
    const v209 = WebAssembly?.CompileError;
    const v210 = /expected type i64, found i32.const/;
    try { f0(v203, v209, v210); } catch (e) {}
}
try { MultiBlockUnreachableTypeErrorTest(); } catch (e) {}
function MultiLoopResultTest() {
    f0("MultiLoopResultTest");
    let v217;
    try { v217 = new WasmModuleBuilder(); } catch (e) {}
    let builder = v217;
    let v220;
    try { v220 = builder.addType(kSig_i_ii); } catch (e) {}
    let sig_i_ii = v220;
    let v223;
    try { v223 = builder.addType(kSig_ii_v); } catch (e) {}
    let sig_ii_v = v223;
    const v232 = [kExprLoop,sig_ii_v,kExprLocalGet,0,kExprLocalGet,1,kExprEnd,kExprI32Add];
    let v234;
    try { v234 = builder.addFunction("main", kSig_i_ii); } catch (e) {}
    let v235;
    try { v235 = v234.addBody(v232); } catch (e) {}
    try { v235.exportAs("main"); } catch (e) {}
    const v238 = WebAssembly?.Module;
    let v239;
    try { v239 = builder.toBuffer(); } catch (e) {}
    let v240;
    try { v240 = new v238(v239); } catch (e) {}
    let module = v240;
    const v242 = WebAssembly?.Instance;
    let v243;
    try { v243 = new v242(module); } catch (e) {}
    let instance = v243;
    const v247 = instance?.exports;
    let v248;
    try { v248 = v247.main(1, 4); } catch (e) {}
    try { f0(v248, 5); } catch (e) {}
}
try { MultiLoopResultTest(); } catch (e) {}
function MultiLoopParamTest() {
    f0("MultiLoopParamTest");
    let v256;
    try { v256 = new WasmModuleBuilder(); } catch (e) {}
    let builder = v256;
    let v259;
    try { v259 = builder.addType(kSig_i_ii); } catch (e) {}
    let sig_i_ii = v259;
    const v268 = [kExprLocalGet,0,kExprLocalGet,1,kExprLoop,sig_i_ii,kExprI32Add,kExprEnd];
    let v270;
    try { v270 = builder.addFunction("main", kSig_i_ii); } catch (e) {}
    let v271;
    try { v271 = v270.addBody(v268); } catch (e) {}
    try { v271.exportAs("main"); } catch (e) {}
    const v274 = WebAssembly?.Module;
    let v275;
    try { v275 = builder.toBuffer(); } catch (e) {}
    let v276;
    try { v276 = new v274(v275); } catch (e) {}
    let module = v276;
    const v278 = WebAssembly?.Instance;
    let v279;
    try { v279 = new v278(module); } catch (e) {}
    let instance = v279;
    const v283 = instance?.exports;
    let v284;
    try { v284 = v283.main(1, 4); } catch (e) {}
    try { f0(v284, 5); } catch (e) {}
}
try { MultiLoopParamTest(); } catch (e) {}
function MultiLoopBrTest() {
    f0("MultiLoopBrTest");
    let v292;
    try { v292 = new WasmModuleBuilder(); } catch (e) {}
    let builder = v292;
    let v295;
    try { v295 = builder.addType(kSig_i_ii); } catch (e) {}
    let sig_i_ii = v295;
    let v298;
    try { v298 = builder.addType(kSig_ii_i); } catch (e) {}
    let sig_ii_i = v298;
    let v301;
    try { v301 = builder.addType(kSig_ii_ii); } catch (e) {}
    let sig_ii_ii = v301;
    const v306 = [kExprLocalGet,0,kExprLocalGet,0];
    let v308;
    try { v308 = builder.addFunction("dup", kSig_ii_i); } catch (e) {}
    try { v308.addBody(v306); } catch (e) {}
    const v312 = [kExprLocalGet,1,kExprLocalGet,0];
    let v314;
    try { v314 = builder.addFunction("swap", kSig_ii_ii); } catch (e) {}
    try { v314.addBody(v312); } catch (e) {}
    const v332 = [kExprLocalGet,0,kExprLocalGet,1,kExprLoop,sig_ii_ii,kExprCallFunction,1,kExprCallFunction,0,kExprI32Add,kExprCallFunction,0,kExprI32Const,20,kExprI32LeU,kExprBrIf,0,kExprEnd,kExprDrop];
    let v334;
    try { v334 = builder.addFunction("main", kSig_i_ii); } catch (e) {}
    let v335;
    try { v335 = v334.addBody(v332); } catch (e) {}
    try { v335.exportAs("main"); } catch (e) {}
    const v338 = WebAssembly?.Module;
    let v339;
    try { v339 = builder.toBuffer(); } catch (e) {}
    let v340;
    try { v340 = new v338(v339); } catch (e) {}
    let module = v340;
    const v342 = WebAssembly?.Instance;
    let v343;
    try { v343 = new v342(module); } catch (e) {}
    let instance = v343;
    const v348 = instance?.exports;
    let v349;
    try { v349 = v348.main(0, 1); } catch (e) {}
    try { f0(0, v349); } catch (e) {}
    const v354 = instance?.exports;
    let v355;
    try { v355 = v354.main(1, 1); } catch (e) {}
    try { f0(16, v355); } catch (e) {}
    const v360 = instance?.exports;
    let v361;
    try { v361 = v360.main(3, 1); } catch (e) {}
    try { f0(4, v361); } catch (e) {}
    const v366 = instance?.exports;
    let v367;
    try { v367 = v366.main(4, 1); } catch (e) {}
    try { f0(4, v367); } catch (e) {}
    const v372 = instance?.exports;
    let v373;
    try { v373 = v372.main(0, 2); } catch (e) {}
    try { f0(0, v373); } catch (e) {}
    const v378 = instance?.exports;
    let v379;
    try { v379 = v378.main(1, 2); } catch (e) {}
    try { f0(16, v379); } catch (e) {}
    const v384 = instance?.exports;
    let v385;
    try { v385 = v384.main(3, 2); } catch (e) {}
    try { f0(8, v385); } catch (e) {}
    const v390 = instance?.exports;
    let v391;
    try { v391 = v390.main(4, 2); } catch (e) {}
    try { f0(8, v391); } catch (e) {}
    const v396 = instance?.exports;
    let v397;
    try { v397 = v396.main(0, 3); } catch (e) {}
    try { f0(0, v397); } catch (e) {}
    const v402 = instance?.exports;
    let v403;
    try { v403 = v402.main(1, 3); } catch (e) {}
    try { f0(8, v403); } catch (e) {}
    const v408 = instance?.exports;
    let v409;
    try { v409 = v408.main(3, 3); } catch (e) {}
    try { f0(12, v409); } catch (e) {}
    const v414 = instance?.exports;
    let v415;
    try { v415 = v414.main(4, 3); } catch (e) {}
    try { f0(12, v415); } catch (e) {}
    const v420 = instance?.exports;
    let v421;
    try { v421 = v420.main(0, 4); } catch (e) {}
    try { f0(0, v421); } catch (e) {}
    const v426 = instance?.exports;
    let v427;
    try { v427 = v426.main(1, 4); } catch (e) {}
    try { f0(8, v427); } catch (e) {}
    const v432 = instance?.exports;
    let v433;
    try { v433 = v432.main(3, 4); } catch (e) {}
    try { f0(16, v433); } catch (e) {}
    const v438 = instance?.exports;
    let v439;
    try { v439 = v438.main(4, 4); } catch (e) {}
    try { f0(16, v439); } catch (e) {}
    const v444 = instance?.exports;
    let v445;
    try { v445 = v444.main(100, 3); } catch (e) {}
    try { f0(3, v445); } catch (e) {}
    const v450 = instance?.exports;
    let v451;
    try { v451 = v450.main(3, 100); } catch (e) {}
    try { f0(6, v451); } catch (e) {}
}
try { MultiLoopBrTest(); } catch (e) {}
function MultiIfResultTest() {
    f0("MultiIfResultTest");
    let v458;
    try { v458 = new WasmModuleBuilder(); } catch (e) {}
    let builder = v458;
    let v461;
    try { v461 = builder.addType(kSig_i_ii); } catch (e) {}
    let sig_i_ii = v461;
    let v464;
    try { v464 = builder.addType(kSig_ii_v); } catch (e) {}
    let sig_ii_v = v464;
    const v477 = [kExprLocalGet,0,kExprIf,sig_ii_v,kExprLocalGet,0,kExprLocalGet,1,kExprElse,kExprLocalGet,1,kExprLocalGet,0,kExprEnd,kExprI32Sub];
    let v479;
    try { v479 = builder.addFunction("main", kSig_i_ii); } catch (e) {}
    let v480;
    try { v480 = v479.addBody(v477); } catch (e) {}
    try { v480.exportAs("main"); } catch (e) {}
    const v483 = WebAssembly?.Module;
    let v484;
    try { v484 = builder.toBuffer(); } catch (e) {}
    let v485;
    try { v485 = new v483(v484); } catch (e) {}
    let module = v485;
    const v487 = WebAssembly?.Instance;
    let v488;
    try { v488 = new v487(module); } catch (e) {}
    let instance = v488;
    const v492 = instance?.exports;
    let v493;
    try { v493 = v492.main(8, 3); } catch (e) {}
    try { f0(v493, 5); } catch (e) {}
    const v498 = instance?.exports;
    let v499;
    try { v499 = v498.main(0, 3); } catch (e) {}
    try { f0(v499, 3); } catch (e) {}
}
try { MultiIfResultTest(); } catch (e) {}
function MultiIfParamTest() {
    f0("MultiIfParamTest");
    let v507;
    try { v507 = new WasmModuleBuilder(); } catch (e) {}
    let builder = v507;
    let v510;
    try { v510 = builder.addType(kSig_i_ii); } catch (e) {}
    let sig_i_ii = v510;
    const v522 = [kExprLocalGet,0,kExprLocalGet,1,kExprLocalGet,0,kExprIf,sig_i_ii,kExprI32Add,kExprElse,kExprI32Sub,kExprEnd];
    let v524;
    try { v524 = builder.addFunction("main", kSig_i_ii); } catch (e) {}
    let v525;
    try { v525 = v524.addBody(v522); } catch (e) {}
    try { v525.exportAs("main"); } catch (e) {}
    const v528 = WebAssembly?.Module;
    let v529;
    try { v529 = builder.toBuffer(); } catch (e) {}
    let v530;
    try { v530 = new v528(v529); } catch (e) {}
    let module = v530;
    const v532 = WebAssembly?.Instance;
    let v533;
    try { v533 = new v532(module); } catch (e) {}
    let instance = v533;
    const v537 = instance?.exports;
    let v538;
    try { v538 = v537.main(1, 4); } catch (e) {}
    try { f0(v538, 5); } catch (e) {}
    const v543 = instance?.exports;
    let v544;
    try { v544 = v543.main(0, 4); } catch (e) {}
    const v546 = -4;
    try { f0(v544, v546); } catch (e) {}
}
try { MultiIfParamTest(); } catch (e) {}
function MultiIfBrTest() {
    f0("MultiIfBrTest");
    let v553;
    try { v553 = new WasmModuleBuilder(); } catch (e) {}
    let builder = v553;
    let v556;
    try { v556 = builder.addType(kSig_i_ii); } catch (e) {}
    let sig_i_ii = v556;
    let v559;
    try { v559 = builder.addType(kSig_ii_v); } catch (e) {}
    let sig_ii_v = v559;
    const v575 = [kExprLocalGet,0,kExprIf,sig_ii_v,kExprLocalGet,0,kExprLocalGet,1,kExprBr,0,kExprElse,kExprLocalGet,1,kExprLocalGet,0,kExprBr,0,kExprEnd,kExprI32Sub];
    let v577;
    try { v577 = builder.addFunction("main", kSig_i_ii); } catch (e) {}
    let v578;
    try { v578 = v577.addBody(v575); } catch (e) {}
    try { v578.exportAs("main"); } catch (e) {}
    const v581 = WebAssembly?.Module;
    let v582;
    try { v582 = builder.toBuffer(); } catch (e) {}
    let v583;
    try { v583 = new v581(v582); } catch (e) {}
    let module = v583;
    const v585 = WebAssembly?.Instance;
    let v586;
    try { v586 = new v585(module); } catch (e) {}
    let instance = v586;
    const v590 = instance?.exports;
    let v591;
    try { v591 = v590.main(8, 3); } catch (e) {}
    try { f0(v591, 5); } catch (e) {}
    const v596 = instance?.exports;
    let v597;
    try { v597 = v596.main(0, 3); } catch (e) {}
    try { f0(v597, 3); } catch (e) {}
}
try { MultiIfBrTest(); } catch (e) {}
function MultiIfParamOneArmedTest() {
    f0("MultiIfParamOneArmedTest");
    let v605;
    try { v605 = new WasmModuleBuilder(); } catch (e) {}
    let builder = v605;
    let v608;
    try { v608 = builder.addType(kSig_i_i); } catch (e) {}
    let sig_i_i = v608;
    const v619 = [kExprLocalGet,0,kExprLocalGet,0,kExprIf,sig_i_i,kExprI32Const,5,kExprI32Add,kExprEnd];
    let v621;
    try { v621 = builder.addFunction("main", kSig_i_i); } catch (e) {}
    let v622;
    try { v622 = v621.addBody(v619); } catch (e) {}
    try { v622.exportAs("main"); } catch (e) {}
    const v625 = WebAssembly?.Module;
    let v626;
    try { v626 = builder.toBuffer(); } catch (e) {}
    let v627;
    try { v627 = new v625(v626); } catch (e) {}
    let module = v627;
    const v629 = WebAssembly?.Instance;
    let v630;
    try { v630 = new v629(module); } catch (e) {}
    let instance = v630;
    const v633 = instance?.exports;
    let v634;
    try { v634 = v633.main(0); } catch (e) {}
    try { f0(v634, 0); } catch (e) {}
    const v638 = instance?.exports;
    let v639;
    try { v639 = v638.main(1); } catch (e) {}
    try { f0(v639, 6); } catch (e) {}
}
try { MultiIfParamOneArmedTest(); } catch (e) {}
function MultiIfOneArmedNoTypeCheckTest() {
    f0(arguments.callee.name);
    let v649;
    try { v649 = new WasmModuleBuilder(); } catch (e) {}
    let builder = v649;
    let v652;
    try { v652 = builder.addType(kSig_i_l); } catch (e) {}
    let sig_i_l = v652;
    const v662 = [kExprI64Const,0,kExprI32Const,0,kExprIf,sig_i_l,kExprDrop,kExprI32Const,0,kExprEnd];
    let v665;
    try { v665 = builder.addFunction("main", kSig_i_v); } catch (e) {}
    try { v665.addBody(v662); } catch (e) {}
    const v667 = () => {
        const v669 = WebAssembly?.Module;
        let v670;
        try { v670 = builder.toBuffer(); } catch (e) {}
        let v671;
        try { v671 = new v669(v670); } catch (e) {}
        return v671;
    };
    const v673 = WebAssembly?.CompileError;
    const v674 = /expected i32, got i64/;
    try { f0(v667, v673, v674); } catch (e) {}
}
try { MultiIfOneArmedNoTypeCheckTest(); } catch (e) {}
function MultiResultTest() {
    f0("MultiResultTest");
    let v681;
    try { v681 = new WasmModuleBuilder(); } catch (e) {}
    let builder = v681;
    let v684;
    try { v684 = builder.addType(kSig_i_ii); } catch (e) {}
    let sig_i_ii = v684;
    let v687;
    try { v687 = builder.addType(kSig_iii_ii); } catch (e) {}
    let sig_iii_ii = v687;
    const v695 = [kExprLocalGet,0,kExprLocalGet,1,kExprLocalGet,0,kExprLocalGet,1,kExprI32Sub];
    let v697;
    try { v697 = builder.addFunction("callee", kSig_iii_ii); } catch (e) {}
    try { v697.addBody(v695); } catch (e) {}
    const v706 = [kExprLocalGet,0,kExprLocalGet,1,kExprCallFunction,0,kExprI32Mul,kExprI32Add];
    let v708;
    try { v708 = builder.addFunction("main", kSig_i_ii); } catch (e) {}
    let v709;
    try { v709 = v708.addBody(v706); } catch (e) {}
    try { v709.exportAs("main"); } catch (e) {}
    const v712 = WebAssembly?.Module;
    let v713;
    try { v713 = builder.toBuffer(); } catch (e) {}
    let v714;
    try { v714 = new v712(v713); } catch (e) {}
    let module = v714;
    const v716 = WebAssembly?.Instance;
    let v717;
    try { v717 = new v716(module); } catch (e) {}
    let instance = v717;
    const v721 = instance?.exports;
    let v722;
    try { v722 = v721.main(0, 0); } catch (e) {}
    try { f0(v722, 0); } catch (e) {}
    const v727 = instance?.exports;
    let v728;
    try { v728 = v727.main(1, 0); } catch (e) {}
    try { f0(v728, 1); } catch (e) {}
    const v733 = instance?.exports;
    let v734;
    try { v734 = v733.main(2, 0); } catch (e) {}
    try { f0(v734, 2); } catch (e) {}
    const v739 = instance?.exports;
    let v740;
    try { v740 = v739.main(0, 1); } catch (e) {}
    const v742 = -1;
    try { f0(v740, v742); } catch (e) {}
    const v746 = instance?.exports;
    let v747;
    try { v747 = v746.main(0, 2); } catch (e) {}
    const v749 = -4;
    try { f0(v747, v749); } catch (e) {}
    const v753 = instance?.exports;
    let v754;
    try { v754 = v753.main(3, 4); } catch (e) {}
    const v756 = -1;
    try { f0(v754, v756); } catch (e) {}
    const v760 = instance?.exports;
    let v761;
    try { v761 = v760.main(4, 3); } catch (e) {}
    try { f0(v761, 7); } catch (e) {}
}
try { MultiResultTest(); } catch (e) {}
function MultiReturnTest() {
    f0("MultiReturnTest");
    let v769;
    try { v769 = new WasmModuleBuilder(); } catch (e) {}
    let builder = v769;
    let v772;
    try { v772 = builder.addType(kSig_i_i); } catch (e) {}
    let sig_i_i = v772;
    let v775;
    try { v775 = builder.addType(kSig_ii_i); } catch (e) {}
    let sig_ii_i = v775;
    const v783 = [kExprLocalGet,0,kExprLocalGet,0,kExprLocalGet,0,kExprI32Add,kExprReturn];
    let v785;
    try { v785 = builder.addFunction("callee", kSig_ii_i); } catch (e) {}
    try { v785.addBody(v783); } catch (e) {}
    const v792 = [kExprLocalGet,0,kExprCallFunction,0,kExprI32Mul];
    let v794;
    try { v794 = builder.addFunction("main", kSig_i_i); } catch (e) {}
    let v795;
    try { v795 = v794.addBody(v792); } catch (e) {}
    try { v795.exportAs("main"); } catch (e) {}
    const v798 = WebAssembly?.Module;
    let v799;
    try { v799 = builder.toBuffer(); } catch (e) {}
    let v800;
    try { v800 = new v798(v799); } catch (e) {}
    let module = v800;
    const v802 = WebAssembly?.Instance;
    let v803;
    try { v803 = new v802(module); } catch (e) {}
    let instance = v803;
    const v806 = instance?.exports;
    let v807;
    try { v807 = v806.main(0); } catch (e) {}
    try { f0(v807, 0); } catch (e) {}
    const v811 = instance?.exports;
    let v812;
    try { v812 = v811.main(1); } catch (e) {}
    try { f0(v812, 2); } catch (e) {}
    const v816 = instance?.exports;
    let v817;
    try { v817 = v816.main(2); } catch (e) {}
    try { f0(v817, 8); } catch (e) {}
    const v821 = instance?.exports;
    let v822;
    try { v822 = v821.main(10); } catch (e) {}
    try { f0(v822, 200); } catch (e) {}
}
try { MultiReturnTest(); } catch (e) {}
function MultiBrReturnTest() {
    f0("MultiBrReturnTest");
    let v830;
    try { v830 = new WasmModuleBuilder(); } catch (e) {}
    let builder = v830;
    let v833;
    try { v833 = builder.addType(kSig_i_i); } catch (e) {}
    let sig_i_i = v833;
    let v836;
    try { v836 = builder.addType(kSig_ii_i); } catch (e) {}
    let sig_ii_i = v836;
    const v845 = [kExprLocalGet,0,kExprLocalGet,0,kExprLocalGet,0,kExprI32Add,kExprBr,0];
    let v847;
    try { v847 = builder.addFunction("callee", kSig_ii_i); } catch (e) {}
    try { v847.addBody(v845); } catch (e) {}
    const v854 = [kExprLocalGet,0,kExprCallFunction,0,kExprI32Mul];
    let v856;
    try { v856 = builder.addFunction("main", kSig_i_i); } catch (e) {}
    let v857;
    try { v857 = v856.addBody(v854); } catch (e) {}
    try { v857.exportAs("main"); } catch (e) {}
    const v860 = WebAssembly?.Module;
    let v861;
    try { v861 = builder.toBuffer(); } catch (e) {}
    let v862;
    try { v862 = new v860(v861); } catch (e) {}
    let module = v862;
    const v864 = WebAssembly?.Instance;
    let v865;
    try { v865 = new v864(module); } catch (e) {}
    let instance = v865;
    const v868 = instance?.exports;
    let v869;
    try { v869 = v868.main(0); } catch (e) {}
    try { f0(v869, 0); } catch (e) {}
    const v873 = instance?.exports;
    let v874;
    try { v874 = v873.main(1); } catch (e) {}
    try { f0(v874, 2); } catch (e) {}
    const v878 = instance?.exports;
    let v879;
    try { v879 = v878.main(2); } catch (e) {}
    try { f0(v879, 8); } catch (e) {}
    const v883 = instance?.exports;
    let v884;
    try { v884 = v883.main(10); } catch (e) {}
    try { f0(v884, 200); } catch (e) {}
}
try { MultiBrReturnTest(); } catch (e) {}
function MultiBrTableTest() {
    f0(arguments.callee.name);
    let v894;
    try { v894 = new WasmModuleBuilder(); } catch (e) {}
    let builder = v894;
    let v897;
    try { v897 = builder.addType(kSig_v_v); } catch (e) {}
    let sig_ii_v = v897;
    const v908 = [kExprI32Const,1,kExprI32Const,2,kExprI32Const,0,kExprBrTable,1,0,0];
    let v911;
    try { v911 = builder.addFunction("main", kSig_ii_v); } catch (e) {}
    let v912;
    try { v912 = v911.addBody(v908); } catch (e) {}
    try { v912.exportAs("main"); } catch (e) {}
    let v914;
    try { v914 = builder.instantiate(); } catch (e) {}
    let instance = v914;
    const v916 = instance?.exports;
    let v917;
    try { v917 = v916.main(); } catch (e) {}
    const v920 = [1,2];
    try { f0(v917, v920); } catch (e) {}
}
try { MultiBrTableTest(); } catch (e) {}
function MultiUnreachablePolymorphicTest() {
    f0(arguments.callee.name);
    let v929;
    try { v929 = new WasmModuleBuilder(); } catch (e) {}
    let builder = v929;
    let v932;
    try { v932 = builder.addType(kSig_v_i); } catch (e) {}
    let sig_v_i = v932;
    let v935;
    try { v935 = builder.addType(kSig_i_i); } catch (e) {}
    let sig_i_i = v935;
    const v942 = [kExprReturn,kExprBlock,sig_v_i,kExprDrop,kExprEnd];
    let v945;
    try { v945 = builder.addFunction("block", kSig_v_v); } catch (e) {}
    let v946;
    try { v946 = v945.addBody(v942); } catch (e) {}
    try { v946.exportAs("block"); } catch (e) {}
    const v951 = [kExprReturn,kExprIf,sig_v_i,kExprDrop,kExprElse,kExprDrop,kExprEnd];
    let v953;
    try { v953 = builder.addFunction("if_else", kSig_v_v); } catch (e) {}
    let v954;
    try { v954 = v953.addBody(v951); } catch (e) {}
    try { v954.exportAs("if_else"); } catch (e) {}
    const v958 = [kExprReturn,kExprLoop,sig_i_i,kExprEnd,kExprDrop];
    let v960;
    try { v960 = builder.addFunction("loop", kSig_v_v); } catch (e) {}
    let v961;
    try { v961 = v960.addBody(v958); } catch (e) {}
    try { v961.exportAs("loop"); } catch (e) {}
    let v963;
    try { v963 = builder.instantiate(); } catch (e) {}
    let instance = v963;
    const v965 = instance?.exports;
    try { v965.block(); } catch (e) {}
    const v967 = instance?.exports;
    try { v967.if_else(); } catch (e) {}
    const v969 = instance?.exports;
    try { v969.loop(); } catch (e) {}
}
try { MultiUnreachablePolymorphicTest(); } catch (e) {}
function MultiWasmToJSReturnTest() {
    f0(arguments.callee.name);
    let v978;
    try { v978 = new WasmModuleBuilder(); } catch (e) {}
    let builder = v978;
    const v982 = [kWasmI32,kWasmF32];
    const v983 = [kWasmF32,kWasmI32];
    let v985;
    try { v985 = makeSig(v982, v983); } catch (e) {}
    let sig_fi_if = v985;
    const v991 = [kExprLocalGet,1,kExprLocalGet,0];
    let v993;
    try { v993 = builder.addFunction("swap", sig_fi_if); } catch (e) {}
    let v994;
    try { v994 = v993.addBody(v991); } catch (e) {}
    try { v994.exportAs("swap"); } catch (e) {}
    const v1006 = [kExprLocalGet,0,kExprLocalGet,0,kExprI32Add,kExprLocalGet,0,kExprLocalGet,0,kExprI32Sub,kExprLocalGet,0,kExprLocalGet,0,kExprI32Mul];
    let v1009;
    try { v1009 = builder.addFunction("addsubmul", kSig_iii_i); } catch (e) {}
    let v1010;
    try { v1010 = v1009.addBody(v1006); } catch (e) {}
    try { v1010.exportAs("addsubmul"); } catch (e) {}
    const v1013 = WebAssembly?.Module;
    let v1014;
    try { v1014 = builder.toBuffer(); } catch (e) {}
    let v1015;
    try { v1015 = new v1013(v1014); } catch (e) {}
    let module = v1015;
    const v1017 = WebAssembly?.Instance;
    let v1018;
    try { v1018 = new v1017(module); } catch (e) {}
    let instance = v1018;
    const v1022 = instance?.exports;
    let v1023;
    try { v1023 = v1022.swap(0, 1.5); } catch (e) {}
    const v1026 = [1.5,0];
    try { f0(v1023, v1026); } catch (e) {}
    const v1030 = instance?.exports;
    let v1031;
    try { v1031 = v1030.swap(2, 3.75); } catch (e) {}
    const v1034 = [3.75,2];
    try { f0(v1031, v1034); } catch (e) {}
    const v1037 = instance?.exports;
    let v1038;
    try { v1038 = v1037.addsubmul(4); } catch (e) {}
    const v1042 = [8,0,16];
    try { f0(v1038, v1042); } catch (e) {}
    const v1045 = instance?.exports;
    let v1046;
    try { v1046 = v1045.addsubmul(5); } catch (e) {}
    const v1050 = [10,0,25];
    try { f0(v1046, v1050); } catch (e) {}
}
try { MultiWasmToJSReturnTest(); } catch (e) {}
function MultiJSToWasmReturnTest() {
    f0(arguments.callee.name);
    let v1059;
    try { v1059 = new WasmModuleBuilder(); } catch (e) {}
    let builder = v1059;
    function swap(a1062, a1063) {
        return [a1063,a1062];
    }
    function swap_proxy(a1066, a1067) {
        const v1069 = [a1067,a1066];
        function f1070(a1071, a1072) {
            let v1074;
            try { v1074 = Reflect.get(a1071, a1072); } catch (e) {}
            return v1074;
        }
        const v1075 = { get: f1070 };
        let v1076;
        try { v1076 = new Proxy(v1069, v1075); } catch (e) {}
        return v1076;
    }
    function proxy_throw(a1078, a1079) {
        const v1081 = [a1079,a1078];
        function f1082(a1083, a1084) {
            if (a1084 == 1) {
                let v1089;
                try { v1089 = new Error("abc"); } catch (e) {}
                throw v1089;
            }
            let v1091;
            try { v1091 = Reflect.get(a1083, a1084); } catch (e) {}
            return v1091;
        }
        const v1092 = { get: f1082 };
        let v1093;
        try { v1093 = new Proxy(v1081, v1092); } catch (e) {}
        return v1093;
    }
    function drop_first(a1095, a1096) {
        return [a1096];
    }
    function repeat(a1099, a1100) {
        return [a1099,a1100,a1099,a1100];
    }
    function not_receiver(a1103, a1104) {
        return 0;
    }
    function not_iterable(a1107, a1108) {
        a = [a1107,a1108];
        a[Symbol?.iterator] = undefined;
        return a;
    }
    function* generator(a1116, a1117) {
        yield a1116;
        yield a1117;
    }
    function* generator_throw(a1121, a1122) {
        yield a1121;
        let v1126;
        try { v1126 = new Error("def"); } catch (e) {}
        throw v1126;
    }
    try { builder.addImport("imports", "f", kSig_ii_ii); } catch (e) {}
    const v1137 = [kExprLocalGet,0,kExprLocalGet,1,kExprCallFunction,0];
    let v1139;
    try { v1139 = builder.addFunction("main", kSig_ii_ii); } catch (e) {}
    let v1140;
    try { v1140 = v1139.addBody(v1137); } catch (e) {}
    try { v1140.exportAs("main"); } catch (e) {}
    const v1143 = WebAssembly?.Module;
    let v1144;
    try { v1144 = builder.toBuffer(); } catch (e) {}
    let v1145;
    try { v1145 = new v1143(v1144); } catch (e) {}
    let module = v1145;
    const v1147 = WebAssembly?.Instance;
    const v1148 = { f: swap };
    const v1149 = { imports: v1148 };
    let v1150;
    try { v1150 = new v1147(module, v1149); } catch (e) {}
    var instance = v1150;
    const v1154 = instance?.exports;
    let v1155;
    try { v1155 = v1154.main(1, 2); } catch (e) {}
    const v1158 = [2,1];
    try { f0(v1155, v1158); } catch (e) {}
    const v1160 = WebAssembly?.Instance;
    const v1161 = { f: swap_proxy };
    const v1162 = { imports: v1161 };
    let v1163;
    try { v1163 = new v1160(module, v1162); } catch (e) {}
    instance = v1163;
    const v1166 = instance?.exports;
    let v1167;
    try { v1167 = v1166.main(1, 2); } catch (e) {}
    const v1170 = [2,1];
    try { f0(v1167, v1170); } catch (e) {}
    const v1172 = WebAssembly?.Instance;
    const v1173 = { f: generator };
    const v1174 = { imports: v1173 };
    let v1175;
    try { v1175 = new v1172(module, v1174); } catch (e) {}
    instance = v1175;
    const v1178 = instance?.exports;
    let v1179;
    try { v1179 = v1178.main(1, 2); } catch (e) {}
    const v1182 = [1,2];
    try { f0(v1179, v1182); } catch (e) {}
    const v1184 = WebAssembly?.Instance;
    const v1185 = { f: drop_first };
    const v1186 = { imports: v1185 };
    let v1187;
    try { v1187 = new v1184(module, v1186); } catch (e) {}
    instance = v1187;
    const v1188 = () => {
        const v1191 = instance?.exports;
        let v1192;
        try { v1192 = v1191.main(1, 2); } catch (e) {}
        return v1192;
    };
    try { f0(v1188, TypeError, "multi-return length mismatch"); } catch (e) {}
    const v1196 = WebAssembly?.Instance;
    const v1197 = { f: repeat };
    const v1198 = { imports: v1197 };
    let v1199;
    try { v1199 = new v1196(module, v1198); } catch (e) {}
    instance = v1199;
    const v1200 = () => {
        const v1203 = instance?.exports;
        let v1204;
        try { v1204 = v1203.main(1, 2); } catch (e) {}
        return v1204;
    };
    try { f0(v1200, TypeError, "multi-return length mismatch"); } catch (e) {}
    const v1207 = WebAssembly?.Instance;
    const v1208 = { f: proxy_throw };
    const v1209 = { imports: v1208 };
    let v1210;
    try { v1210 = new v1207(module, v1209); } catch (e) {}
    instance = v1210;
    const v1211 = () => {
        const v1214 = instance?.exports;
        let v1215;
        try { v1215 = v1214.main(1, 2); } catch (e) {}
        return v1215;
    };
    try { f0(v1211, Error, "abc"); } catch (e) {}
    const v1219 = WebAssembly?.Instance;
    const v1220 = { f: not_receiver };
    const v1221 = { imports: v1220 };
    let v1222;
    try { v1222 = new v1219(module, v1221); } catch (e) {}
    instance = v1222;
    const v1223 = () => {
        const v1226 = instance?.exports;
        let v1227;
        try { v1227 = v1226.main(1, 2); } catch (e) {}
        return v1227;
    };
    const v1228 = /not iterable/;
    try { f0(v1223, TypeError, v1228); } catch (e) {}
    const v1230 = WebAssembly?.Instance;
    const v1231 = { f: not_iterable };
    const v1232 = { imports: v1231 };
    let v1233;
    try { v1233 = new v1230(module, v1232); } catch (e) {}
    instance = v1233;
    const v1234 = () => {
        const v1237 = instance?.exports;
        let v1238;
        try { v1238 = v1237.main(1, 2); } catch (e) {}
        return v1238;
    };
    const v1239 = /not iterable/;
    try { f0(v1234, TypeError, v1239); } catch (e) {}
    const v1241 = WebAssembly?.Instance;
    const v1242 = { f: generator_throw };
    const v1243 = { imports: v1242 };
    let v1244;
    try { v1244 = new v1241(module, v1243); } catch (e) {}
    instance = v1244;
    const v1245 = () => {
        const v1248 = instance?.exports;
        let v1249;
        try { v1249 = v1248.main(1, 2); } catch (e) {}
        return v1249;
    };
    try { f0(v1245, Error, "def"); } catch (e) {}
}
try { MultiJSToWasmReturnTest(); } catch (e) {}
