function includes(a1, a2) {
    const v3 = () => {
    };
    a2.__defineSetter__(a1, v3);
    return a2.includes(1234);
}
includes("", []);
includes("", []);
const v13 = %OptimizeFunctionOnNextCall(includes);
includes("", []);
includes("1235", []);
