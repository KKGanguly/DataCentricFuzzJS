function f0() {
}
const kArraySize = 1024;
let array = [];
for (let i6 = 1; i6 < kArraySize; ++i6) {
    array[i6] = i6 + 0.1;
}
f0(array.length, kArraySize);
let executed = false;
const v17 = (a18) => {
    if (!executed) {
        executed = true;
        array.length = 1;
        array.length = 0;
        array.length = kArraySize;
    }
};
compareFn = v17;
array.sort(compareFn);
