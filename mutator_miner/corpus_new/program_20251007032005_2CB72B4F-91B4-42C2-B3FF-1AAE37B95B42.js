class C1 extends Map {
    static get h() {
    }
}
new C1();
function F7(a9, a10) {
    if (!new.target) { throw 'must be called with new'; }
    const v11 = this.constructor;
    try { new v11(this, this); } catch (e) {}
}
new F7();
new F7();
const v15 = [Uint32Array,8,Uint32Array,Int16Array];
const v18 = Array(10);
Object.defineProperty(v15, 1, {});
Array.prototype.concat.call(v18);
