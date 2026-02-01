function f0() {
}
function opt(a2, a3) {
    a3[0];
    a2[0] = 1.1;
    a3.reverse();
    a2[0] = 2.3023e-320;
}
function main() {
    let arr = [1.1,2.2,3.3];
    arr.__proto__ = null;
    delete arr[1];
    let arr2 = [,{}];
    arr2.__proto__ = {};
    arr2.reverse = Array.prototype.reverse;
    for (let i26 = 0; i26 < 10000; i26++) {
        opt(arr, arr2);
    }
    const v33 = () => {
        const t17 = arr2.__proto__;
        t17.__proto__ = arr;
    };
    const v32 = v33;
    Array.prototype.sort.call(arr, v32);
    opt(arr, arr2);
    f0(arr[0]);
}
main();
