function f0() {
}
var obj = this;
function f3() {
    return false;
}
var handler = { has: f3 };
const v8 = new Proxy(obj, handler);
var proxy = v8;
Object.defineProperty(obj, "nonconf", {});
f0("'nonconf' in proxy");
