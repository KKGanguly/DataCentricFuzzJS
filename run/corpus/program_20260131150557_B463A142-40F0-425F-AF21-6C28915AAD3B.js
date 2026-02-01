function f0() {
}
try {
    function f1() {
    }
    Object.prototype.__defineGetter__(0, f1);
    f0("x");
} catch(e8) {
    const v10 = "Caught: " + e8;
    try { f0(v10); } catch (e) {}
}
try {
    function f13() {
        let asyncIds = [];
        let triggerIds = [];
        const v28 = {
            init(a18, a19, a20, a21) {
                if (a19 !== "PROMISE") {
                    return;
                }
                try { f0("asyncIds.push(asyncId);"); } catch (e) {}
                try { f0("triggerIds.push(triggerAsyncId)"); } catch (e) {}
            },
        };
        const v30 = v28;
        let v31;
        try { v31 = async_hooks.createHook(v30); } catch (e) {}
        let ah = v31;
        try { ah.enable(); } catch (e) {}
        async function foo() {
        }
        try { foo(); } catch (e) {}
    }
    try { f13(); } catch (e) {}
} catch(e37) {
    const v39 = "Caught: " + e37;
    try { f0(v39); } catch (e) {}
}
try {
    var obj = { prop: 7 };
    f0("nonexistant(obj)");
} catch(e46) {
    const v48 = "Caught: " + e46;
    try { f0(v48); } catch (e) {}
}
