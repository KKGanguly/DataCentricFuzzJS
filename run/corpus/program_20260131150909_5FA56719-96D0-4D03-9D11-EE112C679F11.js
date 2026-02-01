function f0() {
    const v7 = {
        get a() {
            return 1000000;
        },
        9: 1000000,
        [1000000]: 1000000,
        __proto__: NaN,
    };
    const v4 = v7;
    v4[1000000] = v4;
    return f0;
}
f0();
const v6 = f0();
f0();
class C13 {
    1169076591 = v6;
}
~268435441n;
const v16 = new C13();
const v11 = v16;
v11[1169076591] = v11;
__proto__.propertyIsEnumerable(__proto__);
