function f0() {
    function func_0() {
    }
    const v4 = {
        foo() {
            super.a = "";
        },
    };
    func_0.prototype = v4;
    const v5 = new func_0();
    var var_0 = v5;
    Object.defineProperty(var_0, "a", {});
    var_0.foo();
}
f0();
