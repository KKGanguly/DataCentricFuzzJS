function f0() {
}
try { load("test/mjsunit/wasm/wasm-constants.js"); } catch (e) {}
try { load("test/mjsunit/wasm/wasm-module-builder.js"); } catch (e) {}
function testCallImport(a7, a8) {
    let v10;
    try { v10 = new WasmModuleBuilder(); } catch (e) {}
    var builder = v10;
    let v13;
    try { v13 = builder.addType(kSig_i_dd); } catch (e) {}
    var sig_index = v13;
    try { builder.addImport("q", "func", sig_index); } catch (e) {}
    const v24 = [kExprGetLocal,0,kExprGetLocal,1,kExprCallFunction,0];
    let v26;
    try { v26 = builder.addFunction("main", sig_index); } catch (e) {}
    let v27;
    try { v27 = v26.addBody(v24); } catch (e) {}
    try { v27.exportAs("main"); } catch (e) {}
    const v29 = { func: a7 };
    const v30 = { q: v29 };
    let v31;
    try { v31 = builder.instantiate(v30); } catch (e) {}
    var main = v31?.exports?.main;
    for (let i36 = 0; i36 < 100000; i36 += 10003) {
        var a = 22.5 + i36;
        var b = 10.5 + i36;
        let v48;
        try { v48 = main(a, b); } catch (e) {}
        var r = v48;
        try { a8(r, a, b); } catch (e) {}
    }
}
function f51() {
    return this;
}
let v53;
try { v53 = f51(); } catch (e) {}
var global = v53;
var params = [-99,-99,-99,-99];
var was_called = false;
var length = -1;
function FOREIGN_SUB(a71, a72) {
    const v79 = ((("FOREIGN_SUB(" + a71) + ", ") + a72) + ")";
    try { f0(v79); } catch (e) {}
    was_called = true;
    params[0] = this;
    params[1] = a71;
    params[2] = a72;
    return (a71 - a72) | 0;
}
function check_FOREIGN_SUB(a87, a88, a89) {
    const v92 = (a88 - a89) | 0;
    try { f0(v92, a87); } catch (e) {}
    try { f0(was_called); } catch (e) {}
    const v95 = params?.[0];
    try { f0(global, v95); } catch (e) {}
    const v97 = params?.[1];
    try { f0(a88, v97); } catch (e) {}
    const v99 = params?.[2];
    try { f0(a89, v99); } catch (e) {}
    was_called = false;
}
try { testCallImport(FOREIGN_SUB, check_FOREIGN_SUB); } catch (e) {}
function FOREIGN_ABCD(a104, a105, a106, a107) {
    const v120 = ((((((("FOREIGN_ABCD(" + a104) + ", ") + a105) + ", ") + a106) + ", ") + a107) + ")";
    try { f0(v120); } catch (e) {}
    was_called = true;
    params[0] = this;
    params[1] = a104;
    params[2] = a105;
    params[3] = a106;
    params[4] = a107;
    return ((a104 * a105) * 6) | 0;
}
function check_FOREIGN_ABCD(a130, a131, a132) {
    const v137 = ((a131 * a132) * 6) | 0;
    try { f0(v137, a130); } catch (e) {}
    try { f0(was_called); } catch (e) {}
    const v140 = params?.[0];
    try { f0(global, v140); } catch (e) {}
    const v142 = params?.[1];
    try { f0(a131, v142); } catch (e) {}
    const v144 = params?.[2];
    try { f0(a132, v144); } catch (e) {}
    const v147 = params?.[3];
    try { f0(undefined, v147); } catch (e) {}
    const v150 = params?.[4];
    try { f0(undefined, v150); } catch (e) {}
    was_called = false;
}
try { testCallImport(FOREIGN_ABCD, check_FOREIGN_ABCD); } catch (e) {}
function FOREIGN_ARGUMENTS0() {
    try { f0("FOREIGN_ARGUMENTS0"); } catch (e) {}
    was_called = true;
    length = arguments?.length;
    for (let i161 = 0; i161 < arguments?.length; i161++) {
        params[i161] = arguments?.[i161];
    }
    return ((arguments?.[0] * arguments?.[1]) * 7) | 0;
}
function FOREIGN_ARGUMENTS1(a180) {
    try { f0("FOREIGN_ARGUMENTS1", a180); } catch (e) {}
    was_called = true;
    length = arguments?.length;
    for (let i187 = 0; i187 < arguments?.length; i187++) {
        params[i187] = arguments?.[i187];
    }
    return ((arguments?.[0] * arguments?.[1]) * 7) | 0;
}
function FOREIGN_ARGUMENTS2(a206, a207) {
    try { f0("FOREIGN_ARGUMENTS2", a206, a207); } catch (e) {}
    was_called = true;
    length = arguments?.length;
    for (let i214 = 0; i214 < arguments?.length; i214++) {
        params[i214] = arguments?.[i214];
    }
    return ((a206 * a207) * 7) | 0;
}
function FOREIGN_ARGUMENTS3(a229, a230, a231) {
    try { f0("FOREIGN_ARGUMENTS3", a229, a230, a231); } catch (e) {}
    was_called = true;
    length = arguments?.length;
    for (let i238 = 0; i238 < arguments?.length; i238++) {
        params[i238] = arguments?.[i238];
    }
    return ((a229 * a230) * 7) | 0;
}
function FOREIGN_ARGUMENTS4(a253, a254, a255, a256) {
    try { f0("FOREIGN_ARGUMENTS4", a253, a254, a255, a256); } catch (e) {}
    was_called = true;
    length = arguments?.length;
    for (let i263 = 0; i263 < arguments?.length; i263++) {
        params[i263] = arguments?.[i263];
    }
    return ((a253 * a254) * 7) | 0;
}
function check_FOREIGN_ARGUMENTS(a278, a279, a280) {
    const v285 = ((a279 * a280) * 7) | 0;
    try { f0(v285, a278); } catch (e) {}
    try { f0(was_called); } catch (e) {}
    try { f0(2, length); } catch (e) {}
    const v290 = params?.[0];
    try { f0(a279, v290); } catch (e) {}
    const v292 = params?.[1];
    try { f0(a280, v292); } catch (e) {}
    was_called = false;
}
try { testCallImport(FOREIGN_ARGUMENTS0, check_FOREIGN_ARGUMENTS); } catch (e) {}
try { testCallImport(FOREIGN_ARGUMENTS1, check_FOREIGN_ARGUMENTS); } catch (e) {}
try { testCallImport(FOREIGN_ARGUMENTS2, check_FOREIGN_ARGUMENTS); } catch (e) {}
try { testCallImport(FOREIGN_ARGUMENTS3, check_FOREIGN_ARGUMENTS); } catch (e) {}
try { testCallImport(FOREIGN_ARGUMENTS4, check_FOREIGN_ARGUMENTS); } catch (e) {}
function returnValue(a301) {
    function f302(a303, a304) {
        try { f0("RETURN_VALUE ", a301); } catch (e) {}
        return a301;
    }
    return f302;
}
function checkReturn(a308) {
    function f309(a310, a311, a312) {
        try { f0(a308, a310); } catch (e) {}
    }
    return f309;
}
let v315;
try { v315 = returnValue(undefined); } catch (e) {}
let v317;
try { v317 = checkReturn(0); } catch (e) {}
try { testCallImport(v315, v317); } catch (e) {}
let v320;
try { v320 = returnValue(null); } catch (e) {}
let v322;
try { v322 = checkReturn(0); } catch (e) {}
try { testCallImport(v320, v322); } catch (e) {}
let v325;
try { v325 = returnValue("0"); } catch (e) {}
let v327;
try { v327 = checkReturn(0); } catch (e) {}
try { testCallImport(v325, v327); } catch (e) {}
let v330;
try { v330 = returnValue("-77"); } catch (e) {}
const v332 = -77;
let v333;
try { v333 = checkReturn(v332); } catch (e) {}
try { testCallImport(v330, v333); } catch (e) {}
function f335() {
    return 198;
}
var objWithValueOf = { valueOf: f335 };
let v339;
try { v339 = returnValue(objWithValueOf); } catch (e) {}
let v341;
try { v341 = checkReturn(198); } catch (e) {}
try { testCallImport(v339, v341); } catch (e) {}
function testCallBinopVoid(a344, a345, a346) {
    var passed_length = -1;
    var passed_a = -1;
    var passed_b = -1;
    var args_a = -1;
    var args_b = -1;
    function f362(a363, a364) {
        passed_length = arguments?.length;
        passed_a = a363;
        passed_b = a364;
        args_a = arguments?.[0];
        args_b = arguments?.[1];
    }
    const v371 = { func: f362 };
    var ffi = { q: v371 };
    let v375;
    try { v375 = new WasmModuleBuilder(); } catch (e) {}
    var builder = v375;
    let v380;
    try { v380 = makeSig_v_xx(a344); } catch (e) {}
    try { builder.addImport("q", "func", v380); } catch (e) {}
    const v390 = [kExprGetLocal,0,kExprGetLocal,1,kExprCallFunction,0,kExprI32Const,39];
    let v394;
    try { v394 = makeSig_r_xx(kWasmI32, a344); } catch (e) {}
    let v395;
    try { v395 = builder.addFunction("main", v394); } catch (e) {}
    let v396;
    try { v396 = v395.addBody(v390); } catch (e) {}
    try { v396.exportFunc("main"); } catch (e) {}
    let v398;
    try { v398 = builder.instantiate(ffi); } catch (e) {}
    var main = v398?.exports?.main;
    try { f0("testCallBinopVoid", a344); } catch (e) {}
    for (let i405 = 0; i405 < 100000; i405 += 10003.1) {
        var a = 22.5 + i405;
        var b = 10.5 + i405;
        let v417;
        try { v417 = main(a, b); } catch (e) {}
        var r = v417;
        try { f0(39, r); } catch (e) {}
        try { f0(2, passed_length); } catch (e) {}
        var expected_a;
        var expected_b;
        switch (a344) {
            case kWasmI32:
                {
                    expected_a = a | 0;
                    expected_b = b | 0;
                    break;
                }
            case kWasmF32:
                {
                    let v434;
                    try { v434 = Math.fround(a); } catch (e) {}
                    expected_a = v434;
                    let v435;
                    try { v435 = Math.fround(b); } catch (e) {}
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
        try { f0(expected_a, args_a); } catch (e) {}
        try { f0(expected_b, args_b); } catch (e) {}
        try { f0(expected_a, passed_a); } catch (e) {}
        try { f0(expected_b, passed_b); } catch (e) {}
    }
}
try { testCallBinopVoid(kWasmI32); } catch (e) {}
try { testCallBinopVoid(kWasmF32); } catch (e) {}
try { testCallBinopVoid(kWasmF64); } catch (e) {}
function testCallPrint() {
    let v448;
    try { v448 = new WasmModuleBuilder(); } catch (e) {}
    var builder = v448;
    let v453;
    try { v453 = makeSig_v_x(kWasmI32); } catch (e) {}
    try { builder.addImport("q", "print", v453); } catch (e) {}
    let v458;
    try { v458 = makeSig_r_x(kWasmF64, kWasmF64); } catch (e) {}
    try { builder.addImport("q", "print", v458); } catch (e) {}
    const v467 = [kExprI32Const,27,kExprCallFunction,0,kExprGetLocal,0,kExprCallFunction,1];
    let v469;
    try { v469 = makeSig_r_x(kWasmF64, kWasmF64); } catch (e) {}
    let v470;
    try { v470 = builder.addFunction("main", v469); } catch (e) {}
    let v471;
    try { v471 = v470.addBody(v467); } catch (e) {}
    try { v471.exportFunc(); } catch (e) {}
    const v473 = { print: f0 };
    const v474 = { q: v473 };
    let v475;
    try { v475 = builder.instantiate(v474); } catch (e) {}
    var main = v475?.exports?.main;
    for (let i481 = -9; i481 < 900; i481 += 16.125) {
        try { main(i481); } catch (e) {}
    }
}
try { testCallPrint(); } catch (e) {}
try { testCallPrint(); } catch (e) {}
function testCallImport2(a491, a492, a493) {
    let v495;
    try { v495 = new WasmModuleBuilder(); } catch (e) {}
    var builder = v495;
    try { builder.addImport("q", "foo", kSig_i_v); } catch (e) {}
    try { builder.addImport("t", "bar", kSig_i_v); } catch (e) {}
    const v508 = [kExprCallFunction,0,kExprCallFunction,1,kExprI32Add];
    let v510;
    try { v510 = builder.addFunction("main", kSig_i_v); } catch (e) {}
    let v511;
    try { v511 = v510.addBody(v508); } catch (e) {}
    try { v511.exportFunc(); } catch (e) {}
    const v513 = { foo: a491 };
    const v514 = { bar: a492 };
    const v515 = { q: v513, t: v514 };
    let v516;
    try { v516 = builder.instantiate(v515); } catch (e) {}
    var main = v516?.exports?.main;
    let v520;
    try { v520 = main(); } catch (e) {}
    try { f0(a493, v520); } catch (e) {}
}
function f522() {
    return 33;
}
function f524() {
    return 44;
}
try { testCallImport2(f522, f524, 77); } catch (e) {}
function testImportName(a529) {
    let v531;
    try { v531 = new WasmModuleBuilder(); } catch (e) {}
    var builder = v531;
    try { builder.addImport("M", a529, kSig_i_v); } catch (e) {}
    const v538 = [kExprCallFunction,0];
    let v540;
    try { v540 = builder.addFunction("main", kSig_i_v); } catch (e) {}
    let v541;
    try { v541 = v540.addBody(v538); } catch (e) {}
    try { v541.exportFunc(); } catch (e) {}
    const v543 = () => {
        return 42;
    };
    const v545 = { [a529]: v543 };
    const v546 = { M: v545 };
    let v547;
    try { v547 = builder.instantiate(v546); } catch (e) {}
    let main = v547?.exports?.main;
    let v552;
    try { v552 = main(); } catch (e) {}
    try { f0(42, v552); } catch (e) {}
}
try { testImportName("bla"); } catch (e) {}
try { testImportName("0"); } catch (e) {}
try { testImportName("  a @#$2 324 "); } catch (e) {}
try { testImportName(""); } catch (e) {}
function testExportedImportsOnDifferentInstances() {
    const v565 = arguments?.callee?.name;
    try { f0(v565); } catch (e) {}
    function f567() {
        let v569;
        try { v569 = new WasmModuleBuilder(); } catch (e) {}
        const builder = v569;
        const v573 = [kExprI32Const,11];
        let v576;
        try { v576 = builder.addFunction("f11", kSig_i_v); } catch (e) {}
        let v577;
        try { v577 = v576.addBody(v573); } catch (e) {}
        try { v577.exportFunc(); } catch (e) {}
        const v580 = [kExprI32Const,17];
        let v582;
        try { v582 = builder.addFunction("f17", kSig_i_v); } catch (e) {}
        let v583;
        try { v583 = v582.addBody(v580); } catch (e) {}
        try { v583.exportFunc(); } catch (e) {}
        let v585;
        try { v585 = builder.instantiate(); } catch (e) {}
        return v585?.exports;
    }
    let v587;
    try { v587 = f567(); } catch (e) {}
    const exp = v587;
    let v590;
    try { v590 = new WasmModuleBuilder(); } catch (e) {}
    const builder = v590;
    let v595;
    try { v595 = builder.addImport("q", "imp", kSig_i_v); } catch (e) {}
    const imp_index = v595;
    try { builder.addExport("exp", imp_index); } catch (e) {}
    let v599;
    try { v599 = builder.toModule(); } catch (e) {}
    const module = v599;
    const v602 = WebAssembly?.Instance;
    const v603 = exp?.f11;
    const v604 = { imp: v603 };
    const v605 = { q: v604 };
    let v606;
    try { v606 = new v602(module, v605); } catch (e) {}
    const instance0 = v606;
    const v608 = WebAssembly?.Instance;
    const v609 = exp?.f17;
    const v610 = { imp: v609 };
    const v611 = { q: v610 };
    let v612;
    try { v612 = new v608(module, v611); } catch (e) {}
    const instance1 = v612;
    const v614 = WebAssembly?.Instance;
    const v615 = (a616) => {
        return 21;
    };
    const v618 = { imp: v615 };
    const v619 = { q: v618 };
    let v620;
    try { v620 = new v614(module, v619); } catch (e) {}
    const instance2 = v620;
    const v622 = WebAssembly?.Instance;
    const v623 = (a624) => {
        return 27;
    };
    const v626 = { imp: v623 };
    const v627 = { q: v626 };
    let v628;
    try { v628 = new v622(module, v627); } catch (e) {}
    const instance3 = v628;
    const v631 = instance0?.exports;
    let v632;
    try { v632 = v631.exp(); } catch (e) {}
    try { f0(11, v632); } catch (e) {}
    const v635 = instance1?.exports;
    let v636;
    try { v636 = v635.exp(); } catch (e) {}
    try { f0(17, v636); } catch (e) {}
    const v639 = instance2?.exports;
    let v640;
    try { v640 = v639.exp(); } catch (e) {}
    try { f0(21, v640); } catch (e) {}
    const v643 = instance3?.exports;
    let v644;
    try { v644 = v643.exp(); } catch (e) {}
    try { f0(27, v644); } catch (e) {}
}
try { testExportedImportsOnDifferentInstances(); } catch (e) {}
function testImportedStartFunctionOnDifferentInstances() {
    const v650 = arguments?.callee?.name;
    try { f0(v650); } catch (e) {}
    var global = 0;
    const v654 = (a655) => {
        global = a655;
        return a655;
    };
    const set_global = v654;
    function f657() {
        let v659;
        try { v659 = new WasmModuleBuilder(); } catch (e) {}
        const builder = v659;
        let v664;
        try { v664 = builder.addImport("q", "imp", kSig_v_i); } catch (e) {}
        const imp_index = v664;
        const v669 = [kExprI32Const,11,kExprCallFunction,imp_index];
        let v672;
        try { v672 = builder.addFunction("f11", kSig_v_v); } catch (e) {}
        let v673;
        try { v673 = v672.addBody(v669); } catch (e) {}
        try { v673.exportFunc(); } catch (e) {}
        const v676 = [kExprI32Const,17,kExprCallFunction,imp_index];
        let v678;
        try { v678 = builder.addFunction("f17", kSig_v_v); } catch (e) {}
        let v679;
        try { v679 = v678.addBody(v676); } catch (e) {}
        try { v679.exportFunc(); } catch (e) {}
        const v681 = { imp: set_global };
        const v682 = { q: v681 };
        let v683;
        try { v683 = builder.instantiate(v682); } catch (e) {}
        return v683?.exports;
    }
    let v685;
    try { v685 = f657(); } catch (e) {}
    const exp = v685;
    let v688;
    try { v688 = new WasmModuleBuilder(); } catch (e) {}
    const builder = v688;
    let v693;
    try { v693 = builder.addImport("q", "imp", kSig_v_v); } catch (e) {}
    const imp_index = v693;
    try { builder.addStart(imp_index); } catch (e) {}
    let v696;
    try { v696 = builder.toModule(); } catch (e) {}
    const module = v696;
    try { f0(0, global); } catch (e) {}
    const v701 = WebAssembly?.Instance;
    const v702 = exp?.f11;
    const v703 = { imp: v702 };
    const v704 = { q: v703 };
    try { new v701(module, v704); } catch (e) {}
    try { f0(11, global); } catch (e) {}
    const v708 = WebAssembly?.Instance;
    const v709 = exp?.f17;
    const v710 = { imp: v709 };
    const v711 = { q: v710 };
    try { new v708(module, v711); } catch (e) {}
    try { f0(17, global); } catch (e) {}
    const v715 = WebAssembly?.Instance;
    const v716 = (a717) => {
        let v719;
        try { v719 = set_global(21); } catch (e) {}
        return v719;
    };
    const v720 = { imp: v716 };
    const v721 = { q: v720 };
    try { new v715(module, v721); } catch (e) {}
    try { f0(21, global); } catch (e) {}
    const v725 = WebAssembly?.Instance;
    const v726 = (a727) => {
        let v729;
        try { v729 = set_global(27); } catch (e) {}
        return v729;
    };
    const v730 = { imp: v726 };
    const v731 = { q: v730 };
    try { new v725(module, v731); } catch (e) {}
    try { f0(27, global); } catch (e) {}
}
try { testImportedStartFunctionOnDifferentInstances(); } catch (e) {}
function testImportedStartFunctionUsesRightInstance() {
    const v739 = arguments?.callee?.name;
    try { f0(v739); } catch (e) {}
    var global = 0;
    const v743 = (a744) => {
        global = a744;
        return a744;
    };
    const set_global = v743;
    function f746() {
        let v748;
        try { v748 = new WasmModuleBuilder(); } catch (e) {}
        const builder = v748;
        try { builder.addMemory(1, 1); } catch (e) {}
        try { builder.exportMemoryAs("mem"); } catch (e) {}
        let v758;
        try { v758 = builder.addImport("q", "imp", kSig_v_i); } catch (e) {}
        const imp_index = v758;
        const v766 = [kExprI32Const,0,kExprI32Const,11,kExprI32StoreMem8,0,0];
        let v769;
        try { v769 = builder.addFunction("f", kSig_v_v); } catch (e) {}
        let v770;
        try { v770 = v769.addBody(v766); } catch (e) {}
        try { v770.exportFunc(); } catch (e) {}
        const v772 = { imp: set_global };
        const v773 = { q: v772 };
        let v774;
        try { v774 = builder.instantiate(v773); } catch (e) {}
        return v774?.exports;
    }
    let v776;
    try { v776 = f746(); } catch (e) {}
    const exp = v776;
    let v779;
    try { v779 = new WasmModuleBuilder(); } catch (e) {}
    const builder = v779;
    let v784;
    try { v784 = builder.addImport("q", "imp", kSig_v_v); } catch (e) {}
    const imp_index = v784;
    try { builder.addStart(imp_index); } catch (e) {}
    let v787;
    try { v787 = builder.toModule(); } catch (e) {}
    const module = v787;
    const v792 = exp?.mem?.buffer;
    let v793;
    try { v793 = new Uint8Array(v792); } catch (e) {}
    const v794 = v793?.[0];
    try { f0(0, v794, "memory initially 0"); } catch (e) {}
    const v798 = WebAssembly?.Instance;
    const v799 = exp?.f;
    const v800 = { imp: v799 };
    const v801 = { q: v800 };
    try { new v798(module, v801); } catch (e) {}
    const v805 = exp?.mem?.buffer;
    let v806;
    try { v806 = new Uint8Array(v805); } catch (e) {}
    const v807 = v806?.[0];
    try { f0(11, v807, "memory changed to 11"); } catch (e) {}
}
try { testImportedStartFunctionUsesRightInstance(); } catch (e) {}
