function opt(a1) {
    return -0 != (a1 ? null : -9007199254740991);
}
ret = opt(false);
print(ret);
for (let i16 = 0; i16 < 100000; i16++) {
    opt(false);
}
const v25 = opt(true);
ret = v25;
print(v25);
