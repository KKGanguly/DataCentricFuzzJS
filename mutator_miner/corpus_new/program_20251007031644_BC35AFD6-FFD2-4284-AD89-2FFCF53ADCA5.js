function f() {
    const v2 = new Set();
    var a = v2.values();
    a.outOfObjectProperty = undefined;
    const v6 = %DeoptimizeNow();
    return !a;
}
f();
f();
const v10 = %OptimizeFunctionOnNextCall(f);
f();
