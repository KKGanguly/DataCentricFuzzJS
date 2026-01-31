function f0() {
}
const key1 = {};
const key2 = {};
const v9 = new Set([,1]);
const set = v9;
f0(set.has(undefined), true);
f0(set.has(1), true);
const v22 = new Set([,1.234]);
const doubleSet = v22;
f0(doubleSet.has(undefined), true);
f0(doubleSet.has(1.234), true);
const v37 = new Map([[,key1],[key2]]);
const map = v37;
f0(map.get(undefined), key1);
f0(map.get(key2), undefined);
const v49 = new Map([[,1.234]]);
const doublesMap = v49;
f0(doublesMap.get(undefined), 1.234);
const v58 = new WeakMap([[key1]]);
const weakmap = v58;
f0(weakmap.get(key1), undefined);
const v63 = () => {
    const v68 = new WeakSet([,{}]);
    return v68;
};
f0(v63);
const v70 = () => {
    const v75 = new WeakSet([,1.234]);
    return v75;
};
f0(v70);
const v77 = () => {
    const v82 = new Map([,[,key1]]);
    return v82;
};
f0(v77);
const v84 = () => {
    const v88 = new WeakMap([[,key1]]);
    return v88;
};
f0(v84);
const v90 = () => {
    const v95 = new WeakMap([,[,key1]]);
    return v95;
};
f0(v90);
