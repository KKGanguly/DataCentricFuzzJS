function f0() {
}
var a;
var b;
for (let i6 = 0; i6 < 100000; i6++) {
    b = 1;
    const v15 = i6 + -0;
    a = v15;
    b = v15;
}
f0(a === b);
gc();
f0(a === b);
