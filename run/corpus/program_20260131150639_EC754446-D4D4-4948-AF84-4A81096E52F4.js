function f0() {
}
const v3 = new ArrayBuffer(65536);
const v2 = v3;
var buf = v2;
const v7 = new Uint8Array(buf);
const v6 = v7;
var arr2 = v6.fill(55);
var tmp = {};
function f11() {
    const v16 = new Uint8Array(2048);
    const v14 = v16;
    var arr3 = v14.fill(252);
    return 0;
}
tmp[Symbol.toPrimitive] = f11;
f0(Array.prototype.indexOf.call(arr2, 0, tmp));
