function f0() {
    var t = Date.now();
    var o = { ["p"]: 1, t: t };
}
var test = f0;
for (let i10 = 0; i10 < 100000; i10++) {
    test();
}
