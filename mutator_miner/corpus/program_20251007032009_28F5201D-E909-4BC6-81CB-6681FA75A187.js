function opt(a1, a2) {
    a1[0] = 1.1;
    let tmp = { __proto__: a2 };
    a1[0] = 2.3023e-320;
}
function main() {
    let arr = [1.1,2.2,3.3];
    for (let i14 = 0; i14 < 10000; i14++) {
        opt(arr, {});
    }
    opt(arr, arr);
    print(arr);
}
main();
