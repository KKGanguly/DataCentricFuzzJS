function f0() {
}
function F6() {
    if (!new.target) { throw 'must be called with new'; }
}
class C8 extends F6 {
}
function f1() {
    return this;
}
function f13(a14, a15, a16) {
    a14 instanceof a16;
}
function f18(a19) {
    a19.x = 0;
    class C22 {
    }
    class C23 extends C22 {
        bar() {
            return super.foo();
        }
    }
    const t22 = C22.prototype;
    t22.foo = f1;
    const v27 = new C23();
    f13(v27.bar.call(), Object(), String);
}
f18(Array);
f18(Array());
const v40 = %OptimizeFunctionOnNextCall(f18);
f18(Array);
