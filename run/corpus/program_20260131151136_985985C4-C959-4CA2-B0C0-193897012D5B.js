function F3(a5, a6, a7) {
    if (!new.target) { throw 'must be called with new'; }
    const v8 = this.constructor;
    try { new v8(-10n, -10n); } catch (e) {}
    a5++;
    a6 + a6;
    this.a = a7;
}
new F3(16390n, -10n);
new F3(-9223372036854775807n);
new F3();
console.groupEnd();
