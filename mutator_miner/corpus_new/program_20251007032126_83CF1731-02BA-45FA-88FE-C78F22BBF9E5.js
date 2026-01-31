function main() {
    class C1 {
        m() {
            super.prototype;
        }
    }
    function f() {
    }
    const t8 = C1.prototype;
    t8.__proto__ = f;
    const v6 = new C1();
    let c = v6;
    c.x0 = 1;
    c.x1 = 1;
    c.x2 = 1;
    c.x3 = 1;
    c.x4 = 1111638594 / 2;
    f.prototype;
    c.m();
}
for (let i18 = 0; i18 < 256; ++i18) {
    main();
}
