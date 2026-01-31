function Module(a1, a2, a3) {
    'use asm';
    var fround = a1.Math.fround;
    function f(a8) {
        return fround(+(a8 = +a8));
    }
    function g(a13) {
        return +f(+(a13 = +a13));
    }
    return { g: g };
}
var m = Module(this);
print(m.g(0.1));
