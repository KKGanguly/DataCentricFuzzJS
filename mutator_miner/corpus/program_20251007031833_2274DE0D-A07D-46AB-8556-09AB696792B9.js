try {
    function f1() {
    }
    Object.prototype.__defineGetter__(0, f1);
    assertThrows("x");
} catch(e8) {
    print("Caught: " + e8);
}
try {
    function f13() {
        let asyncIds = [];
        let triggerIds = [];
        const v30 = {
            init(a19, a20, a21, a22) {
                if (a20 !== "PROMISE") {
                    return;
                }
                assertThrows("asyncIds.push(asyncId);");
                assertThrows("triggerIds.push(triggerAsyncId)");
            },
        };
        let ah = async_hooks.createHook(v30);
        ah.enable();
        async function foo() {
        }
        foo();
    }
    f13();
} catch(e38) {
    print("Caught: " + e38);
}
try {
    var obj = { prop: 7 };
    assertThrows("nonexistant(obj)");
} catch(e49) {
    print("Caught: " + e49);
}
