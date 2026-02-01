function foo() {
    const v2 = Math.asin;
    return ([,]).map(v2);
}
foo();
foo();
const v9 = %OptimizeFunctionOnNextCall(foo);
const v8 = v9;
foo();
function bar(a13) {
    const v14 = (a15) => {
        return a13 ? Math.asin(a15) : "string";
    };
    const v12 = v14;
    return ([,]).map(v12);
}
bar(true);
bar(false);
bar(true);
bar(false);
const v32 = %OptimizeFunctionOnNextCall(bar);
const v29 = v32;
bar(true);
