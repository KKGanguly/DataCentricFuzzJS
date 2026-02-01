function f0() {
    return {};
}
a = f0;
function f3() {
    return {};
}
b = f3;
c = Proxy;
function f8() {
    Reflect.construct(a, b, c);
}
foo = f8;
foo();
