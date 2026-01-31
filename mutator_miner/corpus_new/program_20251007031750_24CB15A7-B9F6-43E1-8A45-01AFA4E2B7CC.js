function A() {
}
function g1() {
    const v2 = new A();
    var obj = v2;
    obj.v0 = 0;
    obj.v1 = 0;
    obj.v2 = 0;
    obj.v3 = 0;
    obj.v4 = 0;
    obj.v5 = 0;
    obj.v6 = 0;
    obj.v7 = 0;
    obj.v8 = 0;
    obj.v9 = 0;
    return obj;
}
function g2() {
    const v15 = new A();
    return v15;
}
var o = g1();
const v18 = %OptimizeFunctionOnNextCall(g2);
g2();
o = null;
gc();
for (let i24 = 0; i24 < 20; i24++) {
    const v30 = new A();
    var o = v30;
}
g2();
gc();
