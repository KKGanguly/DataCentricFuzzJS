function F0() {
    if (!new.target) { throw 'must be called with new'; }
    this.f = this;
}
const v2 = new F0();
function f3(a4, a5) {
    return a5;
}
v2[Symbol.toPrimitive] = f3;
