function f0() {
}
function testSeal() {
    var sloppy = arguments;
    var sym = Symbol();
    sloppy[sym] = 123;
    Object.seal(sloppy);
    f0(Object.isSealed(sloppy));
    var desc = Object.getOwnPropertyDescriptor(sloppy, sym);
    f0(123, desc.value);
    f0(desc.configurable);
    f0(desc.writable);
}
testSeal();
function testFreeze() {
    var sloppy = arguments;
    var sym = Symbol();
    sloppy[sym] = 123;
    Object.freeze(sloppy);
    f0(Object.isFrozen(sloppy));
    var desc = Object.getOwnPropertyDescriptor(sloppy, sym);
    f0(123, desc.value);
    f0(desc.configurable);
    f0(desc.writable);
}
testFreeze();
function testIsFrozenAndIsSealed() {
    var sym = Symbol();
    var obj = { [sym]: 123 };
    Object.preventExtensions(obj);
    f0(Object.isFrozen(obj));
    f0(Object.isSealed(obj));
}
testIsFrozenAndIsSealed();
