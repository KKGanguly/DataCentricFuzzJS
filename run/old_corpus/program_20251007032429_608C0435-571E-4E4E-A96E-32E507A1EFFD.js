function foo(a1, a2) {
    a1[a2] = 1;
}
function f() {
    arr = [];
    foo(arr, 0);
    const v11 = new Int32Array();
    const t7 = arr.__proto__;
    t7.__proto__ = v11;
    foo([], 1);
    foo(arr, 1);
    print(arr);
}
f();
