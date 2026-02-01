/foo|(bar|baz)|quux/dmiyv;
new Int16Array(16);
new Array(77);
class C8 extends Int16Array {
    static m(a10, a11) {
        return { 2: 16 };
    }
}
new C8();
new C8();
new C8();
new C8();
function opt() {
    let o = {};
    o.x;
}
function main() {
    for (let i23 = 0; i23 < 10000; i23++) {
        opt();
    }
    let leaked_stack_object = null;
    const v32 = {};
    let object_prototype = v32.__proto__;
    gc();
    function F38() {
        if (!new.target) { throw 'must be called with new'; }
    }
    let v40 = "m86f";
    function f41() {
        v40 ||= v40;
    }
    object_prototype.__defineGetter__("x", Error.prototype.toString);
    function f24() {
        delete object_prototype.message;
        leaked_stack_object = this;
    }
    object_prototype.__defineGetter__("65537", f24);
    object_prototype.name = v32.prototype;
    opt();
    console.log(77);
    const v56 = [];
    v56[0] = {};
    JSON.stringify(v56);
}
main();
