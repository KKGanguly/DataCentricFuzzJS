class C0 {
}
function f1(a2) {
    let v5;
    try { v5 = C0.push(1, undefined, C0); } catch (e) {}
    v5 ?? v5;
    return 1;
}
f1();
const v8 = f1();
const v9 = %OptimizeFunctionOnNextCall(f1);
f1(v8);
