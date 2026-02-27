function foo(a1) {
    return a1.x;
}
const v5 = new String("abc");
let s1 = v5;
s1.x = 42;
const v9 = new String("def");
let s2 = v9;
s2.y = 17;
const v12 = %PrepareFunctionForOptimization(foo);
print(foo(s1));
const v16 = %OptimizeFunctionOnNextCall(foo);
print(foo(s2));
