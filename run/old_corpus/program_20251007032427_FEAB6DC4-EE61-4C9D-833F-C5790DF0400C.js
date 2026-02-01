function f0(a1, a2, a3) {
    try {
        6 ** 123n;
    } catch(e7) {
        for (let i9 = 0; i9 < 50; i9++) {
            const o10 = { construct: parseInt };
            o10.construct(e7);
        }
    }
    return a1;
}
for (let i20 = 0; i20 < 100; i20++) {
    f0();
}
