var a;
var b;
for (let i5 = 0; i5 < 100000; i5++) {
    b = 1;
    const v14 = i5 + -0;
    a = v14;
    b = v14;
}
print(a === b);
gc();
print(a === b);
print(b);
