try {
    var Debug = debug?.Debug;
    function f() {
        try {
            g();
        } catch(e6) {
        }
    }
    function g() {
    }
    try {
        f();
    } catch(e9) {
    }
    try {
        f();
    } catch(e11) {
    }
    const v12 = %OptimizeFunctionOnNextCall(f);
    const v9 = v12;
    try {
        f();
    } catch(e15) {
    }
    function f11() {
    }
    try {
        Debug.setListener(f11);
    } catch(e18) {
    }
    try {
        Debug.setBreakPoint(g, 0);
    } catch(e21) {
    }
    try {
        f();
    } catch(e23) {
    }
} catch(e24) {
}
