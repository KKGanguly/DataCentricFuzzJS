const v2 = [,1.8];
function f3(a5) {
    function f5() {
        return f5;
    }
    const v6 = v2.reduce(f5);
    v6 | v6;
    return v6;
}
f3();
f3();
const v12 = %OptimizeFunctionOnNextCall(f3);
const v10 = v12;
f3(v2);
