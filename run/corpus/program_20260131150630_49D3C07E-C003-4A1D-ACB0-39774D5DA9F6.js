function __f_0() {
    this.x = this?.x?.x;
}
try {
    gc();
} catch(e7) {
}
const v8 = { x: 1 };
const t5 = __f_0?.prototype;
t5.x = v8;
try {
    new __f_0();
} catch(e14) {
}
try {
    new __f_0();
} catch(e16) {
}
function __f_9(a18) {
    function __f_12() {
    }
    const v23 = {
        set x(a21) {
            this.y = 23;
        },
    };
    const v18 = v23;
    __f_12.prototype = v18;
    try {
        new __f_0();
    } catch(e26) {
    }
}
try {
    __f_9();
} catch(e28) {
}
try {
    __v_15.__defineGetter__();
} catch(e31) {
}
