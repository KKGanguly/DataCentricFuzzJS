const v4 = new Array(1, 2, 3);
var t = v4;
t.length = 100;
var o = {};
function f10() {
    t[0] = {};
    for (let i13 = 0; i13 < 100; i13++) {
        t[i13] = { a: i13 };
    }
    return 7;
}
Object.defineProperty(o, "3", { get: f10 });
t.__proto__ = o;
var j = [];
var s = j.join.call(t);
