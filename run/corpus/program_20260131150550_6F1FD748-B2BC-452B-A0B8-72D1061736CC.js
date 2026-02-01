try {
    function f0() {
    }
    const v3 = d8.file;
    try {
        try { v3.execute("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
    } catch(e6) {
    }
    let v6;
    try {
        let v10;
        try { v10 = new WasmModuleBuilder(); } catch (e) {}
        v6 = v10;
    } catch(e11) {
    }
    const builder = v6;
    let v11;
    try {
        let v18;
        try { v18 = makeField(kWasmI64, true); } catch (e) {}
        v11 = v18;
    } catch(e19) {
    }
    let v14;
    try {
        let v25;
        try { v25 = makeField(kWasmI32, false); } catch (e) {}
        v14 = v25;
    } catch(e26) {
    }
    let v17;
    try {
        let v31;
        try { v31 = wasmRefNullType(kWasmNullExternRef); } catch (e) {}
        v17 = v31;
    } catch(e32) {
    }
    let v19;
    try {
        let v37;
        try { v37 = makeField(v17, true); } catch (e) {}
        v19 = v37;
    } catch(e38) {
    }
    const v20 = [v11,v14,v19];
    try {
        try { builder.addStruct(v20); } catch (e) {}
    } catch(e42) {
    }
    try {
        try { builder.startRecGroup(); } catch (e) {}
    } catch(e44) {
    }
    let v24;
    try {
        let v50;
        try { v50 = makeField(kWasmI64, true); } catch (e) {}
        v24 = v50;
    } catch(e51) {
    }
    let v26;
    try {
        let v57;
        try { v57 = makeField(kWasmI32, false); } catch (e) {}
        v26 = v57;
    } catch(e58) {
    }
    let v27;
    try {
        let v63;
        try { v63 = wasmRefNullType(kWasmNullExternRef); } catch (e) {}
        v27 = v63;
    } catch(e64) {
    }
    let v29;
    try {
        let v69;
        try { v69 = makeField(v27, true); } catch (e) {}
        v29 = v69;
    } catch(e70) {
    }
    let v31;
    try {
        let v75;
        try { v75 = wasmRefNullType(kWasmNullFuncRef); } catch (e) {}
        v31 = v75;
    } catch(e76) {
    }
    let v33;
    try {
        let v81;
        try { v81 = makeField(v31, false); } catch (e) {}
        v33 = v81;
    } catch(e82) {
    }
    const v34 = [v24,v26,v29,v33];
    try {
        try { builder.addStruct(v34, 0); } catch (e) {}
    } catch(e87) {
    }
    try {
        try { builder.endRecGroup(); } catch (e) {}
    } catch(e89) {
    }
    let v39;
    try {
        let v94;
        try { v94 = wasmRefNullType(2); } catch (e) {}
        v39 = v94;
    } catch(e95) {
    }
    let v41;
    try {
        let v100;
        try { v100 = makeField(v39, false); } catch (e) {}
        v41 = v100;
    } catch(e101) {
    }
    let v44;
    try {
        let v106;
        try { v106 = wasmRefType(kWasmI31Ref); } catch (e) {}
        v44 = v106;
    } catch(e107) {
    }
    let v46;
    try {
        let v112;
        try { v112 = makeField(v44, false); } catch (e) {}
        v46 = v112;
    } catch(e113) {
    }
    let v48;
    try {
        let v119;
        try { v119 = makeField(kWasmI32, false); } catch (e) {}
        v48 = v119;
    } catch(e120) {
    }
    let v50;
    try {
        let v125;
        try { v125 = wasmRefNullType(kWasmArrayRef); } catch (e) {}
        v50 = v125;
    } catch(e126) {
    }
    let v52;
    try {
        let v131;
        try { v131 = makeField(v50, false); } catch (e) {}
        v52 = v131;
    } catch(e132) {
    }
    const v53 = [v41,v46,v48,v52];
    try {
        try { builder.addStruct(v53); } catch (e) {}
    } catch(e136) {
    }
    try {
        try { builder.startRecGroup(); } catch (e) {}
    } catch(e138) {
    }
    let v57;
    try {
        let v143;
        try { v143 = wasmRefNullType(2); } catch (e) {}
        v57 = v143;
    } catch(e144) {
    }
    let v59;
    try {
        let v149;
        try { v149 = makeField(v57, false); } catch (e) {}
        v59 = v149;
    } catch(e150) {
    }
    let v60;
    try {
        let v155;
        try { v155 = wasmRefType(kWasmI31Ref); } catch (e) {}
        v60 = v155;
    } catch(e156) {
    }
    let v62;
    try {
        let v161;
        try { v161 = makeField(v60, false); } catch (e) {}
        v62 = v161;
    } catch(e162) {
    }
    let v64;
    try {
        let v168;
        try { v168 = makeField(kWasmI32, false); } catch (e) {}
        v64 = v168;
    } catch(e169) {
    }
    let v65;
    try {
        let v174;
        try { v174 = wasmRefNullType(kWasmArrayRef); } catch (e) {}
        v65 = v174;
    } catch(e175) {
    }
    let v67;
    try {
        let v180;
        try { v180 = makeField(v65, false); } catch (e) {}
        v67 = v180;
    } catch(e181) {
    }
    const v68 = [v59,v62,v64,v67];
    try {
        try { builder.addStruct(v68, 2); } catch (e) {}
    } catch(e186) {
    }
    try {
        try { builder.endRecGroup(); } catch (e) {}
    } catch(e188) {
    }
    let v73;
    try {
        let v193;
        try { v193 = wasmRefType(3); } catch (e) {}
        v73 = v193;
    } catch(e194) {
    }
    try {
        try { builder.addArray(v73, true); } catch (e) {}
    } catch(e197) {
    }
    let v77;
    try {
        let v202;
        try { v202 = wasmRefType(3); } catch (e) {}
        v77 = v202;
    } catch(e203) {
    }
    try {
        try { builder.addArray(v77, true, 4); } catch (e) {}
    } catch(e207) {
    }
    try {
        try { builder.addArray(kWasmI16, true); } catch (e) {}
    } catch(e211) {
    }
    try {
        try { builder.startRecGroup(); } catch (e) {}
    } catch(e213) {
    }
    const v85 = [kWasmI32,kWasmI32,kWasmI32];
    const v86 = [kWasmI32];
    let v88;
    try {
        let v222;
        try { v222 = makeSig(v85, v86); } catch (e) {}
        v88 = v222;
    } catch(e223) {
    }
    try {
        try { builder.addType(v88); } catch (e) {}
    } catch(e225) {
    }
    let v91;
    try {
        let v230;
        try { v230 = wasmRefType(1); } catch (e) {}
        v91 = v230;
    } catch(e231) {
    }
    let v92;
    try {
        let v236;
        try { v236 = wasmRefNullType(kWasmNullFuncRef); } catch (e) {}
        v92 = v236;
    } catch(e237) {
    }
    let v95;
    try {
        let v242;
        try { v242 = wasmRefNullType(0); } catch (e) {}
        v95 = v242;
    } catch(e243) {
    }
    let v96;
    try {
        let v248;
        try { v248 = wasmRefNullType(kWasmNullExternRef); } catch (e) {}
        v96 = v248;
    } catch(e249) {
    }
    let v98;
    try {
        let v254;
        try { v254 = wasmRefType(kWasmEqRef); } catch (e) {}
        v98 = v254;
    } catch(e255) {
    }
    let v102;
    try {
        let v260;
        try { v260 = wasmRefNullType(kWasmStructRef); } catch (e) {}
        v102 = v260;
    } catch(e261) {
    }
    const v103 = [v91,v92,kWasmF64,v95,v96,v98,kWasmS128,kWasmFuncRef,v102];
    let v105;
    try {
        let v271;
        try { v271 = wasmRefType(6); } catch (e) {}
        v105 = v271;
    } catch(e272) {
    }
    let v106;
    try {
        let v277;
        try { v277 = wasmRefType(kWasmEqRef); } catch (e) {}
        v106 = v277;
    } catch(e278) {
    }
    let v108;
    try {
        let v283;
        try { v283 = wasmRefType(kWasmAnyRef); } catch (e) {}
        v108 = v283;
    } catch(e284) {
    }
    let v110;
    try {
        let v289;
        try { v289 = wasmRefType(8); } catch (e) {}
        v110 = v289;
    } catch(e290) {
    }
    let v112;
    try {
        let v295;
        try { v295 = wasmRefType(0); } catch (e) {}
        v112 = v295;
    } catch(e296) {
    }
    let v113;
    try {
        let v301;
        try { v301 = wasmRefType(kWasmAnyRef); } catch (e) {}
        v113 = v301;
    } catch(e302) {
    }
    const v114 = [kWasmF64,kWasmFuncRef,v105,v106,v108,kWasmI32,v110,v112,kWasmF64,v113];
    let v115;
    try {
        let v308;
        try { v308 = makeSig(v103, v114); } catch (e) {}
        v115 = v308;
    } catch(e309) {
    }
    try {
        try { builder.addType(v115); } catch (e) {}
    } catch(e311) {
    }
    try {
        try { builder.endRecGroup(); } catch (e) {}
    } catch(e313) {
    }
    let v119;
    try {
        let v318;
        try { v318 = wasmRefNullType(4); } catch (e) {}
        v119 = v318;
    } catch(e319) {
    }
    let v122;
    try {
        let v324;
        try { v324 = wasmRefType(1); } catch (e) {}
        v122 = v324;
    } catch(e325) {
    }
    let v123;
    try {
        let v330;
        try { v330 = wasmRefNullType(kWasmArrayRef); } catch (e) {}
        v123 = v330;
    } catch(e331) {
    }
    let v125;
    try {
        let v336;
        try { v336 = wasmRefType(8); } catch (e) {}
        v125 = v336;
    } catch(e337) {
    }
    const v126 = [kWasmI32,v119,kWasmS128,kWasmF32,v122,v123,v125];
    const v127 = [kWasmI32];
    let v128;
    try {
        let v346;
        try { v346 = makeSig(v126, v127); } catch (e) {}
        v128 = v346;
    } catch(e347) {
    }
    try {
        try { builder.addType(v128); } catch (e) {}
    } catch(e349) {
    }
    let v131;
    try {
        let v354;
        try { v354 = wasmRefType(kWasmExternRef); } catch (e) {}
        v131 = v354;
    } catch(e355) {
    }
    let v133;
    try {
        let v360;
        try { v360 = wasmRefType(1); } catch (e) {}
        v133 = v360;
    } catch(e361) {
    }
    let v134;
    try {
        let v366;
        try { v366 = wasmRefNullType(kWasmNullFuncRef); } catch (e) {}
        v134 = v366;
    } catch(e367) {
    }
    const v135 = [v131,v133,v134,kWasmF64];
    const v136 = [];
    let v137;
    try {
        let v375;
        try { v375 = makeSig(v135, v136); } catch (e) {}
        v137 = v375;
    } catch(e376) {
    }
    try {
        try { builder.addType(v137); } catch (e) {}
    } catch(e378) {
    }
    try {
        try { builder.addMemory(16, 32); } catch (e) {}
    } catch(e382) {
    }
    let v145;
    try {
        let v387;
        try { v387 = wasmI32Const(0); } catch (e) {}
        v145 = v387;
    } catch(e388) {
    }
    try {
        try { builder.addGlobal(kWasmI32, 0, v145); } catch (e) {}
    } catch(e391) {
    }
    let v149;
    try {
        let v396;
        try { v396 = wasmI32Const(0); } catch (e) {}
        v149 = v396;
    } catch(e397) {
    }
    try {
        try { builder.addGlobal(kWasmI32, 0, v149); } catch (e) {}
    } catch(e400) {
    }
    let v153;
    try {
        let v405;
        try { v405 = wasmI32Const(0); } catch (e) {}
        v153 = v405;
    } catch(e406) {
    }
    try {
        try { builder.addGlobal(kWasmI32, 0, v153); } catch (e) {}
    } catch(e409) {
    }
    let v157;
    try {
        let v414;
        try { v414 = wasmI32Const(0); } catch (e) {}
        v157 = v414;
    } catch(e415) {
    }
    try {
        try { builder.addGlobal(kWasmI32, 0, v157); } catch (e) {}
    } catch(e418) {
    }
    let v161;
    try {
        let v423;
        try { v423 = wasmI32Const(0); } catch (e) {}
        v161 = v423;
    } catch(e424) {
    }
    try {
        try { builder.addGlobal(kWasmI32, 0, v161); } catch (e) {}
    } catch(e427) {
    }
    let v165;
    try {
        let v432;
        try { v432 = wasmI32Const(0); } catch (e) {}
        v165 = v432;
    } catch(e433) {
    }
    try {
        try { builder.addGlobal(kWasmI32, 0, v165); } catch (e) {}
    } catch(e436) {
    }
    let v169;
    try {
        let v441;
        try { v441 = wasmI32Const(0); } catch (e) {}
        v169 = v441;
    } catch(e442) {
    }
    try {
        try { builder.addGlobal(kWasmI32, 0, v169); } catch (e) {}
    } catch(e445) {
    }
    let v173;
    try {
        let v450;
        try { v450 = wasmI32Const(0); } catch (e) {}
        v173 = v450;
    } catch(e451) {
    }
    try {
        try { builder.addGlobal(kWasmI32, 0, v173); } catch (e) {}
    } catch(e454) {
    }
    let v177;
    try {
        let v459;
        try { v459 = wasmI32Const(0); } catch (e) {}
        v177 = v459;
    } catch(e460) {
    }
    try {
        try { builder.addGlobal(kWasmI32, 0, v177); } catch (e) {}
    } catch(e463) {
    }
    let v181;
    try {
        let v468;
        try { v468 = wasmI32Const(0); } catch (e) {}
        v181 = v468;
    } catch(e469) {
    }
    try {
        try { builder.addGlobal(kWasmI32, 0, v181); } catch (e) {}
    } catch(e472) {
    }
    let v185;
    try {
        let v477;
        try { v477 = wasmI32Const(0); } catch (e) {}
        v185 = v477;
    } catch(e478) {
    }
    try {
        try { builder.addGlobal(kWasmI32, 0, v185); } catch (e) {}
    } catch(e481) {
    }
    let v189;
    try {
        let v486;
        try { v486 = wasmI32Const(0); } catch (e) {}
        v189 = v486;
    } catch(e487) {
    }
    try {
        try { builder.addGlobal(kWasmI32, 0, v189); } catch (e) {}
    } catch(e490) {
    }
    let v193;
    try {
        let v495;
        try { v495 = wasmI32Const(0); } catch (e) {}
        v193 = v495;
    } catch(e496) {
    }
    try {
        try { builder.addGlobal(kWasmI32, 0, v193); } catch (e) {}
    } catch(e499) {
    }
    let v197;
    try {
        let v504;
        try { v504 = wasmI32Const(0); } catch (e) {}
        v197 = v504;
    } catch(e505) {
    }
    try {
        try { builder.addGlobal(kWasmI32, 0, v197); } catch (e) {}
    } catch(e508) {
    }
    let v201;
    try {
        let v513;
        try { v513 = wasmI32Const(0); } catch (e) {}
        v201 = v513;
    } catch(e514) {
    }
    try {
        try { builder.addGlobal(kWasmI32, 0, v201); } catch (e) {}
    } catch(e517) {
    }
    let v205;
    try {
        let v522;
        try { v522 = wasmI32Const(0); } catch (e) {}
        v205 = v522;
    } catch(e523) {
    }
    try {
        try { builder.addGlobal(kWasmI32, 0, v205); } catch (e) {}
    } catch(e526) {
    }
    let v209;
    try {
        let v531;
        try { v531 = wasmI32Const(0); } catch (e) {}
        v209 = v531;
    } catch(e532) {
    }
    try {
        try { builder.addGlobal(kWasmI32, 0, v209); } catch (e) {}
    } catch(e535) {
    }
    let v213;
    try {
        let v540;
        try { v540 = wasmI32Const(0); } catch (e) {}
        v213 = v540;
    } catch(e541) {
    }
    try {
        try { builder.addGlobal(kWasmI32, 0, v213); } catch (e) {}
    } catch(e544) {
    }
    let v217;
    try {
        let v549;
        try { v549 = wasmI32Const(0); } catch (e) {}
        v217 = v549;
    } catch(e550) {
    }
    try {
        try { builder.addGlobal(kWasmI32, 0, v217); } catch (e) {}
    } catch(e553) {
    }
    let v221;
    try {
        let v558;
        try { v558 = wasmI32Const(0); } catch (e) {}
        v221 = v558;
    } catch(e559) {
    }
    try {
        try { builder.addGlobal(kWasmI32, 0, v221); } catch (e) {}
    } catch(e562) {
    }
    let v225;
    try {
        let v567;
        try { v567 = wasmI32Const(0); } catch (e) {}
        v225 = v567;
    } catch(e568) {
    }
    try {
        try { builder.addGlobal(kWasmI32, 0, v225); } catch (e) {}
    } catch(e571) {
    }
    let v229;
    try {
        let v576;
        try { v576 = wasmI32Const(0); } catch (e) {}
        v229 = v576;
    } catch(e577) {
    }
    try {
        try { builder.addGlobal(kWasmI32, 0, v229); } catch (e) {}
    } catch(e580) {
    }
    let v233;
    try {
        let v585;
        try { v585 = wasmI32Const(0); } catch (e) {}
        v233 = v585;
    } catch(e586) {
    }
    try {
        try { builder.addGlobal(kWasmI32, 0, v233); } catch (e) {}
    } catch(e589) {
    }
    let v237;
    try {
        let v594;
        try { v594 = wasmI32Const(0); } catch (e) {}
        v237 = v594;
    } catch(e595) {
    }
    try {
        try { builder.addGlobal(kWasmI32, 0, v237); } catch (e) {}
    } catch(e598) {
    }
    let v241;
    try {
        let v603;
        try { v603 = wasmI32Const(0); } catch (e) {}
        v241 = v603;
    } catch(e604) {
    }
    try {
        try { builder.addGlobal(kWasmI32, 0, v241); } catch (e) {}
    } catch(e607) {
    }
    let v245;
    try {
        let v612;
        try { v612 = wasmI32Const(0); } catch (e) {}
        v245 = v612;
    } catch(e613) {
    }
    try {
        try { builder.addGlobal(kWasmI32, 0, v245); } catch (e) {}
    } catch(e616) {
    }
    let v249;
    try {
        let v621;
        try { v621 = wasmI32Const(0); } catch (e) {}
        v249 = v621;
    } catch(e622) {
    }
    try {
        try { builder.addGlobal(kWasmI32, 0, v249); } catch (e) {}
    } catch(e625) {
    }
    let v253;
    try {
        let v630;
        try { v630 = wasmI32Const(0); } catch (e) {}
        v253 = v630;
    } catch(e631) {
    }
    try {
        try { builder.addGlobal(kWasmI32, 0, v253); } catch (e) {}
    } catch(e634) {
    }
    let v257;
    try {
        let v639;
        try { v639 = wasmI32Const(0); } catch (e) {}
        v257 = v639;
    } catch(e640) {
    }
    try {
        try { builder.addGlobal(kWasmI32, 0, v257); } catch (e) {}
    } catch(e643) {
    }
    let v261;
    try {
        let v648;
        try { v648 = wasmI32Const(0); } catch (e) {}
        v261 = v648;
    } catch(e649) {
    }
    try {
        try { builder.addGlobal(kWasmI32, 0, v261); } catch (e) {}
    } catch(e652) {
    }
    let v265;
    try {
        let v657;
        try { v657 = wasmI32Const(0); } catch (e) {}
        v265 = v657;
    } catch(e658) {
    }
    try {
        try { builder.addGlobal(kWasmI32, 0, v265); } catch (e) {}
    } catch(e661) {
    }
    let v269;
    try {
        let v666;
        try { v666 = wasmI32Const(0); } catch (e) {}
        v269 = v666;
    } catch(e667) {
    }
    try {
        try { builder.addGlobal(kWasmI32, 0, v269); } catch (e) {}
    } catch(e670) {
    }
    let v273;
    try {
        let v675;
        try { v675 = wasmI32Const(0); } catch (e) {}
        v273 = v675;
    } catch(e676) {
    }
    try {
        try { builder.addGlobal(kWasmI32, 0, v273); } catch (e) {}
    } catch(e679) {
    }
    let v277;
    try {
        let v684;
        try { v684 = wasmI32Const(0); } catch (e) {}
        v277 = v684;
    } catch(e685) {
    }
    try {
        try { builder.addGlobal(kWasmI32, 0, v277); } catch (e) {}
    } catch(e688) {
    }
    let v281;
    try {
        let v693;
        try { v693 = wasmI32Const(0); } catch (e) {}
        v281 = v693;
    } catch(e694) {
    }
    try {
        try { builder.addGlobal(kWasmI32, 0, v281); } catch (e) {}
    } catch(e697) {
    }
    let v285;
    try {
        let v702;
        try { v702 = wasmI32Const(0); } catch (e) {}
        v285 = v702;
    } catch(e703) {
    }
    try {
        try { builder.addGlobal(kWasmI32, 0, v285); } catch (e) {}
    } catch(e706) {
    }
    let v289;
    try {
        let v711;
        try { v711 = wasmI32Const(0); } catch (e) {}
        v289 = v711;
    } catch(e712) {
    }
    try {
        try { builder.addGlobal(kWasmI32, 0, v289); } catch (e) {}
    } catch(e715) {
    }
    let v293;
    try {
        let v720;
        try { v720 = wasmI32Const(0); } catch (e) {}
        v293 = v720;
    } catch(e721) {
    }
    try {
        try { builder.addGlobal(kWasmI32, 0, v293); } catch (e) {}
    } catch(e724) {
    }
    let v297;
    try {
        let v729;
        try { v729 = wasmI32Const(0); } catch (e) {}
        v297 = v729;
    } catch(e730) {
    }
    try {
        try { builder.addGlobal(kWasmI32, 0, v297); } catch (e) {}
    } catch(e733) {
    }
    let v301;
    try {
        let v738;
        try { v738 = wasmI32Const(0); } catch (e) {}
        v301 = v738;
    } catch(e739) {
    }
    try {
        try { builder.addGlobal(kWasmI32, 0, v301); } catch (e) {}
    } catch(e742) {
    }
    let v305;
    try {
        let v747;
        try { v747 = wasmI32Const(0); } catch (e) {}
        v305 = v747;
    } catch(e748) {
    }
    try {
        try { builder.addGlobal(kWasmI32, 0, v305); } catch (e) {}
    } catch(e751) {
    }
    let v309;
    try {
        let v756;
        try { v756 = wasmI32Const(0); } catch (e) {}
        v309 = v756;
    } catch(e757) {
    }
    try {
        try { builder.addGlobal(kWasmI32, 0, v309); } catch (e) {}
    } catch(e760) {
    }
    let v313;
    try {
        let v765;
        try { v765 = wasmI32Const(0); } catch (e) {}
        v313 = v765;
    } catch(e766) {
    }
    try {
        try { builder.addGlobal(kWasmI32, 0, v313); } catch (e) {}
    } catch(e769) {
    }
    let v317;
    try {
        let v774;
        try { v774 = wasmI32Const(0); } catch (e) {}
        v317 = v774;
    } catch(e775) {
    }
    try {
        try { builder.addGlobal(kWasmI32, 0, v317); } catch (e) {}
    } catch(e778) {
    }
    let v321;
    try {
        let v783;
        try { v783 = wasmI32Const(0); } catch (e) {}
        v321 = v783;
    } catch(e784) {
    }
    try {
        try { builder.addGlobal(kWasmI32, 0, v321); } catch (e) {}
    } catch(e787) {
    }
    let v325;
    try {
        let v792;
        try { v792 = wasmI32Const(0); } catch (e) {}
        v325 = v792;
    } catch(e793) {
    }
    try {
        try { builder.addGlobal(kWasmI32, 0, v325); } catch (e) {}
    } catch(e796) {
    }
    let v329;
    try {
        let v801;
        try { v801 = wasmI32Const(0); } catch (e) {}
        v329 = v801;
    } catch(e802) {
    }
    try {
        try { builder.addGlobal(kWasmI32, 0, v329); } catch (e) {}
    } catch(e805) {
    }
    let v333;
    try {
        let v810;
        try { v810 = wasmI32Const(0); } catch (e) {}
        v333 = v810;
    } catch(e811) {
    }
    try {
        try { builder.addGlobal(kWasmI32, 0, v333); } catch (e) {}
    } catch(e814) {
    }
    let v337;
    try {
        let v819;
        try { v819 = wasmI32Const(0); } catch (e) {}
        v337 = v819;
    } catch(e820) {
    }
    try {
        try { builder.addGlobal(kWasmI32, 0, v337); } catch (e) {}
    } catch(e823) {
    }
    let v341;
    try {
        let v828;
        try { v828 = wasmI32Const(0); } catch (e) {}
        v341 = v828;
    } catch(e829) {
    }
    try {
        try { builder.addGlobal(kWasmI32, 0, v341); } catch (e) {}
    } catch(e832) {
    }
    let v345;
    try {
        let v837;
        try { v837 = wasmI32Const(0); } catch (e) {}
        v345 = v837;
    } catch(e838) {
    }
    try {
        try { builder.addGlobal(kWasmI32, 0, v345); } catch (e) {}
    } catch(e841) {
    }
    let v349;
    try {
        let v846;
        try { v846 = wasmI32Const(0); } catch (e) {}
        v349 = v846;
    } catch(e847) {
    }
    try {
        try { builder.addGlobal(kWasmI32, 0, v349); } catch (e) {}
    } catch(e850) {
    }
    try {
        try { builder.addTable(kWasmFuncRef, 3, 3, undefined); } catch (e) {}
    } catch(e855) {
    }
    let v357;
    try {
        let v860;
        try { v860 = wasmI32Const(0); } catch (e) {}
        v357 = v860;
    } catch(e861) {
    }
    const v365 = [[kExprRefFunc,0],[kExprRefFunc,1],[kExprRefFunc,2]];
    try {
        try { builder.addActiveElementSegment(0, v357, v365, kWasmFuncRef); } catch (e) {}
    } catch(e873) {
    }
    let v367;
    try {
        let v878;
        try { v878 = wasmRefType(kWasmExternRef); } catch (e) {}
        v367 = v878;
    } catch(e879) {
    }
    let v369;
    try {
        let v884;
        try { v884 = wasmRefType(1); } catch (e) {}
        v369 = v884;
    } catch(e885) {
    }
    let v370;
    try {
        let v890;
        try { v890 = wasmRefNullType(kWasmNullFuncRef); } catch (e) {}
        v370 = v890;
    } catch(e891) {
    }
    const v371 = [v367,v369,v370,kWasmF64];
    const v372 = [];
    let v373;
    try {
        let v899;
        try { v899 = makeSig(v371, v372); } catch (e) {}
        v373 = v899;
    } catch(e900) {
    }
    try {
        try { builder.addTag(v373); } catch (e) {}
    } catch(e902) {
    }
    const v875 = [kExprI64Const,228,245,149,219,153,205,141,174,149,127,kExprI64Const,56,kExprI64Ne,kExprIf,125,kExprTry,125,kExprTry,125,kSimdPrefix,kExprS128Const,125,158,58,45,180,4,222,245,66,64,249,146,37,143,45,78,kSimdPrefix,kExprI8x16BitMask,kExprI32Const,211,132,248,4,kExprI32Const,8,kExprI32Const,0,kExprReturnCallIndirect,7,0,kExprCatch,0,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprF32Const,144,134,190,37,kExprCatchAll,kExprF32Const,215,59,100,39,kExprEnd,kExprCatch,0,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprF32Const,220,123,234,146,kExprCatchAll,kExprF32Const,105,190,19,158,kExprEnd,kExprF32Const,130,166,4,152,kExprI32Const,202,226,136,144,120,kExprI32Ctz,kExprI32Const,182,127,kExprI32ShrS,kExprSelect,kExprF32Sqrt,kExprI32SConvertF32,kExprI32Const,151,135,185,149,1,kExprTableGet,0,kGCPrefix,kExprRefCastNull,7,kExprBrOnNull,1,kExprDrop,kExprF32SConvertI32,kExprI32SConvertF32,kExprRefNull,4,kExprI32Const,0,kSimdPrefix,kExprI8x16Splat,kExprF32Const,149,4,4,8,kExprI64Const,182,191,219,243,152,164,195,168,114,kExprI32Const,194,188,248,128,121,kExprRefNull,114,kExprRefNull,115,kGCPrefix,kExprStructNew,1,kExprRefNull,106,kExprRefFunc,1,kExprReturnCall,2,kExprF32SConvertI64,kExprF32Abs,kExprElse,kExprF32Const,52,153,17,183,kExprEnd,kExprF32Neg,kExprTry,125,kExprBlock,126,kExprI32Const,246,175,198,158,120,kExprI64Const,132,163,200,130,221,200,231,224,67,kAtomicPrefix,kExprI64AtomicSub32U,1,195,1,kExprEnd,kExprI64Popcnt,kExprI64Const,128,127,kExprI32Const,164,202,141,220,3,kExprI32Const,223,215,229,236,6,kAtomicPrefix,kExprI32AtomicAnd16U,1,250,115,kExprRefNull,114,kExprRefNull,115,kGCPrefix,kExprStructNew,1,kExprRefNull,115,kExprF64Const,162,181,96,15,195,249,163,180,kExprI64Const,190,153,175,139,131,231,157,223,103,kExprI32Const,205,220,237,183,120,kExprRefNull,114,kGCPrefix,kExprStructNew,0,kExprRefNull,114,kExprI64Const,241,236,193,145,231,141,189,220,51,kExprI32Const,231,230,199,163,1,kExprRefNull,114,kGCPrefix,kExprStructNew,0,kExprI32Const,0,kSimdPrefix,kExprI8x16Splat,kExprRefNull,112,kExprRefNull,107,kExprRefNull,8,kExprCallRef,8,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprNop,kExprF64Neg,kExprF64Neg,kExprF64Neg,kExprF64Neg,kNumericPrefix,kExprI32SConvertSatF64,kExprI64Const,172,58,kAtomicPrefix,kExprI64AtomicAnd16U,0,171,13,kExprF32Const,245,37,142,174,kExprI64Const,188,243,238,178,216,222,230,253,0,kExprI32Const,149,252,215,224,125,kExprLoop,64,kExprEnd,kExprRefNull,114,kExprRefNull,115,kGCPrefix,kExprStructNew,1,kExprRefNull,115,kExprF64Const,6,194,223,108,94,7,192,204,kExprRefNull,0,kExprRefNull,114,kExprI64Const,141,243,198,179,237,232,137,189,75,kExprI32Const,251,166,157,148,6,kExprRefNull,114,kGCPrefix,kExprStructNew,0,kExprI32Const,0,kSimdPrefix,kExprI8x16Splat,kExprRefNull,112,kExprRefNull,107,kExprRefNull,8,kExprCallRef,8,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprF32ConvertF64,kExprF32CopySign,kExprF32Neg,kExprI32SConvertF32,kExprRefNull,114,kExprRefNull,115,kGCPrefix,kExprStructNew,1,kExprRefNull,115,kExprF64Const,44,123,160,20,29,118,158,232,kExprRefNull,0,kExprRefNull,114,kExprI64Const,128,223,160,243,203,141,165,139,82,kExprI32Const,242,182,162,145,1,kExprRefNull,114,kGCPrefix,kExprStructNew,0,kExprI32Const,0,kSimdPrefix,kExprI8x16Splat,kExprRefNull,112,kExprRefNull,107,kExprI32Const,1,kExprCallIndirect,8,0,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprI64SConvertF64,kExprI64DivU,kExprI64Const,144,249,240,246,253,128,160,16,kExprI64DivS,kExprF64UConvertI64,kExprF32ConvertF64,kExprCatch,0,kExprDrop,kExprDrop,kExprDrop,kExprDrop,kExprBlock,125,kExprGlobalGet,38,kExprF32SConvertI32,kExprEnd,kExprF32Floor,kExprEnd,kExprF32Lt,kExprI32LoadMem8S,0,176,225,2,kExprRefNull,1,kGCPrefix,kExprRefCastNull,4,kExprF64Const,223,10,253,22,214,43,85,78,kExprF64Const,203,186,159,17,26,242,235,61,kExprF64Const,163,18,81,110,114,221,78,173,kExprF64CopySign,kExprF64Lt,kSimdPrefix,kExprS128Load32Splat,0,242,238,3,kSimdPrefix,kExprI8x16Neg,kExprF32Const,84,108,101,203,kExprI64Const,242,219,145,141,139,192,209,207,177,127,kExprI64Const,151,251,190,188,194,188,222,187,154,127,kExprI64ShrS,kExprI32Const,171,204,242,246,4,kExprRefNull,114,kExprRefNull,115,kGCPrefix,kExprStructNew,1,kExprRefNull,106,kExprRefFunc,1,kExprReturnCall,2,kExprI32Const,216,199,134,224,125,kExprRefNull,114,kExprRefNull,115,kGCPrefix,kExprStructNew,1,kExprLocalSet,4,kExprRefNull,2,kExprI32Const,244,134,156,213,3,kGCPrefix,kExprRefI31,kExprI32Const,195,229,141,135,122,kExprRefNull,106,kGCPrefix,kExprStructNew,3,kExprI32Const,195,210,183,255,6,kExprI32Const,20,kExprI32RemS,kGCPrefix,kExprArrayNew,4,kExprLocalSet,8,kExprRefNull,111,kExprRefAsNonNull,kExprLocalSet,12,kExprRefFunc,1,kExprLocalSet,13,kExprI64Const,169,225,133,192,251,198,138,238,10,kExprI32Const,198,244,221,155,121,kExprRefNull,114,kGCPrefix,kExprStructNew,0,kExprLocalSet,15,kExprRefNull,2,kExprI32Const,209,233,255,199,7,kGCPrefix,kExprRefI31,kExprI32Const,137,207,159,149,122,kExprRefNull,106,kGCPrefix,kExprStructNew,2,kExprLocalSet,17,kExprI32Const,205,194,215,178,126,kExprEnd];
    let v877;
    try {
        let v1409;
        try { v1409 = wasmRefType(2); } catch (e) {}
        v877 = v1409;
    } catch(e1410) {
    }
    let v880;
    try {
        let v1415;
        try { v1415 = wasmRefType(kWasmStructRef); } catch (e) {}
        v880 = v1415;
    } catch(e1416) {
    }
    let v882;
    try {
        let v1421;
        try { v1421 = wasmRefNullType(kWasmArrayRef); } catch (e) {}
        v882 = v1421;
    } catch(e1422) {
    }
    let v885;
    try {
        let v1427;
        try { v1427 = wasmRefType(8); } catch (e) {}
        v885 = v1427;
    } catch(e1428) {
    }
    let v887;
    try {
        let v1433;
        try { v1433 = wasmRefType(kWasmExternRef); } catch (e) {}
        v887 = v1433;
    } catch(e1434) {
    }
    let v890;
    try {
        let v1439;
        try { v1439 = wasmRefNullType(kWasmI31Ref); } catch (e) {}
        v890 = v1439;
    } catch(e1440) {
    }
    let v893;
    try {
        let v1445;
        try { v1445 = wasmRefNullType(9); } catch (e) {}
        v893 = v1445;
    } catch(e1446) {
    }
    let v895;
    try {
        let v1451;
        try { v1451 = wasmRefType(kWasmArrayRef); } catch (e) {}
        v895 = v1451;
    } catch(e1452) {
    }
    let v898;
    try {
        let v1457;
        try { v1457 = wasmRefNullType(6); } catch (e) {}
        v898 = v1457;
    } catch(e1458) {
    }
    let v902;
    try {
        let v1463;
        try { v1463 = wasmRefType(1); } catch (e) {}
        v902 = v1463;
    } catch(e1464) {
    }
    let v904;
    try {
        let v1469;
        try { v1469 = wasmRefNullType(kWasmI31Ref); } catch (e) {}
        v904 = v1469;
    } catch(e1470) {
    }
    let v908;
    try {
        let v1475;
        try { v1475 = builder.addFunction(undefined, 7); } catch (e) {}
        v908 = v1475;
    } catch(e1476) {
    }
    let v909;
    try {
        let v1480;
        try { v1480 = v908.addLocals(v904, 1); } catch (e) {}
        v909 = v1480;
    } catch(e1481) {
    }
    let v910;
    try {
        let v1485;
        try { v1485 = v909.addLocals(v902, 1); } catch (e) {}
        v910 = v1485;
    } catch(e1486) {
    }
    let v911;
    try {
        let v1490;
        try { v1490 = v910.addLocals(kWasmI32, 2); } catch (e) {}
        v911 = v1490;
    } catch(e1491) {
    }
    let v912;
    try {
        let v1495;
        try { v1495 = v911.addLocals(v898, 1); } catch (e) {}
        v912 = v1495;
    } catch(e1496) {
    }
    let v913;
    try {
        let v1500;
        try { v1500 = v912.addLocals(v895, 1); } catch (e) {}
        v913 = v1500;
    } catch(e1501) {
    }
    let v914;
    try {
        let v1505;
        try { v1505 = v913.addLocals(v893, 1); } catch (e) {}
        v914 = v1505;
    } catch(e1506) {
    }
    let v915;
    try {
        let v1510;
        try { v1510 = v914.addLocals(v890, 1); } catch (e) {}
        v915 = v1510;
    } catch(e1511) {
    }
    let v916;
    try {
        let v1515;
        try { v1515 = v915.addLocals(kWasmI32, 1); } catch (e) {}
        v916 = v1515;
    } catch(e1516) {
    }
    let v917;
    try {
        let v1520;
        try { v1520 = v916.addLocals(v887, 1); } catch (e) {}
        v917 = v1520;
    } catch(e1521) {
    }
    let v918;
    try {
        let v1525;
        try { v1525 = v917.addLocals(v885, 1); } catch (e) {}
        v918 = v1525;
    } catch(e1526) {
    }
    let v919;
    try {
        let v1530;
        try { v1530 = v918.addLocals(v882, 1); } catch (e) {}
        v919 = v1530;
    } catch(e1531) {
    }
    let v920;
    try {
        let v1535;
        try { v1535 = v919.addLocals(v880, 1); } catch (e) {}
        v920 = v1535;
    } catch(e1536) {
    }
    let v921;
    try {
        let v1540;
        try { v1540 = v920.addLocals(kWasmFuncRef, 1); } catch (e) {}
        v921 = v1540;
    } catch(e1541) {
    }
    let v922;
    try {
        let v1545;
        try { v1545 = v921.addLocals(v877, 1); } catch (e) {}
        v922 = v1545;
    } catch(e1546) {
    }
    try {
        try { v922.addBodyWithEnd(v875); } catch (e) {}
    } catch(e1548) {
    }
    const v1025 = [kExprF64Const,153,168,134,75,220,40,127,183,kExprRefNull,112,kExprI32Const,254,163,241,121,kExprI32Const,172,146,178,210,4,kExprI32Const,20,kExprI32RemS,kGCPrefix,kExprArrayNew,6,kExprI64Const,205,187,218,249,229,207,139,225,225,0,kExprI32Const,254,245,200,142,127,kExprRefNull,114,kGCPrefix,kExprStructNew,0,kExprI64Const,244,176,241,156,181,189,188,162,241,0,kExprI32Const,170,230,227,183,124,kExprRefNull,114,kGCPrefix,kExprStructNew,0,kExprI32Const,202,204,230,182,120,kExprRefFunc,1,kExprI64Const,131,172,196,198,164,217,221,148,236,0,kExprI32Const,223,198,207,135,121,kExprRefNull,114,kGCPrefix,kExprStructNew,0,kExprF64Const,158,244,136,89,16,173,187,139,kExprI64Const,226,249,255,185,223,253,240,251,75,kExprI32Const,195,156,224,181,120,kExprRefNull,114,kGCPrefix,kExprStructNew,0,kExprEnd];
    let v1028;
    try {
        let v1656;
        try { v1656 = builder.addFunction(undefined, 8); } catch (e) {}
        v1028 = v1656;
    } catch(e1657) {
    }
    try {
        try { v1028.addBodyWithEnd(v1025); } catch (e) {}
    } catch(e1659) {
    }
    const v1035 = [kExprI32Const,165,148,233,233,120,kExprEnd];
    let v1039;
    try {
        let v1671;
        try { v1671 = builder.addFunction(undefined, 9); } catch (e) {}
        v1039 = v1671;
    } catch(e1672) {
    }
    let v1040;
    try {
        let v1676;
        try { v1676 = v1039.addLocals(kWasmI32, 4); } catch (e) {}
        v1040 = v1676;
    } catch(e1677) {
    }
    try {
        try { v1040.addBodyWithEnd(v1035); } catch (e) {}
    } catch(e1679) {
    }
    try {
        try { builder.addExport("main", 0); } catch (e) {}
    } catch(e1683) {
    }
    let v1045;
    try {
        let v1686;
        try { v1686 = builder.instantiate(); } catch (e) {}
        v1045 = v1686;
    } catch(e1687) {
    }
    const instance = v1045;
    try {
        const v1050 = instance?.exports;
        let v1051;
        try {
            let v1696;
            try { v1696 = v1050.main(1, 2, 3); } catch (e) {}
            v1051 = v1696;
        } catch(e1697) {
        }
        try {
            try { f0(v1051); } catch (e) {}
        } catch(e1699) {
        }
    } catch(e1700) {
        try {
            try { f0("caught exception", e1700); } catch (e) {}
        } catch(e1703) {
        }
    }
} catch(e1704) {
}
