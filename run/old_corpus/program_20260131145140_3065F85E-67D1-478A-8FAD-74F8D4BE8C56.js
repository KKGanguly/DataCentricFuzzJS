function trySet(a1) {
    a1["bla"] = 0;
}
const v5 = {};
const v8 = new Proxy(v5, {});
const v7 = v8;
var proxy = v7;
const v9 = {};
const v15 = {
    set() {
        return "";
    },
};
const v12 = v15;
const v17 = new Proxy(v9, v12);
const v13 = v17;
var proxy2 = v13;
trySet(proxy);
trySet(proxy);
trySet(proxy2);
