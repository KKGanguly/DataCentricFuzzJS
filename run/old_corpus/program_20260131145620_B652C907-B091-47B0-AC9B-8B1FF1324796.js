function f0(a1, a2, a3, a4) {
    try {
        BigInt.asIntN();
    } catch(e7) {
    }
    return a3;
}
for (let v8 = 0; v8 < 50; v8++) {
    f0();
}
