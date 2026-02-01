function foo() {
    const t1 = m.arguments;
    t1[0] = "x";
}
function m(a6) {
    'use asm';
    var f = foo;
    function bar() {
        f();
        for (let i11 = 1; i11 < 1000000; i11++) {
        }
        return a6 + 1;
    }
    return bar();
}
print(m(1, 2));
