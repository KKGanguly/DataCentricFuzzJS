function f0(a1) {
    a1[5] = f0;
    try {
        f0(...f0, ...f0, ...f0);
    } catch(e3) {
    }
}
for (let i5 = 0; i5 < 250; i5++) {
    f0([]);
}
f0((3735928559 + 1) >> 1);
