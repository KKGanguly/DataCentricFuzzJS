class C2 {
    ["setUint32"](a4) {
        const t2 = "f";
        t2.__proto__ = this;
    }
}
const v5 = new C2();
console.dir(C2, console, C2, v5.setUint32(), "f");
