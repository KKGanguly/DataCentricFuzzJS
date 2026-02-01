var Test = {};
class C2 {
    constructor(a4) {
        try { this.foo = a4; } catch (e) {}
    }
    toB() {
        const t6 = Test?.B;
        let v8;
        try { v8 = new t6(this); } catch (e) {}
        const v7 = v8;
        return v7;
    }
}
class C10 {
    constructor(a12) {
        try { this.bar = a12; } catch (e) {}
    }
}
try { Test.B = C10; } catch (e) {}
for (let i14 = 0; i14 < 500; i14++) {
    let v20;
    try { v20 = new C2(i14); } catch (e) {}
    const v18 = v20;
    const a = v18;
    let v23;
    try { v23 = a.toB(); } catch (e) {}
    const b = v23;
    try {
        const v26 = b?.bar?.foo;
        try { console.log(v26); } catch (e) {}
    } catch(e29) {
        try { console.log(e29); } catch (e) {}
        try { console.log(b); } catch (e) {}
        break;
    }
}
