function F4(a6, a7, a8) {
    if (!new.target) { throw 'must be called with new'; }
    this.d = 3.476484996446419e+307;
    this.e = a6;
}
new F4(0.0, 3.476484996446419e+307, 199.98729002962182);
new F4(3.476484996446419e+307);
const v11 = new F4(0.0, 0.0);
function f12() {
}
class C13 extends f12 {
}
function f14() {
    const v15 = {};
    const v16 = v11.__proto__;
    function f17() {
        delete v16.message;
    }
    return f17;
}
f14();
