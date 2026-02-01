function f0() {
}
function opt(a2) {
    return -0 != (a2 ? null : -9007199254740991);
}
ret = opt(false);
f0(ret);
for (let i16 = 0; i16 < 100000; i16++) {
    opt(false);
}
const v25 = opt(true);
ret = v25;
f0(v25);
