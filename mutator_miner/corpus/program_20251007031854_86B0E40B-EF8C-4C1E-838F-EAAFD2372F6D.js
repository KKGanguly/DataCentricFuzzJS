const v2 = new Function("console.log(arguments[300]);");
let f = v2;
let a = [1,2,3];
let b = [];
b.length = 1000;
b.fill(2);
const v15 = [];
function f16(a17, a18) {
    console.log("get");
    a.length = 4;
    return (a17[a18] || 0) || undefined;
}
const v29 = new Proxy(v15, { get: f16 });
let p = v29;
b.__proto__ = p;
let proto = [];
function f34() {
    console.log("hi");
    b.length = 1;
    return 4;
}
Object.defineProperty(proto, 3, { get: f34 });
a.__proto__ = proto;
f(1, ...a, ...b);
