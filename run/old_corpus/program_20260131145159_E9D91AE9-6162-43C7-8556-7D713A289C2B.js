function f1() {
    return this;
}
function f2(a3, a4, a5) {
    a3 instanceof a5;
}
function f3(a8) {
    a8.x = 0;
    if (a8.x === 0) {
        a8[1] = 0.1;
    }
    class C14 {
    }
    class C15 extends C14 {
        bar() {
            return super.foo();
        }
    }
    const t18 = C14.prototype;
    t18.foo = f1;
    const v20 = new C15();
    const v19 = v20;
    f2(v19.bar.call(), Object(), String);
}
const v30 = new Array(1);
const v28 = v30;
f3(v28);
const v34 = new Array(1);
const v31 = v34;
f3(v31);
const v37 = %OptimizeFunctionOnNextCall(f3);
const v33 = v37;
const v40 = new Array(1);
const v35 = v40;
f3(v35);
