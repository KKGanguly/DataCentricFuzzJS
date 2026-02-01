function trySet(a1) {
    a1["bla"] = 0;
}
const v5 = {};
const v7 = new Proxy(v5, {});
var proxy = v7;
const v9 = {};
const v12 = {
    set() {
        return "";
    },
};
const v13 = new Proxy(v9, v12);
var proxy2 = v13;
trySet(proxy);
trySet(proxy);
trySet(proxy2);
