function foo() {
    const v3 = new Array(2);
    var a = v3;
    a[0] = 23.1234;
    a[1] = 25.1234;
    const v7 = %DeoptimizeNow();
    return a[2];
}
foo();
foo();
const v11 = %OptimizeFunctionOnNextCall(foo);
foo();
