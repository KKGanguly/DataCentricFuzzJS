let arr = [,0.1];
const v6 = {
    valueOf() {
        arr.length = 0;
    },
};
const v7 = v6;
Array.prototype.lastIndexOf.call(arr, 100, v7);
