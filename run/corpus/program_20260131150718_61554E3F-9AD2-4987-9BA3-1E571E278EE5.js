const v0 = [Infinity,-0.0,1e-15,-Infinity,-2.2250738585072014e-308,-772600.5499249069];
function f1() {
    return v0;
}
function f2() {
    var x = "outer";
    try {
        throw "inner";
    } catch(e6) {
        const v9 = eval("function f(){ return x } f()");
        v9[0] = v9;
    }
    return v0;
}
f2();
