function f0() {
    class C2 extends Function {
    }
    const v4 = new C2("'use strict';");
    let f = v4;
    for (let i7 = 0; i7 < 20; i7++) {
        new C2();
    }
    gc();
}
f0();
