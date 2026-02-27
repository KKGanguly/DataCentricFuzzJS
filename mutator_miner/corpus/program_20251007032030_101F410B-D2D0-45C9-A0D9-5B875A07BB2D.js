function foo() {
    for (let i2 = 0; i2 < 2; i2++) {
        if (i2 === 1) {
            const v10 = %OptimizeOsr();
        }
        while (0 && 1) {
            for (let i15 = 1; i15 < 2; i15++) {
            }
        }
    }
}
foo();
