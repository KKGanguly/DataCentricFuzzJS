const v2 = [,1.8];
function f3(a4) {
    function f5() {
        return f5;
    }
    const v6 = v2.reduce(f5);
    v6 | v6;
    return v6;
}
f3();
f3();
const v10 = %OptimizeFunctionOnNextCall(f3);
f3(v2);
