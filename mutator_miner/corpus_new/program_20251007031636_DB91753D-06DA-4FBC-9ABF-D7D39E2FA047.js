function foo() {
    const t1 = m.arguments;
    t1[0] = "x";
}
function m(a5) {
    'use asm';
    var f = foo;
    function bar() {
        f();
        for (let i10 = 1; i10 < 1000000; i10++) {
        }
        return a5 + 1;
    }
    return bar();
}
print(m(1, 2));
