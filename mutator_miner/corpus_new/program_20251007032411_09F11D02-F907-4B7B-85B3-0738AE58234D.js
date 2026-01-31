const v1 = new Set();
let a = v1;
const v3 = new Set();
let b = v3;
const v5 = () => {
    a.clear();
    return b[Symbol.iterator]();
};
b.keys = v5;
a.symmetricDifference(b);
