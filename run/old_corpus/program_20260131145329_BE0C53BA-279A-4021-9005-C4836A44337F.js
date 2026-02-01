let v1;
try {
    const v3 = new Int8Array();
    v1 = v3;
} catch(e4) {
}
const v2 = v1;
function f3(a7, a8) {
    const v8 = this?.__proto__?.constructor;
    const v27 = {
        o(a14, a15, a16, a17) {
            try {
                try {
                    ArrayBuffer(a15, this);
                } catch(e20) {
                }
            } catch(e21) {
                try {
                    gc();
                } catch(e24) {
                }
                e21?.stack;
            }
            return Int8Array;
        },
    };
    const v21 = v27;
    const o19 = v21;
    try {
        o19.o();
    } catch(e31) {
    }
    let v24;
    try {
        v24 = v8();
    } catch(e35) {
    }
    return v24;
}
const v26 = Symbol?.species;
const v28 = { configurable: true, value: f3 };
try {
    Object.defineProperty(f3, v26, v28);
} catch(e44) {
}
v2.constructor = f3;
try {
    v2.slice();
} catch(e46) {
}
