const __v_1 = {};
function f() {
    try {
        const v5 = [0,0];
        var __v_6 = Object.defineProperties(v5, { 1: __v_1 });
    } catch(e10) {
    }
    try {
        for (const v12 in __v_6) {
            try {
                __v_1 = 4;
            } catch(e14) {
            }
            __v_6 = v12;
            try {
                if (v12 === "0") {
                    try {
                        Object.defineProperties();
                    } catch(e19) {
                    }
                }
            } catch(e20) {
            }
        }
    } catch(e21) {
    }
    __v_6[0];
}
const v24 = %PrepareFunctionForOptimization(f);
f();
f();
const v27 = %OptimizeFunctionOnNextCall(f);
f();
