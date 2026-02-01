function F0() {
    if (!new.target) { throw 'must be called with new'; }
}
class C2 {
    static 4294967295 = F0;
}
function F4(a6, a7, a8) {
    if (!new.target) { throw 'must be called with new'; }
    const v9 = this.constructor;
    try { new v9(-10n); } catch (e) {}
}
new F4();
new F4();
new F4(-10n, -10n);
