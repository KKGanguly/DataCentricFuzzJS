const v0 = (a1) => {
    const v4 = new Date(42);
    let y = v4.getMilliseconds();
    let i = -1;
    if (a1) {
        i = 4294967295;
    }
    return Math.max(1 << y, i, 1 + y) > y;
};
z = v0;
console.log(z(true));
for (let i25 = 0; i25 < 65536; ++i25) {
    z(false);
}
console.log(z(true));
