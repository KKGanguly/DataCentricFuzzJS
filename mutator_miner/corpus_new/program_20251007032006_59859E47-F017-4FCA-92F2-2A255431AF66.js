function f0() {
}
const maxLength = 268435440;
const s = ("A").repeat(maxLength);
function foo(a7) {
    let x = a7.lastIndexOf("", maxLength);
    return x === maxLength;
}
f0(foo(s));
f0(foo(s));
const v16 = %OptimizeFunctionOnNextCall(foo);
f0(foo(s));
