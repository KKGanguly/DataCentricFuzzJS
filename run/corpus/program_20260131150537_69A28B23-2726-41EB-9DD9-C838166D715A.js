function f0() {
}
function foo(a2, a3) {
    a2[a3] = 1;
}
function f() {
    arr = [];
    foo(arr, 0);
    const v12 = new Int32Array();
    const v11 = v12;
    const t7 = arr.__proto__;
    t7.__proto__ = v11;
    foo([], 1);
    foo(arr, 1);
    f0(arr);
}
f();
