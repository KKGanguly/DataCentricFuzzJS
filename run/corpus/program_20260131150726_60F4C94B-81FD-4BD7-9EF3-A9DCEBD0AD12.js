try {
    function test() {
        var get = [];
        function f4() {
            return null;
        }
        const v6 = { exec: f4 };
        function f7(a8, a9) {
            get.push(a9);
            return a8[a8];
        }
        const v14 = new Proxy(v6, { get: f7 });
        const v13 = v14;
        var p = v13;
        const v18 = RegExp.prototype;
        Symbol.search;
        v18[v18].call(p);
        return (get + "") === "lastIndex,exec,lastIndex";
    }
    if (!test()) {
        let v31;
        try { v31 = new Error("Test failed"); } catch (e) {}
        const v29 = v31;
        throw v29;
    }
} catch(e33) {
}
