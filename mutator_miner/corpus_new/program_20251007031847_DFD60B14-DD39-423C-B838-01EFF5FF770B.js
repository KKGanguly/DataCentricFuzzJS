const v3 = [Uint32Array,8,Uint32Array,Int16Array];
const v6 = Array(10);
v6.__proto__ = v3;
const v10 = {
    set(a9) {
        return a9;
    },
};
Object.defineProperty(v3, 1, v10);
Array.prototype.concat.call(v6);
