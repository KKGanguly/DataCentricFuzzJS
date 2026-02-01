function f1(a1) {
    var ret = { x: a1 };
    function f5() {
    }
    ret.__defineGetter__("y", f5);
    return ret;
}
function f2(a8) {
    return a8.x;
}
v1 = f1(10);
v2 = f1(10.5);
f2(v1);
v3 = { z: "" };
function f22() {
}
v3.__defineGetter__("z", f22);
