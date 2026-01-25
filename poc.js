function f1() {
    var o1 = {};
    var o2 = {};
    var proto1 = { a: "a", b: "b" };
    var proto2 = { a: "a" };
    o1.__proto__ = proto1;
    o2.__proto__ = proto2;
    function a(a13) {
        return a13.a;
    }
    function b(a16) {
        return a16.b;
    }
    a(o1);
    a(o2);
    b(o1);
    b(o2);
    proto2.__proto__ = { b: "b" };
    if (b(o2) !== "b") {
        WScript.Echo("fail");
    }
}
f1();
f1();
function f2() {
    var o1 = { b: "b" };
    var o2 = { b: "b" };
    var proto1 = { a: "a", b: "b" };
    var proto2 = { a: "a" };
    o1.__proto__ = proto1;
    o2.__proto__ = proto2;
    function a(a47) {
        return a47.a;
    }
    function b(a50) {
        return a50.b;
    }
    a(o1);
    a(o2);
    delete o1.b;
    delete o2.b;
    b(o1);
    b(o2);
    proto2.__proto__ = { b: "b" };
    if (b(o2) !== "b") {
    }
}
f2();
f2();
