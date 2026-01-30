function f0() {
    for (let i2 = 0; i2 < 10000; i2++) {
    }
    let v8 = null;
    const v9 = {};
    function f11() {
        v8 = this;
        return "message";
    }
    v9.__defineGetter__("message", f11);
    return f0;
}
f0();
