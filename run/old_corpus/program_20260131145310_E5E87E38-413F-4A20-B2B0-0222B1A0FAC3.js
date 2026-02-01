try {
    function f0() {
    }
    function opt(a2) {
        a2[0] = 1.1;
        this[0] = {};
        a2[0] = 2.3023e-320;
    }
    function main() {
        let arr = [1.1];
        for (let i12 = 0; i12 < 10000; i12++) {
            opt.call({}, arr);
        }
        opt.call(arr, arr);
        f0(arr);
    }
    main();
} catch(e23) {
}
