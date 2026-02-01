function f0() {
    const v3 = {
        set h(a2) {
        },
    };
    return v3;
}
const v4 = f0();
function f5(a6) {
    return { 8: f0, ...a6, [v4]: a6, [f0]: f0 };
}
f5(f5());
const v11 = new Int8Array();
function f12(a13, a14) {
}
const v16 = Symbol.species;
Object.defineProperty(f12, v16, { value: v11 });
v11.constructor = f12;
try { v11.slice(); } catch (e) {}
