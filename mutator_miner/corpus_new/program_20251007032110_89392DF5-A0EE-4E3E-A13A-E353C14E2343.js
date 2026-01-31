var a;
var b;
for (let i5 = 0; i5 < 100000; i5++) {
    b = 1;
    b = (a = i5 + -0);
}
print(a === b);
gc();
print(a === b);
print(b);
