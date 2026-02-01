const kSize = 4294967296;
const v2 = %TypedArrayMaxLength();
if (v2 >= kSize) {
    const v5 = new Uint8Array(kSize);
    const array = v5;
    function f() {
        let result = array["4294967295"];
        assertEquals(0, result);
    }
    function g() {
        array["4294967295"] = 1;
    }
    const v17 = %PrepareFunctionForOptimization(f);
    for (let i19 = 0; i19 < 3; i19++) {
        f();
    }
    const v26 = %OptimizeFunctionOnNextCall(f);
    f();
    const v28 = %PrepareFunctionForOptimization(g);
    for (let i30 = 0; i30 < 3; i30++) {
        g();
    }
    const v37 = %OptimizeFunctionOnNextCall(g);
    g();
}
