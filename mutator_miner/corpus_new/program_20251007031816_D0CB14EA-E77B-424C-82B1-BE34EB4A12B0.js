function gc() {
    for (let i2 = 0; i2 < 16; i2++) {
        new ArrayBuffer(16777216);
    }
}
const v12 = () => {
    return 1;
};
Array.prototype.__defineGetter__(4096, v12);
gc();
for (let i19 = 0; i19 < 256; i19++) {
    const v27 = new Array(256);
    v27.fill(1234.5678);
}
gc();
const v32 = new Array(256);
print(v32.splice(0));
