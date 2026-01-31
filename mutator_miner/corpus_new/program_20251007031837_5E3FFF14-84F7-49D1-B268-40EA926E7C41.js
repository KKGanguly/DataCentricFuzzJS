function f0() {
    const v1 = Object.seal(Object);
    const v3 = Object();
    const v4 = Object(Object);
    v3.__proto__ = v4;
    const v6 = Object.freeze(Object);
}
f0();
function f11() {
    const v1 = Object.preventExtensions(Object);
    const v3 = Object();
    const v4 = Object(Object);
    v3.__proto__ = v4;
    const v6 = Object.freeze(Object);
}
f11();
function f22() {
    const v1 = Object.preventExtensions(Object);
    const v3 = Object();
    const v4 = Object(Object);
    v3.__proto__ = v4;
    const v6 = Object.seal(Object);
}
f22();
function f33() {
    const v3 = Object();
    const v4 = Object(Object);
    v3.__proto__ = v4;
    const v6 = Object.freeze(Object);
}
f33();
function f42() {
    const v3 = Object();
    const v4 = Object(Object);
    v3.__proto__ = v4;
    const v6 = Object.seal(Object);
}
f42();
function f51() {
    const v3 = Object();
    const v4 = Object(Object);
    v3.__proto__ = v4;
    const v6 = Object.preventExtensions(Object);
}
f51();
