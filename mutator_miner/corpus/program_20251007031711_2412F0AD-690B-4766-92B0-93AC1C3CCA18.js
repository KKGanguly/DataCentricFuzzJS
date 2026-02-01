function f0() {
}
function foo() {
    global = "";
    return global = global + "bar";
}
f0(foo(), "bar");
const v10 = %OptimizeFunctionOnNextCall(foo);
f0(foo(), "bar");
