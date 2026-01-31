function f0() {
}
function f1() {
    function f() {
        ("a").startsWith("a", NaN);
    }
    const v7 = %PrepareFunctionForOptimization(f);
    f();
    f();
    const v10 = %OptimizeFunctionOnNextCall(f);
    f();
}
f1();
function f13() {
    let wasCalled = false;
    const v16 = () => {
        wasCalled = true;
        return true;
    };
    const v19 = Symbol.toPrimitive;
    const obj = { [v19]: v16 };
    function f() {
        ("").startsWith("a", obj);
    }
    const v26 = %PrepareFunctionForOptimization(f);
    f();
    f();
    const v29 = %OptimizeFunctionOnNextCall(f);
    f();
    f0(wasCalled, "String.p.startsWith didn't attempt to coerce the position argument to a Number.");
}
f13();
