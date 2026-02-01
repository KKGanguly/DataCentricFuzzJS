function f0() {
    const v5 = {
        set h(a2) {
        },
        set e(a4) {
        },
    };
    return v5;
}
const v6 = f0();
function f7(a8) {
    const v9 = { [f0]: v6, 8: f0, ...a8 };
    return v6;
}
f7(v6);
f7(v6);
function f12() {
    return f0;
}
f12.name;
const v15 = new Int8Array(v6);
v15.length = v15;
function f16(a17, a18) {
    const v20 = this.__proto__;
    try { v20.constructor(this); } catch (e) {}
    const v22 = v20.constructor;
    v22.toString(Int8Array, a17);
    v22.caller = v22;
    const v30 = {
        o(a25, a26, a27, a28) {
            ArrayBuffer.b = ArrayBuffer;
            return a27;
        },
    };
    v30.o(v30, v30, v22, v30, v30);
    return v22();
}
try { new Symbol(); } catch (e) {}
const v35 = Symbol.species;
Object.defineProperty(f16, v35, { value: f16 });
v15.constructor = f16;
try { v15.slice(); } catch (e) {}
