const symbol = Symbol();
function foo(a4) {
    try {
        a4[symbol] = 42;
    } catch(e6) {
    }
    new Number();
}
const v9 = %PrepareFunctionForOptimization(foo);
foo({});
const v12 = %OptimizeFunctionOnNextCall(foo);
foo({});
