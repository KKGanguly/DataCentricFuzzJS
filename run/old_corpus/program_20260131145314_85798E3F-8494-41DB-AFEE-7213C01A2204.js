function bla(a1, a2) {
}
const v4 = {};
const v7 = new Proxy(v4, {});
const v6 = v7;
pro = v6;
function f8() {
}
var co = f8;
const v10 = {};
const v18 = {
    get(a15, a16) {
        return 1;
    },
};
const v15 = v18;
const v20 = new Proxy(v10, v15);
const v16 = v20;
co.prototype = v16;
Reflect.construct(bla, [], co);
Reflect.construct(bla, [], co);
Reflect.construct(bla, [], co);
Reflect.construct(bla, [], co);
Reflect.construct(bla, [], co);
Reflect.construct(bla, [], co);
Reflect.construct(bla, [], co);
const v37 = new bla();
const v32 = v37;
var x = v32;
x.__proto__ = co.prototype;
