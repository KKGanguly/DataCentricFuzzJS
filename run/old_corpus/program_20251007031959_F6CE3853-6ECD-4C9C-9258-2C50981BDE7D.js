function f0() {
}
const v1 = %GetDebugContext();
const v2 = %GetDebugContext();
function f() {
    f(/./.test("a"));
}
f0(f, RangeError);
