var a = 1;
var b = 2;
for (let i5 = 0; i5 < 100000; i5++) {
    if (a === b) {
        const v13 = new Error();
        throw v13;
    }
}
