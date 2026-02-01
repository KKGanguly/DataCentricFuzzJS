function f0() {
}
new Int32Array();
const v4 = new Uint16Array();
const v5 = v4;
function opt(a7) {
    a7[0] = 1.1;
    this[0] = {};
    a7[0] = 2.3023e-320;
}
function main() {
    const v14 = [1.1];
    for (let i17 = 0; i17 < 10000; i17++) {
        opt.call({}, v14);
    }
    opt.call(v14, v14);
    f0(v14);
    v5[267] = -2;
}
main();
