function F0(a2) {
    if (!new.target) { throw 'must be called with new'; }
    try { this.toString(F0, this, a2, this); } catch (e) {}
}
F0.prototype = F0;
new F0(F0);
