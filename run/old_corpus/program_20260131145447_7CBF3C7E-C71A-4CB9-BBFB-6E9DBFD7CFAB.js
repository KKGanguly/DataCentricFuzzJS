function f0() {
}
function opt(a2) {
    const v4 = new Set();
    const v3 = v4;
    let iterator = v3.values();
    iterator.x = 0;
    let arr = [iterator,iterator];
    if (a2) {
        return arr.slice();
    }
}
for (let i13 = 0; i13 < 100000; i13++) {
    opt(false);
}
let res = opt(true);
let a = res[0];
let b = res[1];
f0(a === b);
a.x = 7;
f0(b.x);
a.a = 1.1;
b.b = 4660;
a.a = 1.1;
