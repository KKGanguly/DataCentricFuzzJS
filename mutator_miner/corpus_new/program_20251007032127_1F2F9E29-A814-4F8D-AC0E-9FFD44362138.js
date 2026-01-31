function f0() {
}
let cnt = 0;
let reg = /./g;
const v5 = () => {
    if (cnt++ == 0) {
        const v11 = 2 ** 16;
        return { length: v11 };
    }
    cnt = 0;
    return null;
};
reg.exec = v5;
const v15 = () => {
    const v16 = () => {
    };
    return ("").replace(reg, v16);
};
f0(v15, RangeError);
