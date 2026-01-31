function F0(a2, a3) {
    if (!new.target) { throw 'must be called with new'; }
    const v4 = this.constructor;
    try { new v4(this, this); } catch (e) {}
}
new F0();
new F0();
