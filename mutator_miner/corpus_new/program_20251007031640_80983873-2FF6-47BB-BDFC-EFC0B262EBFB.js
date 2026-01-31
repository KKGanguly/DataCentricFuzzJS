function foo() {
    const v1 = %OptimizeFunctionOnNextCall(foo);
    print(42);
}
foo();
