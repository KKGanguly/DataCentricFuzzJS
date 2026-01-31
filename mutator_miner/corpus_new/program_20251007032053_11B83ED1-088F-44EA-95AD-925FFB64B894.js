function main() {
    let arr = [1.1,1.1,1.1,1.1,1.1];
    function opt(a9) {
        arr[0] = 1.1;
        arr[1] = 2.3023e-320 + parseInt(("a").replace("a", a9));
        arr[2] = 1.1;
        arr[3] = 1.1;
    }
    const v20 = () => {
        return "0";
    };
    let r0 = v20;
    for (let i24 = 0; i24 < 4096; i24++) {
        opt(r0);
    }
    const v31 = () => {
        arr[0] = {};
        return "0";
    };
    opt(v31);
    print(arr[1]);
}
main();
