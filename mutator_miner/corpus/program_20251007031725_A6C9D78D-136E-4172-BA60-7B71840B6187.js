function f0() {
}
function f1() {
    const v4 = {};
    const v7 = new Proxy(v4, { has: 0 });
    "foo" in v7;
}
f0(f1, TypeError);
