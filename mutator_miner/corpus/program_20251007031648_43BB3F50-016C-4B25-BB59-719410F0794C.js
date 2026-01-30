function f0() {
}
let len = 131072;
const v7 = new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT * len);
const v8 = new Int32Array(v7);
let ar = v8;
ar[7] = -13;
ar[5747] = -42;
ar[129141] = -153;
ar.sort();
f0(ar[0], -153);
f0(ar[1], -42);
f0(ar[2], -13);
f0(ar[3], 0);
