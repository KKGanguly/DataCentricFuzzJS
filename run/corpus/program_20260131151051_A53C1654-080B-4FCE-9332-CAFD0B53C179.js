function f0() {
    return f0;
}
const v1 = f0();
function f2() {
    return f0;
}
f2.caller = f2;
const v4 = new Uint8ClampedArray(Uint8ClampedArray, v1);
function f0() {
    const v7 = Function.prototype;
    const v8 = v7.constructor;
    try { v8(Uint8ClampedArray); } catch (e) {}
    v7.bind(Function);
    const v13 = { writable: true };
    try { Object.setPrototypeOf(v4, Object); } catch (e) {}
    Object.defineProperty(v7, "length", v13);
    return v13;
}
f0();
