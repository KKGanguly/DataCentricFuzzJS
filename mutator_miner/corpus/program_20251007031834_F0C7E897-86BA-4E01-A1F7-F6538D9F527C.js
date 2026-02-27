var q;
function g() {
    q = g.caller;
    return 7;
}
var a = [1,2,3];
a.length = 4;
const v12 = Array.prototype;
Object.defineProperty(v12, "3", { get: g });
([4,5,6]).concat(a);
try { q(2004318071, 2004318071, 0); } catch (e) {}
