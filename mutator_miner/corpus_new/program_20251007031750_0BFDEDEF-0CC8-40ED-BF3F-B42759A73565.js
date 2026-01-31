function f0() {
}
function deferred_func() {
    class C2 {
        method1() {
        }
    }
}
const v6 = (a7) => {
    return a7;
};
let bound = v6.bind(this, 0);
function opt() {
    deferred_func.prototype;
    return bound();
}
f0(0, opt());
const v16 = %OptimizeFunctionOnNextCall(opt);
f0(0, opt());
