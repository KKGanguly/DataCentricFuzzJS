function opt(a1, a2) {
    a1[0] = 1.1;
    Math.max.apply(Math, a2);
    a1[0] = 2.3023e-320;
}
function main() {
    let arr = [1.1,2.2,3.3,4.4];
    for (let i16 = 0; i16 < 10000; i16++) {
        opt(arr, [1,2,3,4]);
    }
    function f28() {
        arr[0] = {};
    }
    Math.max = f28;
    opt(arr, {});
    print(arr[0]);
}
main();
