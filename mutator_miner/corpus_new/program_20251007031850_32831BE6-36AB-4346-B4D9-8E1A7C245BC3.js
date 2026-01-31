var Test = {};
class C2 {
    constructor(a4) {
        this.foo = a4;
    }
    toB() {
        const t6 = Test.B;
        const v7 = new t6(this);
        return v7;
    }
}
class C8 {
    constructor(a10) {
        this.bar = a10;
    }
}
Test.B = C8;
for (let i12 = 0; i12 < 500; i12++) {
    const v18 = new C2(i12);
    const a = v18;
    const b = a.toB();
    try {
        console.log(b.bar.foo);
    } catch(e26) {
        console.log(e26);
        console.log(b);
        break;
    }
}
