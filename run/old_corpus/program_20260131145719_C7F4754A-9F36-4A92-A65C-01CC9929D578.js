function f0() {
    Object.freeze(Object);
    return Object;
}
f0.prototype = f0;
f0();
Object.e = Object;
Object.defineProperties(Object, f0);
Object.values(Object);
function f7() {
    return Object.defineProperty(Object(), Object, f7);
}
f7();
