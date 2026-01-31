function f() {
    Object.is();
}
f();
f();
const v5 = %OptimizeFunctionOnNextCall(f);
f();
