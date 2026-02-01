function f0() {
    return f0;
}
for (let v1 = 0; v1 < 250; v1++) {
}
const v2 = {};
function f3() {
    return v2;
}
v2.__defineGetter__("message", f3, f0);
