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
    const v13 = new g();
    const v11 = v13;
    var y = v11;
    function f(a17) {
        return a17.f();
    }
    f(x);
    f(y);
    f(x);
    f(y);
    const v23 = %OptimizeFunctionOnNextCall(f);
    const v20 = v23;
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
    function h(a40) {
        var fg;
        var a = 0;
        if (a40) {
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
    const v58 = %OptimizeFunctionOnNextCall(h);
    const v54 = v58;
    f0(2, h(0));
}
f28();
