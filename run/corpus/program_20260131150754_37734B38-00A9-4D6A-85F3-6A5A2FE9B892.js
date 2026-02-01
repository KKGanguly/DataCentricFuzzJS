function F1(a3, a4) {
    if (!new.target) { throw 'must be called with new'; }
    this.h = null;
}
const v5 = new F1();
function F6(a8, a9, a10) {
    if (!new.target) { throw 'must be called with new'; }
    this.propertyIsEnumerable(this);
}
new F6(F6, v5, F6.toString(null, F1));
