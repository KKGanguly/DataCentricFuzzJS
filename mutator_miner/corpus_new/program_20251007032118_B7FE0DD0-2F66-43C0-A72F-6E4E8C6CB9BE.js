function opt(a1, a2) {
    a1[0] = 1.1;
    if (a2 !== null) {
        let tmp = ("a").localeCompare(a2);
    }
    a1[0] = 2.3023e-320;
}
function main() {
    let arr = [1.1];
    for (let i15 = 0; i15 < 100; i15++) {
        ("a").localeCompare("x", []);
        opt(arr, null);
        try {
            const v27 = () => {
                throw 1;
            };
            opt(arr, { toString: v27 });
        } catch(e31) {
        }
    }
    const v32 = () => {
        arr[0] = {};
    };
    opt(arr, { toString: v32 });
    print(arr);
}
main();
