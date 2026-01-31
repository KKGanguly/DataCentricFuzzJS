try {
    function f0() {
    }
    Debug = debug?.Debug;
    let v6;
    try { v6 = eval("(function() { return ''; })"); } catch (e) {}
    var f = v6;
    let v9;
    try { v9 = Debug.findScript(f); } catch (e) {}
    var script = v9;
    const v11 = script?.id;
    try { Debug.setScriptBreakPointById(v11, 1, 0); } catch (e) {}
    let v16;
    try { v16 = new Array(); } catch (e) {}
    var change_log = v16;
    const v19 = -1;
    const v23 = Debug?.LiveEdit?.TestApi;
    try { v23.ApplySingleChunkPatch(script, v19, "", "", change_log); } catch (e) {}
    let v25;
    try { v25 = f(); } catch (e) {}
    try { f0(v25); } catch (e) {}
} catch(e27) {
}
