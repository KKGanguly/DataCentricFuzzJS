function F0() {
    if (!new.target) { throw 'must be called with new'; }
}
class C2 extends F0 {
    static d;
}
new Int8Array(71);
const v6 = {};
try { new v6(); } catch (e) {}
