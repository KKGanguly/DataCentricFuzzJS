const v2 = new ArrayBuffer(65536);
var buf = v2;
const v6 = new Uint8Array(buf);
var arr2 = v6.fill(55);
var tmp = {};
function f11() {
    const v14 = new Uint8Array(2048);
    var arr3 = v14.fill(252);
    return 0;
}
tmp[Symbol.toPrimitive] = f11;
print(Array.prototype.indexOf.call(arr2, 0, tmp));
