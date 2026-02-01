function opt(a1) {
    a1[0] = 1.1;
    this[0] = {};
    a1[0] = 2.3023e-320;
}
function main() {
    let arr = [1.1];
    for (let i11 = 0; i11 < 10000; i11++) {
        opt.call({}, arr);
    }
    opt.call(arr, arr);
    print(arr);
}
main();
