function main() {
    function v1(a2, a3, a4, a5) {
        if (a5) {
            with (2) {
                const v7 = a5();
            }
        }
    }
    for (let i10 = 0; i10 < 4002; i10++) {
        const v9 = v1(i10, Float64Array, Float64Array, v1);
    }
}
main();
