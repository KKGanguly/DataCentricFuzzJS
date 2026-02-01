function foo(a1) {
    let x1 = 1337;
    let y1 = (x1 /= true) || NaN;
    y1 <<= 1;
    if (a1) {
        const v9 = {};
        /p4nda/.test(v9);
    }
    return y1;
}
console.log(foo());
console.log(foo());
const v17 = %PrepareFunctionForOptimization(foo);
foo();
const v19 = %OptimizeFunctionOnNextCall(foo);
console.log(foo(true));
