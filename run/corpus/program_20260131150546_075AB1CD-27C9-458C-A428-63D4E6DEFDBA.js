function opt(a1, a2) {
    a1[0] = 1.1;
    const v4 = {};
    a2[0] = v4;
    a2.method(v4);
    a1[0] = 2.3023e-320;
}
const v8 = () => {
};
const v7 = v8;
const t9 = Object.prototype;
t9.method = v7;
let arr = [1.1,2.2];
for (let i18 = 0; i18 < 100; i18++) {
    opt(arr, 1);
    opt(arr, arr.concat());
}
const v28 = () => {
    opt(arr, arr);
    console.log(arr);
};
const v25 = v28;
setTimeout(v25, 100);
