function f0() {
    const v4 = {
        get a() {
            return 1000000.0;
        },
        9: 1000000.0,
        [1000000.0]: 1000000.0,
        __proto__: NaN,
    };
    v4[1000000] = v4;
    return f0;
}
f0();
const v6 = f0();
f0();
class C8 {
    1169076591 = v6;
}
~268435441n;
const v11 = new C8();
v11[1169076591] = v11;
__proto__.propertyIsEnumerable(__proto__);
