function func(a1, a2, a3) {
    a1[0] = 1.2;
    a2[0] = a3;
    a1[1] = 2.2;
    a1[0] = 2.3023e-320;
}
function main() {
    let a = [1.1,2.2];
    const v14 = new Uint32Array(100);
    let b = v14;
    for (let i17 = 0; i17 < 4096; i17++) {
        func(a, b, {});
    }
    const v25 = () => {
        a[0] = {};
        return 0;
    };
    func(a, b, { valueOf: v25 });
    a[0].toString();
}
main();
