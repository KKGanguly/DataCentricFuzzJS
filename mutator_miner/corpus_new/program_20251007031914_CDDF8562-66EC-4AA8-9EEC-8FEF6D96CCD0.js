function JSCreate() {
    function f(a2) {
        const o = Reflect.construct(Object, arguments, Proxy);
        o.foo = a2;
    }
    f(0);
}
JSCreate();
