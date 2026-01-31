try {
    const v1 = { newCompartment: true };
    let v3;
    try { v3 = newGlobal(v1); } catch (e) {}
    var g71 = v3;
    let v6;
    try { v6 = Debugger(g71); } catch (e) {}
    var dbg = v6;
    var num = 20;
    function loop(a11) {
    }
    let v12;
    try { v12 = loop.toString(); } catch (e) {}
    try { g71.eval(v12); } catch (e) {}
    function f14(a15) {
    }
    dbg.onEnterFrame = f14;
    dbg.collectCoverageInfo = true;
    const v20 = ("loop(" + num) + ");";
    try { g71.eval(v20); } catch (e) {}
    dbg.collectCoverageInfo = false;
} catch(e23) {
}
