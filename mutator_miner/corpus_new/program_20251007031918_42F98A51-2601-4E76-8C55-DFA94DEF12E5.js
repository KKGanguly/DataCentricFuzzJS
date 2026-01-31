function jit_func(a1, a2) {
    var v921312 = 4294967294;
    let v56971 = 0;
    const v8 = () => {
    };
    var v4951241 = [null,v8,String,"string",v56971];
    let v129341 = [];
    v921312 = NaN;
    if (a1 != NaN) {
        v921312 = 4294967294 / 2;
    }
    if (typeof a2 == "string") {
        v921312 = Math.sign(v921312);
    }
    v56971 = ((4294967294 / 2) + 1) - Math.sign((v921312 - -1) | 6328);
    if (a2) {
        v56971 = 0;
    }
    const v43 = Math.sign(0 - Math.sign(v56971));
    let v44;
    try { v44 = new Array(v43); } catch (e) {}
    v129341 = v44;
    try { v129341.shift(); } catch (e) {}
    v4951241 = {};
    try { v129341.shift(); } catch (e) {}
    v4951241.a = { a: v129341 };
    for (let i50 = 0; i50 < 7; i50++) {
        v129341[5] = 2855;
    }
    return v4951241;
}
const v57 = %PrepareFunctionForOptimization(jit_func);
jit_func(undefined, "KCGKEMDHOKLAAALLE").toString();
const v62 = %OptimizeFunctionOnNextCall(jit_func);
let v65;
try { v65 = jit_func(NaN, undefined); } catch (e) {}
try { v65.toString(); } catch (e) {}
