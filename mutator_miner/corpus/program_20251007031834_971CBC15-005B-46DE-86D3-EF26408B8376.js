function f0() {
}
const o = { x: 9 };
o.__proto__ = Array.prototype;
function foo(a7) {
    return a7.indexOf(undefined);
}
f0(-1, foo(o));
f0(-1, foo(o));
const v18 = %OptimizeFunctionOnNextCall(foo);
f0(-1, foo(o));
