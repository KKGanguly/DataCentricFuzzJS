function f0() {
}
function opt(a2, a3) {
    a2[0] = 1.1;
    if (a3 !== null) {
        let v8;
        try { v8 = ("a").localeCompare(a3); } catch (e) {}
        let tmp = v8;
    }
    a2[0] = 2.3023e-320;
}
function main() {
    let arr = [1.1];
    for (let i16 = 0; i16 < 100; i16++) {
        ("a").localeCompare("x", []);
        opt(arr, null);
        try {
            const v28 = () => {
                throw 1;
            };
            const v27 = v28;
            opt(arr, { toString: v27 });
        } catch(e33) {
        }
    }
    const v34 = () => {
        arr[0] = {};
    };
    const v32 = v34;
    opt(arr, { toString: v32 });
    f0(arr);
}
main();
