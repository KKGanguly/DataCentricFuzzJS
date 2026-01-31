class C1 extends RegExp {
    exec(a3) {
        const r = super.exec.call(this, a3);
        if (r) {
            r.length = 0;
        }
        return r;
    }
}
const v10 = new C1(".", "g");
const result = ("a").match(v10);
var crash = result[0].x;
