function f0() {
}
function C() {
}
function f(a3) {
    const v4 = new C();
    var o = v4;
    if (a3) {
        o.t = 1.1;
    }
    const v7 = %_DeoptimizeNow();
    return o.t;
}
for (let i10 = 0; i10 < 1000; i10++) {
    new C();
}
f(true);
f(true);
f(false);
const v23 = %OptimizeFunctionOnNextCall(f);
f0(1.1, f(true));
