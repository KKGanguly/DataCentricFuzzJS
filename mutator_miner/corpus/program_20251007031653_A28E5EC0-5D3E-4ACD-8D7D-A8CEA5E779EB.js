function f0() {
    function foo(a2) {
        const i = a2 > 0;
        const v8 = new DataView(ab);
        const dv = v8;
        return dv.getUint16(i);
    }
    const v13 = new ArrayBuffer(2);
    const ab = v13;
    foo(0);
    foo(0);
    const v19 = %OptimizeFunctionOnNextCall(foo);
    foo(0);
}
f0();
