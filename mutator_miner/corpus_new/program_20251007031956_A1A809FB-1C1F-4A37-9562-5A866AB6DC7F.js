function f0() {
}
function TestError() {
}
const v8 = new Array((2 ** 32) - 1);
const a = v8;
const v12 = {
    toString() {
        const v11 = new TestError();
        throw v11;
    },
};
a[0] = v12;
const v13 = () => {
    return a.join();
};
f0(v13, TestError);
