const v2 = new ArrayBuffer(4000);
var array_buffer = v2;
const v5 = new Uint32Array(array_buffer);
var u32arr = v5;
function f7() {
    return 3000;
}
var end = { valueOf: f7 };
var oob = u32arr.subarray(0, end);
