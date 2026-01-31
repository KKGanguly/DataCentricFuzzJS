function baz(a1, a2) {
    if (a2 === true) {
        a1[0] = 1;
    }
}
function bar(a7) {
    baz(Object.prototype, a7);
    baz(this.arguments, true);
}
bar(false);
bar(false);
const v19 = %OptimizeFunctionOnNextCall(bar);
bar(true);
function foo() {
    ([]).push();
}
foo();
foo();
const v27 = %OptimizeFunctionOnNextCall(foo);
foo();
