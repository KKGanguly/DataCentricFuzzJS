function opt(a1, a2, a3) {
    for (let i4 = a2; i4 < a3; i4++) {
        if (i4 === 10) {
            i4 += 0;
        }
        a1[i4] = 2.3023e-320;
    }
}
function main() {
    const v16 = new Array(100);
    let arr = v16;
    arr.fill(1.1);
    for (let i21 = 0; i21 < 1000; i21++) {
        opt(arr, 0, 3);
    }
    opt(arr, 0, 100000);
}
main();
