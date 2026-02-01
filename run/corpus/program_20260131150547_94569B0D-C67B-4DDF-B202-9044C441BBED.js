const __v_1 = {};
function f() {
    try {
        const v5 = [0,0];
        var __v_6 = Object.defineProperties(v5, { 1: __v_1 });
    } catch(e11) {
    }
    try {
        for (const v13 in __v_6) {
            try {
                __v_1 = 4;
            } catch(e15) {
            }
            __v_6 = v13;
            try {
                if (v13 === "0") {
                    try {
                        Object.defineProperties();
                    } catch(e20) {
                    }
                }
            } catch(e21) {
            }
        }
    } catch(e22) {
    }
    __v_6[0];
}
const v25 = %PrepareFunctionForOptimization(f);
const v24 = v25;
f();
f();
const v29 = %OptimizeFunctionOnNextCall(f);
const v27 = v29;
f();
