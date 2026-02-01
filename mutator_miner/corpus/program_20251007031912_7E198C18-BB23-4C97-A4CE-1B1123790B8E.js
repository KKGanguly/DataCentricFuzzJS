function opt(a1, a2, a3) {
    for (let i4 = a2; i4 < a3; i4++) {
        if (i4 == 10) {
            for (let i12 = 0; i12 < 10; i12++) {
                i4 += 0;
            }
        }
        a1[i4] = 2.3023e-320;
    }
}
const v22 = new Array(100);
let arr = v22;
arr.fill(1.1);
opt(arr, 0, 3);
opt(arr, 0, 100000);
