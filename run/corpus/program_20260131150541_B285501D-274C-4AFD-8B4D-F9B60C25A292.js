function foo(a1) {
    var ret = { x: a1 };
    function f5() {
    }
    ret.__defineSetter__("y", f5);
    return ret;
}
let v1 = foo(10);
let v2 = foo(10.5);
v1.x = 20.5;
