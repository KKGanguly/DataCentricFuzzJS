function f0() {
    let __v_25062 = __v_25055.length;
    __v_25055.length = 1;
    return __v_25062;
}
let __v_25059 = { valueOf: f0 };
let __v_25060 = [];
for (let i10 = 0; i10 < 1500; i10++) {
    __v_25060.push("" + 0.1);
}
for (let i21 = 0; i21 < 75; i21++) {
    __v_25055 = __v_25060.slice();
    __v_25056 = __v_25055.slice(0, __v_25059);
}
