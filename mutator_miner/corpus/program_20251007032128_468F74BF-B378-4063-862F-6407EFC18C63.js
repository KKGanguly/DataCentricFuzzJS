for (let i1 = 0; i1 < 2; ++i1) {
    function f7(a8) {
        function foo() {
            print("test");
        }
        function bar() {
        }
        const v14 = %SetCode(bar, foo);
        foo();
        if (a8 == 0) {
            const v18 = %OptimizeFunctionOnNextCall(foo);
        }
    }
    f7(i1);
}
