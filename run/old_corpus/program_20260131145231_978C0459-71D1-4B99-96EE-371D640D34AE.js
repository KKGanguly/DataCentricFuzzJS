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
function testCallImport(a10, a11) {
    let v10;
    try {
        const v15 = new WasmModuleBuilder();
        v10 = v15;
    } catch(e16) {
    }
    var builder = v10;
    let v13;
    try {
        v13 = builder.addType(kSig_i_dd);
    } catch(e22) {
    }
    var sig_index = v13;
    try {
        builder.addImport("q", "func", sig_index);
    } catch(e27) {
    }
    const v24 = [kExprGetLocal,0,kExprGetLocal,1,kExprCallFunction,0];
    let v26;
    try {
        v26 = builder.addFunction("main", sig_index);
    } catch(e39) {
    }
    let v27;
    try {
        v27 = v26.addBody(v24);
    } catch(e43) {
    }
    try {
        v27.exportAs("main");
    } catch(e46) {
    }
    const v29 = { func: a10 };
    const v30 = { q: v29 };
    let v31;
    try {
        v31 = builder.instantiate(v30);
    } catch(e54) {
    }
    var main = v31?.exports?.main;
    for (let i59 = 0; i59 < 100000; i59 += 10003) {
        var a = 22.5 + i59;
        var b = 10.5 + i59;
        let v48;
        try {
            v48 = main(a, b);
        } catch(e74) {
        }
        var r = v48;
        try {
            a11(r, a, b);
        } catch(e77) {
        }
    }
}
function f51() {
    return this;
}
let v53;
try {
    v53 = f51();
} catch(e83) {
}
var global = v53;
var params = [-99,-99,-99,-99];
var was_called = false;
var length = -1;
function FOREIGN_SUB(a101, a102) {
    const v79 = ((("FOREIGN_SUB(" + a101) + ", ") + a102) + ")";
    try {
        f0(v79);
    } catch(e112) {
    }
    was_called = true;
    params[0] = this;
    params[1] = a101;
    params[2] = a102;
    return (a101 - a102) | 0;
}
function check_FOREIGN_SUB(a119, a120, a121) {
    const v92 = (a120 - a121) | 0;
    try {
        f0(v92, a119);
    } catch(e127) {
    }
    try {
        f0(was_called);
    } catch(e129) {
    }
    const v95 = params?.[0];
    try {
        f0(global, v95);
    } catch(e133) {
    }
    const v97 = params?.[1];
    try {
        f0(a120, v97);
    } catch(e137) {
    }
    const v99 = params?.[2];
    try {
        f0(a121, v99);
    } catch(e141) {
    }
    was_called = false;
}
try {
    testCallImport(FOREIGN_SUB, check_FOREIGN_SUB);
} catch(e144) {
}
function FOREIGN_ABCD(a146, a147, a148, a149) {
    const v120 = ((((((("FOREIGN_ABCD(" + a146) + ", ") + a147) + ", ") + a148) + ", ") + a149) + ")";
    try {
        f0(v120);
    } catch(e165) {
    }
    was_called = true;
    params[0] = this;
    params[1] = a146;
    params[2] = a147;
    params[3] = a148;
    params[4] = a149;
    return ((a146 * a147) * 6) | 0;
}
function check_FOREIGN_ABCD(a174, a175, a176) {
    const v137 = ((a175 * a176) * 6) | 0;
    try {
        f0(v137, a174);
    } catch(e184) {
    }
    try {
        f0(was_called);
    } catch(e186) {
    }
    const v140 = params?.[0];
    try {
        f0(global, v140);
    } catch(e190) {
    }
    const v142 = params?.[1];
    try {
        f0(a175, v142);
    } catch(e194) {
    }
    const v144 = params?.[2];
    try {
        f0(a176, v144);
    } catch(e198) {
    }
    const v147 = params?.[3];
    try {
        f0(undefined, v147);
    } catch(e203) {
    }
    const v150 = params?.[4];
    try {
        f0(undefined, v150);
    } catch(e208) {
    }
    was_called = false;
}
try {
    testCallImport(FOREIGN_ABCD, check_FOREIGN_ABCD);
} catch(e211) {
}
function FOREIGN_ARGUMENTS0() {
    try {
        f0("FOREIGN_ARGUMENTS0");
    } catch(e215) {
    }
    was_called = true;
    length = arguments?.length;
    for (let i220 = 0; i220 < arguments?.length; i220++) {
        params[i220] = arguments?.[i220];
    }
    return ((arguments?.[0] * arguments?.[1]) * 7) | 0;
}
function FOREIGN_ARGUMENTS1(a239) {
    try {
        f0("FOREIGN_ARGUMENTS1", a239);
    } catch(e242) {
    }
    was_called = true;
    length = arguments?.length;
    for (let i247 = 0; i247 < arguments?.length; i247++) {
        params[i247] = arguments?.[i247];
    }
    return ((arguments?.[0] * arguments?.[1]) * 7) | 0;
}
function FOREIGN_ARGUMENTS2(a266, a267) {
    try {
        f0("FOREIGN_ARGUMENTS2", a266, a267);
    } catch(e270) {
    }
    was_called = true;
    length = arguments?.length;
    for (let i275 = 0; i275 < arguments?.length; i275++) {
        params[i275] = arguments?.[i275];
    }
    return ((a266 * a267) * 7) | 0;
}
function FOREIGN_ARGUMENTS3(a290, a291, a292) {
    try {
        f0("FOREIGN_ARGUMENTS3", a290, a291, a292);
    } catch(e295) {
    }
    was_called = true;
    length = arguments?.length;
    for (let i300 = 0; i300 < arguments?.length; i300++) {
        params[i300] = arguments?.[i300];
    }
    return ((a290 * a291) * 7) | 0;
}
function FOREIGN_ARGUMENTS4(a315, a316, a317, a318) {
    try {
        f0("FOREIGN_ARGUMENTS4", a315, a316, a317, a318);
    } catch(e321) {
    }
    was_called = true;
    length = arguments?.length;
    for (let i326 = 0; i326 < arguments?.length; i326++) {
        params[i326] = arguments?.[i326];
    }
    return ((a315 * a316) * 7) | 0;
}
function check_FOREIGN_ARGUMENTS(a341, a342, a343) {
    const v285 = ((a342 * a343) * 7) | 0;
    try {
        f0(v285, a341);
    } catch(e351) {
    }
    try {
        f0(was_called);
    } catch(e353) {
    }
    try {
        f0(2, length);
    } catch(e356) {
    }
    const v290 = params?.[0];
    try {
        f0(a342, v290);
    } catch(e360) {
    }
    const v292 = params?.[1];
    try {
        f0(a343, v292);
    } catch(e364) {
    }
    was_called = false;
}
try {
    testCallImport(FOREIGN_ARGUMENTS0, check_FOREIGN_ARGUMENTS);
} catch(e367) {
}
try {
    testCallImport(FOREIGN_ARGUMENTS1, check_FOREIGN_ARGUMENTS);
} catch(e369) {
}
try {
    testCallImport(FOREIGN_ARGUMENTS2, check_FOREIGN_ARGUMENTS);
} catch(e371) {
}
try {
    testCallImport(FOREIGN_ARGUMENTS3, check_FOREIGN_ARGUMENTS);
} catch(e373) {
}
try {
    testCallImport(FOREIGN_ARGUMENTS4, check_FOREIGN_ARGUMENTS);
} catch(e375) {
}
function returnValue(a377) {
    function f302(a379, a380) {
        try {
            f0("RETURN_VALUE ", a377);
        } catch(e383) {
        }
        return a377;
    }
    return f302;
}
function checkReturn(a385) {
    function f309(a387, a388, a389) {
        try {
            f0(a385, a387);
        } catch(e391) {
        }
    }
    return f309;
}
let v315;
try {
    v315 = returnValue(undefined);
} catch(e396) {
}
let v317;
try {
    v317 = checkReturn(0);
} catch(e401) {
}
try {
    testCallImport(v315, v317);
} catch(e403) {
}
let v320;
try {
    v320 = returnValue(null);
} catch(e408) {
}
let v322;
try {
    v322 = checkReturn(0);
} catch(e413) {
}
try {
    testCallImport(v320, v322);
} catch(e415) {
}
let v325;
try {
    v325 = returnValue("0");
} catch(e420) {
}
let v327;
try {
    v327 = checkReturn(0);
} catch(e425) {
}
try {
    testCallImport(v325, v327);
} catch(e427) {
}
let v330;
try {
    v330 = returnValue("-77");
} catch(e432) {
}
const v332 = -77;
let v333;
try {
    v333 = checkReturn(v332);
} catch(e439) {
}
try {
    testCallImport(v330, v333);
} catch(e441) {
}
function f335() {
    return 198;
}
var objWithValueOf = { valueOf: f335 };
let v339;
try {
    v339 = returnValue(objWithValueOf);
} catch(e449) {
}
let v341;
try {
    v341 = checkReturn(198);
} catch(e454) {
}
try {
    testCallImport(v339, v341);
} catch(e456) {
}
function testCallBinopVoid(a458, a459, a460) {
    var passed_length = -1;
    var passed_a = -1;
    var passed_b = -1;
    var args_a = -1;
    var args_b = -1;
    function f362(a477, a478) {
        passed_length = arguments?.length;
        passed_a = a477;
        passed_b = a478;
        args_a = arguments?.[0];
        args_b = arguments?.[1];
    }
    const v371 = { func: f362 };
    var ffi = { q: v371 };
    let v375;
    try {
        const v492 = new WasmModuleBuilder();
        v375 = v492;
    } catch(e493) {
    }
    var builder = v375;
    let v380;
    try {
        v380 = makeSig_v_xx(a458);
    } catch(e499) {
    }
    try {
        builder.addImport("q", "func", v380);
    } catch(e503) {
    }
    const v390 = [kExprGetLocal,0,kExprGetLocal,1,kExprCallFunction,0,kExprI32Const,39];
    let v394;
    try {
        v394 = makeSig_r_xx(kWasmI32, a458);
    } catch(e518) {
    }
    let v395;
    try {
        v395 = builder.addFunction("main", v394);
    } catch(e523) {
    }
    let v396;
    try {
        v396 = v395.addBody(v390);
    } catch(e527) {
    }
    try {
        v396.exportFunc("main");
    } catch(e530) {
    }
    let v398;
    try {
        v398 = builder.instantiate(ffi);
    } catch(e534) {
    }
    var main = v398?.exports?.main;
    try {
        f0("testCallBinopVoid", a458);
    } catch(e540) {
    }
    for (let i542 = 0; i542 < 100000; i542 += 10003.1) {
        var a = 22.5 + i542;
        var b = 10.5 + i542;
        let v417;
        try {
            v417 = main(a, b);
        } catch(e557) {
        }
        var r = v417;
        try {
            f0(39, r);
        } catch(e561) {
        }
        try {
            f0(2, passed_length);
        } catch(e564) {
        }
        var expected_a;
        var expected_b;
        switch (a458) {
            case kWasmI32:
                {
                    expected_a = a | 0;
                    expected_b = b | 0;
                    break;
                }
            case kWasmF32:
                {
                    let v434;
                    try {
                        v434 = Math.fround(a);
                    } catch(e580) {
                    }
                    expected_a = v434;
                    let v435;
                    try {
                        v435 = Math.fround(b);
                    } catch(e585) {
                    }
                    expected_b = v435;
                    break;
                }
            case kWasmF64:
                {
                    expected_a = a;
                    expected_b = b;
                    break;
                }
        }
        try {
            f0(expected_a, args_a);
        } catch(e587) {
        }
        try {
            f0(expected_b, args_b);
        } catch(e589) {
        }
        try {
            f0(expected_a, passed_a);
        } catch(e591) {
        }
        try {
            f0(expected_b, passed_b);
        } catch(e593) {
        }
    }
}
try {
    testCallBinopVoid(kWasmI32);
} catch(e596) {
}
try {
    testCallBinopVoid(kWasmF32);
} catch(e599) {
}
try {
    testCallBinopVoid(kWasmF64);
} catch(e602) {
}
function testCallPrint() {
    let v448;
    try {
        const v607 = new WasmModuleBuilder();
        v448 = v607;
    } catch(e608) {
    }
    var builder = v448;
    let v453;
    try {
        v453 = makeSig_v_x(kWasmI32);
    } catch(e615) {
    }
    try {
        builder.addImport("q", "print", v453);
    } catch(e619) {
    }
    let v458;
    try {
        v458 = makeSig_r_x(kWasmF64, kWasmF64);
    } catch(e625) {
    }
    try {
        builder.addImport("q", "print", v458);
    } catch(e629) {
    }
    const v467 = [kExprI32Const,27,kExprCallFunction,0,kExprGetLocal,0,kExprCallFunction,1];
    let v469;
    try {
        v469 = makeSig_r_x(kWasmF64, kWasmF64);
    } catch(e644) {
    }
    let v470;
    try {
        v470 = builder.addFunction("main", v469);
    } catch(e649) {
    }
    let v471;
    try {
        v471 = v470.addBody(v467);
    } catch(e653) {
    }
    try {
        v471.exportFunc();
    } catch(e655) {
    }
    const v473 = { print: f0 };
    const v474 = { q: v473 };
    let v475;
    try {
        v475 = builder.instantiate(v474);
    } catch(e663) {
    }
    var main = v475?.exports?.main;
    for (let i669 = -9; i669 < 900; i669 += 16.125) {
        try {
            main(i669);
        } catch(e676) {
        }
    }
}
try {
    testCallPrint();
} catch(e678) {
}
try {
    testCallPrint();
} catch(e680) {
}
function testCallImport2(a682, a683, a684) {
    let v495;
    try {
        const v688 = new WasmModuleBuilder();
        v495 = v688;
    } catch(e689) {
    }
    var builder = v495;
    try {
        builder.addImport("q", "foo", kSig_i_v);
    } catch(e695) {
    }
    try {
        builder.addImport("t", "bar", kSig_i_v);
    } catch(e700) {
    }
    const v508 = [kExprCallFunction,0,kExprCallFunction,1,kExprI32Add];
    let v510;
    try {
        v510 = builder.addFunction("main", kSig_i_v);
    } catch(e712) {
    }
    let v511;
    try {
        v511 = v510.addBody(v508);
    } catch(e716) {
    }
    try {
        v511.exportFunc();
    } catch(e718) {
    }
    const v513 = { foo: a682 };
    const v514 = { bar: a683 };
    const v515 = { q: v513, t: v514 };
    let v516;
    try {
        v516 = builder.instantiate(v515);
    } catch(e728) {
    }
    var main = v516?.exports?.main;
    let v520;
    try {
        v520 = main();
    } catch(e735) {
    }
    try {
        f0(a684, v520);
    } catch(e737) {
    }
}
function f522() {
    return 33;
}
function f524() {
    return 44;
}
try {
    testCallImport2(f522, f524, 77);
} catch(e744) {
}
function testImportName(a746) {
    let v531;
    try {
        const v750 = new WasmModuleBuilder();
        v531 = v750;
    } catch(e751) {
    }
    var builder = v531;
    try {
        builder.addImport("M", a746, kSig_i_v);
    } catch(e756) {
    }
    const v538 = [kExprCallFunction,0];
    let v540;
    try {
        v540 = builder.addFunction("main", kSig_i_v);
    } catch(e766) {
    }
    let v541;
    try {
        v541 = v540.addBody(v538);
    } catch(e770) {
    }
    try {
        v541.exportFunc();
    } catch(e772) {
    }
    const v773 = () => {
        return 42;
    };
    const v543 = v773;
    const v545 = { [a746]: v543 };
    const v546 = { M: v545 };
    let v547;
    try {
        v547 = builder.instantiate(v546);
    } catch(e783) {
    }
    let main = v547?.exports?.main;
    let v552;
    try {
        v552 = main();
    } catch(e790) {
    }
    try {
        f0(42, v552);
    } catch(e793) {
    }
}
try {
    testImportName("bla");
} catch(e796) {
}
try {
    testImportName("0");
} catch(e799) {
}
try {
    testImportName("  a @#$2 324 ");
} catch(e802) {
}
try {
    testImportName("");
} catch(e805) {
}
function testExportedImportsOnDifferentInstances() {
    const v565 = arguments?.callee?.name;
    try {
        f0(v565);
    } catch(e812) {
    }
    function f567() {
        let v569;
        try {
            const v817 = new WasmModuleBuilder();
            v569 = v817;
        } catch(e818) {
        }
        const builder = v569;
        const v573 = [kExprI32Const,11];
        let v576;
        try {
            v576 = builder.addFunction("f11", kSig_i_v);
        } catch(e829) {
        }
        let v577;
        try {
            v577 = v576.addBody(v573);
        } catch(e833) {
        }
        try {
            v577.exportFunc();
        } catch(e835) {
        }
        const v580 = [kExprI32Const,17];
        let v582;
        try {
            v582 = builder.addFunction("f17", kSig_i_v);
        } catch(e844) {
        }
        let v583;
        try {
            v583 = v582.addBody(v580);
        } catch(e848) {
        }
        try {
            v583.exportFunc();
        } catch(e850) {
        }
        let v585;
        try {
            v585 = builder.instantiate();
        } catch(e854) {
        }
        return v585?.exports;
    }
    let v587;
    try {
        v587 = f567();
    } catch(e859) {
    }
    const exp = v587;
    let v590;
    try {
        const v864 = new WasmModuleBuilder();
        v590 = v864;
    } catch(e865) {
    }
    const builder = v590;
    let v595;
    try {
        v595 = builder.addImport("q", "imp", kSig_i_v);
    } catch(e873) {
    }
    const imp_index = v595;
    try {
        builder.addExport("exp", imp_index);
    } catch(e877) {
    }
    let v599;
    try {
        v599 = builder.toModule();
    } catch(e881) {
    }
    const module = v599;
    const v602 = WebAssembly?.Instance;
    const v603 = exp?.f11;
    const v604 = { imp: v603 };
    const v605 = { q: v604 };
    let v606;
    try {
        const v894 = new v602(module, v605);
        v606 = v894;
    } catch(e895) {
    }
    const instance0 = v606;
    const v608 = WebAssembly?.Instance;
    const v609 = exp?.f17;
    const v610 = { imp: v609 };
    const v611 = { q: v610 };
    let v612;
    try {
        const v907 = new v608(module, v611);
        v612 = v907;
    } catch(e908) {
    }
    const instance1 = v612;
    const v614 = WebAssembly?.Instance;
    const v912 = (a913) => {
        return 21;
    };
    const v615 = v912;
    const v618 = { imp: v615 };
    const v619 = { q: v618 };
    let v620;
    try {
        const v922 = new v614(module, v619);
        v620 = v922;
    } catch(e923) {
    }
    const instance2 = v620;
    const v622 = WebAssembly?.Instance;
    const v927 = (a928) => {
        return 27;
    };
    const v623 = v927;
    const v626 = { imp: v623 };
    const v627 = { q: v626 };
    let v628;
    try {
        const v937 = new v622(module, v627);
        v628 = v937;
    } catch(e938) {
    }
    const instance3 = v628;
    const v631 = instance0?.exports;
    let v632;
    try {
        v632 = v631.exp();
    } catch(e945) {
    }
    try {
        f0(11, v632);
    } catch(e948) {
    }
    const v635 = instance1?.exports;
    let v636;
    try {
        v636 = v635.exp();
    } catch(e954) {
    }
    try {
        f0(17, v636);
    } catch(e957) {
    }
    const v639 = instance2?.exports;
    let v640;
    try {
        v640 = v639.exp();
    } catch(e963) {
    }
    try {
        f0(21, v640);
    } catch(e966) {
    }
    const v643 = instance3?.exports;
    let v644;
    try {
        v644 = v643.exp();
    } catch(e972) {
    }
    try {
        f0(27, v644);
    } catch(e975) {
    }
}
try {
    testExportedImportsOnDifferentInstances();
} catch(e977) {
}
function testImportedStartFunctionOnDifferentInstances() {
    const v650 = arguments?.callee?.name;
    try {
        f0(v650);
    } catch(e984) {
    }
    var global = 0;
    const v987 = (a988) => {
        global = a988;
        return a988;
    };
    const v654 = v987;
    const set_global = v654;
    function f657() {
        let v659;
        try {
            const v995 = new WasmModuleBuilder();
            v659 = v995;
        } catch(e996) {
        }
        const builder = v659;
        let v664;
        try {
            v664 = builder.addImport("q", "imp", kSig_v_i);
        } catch(e1004) {
        }
        const imp_index = v664;
        const v669 = [kExprI32Const,11,kExprCallFunction,imp_index];
        let v672;
        try {
            v672 = builder.addFunction("f11", kSig_v_v);
        } catch(e1016) {
        }
        let v673;
        try {
            v673 = v672.addBody(v669);
        } catch(e1020) {
        }
        try {
            v673.exportFunc();
        } catch(e1022) {
        }
        const v676 = [kExprI32Const,17,kExprCallFunction,imp_index];
        let v678;
        try {
            v678 = builder.addFunction("f17", kSig_v_v);
        } catch(e1031) {
        }
        let v679;
        try {
            v679 = v678.addBody(v676);
        } catch(e1035) {
        }
        try {
            v679.exportFunc();
        } catch(e1037) {
        }
        const v681 = { imp: set_global };
        const v682 = { q: v681 };
        let v683;
        try {
            v683 = builder.instantiate(v682);
        } catch(e1045) {
        }
        return v683?.exports;
    }
    let v685;
    try {
        v685 = f657();
    } catch(e1050) {
    }
    const exp = v685;
    let v688;
    try {
        const v1055 = new WasmModuleBuilder();
        v688 = v1055;
    } catch(e1056) {
    }
    const builder = v688;
    let v693;
    try {
        v693 = builder.addImport("q", "imp", kSig_v_v);
    } catch(e1064) {
    }
    const imp_index = v693;
    try {
        builder.addStart(imp_index);
    } catch(e1067) {
    }
    let v696;
    try {
        v696 = builder.toModule();
    } catch(e1071) {
    }
    const module = v696;
    try {
        f0(0, global);
    } catch(e1075) {
    }
    const v701 = WebAssembly?.Instance;
    const v702 = exp?.f11;
    const v703 = { imp: v702 };
    const v704 = { q: v703 };
    try {
        new v701(module, v704);
    } catch(e1086) {
    }
    try {
        f0(11, global);
    } catch(e1089) {
    }
    const v708 = WebAssembly?.Instance;
    const v709 = exp?.f17;
    const v710 = { imp: v709 };
    const v711 = { q: v710 };
    try {
        new v708(module, v711);
    } catch(e1099) {
    }
    try {
        f0(17, global);
    } catch(e1102) {
    }
    const v715 = WebAssembly?.Instance;
    const v1105 = (a1106) => {
        let v719;
        try {
            v719 = set_global(21);
        } catch(e1111) {
        }
        return v719;
    };
    const v716 = v1105;
    const v720 = { imp: v716 };
    const v721 = { q: v720 };
    try {
        new v715(module, v721);
    } catch(e1118) {
    }
    try {
        f0(21, global);
    } catch(e1121) {
    }
    const v725 = WebAssembly?.Instance;
    const v1124 = (a1125) => {
        let v729;
        try {
            v729 = set_global(27);
        } catch(e1130) {
        }
        return v729;
    };
    const v726 = v1124;
    const v730 = { imp: v726 };
    const v731 = { q: v730 };
    try {
        new v725(module, v731);
    } catch(e1137) {
    }
    try {
        f0(27, global);
    } catch(e1140) {
    }
}
try {
    testImportedStartFunctionOnDifferentInstances();
} catch(e1142) {
}
function testImportedStartFunctionUsesRightInstance() {
    const v739 = arguments?.callee?.name;
    try {
        f0(v739);
    } catch(e1149) {
    }
    var global = 0;
    const v1152 = (a1153) => {
        global = a1153;
        return a1153;
    };
    const v743 = v1152;
    const set_global = v743;
    function f746() {
        let v748;
        try {
            const v1160 = new WasmModuleBuilder();
            v748 = v1160;
        } catch(e1161) {
        }
        const builder = v748;
        try {
            builder.addMemory(1, 1);
        } catch(e1166) {
        }
        try {
            builder.exportMemoryAs("mem");
        } catch(e1169) {
        }
        let v758;
        try {
            v758 = builder.addImport("q", "imp", kSig_v_i);
        } catch(e1176) {
        }
        const imp_index = v758;
        const v766 = [kExprI32Const,0,kExprI32Const,11,kExprI32StoreMem8,0,0];
        let v769;
        try {
            v769 = builder.addFunction("f", kSig_v_v);
        } catch(e1191) {
        }
        let v770;
        try {
            v770 = v769.addBody(v766);
        } catch(e1195) {
        }
        try {
            v770.exportFunc();
        } catch(e1197) {
        }
        const v772 = { imp: set_global };
        const v773 = { q: v772 };
        let v774;
        try {
            v774 = builder.instantiate(v773);
        } catch(e1205) {
        }
        return v774?.exports;
    }
    let v776;
    try {
        v776 = f746();
    } catch(e1210) {
    }
    const exp = v776;
    let v779;
    try {
        const v1215 = new WasmModuleBuilder();
        v779 = v1215;
    } catch(e1216) {
    }
    const builder = v779;
    let v784;
    try {
        v784 = builder.addImport("q", "imp", kSig_v_v);
    } catch(e1224) {
    }
    const imp_index = v784;
    try {
        builder.addStart(imp_index);
    } catch(e1227) {
    }
    let v787;
    try {
        v787 = builder.toModule();
    } catch(e1231) {
    }
    const module = v787;
    const v792 = exp?.mem?.buffer;
    let v793;
    try {
        const v1239 = new Uint8Array(v792);
        v793 = v1239;
    } catch(e1240) {
    }
    const v794 = v793?.[0];
    try {
        f0(0, v794, "memory initially 0");
    } catch(e1246) {
    }
    const v798 = WebAssembly?.Instance;
    const v799 = exp?.f;
    const v800 = { imp: v799 };
    const v801 = { q: v800 };
    try {
        new v798(module, v801);
    } catch(e1257) {
    }
    const v805 = exp?.mem?.buffer;
    let v806;
    try {
        const v1264 = new Uint8Array(v805);
        v806 = v1264;
    } catch(e1265) {
    }
    const v807 = v806?.[0];
    try {
        f0(11, v807, "memory changed to 11");
    } catch(e1271) {
    }
}
try {
    testImportedStartFunctionUsesRightInstance();
} catch(e1273) {
}
