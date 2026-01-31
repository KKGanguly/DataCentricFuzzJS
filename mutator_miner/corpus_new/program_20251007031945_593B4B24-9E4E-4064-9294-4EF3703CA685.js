function f0() {
}
function test() {
    const v3 = {};
    const v5 = new Proxy(v3, {});
    var proxy = v5;
    var key_or_proxy = 0;
    function failing_get() {
        return proxy[key_or_proxy];
    }
    failing_get();
    const v16 = {
        toString() {
            const v15 = new TypeError("error");
            throw v15;
        },
    };
    const v18 = new Proxy(v16, {});
    key_or_proxy = v18;
    failing_get();
}
f0(test, TypeError);
