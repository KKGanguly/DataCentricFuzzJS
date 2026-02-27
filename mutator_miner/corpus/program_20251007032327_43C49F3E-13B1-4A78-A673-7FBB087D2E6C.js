function f0(a1, a2) {
    try {
        const v4 = () => {
        };
        Array.prototype.__defineSetter__("0", v4);
        a1.f = a2;
        a2.f = a2;
    } catch(e8) {
    }
    const v10 = new Int32Array();
    const v3 = v10;
    try {
        v3[148] = v3;
    } catch(e12) {
    }
}
function f1() {
    return f0(/xvxyz{1,32}?(ab|cde)\1eFa\S/gmsyiu);
}
class C16 {
}
const v17 = new C16();
const v0 = v17;
try {
    const v19 = %PrepareFunctionForOptimization(f0);
} catch(e20) {
}
f0(v0);
try {
    for (let i23 = 0; i23 < 5; i23++) {
        f1();
        const v30 = %OptimizeFunctionOnNextCall(f1);
    }
} catch(e31) {
}
