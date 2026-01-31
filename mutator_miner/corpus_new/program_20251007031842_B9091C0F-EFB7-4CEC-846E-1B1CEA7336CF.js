function foo() {
    const v2 = Math.asin;
    return ([,]).map(v2);
}
foo();
foo();
const v8 = %OptimizeFunctionOnNextCall(foo);
foo();
function bar(a11) {
    const v12 = (a13) => {
        return a11 ? Math.asin(a13) : "string";
    };
    return ([,]).map(v12);
}
bar(true);
bar(false);
bar(true);
bar(false);
const v29 = %OptimizeFunctionOnNextCall(bar);
bar(true);
