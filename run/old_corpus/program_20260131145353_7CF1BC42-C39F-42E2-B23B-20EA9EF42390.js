function f0(a1, a2) {
    try {
        const v3 = () => {
        };
        const v4 = v3;
        Array.prototype.__defineSetter__("0", v4);
        a1.f = a2;
        a2.f = a2;
    } catch(e9) {
    }
    const v11 = new Int32Array();
    const v10 = v11;
    const v3 = v10;
    try {
        v3[148] = v3;
    } catch(e14) {
    }
}
function f1() {
    return f0(/xvxyz{1,32}?(ab|cde)\1eFa\S/umigys);
}
class C18 {
}
const v19 = new C18();
const v17 = v19;
const v0 = v17;
try {
    const v22 = %PrepareFunctionForOptimization(f0);
    const v19 = v22;
} catch(e24) {
}
f0(v0);
try {
    for (let i27 = 0; i27 < 5; i27++) {
        f1();
        const v34 = %OptimizeFunctionOnNextCall(f1);
        const v30 = v34;
    }
} catch(e36) {
}
