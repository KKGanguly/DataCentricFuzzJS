function foo() {
    let v3 = 0;
    while (v3 != 10000) {
        const v6 = typeof v3 === "number";
        if (v6) {
        } else {
            const v7 = v3 || 8;
        }
        const v8 = v3 + 1;
        v3 = arguments;
        v3 = v8;
    }
}
function main() {
    foo();
}
main();
gc();
