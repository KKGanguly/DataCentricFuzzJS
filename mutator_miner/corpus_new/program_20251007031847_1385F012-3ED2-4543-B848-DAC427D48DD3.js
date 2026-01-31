function opt(a1, a2, a3) {
    if (a2.length < 1) {
        return;
    }
    for (let i8 = 0; i8 < a1.length; i8++) {
        a1[i8] = a3;
    }
    a2[0] = 2.3023e-320;
}
function main() {
    for (let i17 = 0; i17 < 1000; i17++) {
        const v25 = new Uint8Array(100);
        const v29 = [1.1,2.2,3.3];
        opt(v25, v29, {});
    }
    const v34 = new Uint8Array(100);
    let a = v34;
    let b = [1.1,2.2,3.3];
    const v41 = () => {
        b[0] = {};
        return 0;
    };
    opt(a, b, { valueOf: v41 });
    print(b[0]);
}
main();
