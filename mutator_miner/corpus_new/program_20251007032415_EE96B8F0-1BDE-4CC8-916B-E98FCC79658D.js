let use_v3;
let obj = {};
function f1() {
    let v3 = 5;
    for (let i8 = 0; i8 < 5; i8++) {
        v3--;
    }
    use_v3 = v3;
    let v15 = 1.2;
    try {
        Reflect.apply();
    } catch(e19) {
    }
    do {
        obj[v15] = 1;
        v15 = v3;
        for (let i22 = 100; i22; --i22) {
        }
    } while (v3)
}
const v26 = %PrepareFunctionForOptimization(f1);
f1();
f1();
const v29 = %OptimizeMaglevOnNextCall(f1);
f1();
