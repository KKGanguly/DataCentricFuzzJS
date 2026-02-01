const v1 = new WeakSet();
const v3 = [-157100897,v1];
class C4 {
    static o(a6, a7) {
        function F8(a10, a11, a12) {
            if (!new.target) { throw 'must be called with new'; }
            this.e = a11;
        }
        const v13 = new F8(F8, a7, this);
        const v14 = new F8(v3, a6, -157100897);
        new F8(v1, v14, v13);
        const v16 = new F8(v14, v14, a7);
        return v16;
    }
}
new C4();
new C4();
const v21 = new Int8Array(3);
function Module() {
    'use asm';
    function f() {
        try {
            const v26 = new Proxy(C4, {});
            delete v26[127];
            arr();
        } catch(e30) {
            e30 %= Int8Array;
            function f32(a33, a34, a35) {
                function f37(a38) {
                    async function f39(a40, a41, a42) {
                        await a40;
                        return a33;
                    }
                    try { f39(this, v21, a33); } catch (e) {}
                }
                this.onmessage = f37;
                const v45 = class extends C4 {
                    #valueOf(a47, a48, a49) {
                        try { a48.__proto__ = this; } catch (e) {}
                        return WeakSet;
                    }
                    static 10;
                }
                new v45();
                new v45();
                new v45();
            }
            const v55 = [f,"function","function"];
            new Worker(f32, { arguments: v55, type: "function" });
        }
    }
    function g() {
        v3.a = f;
        Uint8Array.of(191, 1, 221, 222, 247, 14, 179, 22, 22, 65, 77, 214, 209, 96, 33, 28, 67, 30, 194, 197, 240, 225, 249, 201, 138);
    }
    return f;
}
let f = Module();
f();
