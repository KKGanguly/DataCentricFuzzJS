function opt(a1, a2) {
    if (a1.length < 512) {
        return;
    }
    let index = 0;
    for (let i9 = 0; i9 < 1; i9++) {
        if (a2 === 8) {
            index += 4096;
        }
        index += 2;
        a1[index] = 1234;
    }
}
const v22 = new Array(768);
ua = v22;
ua.fill(1.1);
opt(ua, 2);
opt(ua, 8);
