function f0() {
}
function bar(a2) {
    return a2 % 2;
}
bar(0.1);
function f7() {
    function foo(a9) {
        return bar(a9 | -1) == 4294967295;
    }
    f0(foo(1));
    f0(foo(0));
    const v22 = %OptimizeFunctionOnNextCall(foo);
    f0(foo(1));
    f0(foo(0));
}
f7();
function f30() {
    function makeFoo(a32) {
        function foo(a34) {
            return bar(a34 | -1) == a32;
        }
        return foo;
    }
    makeFoo(0);
    const foo = makeFoo(1);
    f0(foo(1));
    f0(foo(0));
    const v51 = %OptimizeFunctionOnNextCall(foo);
    f0(foo(1));
    f0(foo(0));
}
f30();
