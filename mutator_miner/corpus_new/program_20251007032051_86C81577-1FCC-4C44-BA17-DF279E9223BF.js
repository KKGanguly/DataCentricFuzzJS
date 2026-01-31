function f0() {
}
var o = ["3"];
function foo(a5) {
    o.x = a5;
}
foo("string");
Object.preventExtensions(o);
Object.seal(o);
f0("foo");
foo(0);
const v15 = %HeapObjectVerify(o);
f0(o.x, 0);
