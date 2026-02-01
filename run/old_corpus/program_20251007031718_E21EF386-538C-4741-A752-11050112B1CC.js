function gc() {
    for (let i2 = 0; i2 < 10; i2++) {
        new ArrayBuffer((1024 * 1024) * 10);
    }
}
function opt(a16) {
    let r = /a/;
    let o = {};
    a16[0].charAt(0);
    a16[1].charAt(0);
    a16[2].charAt(0);
    a16[3].charAt(0);
    a16[4].charAt(0);
    a16[5].charAt(0);
    a16[6].charAt(0);
    a16[7].charAt(0);
    a16[8].charAt(0);
    a16[8].charAt(0);
    a16[9].charAt(0);
    o.x = ("a").match(r);
    return o;
}
function main() {
    for (let i58 = 0; i58 < 10000; i58++) {
        opt(["a" + i58,"b" + i58,"c" + i58,"d" + i58,"e" + i58,"f" + i58,"g" + i58,"h" + i58,"i" + i58,"j" + i58]);
    }
    let a = ("a").repeat((1024 * 1024) * 2);
    let b = ("a").repeat((1024 * 1024) * 2);
    let arr = [];
    for (let i105 = 0; i105 < 10; i105++) {
        arr[i105] = a + b;
    }
    gc();
    let o = opt(arr);
    gc();
    let tmp = [1234];
    print(o.x);
}
main();
