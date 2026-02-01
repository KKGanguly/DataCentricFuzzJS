try {
    function f() {
        var i = 0;
        try { f(1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0); } catch (e) {}
    }
    Debug = debug?.Debug;
    let v29;
    try { v29 = Debug.setBreakPoint(f, 0); } catch (e) {}
    var bp = v29;
    function listener(a32, a33, a34, a35) {
        let v37;
        try { v37 = a33.frame(); } catch (e) {}
        let v38;
        try { v38 = v37.evaluate("i"); } catch (e) {}
        let v39;
        try { v39 = v38.value(); } catch (e) {}
        result = v39;
    }
    try { Debug.setListener(listener); } catch (e) {}
    try { f(); } catch (e) {}
} catch(e43) {
}
