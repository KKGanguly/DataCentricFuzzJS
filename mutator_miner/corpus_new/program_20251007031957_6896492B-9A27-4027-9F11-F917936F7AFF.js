let a = [1,2];
function f(a5) {
    g(undefined, a5);
}
function g(a10, a11) {
    if (a11) {
        return;
    }
    return a[a10 + 1];
}
g(0, false);
g(0, false);
f(true);
f(true);
const v25 = %OptimizeFunctionOnNextCall(f);
f(false);
