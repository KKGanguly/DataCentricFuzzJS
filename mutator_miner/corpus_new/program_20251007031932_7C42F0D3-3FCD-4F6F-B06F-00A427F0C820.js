function f0() {
}
const v2 = Promise.resolve();
const v6 = {
    value() {
        return 0;
    },
};
const p = Object.defineProperty(v2, "then", v6);
function f10() {
    function foo() {
        return p.catch().catch();
    }
    f0(foo, TypeError);
    f0(foo, TypeError);
    const v17 = %OptimizeFunctionOnNextCall(foo);
    f0(foo, TypeError);
}
f10();
function f20() {
    function foo() {
        return p.finally().finally();
    }
    f0(foo, TypeError);
    f0(foo, TypeError);
    const v27 = %OptimizeFunctionOnNextCall(foo);
    f0(foo, TypeError);
}
f20();
