const v9 = new Array(286331153, 572662306, 858993459, 1145324612, 303174162, 589505315, 305419888, 30583);
var a = v9;
function f11(a12, a13) {
    return a;
}
var handler = { getPrototypeOf: f11 };
const v18 = new Proxy([], handler);
var p = v18;
var b = [{},[],"natalie"];
b.__proto__ = p;
b.length = 4;
a.shift.call(b);
