function write(a1, a2, a3, a4) {
    for (let i5 = a1; i5 < a2; i5 += a3) {
        view[i5] = a4;
    }
}
const v12 = new ArrayBuffer(65536);
var buffer = v12;
const v15 = new Uint32Array(buffer);
var view = v15;
write(0, 16384, 1, 4660);
write(805306382, 1073741840, 65536, 1851880825);
