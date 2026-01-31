function g(a1) {
    return a1.constructor;
}
g({});
g({});
function f() {
    var i = 0;
    do {
        g(i = i + 1);
    } while (i < 1)
}
const v15 = %OptimizeFunctionOnNextCall(f);
f();
