class C0 {
    constructor() {
        this.arr = [1,2,3];
    }
    f() {
        super.arr = [1];
        this.x;
    }
}
const v10 = new C0();
let c = v10;
for (let i13 = 0; i13 < 65536; i13++) {
    c.f();
}
