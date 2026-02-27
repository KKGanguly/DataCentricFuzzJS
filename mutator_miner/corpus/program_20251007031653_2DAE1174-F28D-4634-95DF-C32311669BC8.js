const v2 = new Int8Array(1);
var typedArray = v2;
var saved;
var called;
function f8(a9) {
    called = true;
    saved = a9;
}
typedArray.constructor = f8;
const v11 = Int8Array.prototype;
const t10 = typedArray.constructor;
t10.prototype = v11;
function f13() {
}
typedArray.map(f13);
