function f0() {
}
function ShortcutEmptyStringAddRight() {
    const v4 = new Float32Array(1);
    let ar = v4;
    function opt(a7) {
        return ar[a7] + (NaN ? 0 : "");
    }
    ar[0] = 42;
    opt(1);
    const v17 = %OptimizeFunctionOnNextCall(opt);
    f0("42", opt(0));
}
ShortcutEmptyStringAddRight();
function ShortcutiEmptyStringAddLeft() {
    const v26 = new Float32Array(1);
    let ar = v26;
    function opt(a29) {
        return (NaN ? 0 : "") + ar[a29];
    }
    ar[0] = 42;
    opt(1);
    const v39 = %OptimizeFunctionOnNextCall(opt);
    f0("42", opt(0));
}
ShortcutiEmptyStringAddLeft();
