const v2 = new ArrayBuffer(8);
var ab = v2;
function f5() {
    return 4294967292;
}
ab.__defineGetter__("byteLength", f5);
const v9 = new Uint32Array(ab);
var aaa = v9;
