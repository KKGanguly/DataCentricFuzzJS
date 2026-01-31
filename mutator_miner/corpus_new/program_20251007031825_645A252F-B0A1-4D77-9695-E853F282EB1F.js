function f0() {
}
function TestReflectConstructBogusNewTarget1() {
    class C2 {
    }
    function g() {
        Reflect.construct(C2, arguments, 23);
    }
    function f() {
        const v9 = new g();
        return v9;
    }
    new C2();
    f0(f, TypeError);
    f0(f, TypeError);
    const v14 = %OptimizeFunctionOnNextCall(f);
    f0(f, TypeError);
}
TestReflectConstructBogusNewTarget1();
function TestReflectConstructBogusNewTarget2() {
    class C18 {
    }
    function g() {
        Reflect.construct(C18, arguments, unescape);
    }
    function f() {
        const v25 = new g();
        return v25;
    }
    new C18();
    f0(f, TypeError);
    f0(f, TypeError);
    const v30 = %OptimizeFunctionOnNextCall(f);
    f0(f, TypeError);
}
TestReflectConstructBogusNewTarget2();
function TestReflectConstructBogusTarget() {
    function g() {
        Reflect.construct(23, arguments);
    }
    function f() {
        const v40 = new g();
        return v40;
    }
    f0(f, TypeError);
    f0(f, TypeError);
    const v44 = %OptimizeFunctionOnNextCall(f);
    f0(f, TypeError);
}
TestReflectConstructBogusTarget();
function TestReflectApplyBogusTarget() {
    function g() {
        Reflect.apply(23, this, arguments);
    }
    function f() {
        return g();
    }
    f0(f, TypeError);
    f0(f, TypeError);
    const v59 = %OptimizeFunctionOnNextCall(f);
    f0(f, TypeError);
}
TestReflectApplyBogusTarget();
