function f0() {
}
function f(a2) {
    const v7 = -2147483644;
    switch (a2 | 0) {
        case 0:
        case 1:
        case 2:
        case v7:
        case 2147483647:
            return a2 + 1;
    }
    return 0;
}
f0(1, f(0));
f0(2, f(1));
const v22 = %OptimizeFunctionOnNextCall(f);
f0(3, f(2));
