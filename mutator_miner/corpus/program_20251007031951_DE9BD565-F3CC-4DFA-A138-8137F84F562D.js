const v0 = [];
function f1() {
    return v0;
}
function F2(a4, a5) {
    if (!new.target) { throw 'must be called with new'; }
    this.c = a4;
    this.g = a4;
    this.a = f1;
}
const v6 = new F2(v0, F2);
new F2(v6, F2);
new F2(f1, v6);
[787029976,3673,-1024,9,-2147483649,60471];
[1440300798,-1083576021,-36474,16,51842,268435456,-5,2147483649,1073741824];
[-2147483647,2147483648,-14,127,-536870912,512,-34681,-15065,-8];
function F12(a14, a15, a16) {
    if (!new.target) { throw 'must be called with new'; }
    this.h = a14;
}
// WasmModule Code:
// BeginWasmModule
//     v17 <- WasmDefineTag [Fuzzilli.Parameter.plain(.wasmf32), Fuzzilli.Parameter.plain(.wasmf32)]
//     v18 <- WasmDefineMemory [8,258571], memory64
//     v19 <- WasmDefineTag []
// v20 <- EndWasmModule
// 
const v20 = new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([
    0x00, 0x61, 0x73, 0x6D, 0x01, 0x00, 0x00, 0x00, 0x01, 0x09,
    0x02, 0x60, 0x02, 0x7D, 0x7D, 0x00, 0x60, 0x00, 0x00, 0x03,
    0x01, 0x00, 0x04, 0x01, 0x00, 0x05, 0x06, 0x01, 0x05, 0x08,
    0x8B, 0xE4, 0x0F, 0x0D, 0x05, 0x02, 0x00, 0x00, 0x00, 0x01,
    0x06, 0x01, 0x00, 0x07, 0x01, 0x00, 0x09, 0x01, 0x00, 0x0A,
    0x01, 0x00,
])));
function a() {
}
function b() {
}
function c() {
}
