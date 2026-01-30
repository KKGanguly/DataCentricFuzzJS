try {
    var Debug = debug?.Debug;
    function f() {
        try { g(); } catch (e) {}
    }
    function g() {
    }
    try { f(); } catch (e) {}
    try { f(); } catch (e) {}
    const v9 = %OptimizeFunctionOnNextCall(f);
    try { f(); } catch (e) {}
    function f11() {
    }
    try { Debug.setListener(f11); } catch (e) {}
    try { Debug.setBreakPoint(g, 0); } catch (e) {}
    try { f(); } catch (e) {}
} catch(e16) {
}
