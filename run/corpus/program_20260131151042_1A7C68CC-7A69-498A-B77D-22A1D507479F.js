function jit_func(a1, a2) {
    var v921312 = 4294967294;
    let v56971 = 0;
    const v7 = () => {
    };
    const v8 = v7;
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
    try {
        const v48 = new Array(v43);
        v44 = v48;
    } catch(e49) {
    }
    v129341 = v44;
    try {
        v129341.shift();
    } catch(e51) {
    }
    v4951241 = {};
    try {
        v129341.shift();
    } catch(e54) {
    }
    v4951241.a = { a: v129341 };
    for (let i57 = 0; i57 < 7; i57++) {
        v129341[5] = 2855;
    }
    return v4951241;
}
const v64 = %PrepareFunctionForOptimization(jit_func);
const v57 = v64;
jit_func(undefined, "KCGKEMDHOKLAAALLE").toString();
const v70 = %OptimizeFunctionOnNextCall(jit_func);
const v62 = v70;
let v65;
try {
    v65 = jit_func(NaN, undefined);
} catch(e77) {
}
try {
    v65.toString();
} catch(e79) {
}
