function func(a1, a2) {
    a1[0] = a2;
}
function main() {
    const v6 = new Uint32Array(100);
    let b = v6;
    for (let i9 = 0; i9 < 1000; i9++) {
        i9 += 1;
        i9 += 0;
        func(b, {});
    }
}
main();
