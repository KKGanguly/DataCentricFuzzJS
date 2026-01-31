function foo(a1) {
    foo.bind();
    if (a1) {
        const v3 = %OptimizeFunctionOnNextCall(foo);
    }
    for (let i5 = 0; i5 < 10000; i5++) {
    }
    foo instanceof foo;
}
const v12 = %PrepareFunctionForOptimization(foo);
foo(false);
const v15 = %OptimizeMaglevOnNextCall(foo);
foo(true);
foo.prototype = foo;
foo(true);
