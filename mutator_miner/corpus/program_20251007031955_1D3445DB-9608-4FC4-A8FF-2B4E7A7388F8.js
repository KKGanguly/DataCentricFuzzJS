const v2 = Array();
v2[2] = Array;
const v3 = {};
v3[9] = 2.935177379614067e+307;
v2.__proto__ = v3;
const v7 = {
    get() {
        v2.length = 1;
        return 1;
    },
};
Object.defineProperty(v3, 1, v7);
Array.prototype.concat.call(v2);
