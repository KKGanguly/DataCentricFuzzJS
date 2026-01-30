function foo() {
    return [...[,-Infinity]];
}
foo()[0];
foo()[0];
const v10 = %OptimizeFunctionOnNextCall(foo);
foo()[0];
