var obj1 = {};
var obj2 = {};
function h() {
}
h.prototype = obj2;
function g(a6) {
    a6.constructor;
}
function f() {
    g(obj1);
}
obj1.x = 0;
f();
function f13() {
}
obj1.__defineGetter__("x", f13);
g(obj2);
obj2.y = 0;
const v17 = %OptimizeFunctionOnNextCall(f);
f();
