function F0(a2, a3, a4) {
    if (!new.target) { throw 'must be called with new'; }
    const v5 = this.constructor;
    try { new v5(); } catch (e) {}
}
const v7 = new F0(F0, F0, F0);
new F0(F0, F0, v7);
