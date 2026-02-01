function f0() {
}
function foo(a2) {
    return a2.x;
}
const v6 = new String("abc");
const v5 = v6;
let s1 = v5;
s1.x = 42;
const v11 = new String("def");
const v9 = v11;
let s2 = v9;
s2.y = 17;
const v15 = %PrepareFunctionForOptimization(foo);
const v12 = v15;
f0(foo(s1));
const v19 = %OptimizeFunctionOnNextCall(foo);
const v16 = v19;
f0(foo(s2));
