function f0() {
}
class C1 extends f0 {
}
function f2() {
    for (let v3 = 0; v3 < 1000; v3++) {
    }
    const v5 = ({}).__proto__;
    function f6() {
        return delete v5.message;
    }
    return f6;
}
f2();
