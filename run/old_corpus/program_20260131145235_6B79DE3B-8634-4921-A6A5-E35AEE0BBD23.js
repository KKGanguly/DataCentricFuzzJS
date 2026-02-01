function f0() {
}
function opt(a2, a3) {
    a2[0] = 1.1;
    typeof a2?.[a3];
    a2[0] = 2.3023e-320;
}
function main() {
    let arr = [1.1,2.2,3.3];
    for (let i15 = 0; i15 < 65536; i15++) {
        const v21 = {};
        try {
            opt(arr, v21);
        } catch(e24) {
        }
    }
    const v25 = () => {
        arr[0] = {};
        throw 1;
    };
    const v23 = v25;
    const v26 = { toString: v23 };
    try {
        opt(arr, v26);
    } catch(e32) {
    }
    const v28 = arr?.[0];
    try {
        f0(v28);
    } catch(e36) {
    }
}
try {
    main();
} catch(e38) {
}
