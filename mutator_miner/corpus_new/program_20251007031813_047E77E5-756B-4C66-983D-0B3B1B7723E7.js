function f0() {
    'use strict';
    class C1 {
        s() {
            super.bla = 10;
        }
    }
    const v5 = new C1();
    const v6 = v5.s;
    try { v6.call(undefined); } catch (e) {}
}
f0();
