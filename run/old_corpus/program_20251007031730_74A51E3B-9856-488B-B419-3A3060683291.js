function f(a1) {
    const o = Reflect.construct(Object, arguments, Proxy);
    o.foo = a1;
}
for (let i9 = 0; i9 < 10000; i9++) {
    f(i9);
}
