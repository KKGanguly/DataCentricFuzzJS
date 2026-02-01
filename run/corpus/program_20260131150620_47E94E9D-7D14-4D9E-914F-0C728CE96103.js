var Test = {};
class C2 {
    constructor(a4) {
        this.foo = a4;
    }
    toB() {
        const t6 = Test.B;
        const v8 = new t6(this);
        const v7 = v8;
        return v7;
    }
}
class C10 {
    constructor(a12) {
        this.bar = a12;
    }
}
Test.B = C10;
for (let i14 = 0; i14 < 500; i14++) {
    const v20 = new C2(i14);
    const v18 = v20;
    const a = v18;
    const b = a.toB();
    try {
        console.log(b.bar.foo);
    } catch(e29) {
        console.log(e29);
        console.log(b);
        break;
    }
}
