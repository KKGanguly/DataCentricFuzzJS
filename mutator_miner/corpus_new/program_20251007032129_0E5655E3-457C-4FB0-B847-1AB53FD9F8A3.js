function opt(a1, a2) {
    a1[0] = 1.1;
    const v4 = {};
    a2[0] = v4;
    a2.method(v4);
    a1[0] = 2.3023e-320;
}
const v7 = () => {
};
const t9 = Object.prototype;
t9.method = v7;
let arr = [1.1,2.2];
for (let i15 = 0; i15 < 100; i15++) {
    opt(arr, 1);
    opt(arr, arr.concat());
}
const v25 = () => {
    opt(arr, arr);
    console.log(arr);
};
setTimeout(v25, 100);
