let v1;
try { v1 = new Int8Array(); } catch (e) {}
const v2 = v1;
function f3(a4, a5) {
    const v8 = this?.__proto__?.constructor;
    const v21 = {
        o(a11, a12, a13, a14) {
            try {
                try { ArrayBuffer(a12, this); } catch (e) {}
            } catch(e17) {
                try { gc(); } catch (e) {}
                e17?.stack;
            }
            return Int8Array;
        },
    };
    const o19 = v21;
    try { o19.o(); } catch (e) {}
    let v24;
    try { v24 = v8(); } catch (e) {}
    return v24;
}
const v26 = Symbol?.species;
const v28 = { configurable: true, value: f3 };
try { Object.defineProperty(f3, v26, v28); } catch (e) {}
v2.constructor = f3;
try { v2.slice(); } catch (e) {}
