function f0() {
    var x = "outer";
    eval("function f(){ return x } f()");
    return f0;
}
function f6(a7) {
    return f0();
}
Object.defineProperty(f0, "a", { enumerable: true, set: f6 });
f0.a = f0;
f0();
