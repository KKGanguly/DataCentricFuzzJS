function f0() {
}
const v5 = new Uint8Array(1024 * 1024);
var a = v5;
const v8 = %ArrayBufferNeuter(a.buffer);
const v9 = new Uint8Array(a);
var b = v9;
f0(0, b.length);
