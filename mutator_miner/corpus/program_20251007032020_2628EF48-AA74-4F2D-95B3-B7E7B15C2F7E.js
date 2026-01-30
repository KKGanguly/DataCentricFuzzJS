function f0() {
}
var a;
var b;
for (let i6 = 0; i6 < 100000; i6++) {
    b = 1;
    b = (a = i6 + -0);
}
f0(a === b);
gc();
f0(a === b);
