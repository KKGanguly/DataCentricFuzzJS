function opt(a1) {
    const v3 = new Set();
    let iterator = v3.values();
    iterator.x = 0;
    let arr = [iterator,iterator];
    if (a1) {
        return arr.slice();
    }
}
for (let i11 = 0; i11 < 100000; i11++) {
    opt(false);
}
let res = opt(true);
let a = res[0];
let b = res[1];
print(a === b);
a.x = 7;
print(b.x);
a.a = 1.1;
b.b = 4660;
a.a = 1.1;
