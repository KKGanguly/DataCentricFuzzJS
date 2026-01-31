function test() {
    var get = [];
    function f4() {
        return null;
    }
    const v6 = { exec: f4 };
    function f7(a8, a9) {
        get.push(a9);
        return a8[a9];
    }
    const v13 = new Proxy(v6, { get: f7 });
    var p = v13;
    RegExp.prototype[Symbol.search].call(p);
    return (get + "") === "lastIndex,exec,lastIndex";
}
if (!test()) {
    const v29 = new Error("Test failed");
    throw v29;
}
