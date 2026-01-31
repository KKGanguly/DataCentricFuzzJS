function crash() {
    for (a = 0; a < 2; a++) {
        for (let i10 = -0; i10 < 1000; i10++) {
            confused = Math.max(-1, i10);
        }
    }
    confused[0];
}
crash();
const v24 = %OptimizeFunctionOnNextCall(crash);
crash();
