let c0 = 0;
function foo(a3, a4) {
    function bar1() {
        a4--;
        return a3;
    }
    let x = a3 == 57005;
    function bar2() {
    }
    bar2 >>>= 1;
    let res = a4 !== x;
    a4 = x;
    let y = a3 > c0;
    return res += c0;
}
let r1 = foo(2n, 6);
console.log(r1);
const v22 = %PrepareFunctionForOptimization(foo);
let r2 = foo(2n, 6);
const v27 = %OptimizeFunctionOnNextCall(foo);
let r3 = foo(2n, 6);
console.log(r3);
