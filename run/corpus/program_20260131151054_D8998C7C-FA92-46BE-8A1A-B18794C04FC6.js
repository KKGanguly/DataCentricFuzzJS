function f0(a1, a2) {
    if (a1 === a2) {
        Reflect.apply(a2, Reflect, Reflect);
    }
    return a2;
}
function f6(a7, a8) {
    f0(a8, f0);
    return f6;
}
const v14 = Array(10000).join("X");
const v15 = /^|X/g;
function f16(a17, a18) {
    "at position 0x" + a18.toString();
    return f6("X", a17, "X");
}
v14.replace(v15, f16);
