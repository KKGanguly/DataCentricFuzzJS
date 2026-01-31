function ModIRightCanBeZero() {
    var x = 0;
    for (let i5 = -1; i5 <= 0; ++i5) {
        x = (2 % i5) | 0;
    }
    return x;
}
