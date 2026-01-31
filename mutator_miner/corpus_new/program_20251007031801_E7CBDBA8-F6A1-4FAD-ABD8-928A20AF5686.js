function write(a1, a2, a3) {
    for (let i4 = a1; i4 >= a2; i4 += a3) {
        a3 = a2 - a1;
        a1 >>>= 805306382;
    }
}
const v12 = new ArrayBuffer(16384);
var buffer = v12;
const v15 = new Uint32Array(buffer);
var view = v15;
for (let i18 = 0; i18 < 10000; i18++) {
    write(Infinity, 1, view[65536], 1);
}
