function main() {
    function func() {
        return "" + "<div><div><di";
    }
    const v5 = %PrepareFunctionForOptimization(func);
    try {
        func();
    } catch(e7) {
    }
    const v8 = func();
    /./.test(v8);
}
const v11 = %PrepareFunctionForOptimization(main);
main();
const v13 = %OptimizeFunctionOnNextCall(main);
main();
