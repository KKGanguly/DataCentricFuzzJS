const v3 = [Uint32Array,8,Uint32Array,Int16Array];
const v6 = Array(10);
v6.__proto__ = v3;
const v11 = {
    set(a10) {
        return a10;
    },
};
const v10 = v11;
Object.defineProperty(v3, 1, v10);
Array.prototype.concat.call(v6);
