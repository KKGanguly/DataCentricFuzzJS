function F1(a3, a4) {
    if (!new.target) { throw 'must be called with new'; }
    this.d = a4;
}
new F1();
new F1(F1, -41281);
