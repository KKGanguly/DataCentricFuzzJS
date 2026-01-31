const v1 = [];
const v4 = new Proxy(v1, { valueOf: 13.37 });
var a = v4;
const v7 = new Proxy(a, Reflect);
var b = v7;
for (const v9 in b) {
}
