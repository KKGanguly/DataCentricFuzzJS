let arr = [,0.1];
const v7 = {
    valueOf() {
        arr.length = 0;
    },
};
Array.prototype.lastIndexOf.call(arr, 100, v7);
