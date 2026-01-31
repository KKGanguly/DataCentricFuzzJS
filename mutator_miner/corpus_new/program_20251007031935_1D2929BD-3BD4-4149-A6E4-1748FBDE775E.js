function f0() {
}
function C1() {
}
function f2() {
    return 1;
}
const t7 = C1.prototype;
t7.f = f2;
function C2() {
}
function f6() {
    throw 2;
}
const t14 = C2.prototype;
t14.f = f6;
const v9 = new C1();
var o1 = v9;
const v11 = new C2();
var o2 = v11;
function foo(a14) {
    return a14.f();
}
foo(o1);
try {
    foo(o2);
} catch(e18) {
}
foo(o1);
try {
    foo(o2);
} catch(e21) {
}
const v22 = %OptimizeFunctionOnNextCall(foo);
f0(1, foo(o1));
const v26 = () => {
    return foo(o2);
};
f0(v26);
