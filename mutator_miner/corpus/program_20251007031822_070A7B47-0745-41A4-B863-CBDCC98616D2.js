function foo(a1) {
    var ret = { x: a1 };
    function f5() {
    }
    Object.defineProperty(ret, "y", { get: f5, configurable: true });
    return ret;
}
let v0 = foo(10);
let v1 = foo(10.5);
function f17() {
}
Object.defineProperty(v0, "y", { get: f17, configurable: true });
