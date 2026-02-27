function f0() {
}
const v2 = new Array();
const array = v2;
array[524288] = 1;
array.unshift({});
const v7 = () => {
    const v9 = new WeakMap(array);
    return v9;
};
f0(v7);
