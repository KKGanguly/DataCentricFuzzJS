function f0() {
}
function foo() {
    'use strict';
    x = 42;
}
__proto__ = { x: 1 };
f0(foo);
f0(foo);
