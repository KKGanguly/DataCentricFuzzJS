class C1 extends RegExp {
    exec(a3) {
        const r = super.exec.call(this, a3);
        r[0] = 0;
        return r;
    }
}
const v10 = new C1(".", "g");
try { ("a").match(v10); } catch (e) {}
