function f0() {
}
function F1() {
    if (!new.target) { throw 'must be called with new'; }
    Array();
}
const v6 = new F1();
const v7 = new F1();
const v8 = [v7,F1];
function F9(a11, a12) {
    if (!new.target) { throw 'must be called with new'; }
    this.c = v7;
    this.d = v7;
}
new F9(v6, F1);
new F9(f0, v6);
var Test = {};
class C17 {
    0 = v8;
    toB() {
        const t6 = Test.B;
        new t6(this);
    }
}
class C22 {
    constructor(a24) {
        this.bar = a24;
    }
}
for (let i26 = 0; i26 < 500; i26++) {
    const v32 = new C17(i26);
    const v18 = v32;
}
