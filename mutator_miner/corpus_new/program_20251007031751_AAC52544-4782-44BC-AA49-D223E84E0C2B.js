function foo() {
    const v3 = new Array(2);
    var a = v3;
    for (let i6 = 1; i6 > -1; i6 = i6 - 2) {
        if (i6 < a.length) {
            const v16 = new Array(i6);
            a = v16;
        }
    }
}
foo();
const v18 = %OptimizeFunctionOnNextCall(foo);
foo();
