const v2 = new Array(1024);
var n = v2;
n.fill(1);
const v7 = new Array(1024);
var b = v7;
b.fill(2);
function dbg() {
}
function opt(a13) {
    a13[0];
    function f15() {
    }
    n.some(f15);
    for (let i18 = 0; i18 < 20; i18++) {
        if (i18 == 1) {
            r = n[256];
        }
        n = a13;
    }
    return [1,r];
}
for (let i32 = 0; i32 < 10000; i32++) {
    opt(b);
}
const v40 = new Array(7);
var a = v40;
a.fill(3);
print(a[768]);
evil = opt(a);
print(evil);
