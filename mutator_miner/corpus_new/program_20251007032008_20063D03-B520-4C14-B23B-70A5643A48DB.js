function f0() {
}
var v_this = this;
function f() {
    var obj = { y: 0 };
    const v10 = {
        has() {
        },
    };
    const v11 = new Proxy(obj, v10);
    var proxy = v11;
    Object.setPrototypeOf(v_this, proxy);
}
f0(f, RangeError);
function f_store() {
    var obj = { z: 0 };
    const v26 = {
        has() {
            z = 10;
        },
    };
    const v27 = new Proxy(obj, v26);
    var proxy = v27;
    Object.setPrototypeOf(v_this, proxy);
    z = 10;
}
f0(f_store, RangeError);
function f_set() {
    var obj = { z: 0 };
    const v44 = {
        has() {
            return true;
        },
        set() {
            z = x;
        },
    };
    const v45 = new Proxy(obj, v44);
    var proxy = v45;
    Object.setPrototypeOf(v_this, proxy);
    z = 10;
}
f0(f_set, RangeError);
