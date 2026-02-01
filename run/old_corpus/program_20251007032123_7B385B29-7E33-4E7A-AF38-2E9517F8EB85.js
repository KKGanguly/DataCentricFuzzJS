function innerFn(a1) {
    let arr = [a1,1,2,3];
    const v7 = (a8) => {
        return a8 * 2;
    };
    return arr.forEach(v7);
}
function outerFn() {
    for (let i14 = 0; i14 < 100000; ++i14) {
        innerFn(0);
    }
    for (let i23 = 0; i23 < 100000; ++i23) {
        innerFn(null);
    }
}
outerFn();
