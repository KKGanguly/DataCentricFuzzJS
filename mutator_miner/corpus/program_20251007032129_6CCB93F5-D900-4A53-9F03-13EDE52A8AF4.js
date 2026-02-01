var a = [1];
a.length = 1000;
var j = [];
var o = {};
function f9() {
    a.length = 1002;
    const v12 = j.fill;
    try { v12.call(a, 7.7); } catch (e) {}
    return 2;
}
Object.defineProperty(o, "1", { get: f9 });
a.__proto__ = o;
var r = j.reverse.call(a);
r.length = 4294967294;
r[4294967294 - 1] = 10;
