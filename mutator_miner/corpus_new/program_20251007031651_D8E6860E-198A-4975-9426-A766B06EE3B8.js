function f0() {
    'use strict';
    function baz() {
        'use asm';
        function f() {
        }
        return { f: f };
    }
    function foo(a5) {
        baz(a5);
        const v7 = %DeoptimizeFunction(foo);
    }
    foo();
    foo();
    const v10 = %OptimizeFunctionOnNextCall(foo);
    foo();
}
f0();
