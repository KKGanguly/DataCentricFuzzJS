try {
    function f0() {
    }
    Debug = debug?.Debug;
    var exception = null;
    function listener(a7, a8, a9, a10) {
        if (a7 != Debug?.DebugEvent?.Exception) {
            return;
        }
        try {
            let v16;
            try { v16 = a8.frame(0); } catch (e) {}
            let v17;
            try { v17 = v16.sourceLineText(); } catch (e) {}
            var line = v17;
            const v19 = /Exception/;
            let v20;
            try { v20 = v19.exec(line); } catch (e) {}
            var match = v20;
            try { f0(match); } catch (e) {}
        } catch(e23) {
            exception = e23;
        }
    }
    try { Debug.setListener(listener); } catch (e) {}
    try { Debug.setBreakOnException(); } catch (e) {}
    const v30 = {
        get then() {
            let v29;
            try { v29 = new Error(); } catch (e) {}
            throw v29;
        },
    };
    var thenable = v30;
    const v32 = () => {
        return thenable;
    };
    let v34;
    try { v34 = Promise.reject(); } catch (e) {}
    try { v34.finally(v32); } catch (e) {}
} catch(e36) {
}
