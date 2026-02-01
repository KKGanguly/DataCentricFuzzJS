function foo(a1) {
    let x1 = 1337;
    x1 /= true;
    let y1 = true || NaN;
    y1 <<= 1;
    if (a1) {
        const v9 = {};
        /p4nda/.test(v9);
    }
    return y1;
}
console.log(foo());
console.log(foo());
const v18 = %PrepareFunctionForOptimization(foo);
const v17 = v18;
foo();
const v21 = %OptimizeFunctionOnNextCall(foo);
const v19 = v21;
console.log(foo(true));
