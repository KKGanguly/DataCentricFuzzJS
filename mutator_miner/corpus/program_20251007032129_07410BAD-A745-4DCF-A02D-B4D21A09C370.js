function f0() {
}
function foo(a2, a3) {
    a2[a3] = 1;
    return a2[a3];
}
v = [];
f0(foo(v, 1), 1);
const v14 = new Int32Array();
const t9 = v.__proto__;
t9.__proto__ = v14;
f0(foo(Object(), 1), 1);
f0(foo(v, 2), undefined);
