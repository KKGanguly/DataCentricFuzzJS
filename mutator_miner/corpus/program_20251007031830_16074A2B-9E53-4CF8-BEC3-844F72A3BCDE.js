const v2 = new Uint32Array(1000);
let arr = v2;
for (let i5 = 0; i5 < 16777216; i5++) {
    for (let i12 = 0; i12 < 1; i12++) {
        i5--;
        i5++;
    }
    arr[i5] = 4660;
}
