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
    const v14 = new Proxy(v6, { get: f7 });
    const v13 = v14;
    var p = v13;
    RegExp.prototype[Symbol.search].call(p);
    return (get + "") === "lastIndex,exec,lastIndex";
}
if (!test()) {
    const v31 = new Error("Test failed");
    const v29 = v31;
    throw v29;
}
