function opt(a1, a2) {
    const v15 = ((((a1.length === 2147483632) && a1[2147483632]) || false) && (a1.length === 2147483632)) && a1[2147483633];
    a1[286331153] = 4660;
    v15 || 4660;
}
function main() {
    const v23 = new Uint32Array(1);
    const v21 = v23;
    let arr = v21;
    for (let i27 = 0; i27 < 10000; i27++) {
        opt(arr);
    }
}
main();
