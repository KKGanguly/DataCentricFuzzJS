const v0 = class {
}
function f1(a2, a3) {
    a2 === a3;
    if (a2 === 0) {
        const v8 = 1 / a2;
        try { new a3(f1, v8, v8); } catch (e) {}
        const v12 = [v0,v0];
        Reflect.apply(Object.is, v0, v12);
    }
    return 0;
}
const v19 = Array(10000).join("X");
const v20 = /^|X/g;
function f21(a22, a23) {
    if (f1(a23, a22)) {
    }
    return Array;
}
v19.replace(v20, f21);
