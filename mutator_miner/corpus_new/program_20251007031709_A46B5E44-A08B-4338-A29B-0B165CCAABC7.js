function f0() {
}
a = { y: 1.5 };
a.y = 1093445778;
b = a.y;
const v8 = {};
c = { y: v8 };
function f() {
    return { y: b };
}
f();
f();
const v16 = %OptimizeFunctionOnNextCall(f);
f0(f().y, 1093445778);
