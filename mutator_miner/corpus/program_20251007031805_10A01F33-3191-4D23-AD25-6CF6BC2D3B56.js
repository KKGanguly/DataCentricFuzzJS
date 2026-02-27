function inlinee() {
}
function opt(a2) {
    a2[0] = 1.1;
    new inlinee();
    a2[0] = 2.3023e-320;
}
function main() {
    let arr = [1.1];
    for (let i11 = 0; i11 < 10000; i11++) {
        inlinee.prototype = {};
        opt(arr);
    }
    inlinee.prototype = arr;
    opt(arr);
    print(arr);
}
