function f0() {
    return f0;
}
function f1(a2) {
    try {
        Object.getOwnPropertyNames();
    } catch(e5) {
    }
    return a2;
}
Object.defineProperty(f0, "a", { enumerable: true, set: f1 });
f0.a = f0;
