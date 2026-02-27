function f() {
    var o = {};
    function g() {
        o.x = 1;
        return Object.create(o);
    }
    gc();
    o.x = 10;
    const v10 = %OptimizeFunctionOnNextCall(g);
    g();
}
f();
f();
