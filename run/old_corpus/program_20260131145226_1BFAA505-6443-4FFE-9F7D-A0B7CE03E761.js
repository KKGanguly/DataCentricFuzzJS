new Int32Array();
const v3 = new Uint16Array();
const v5 = v3;
function opt(a6) {
    a6[0] = 1.1;
    this[0] = {};
    a6[0] = 2.3023e-320;
}
function main() {
    const v14 = [1.1];
    for (let i16 = 0; i16 < 10000; i16++) {
        opt.call({}, v14);
    }
    opt.call(v14, v14);
    print(v14);
    v5[267] = -2;
}
main();
