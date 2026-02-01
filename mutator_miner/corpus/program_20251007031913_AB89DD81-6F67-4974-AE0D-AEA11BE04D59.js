function f0() {
    function func_0() {
    }
    delete func_0.length;
    const v4 = Function.prototype;
    Object.defineProperty(v4, "length", { writable: true });
    func_0.length = 0;
}
f0();
