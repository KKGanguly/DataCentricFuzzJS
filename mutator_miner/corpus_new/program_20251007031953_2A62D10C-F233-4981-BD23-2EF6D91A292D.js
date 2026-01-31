function f0() {
    var x = "outer";
    try {
        throw "inner";
    } catch(e4) {
        return eval("function f(){ return x } f()");
    }
}
f0();
