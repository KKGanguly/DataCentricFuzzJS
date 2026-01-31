function opt(a1, a2) {
    const v15 = ((((a1.length === 2147483632) && a1[2147483632]) || false) && (a1.length === 2147483632)) && a1[2147483633];
    a1[286331153] = 4660;
    v15 || 4660;
}
function main() {
    const v21 = new Uint32Array(1);
    let arr = v21;
    for (let i24 = 0; i24 < 10000; i24++) {
        opt(arr);
    }
}
main();
