function foo(a1) {
    a1.caller;
}
function bar(a4) {
    new foo(a4);
}
function f6() {
}
bar(f6);
const v8 = %OptimizeFunctionOnNextCall(bar);
function f9() {
}
bar(f9);
