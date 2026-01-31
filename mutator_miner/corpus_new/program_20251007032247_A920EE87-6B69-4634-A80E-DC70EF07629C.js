function bla(a1, a2) {
}
const v4 = {};
const v6 = new Proxy(v4, {});
pro = v6;
function f8() {
}
var co = f8;
const v10 = {};
const v15 = {
    get(a12, a13) {
        return 1;
    },
};
const v16 = new Proxy(v10, v15);
co.prototype = v16;
Reflect.construct(bla, [], co);
Reflect.construct(bla, [], co);
Reflect.construct(bla, [], co);
Reflect.construct(bla, [], co);
Reflect.construct(bla, [], co);
Reflect.construct(bla, [], co);
Reflect.construct(bla, [], co);
const v32 = new bla();
var x = v32;
x.__proto__ = co.prototype;
