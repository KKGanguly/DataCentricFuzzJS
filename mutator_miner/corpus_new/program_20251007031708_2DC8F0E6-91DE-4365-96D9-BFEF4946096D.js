function f0() {
}
function store(a2, a3) {
    a2[a3] = 0;
    return 0;
}
function f(a6) {
    const v11 = {
        toString() {
            const v10 = new Error("boom");
            throw v10;
        },
    };
    var key = v11;
    store(a6, key);
}
function f14() {
    const v16 = {};
    const v18 = new Proxy(v16, {});
    var proxy = v18;
    store(proxy, 0);
    const v22 = () => {
        return f(proxy);
    };
    f0(v22, Error);
}
f14();
