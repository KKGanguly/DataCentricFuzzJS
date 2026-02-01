function f0() {
}
function f1() {
    var x = 1;
    function f4() {
        return 1;
    }
    const t7 = x.__proto__;
    t7.f = f4;
    function g() {
    }
    function f8() {
        return 3;
    }
    const t14 = g.prototype;
    t14.f = f8;
    const v11 = new g();
    var y = v11;
    function f(a14) {
        return a14.f();
    }
    f(x);
    f(y);
    f(x);
    f(y);
    const v20 = %OptimizeFunctionOnNextCall(f);
    f0(1, f(x));
    f0(3, f(y));
}
f1();
function f28() {
    function f() {
        return 1;
    }
    function g() {
        return 2;
    }
    var global;
    function h(a36) {
        var fg;
        var a = 0;
        if (a36) {
            global = 0;
            a = 1;
            fg = f;
        } else {
            global = 1;
            fg = g;
        }
        return fg() + a;
    }
    h(0);
    h(0);
    h(1);
    h(1);
    const v54 = %OptimizeFunctionOnNextCall(h);
    f0(2, h(0));
}
f28();
