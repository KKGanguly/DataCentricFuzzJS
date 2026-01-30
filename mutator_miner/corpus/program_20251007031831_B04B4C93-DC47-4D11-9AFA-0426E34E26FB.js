function shouldBe(a1, a2) {
}
{
    let target = {};
    function f5(a6, a7, a8) {
        shouldBe(a8, 1);
        return 42;
    }
    let handlers = { get: f5 };
    const v15 = new Proxy(target, handlers);
    let proxy = v15;
    shouldBe(Reflect.get(proxy, 0, 7829367), 42);
}
