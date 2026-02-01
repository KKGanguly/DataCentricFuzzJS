function f() {
    var accumulator = false;
    for (let i4 = 0; i4 < 4; i4++) {
        accumulator = accumulator.hasOwnProperty(3);
        if (i4 === 1) {
            const v14 = %OptimizeOsr();
        }
    }
}
f();
