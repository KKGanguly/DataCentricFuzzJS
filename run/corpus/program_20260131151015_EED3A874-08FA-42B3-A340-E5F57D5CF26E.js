function f0() {
}
const v3 = new Array(1024);
const v2 = v3;
var n = v2;
n.fill(1);
const v9 = new Array(1024);
const v7 = v9;
var b = v7;
b.fill(2);
function dbg() {
}
function opt(a16) {
    a16[0];
    function f15() {
    }
    n.some(f15);
    for (let i21 = 0; i21 < 20; i21++) {
        if (i21 == 1) {
            r = n[256];
        }
        n = a16;
    }
    return [1,r];
}
for (let i35 = 0; i35 < 10000; i35++) {
    opt(b);
}
const v43 = new Array(7);
const v40 = v43;
var a = v40;
a.fill(3);
f0(a[768]);
evil = opt(a);
f0(evil);
