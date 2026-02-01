function f3() {
    return "256";
}
function F4(a6, a7) {
    if (!new.target) { throw 'must be called with new'; }
    this.d = a6;
    this.h = a7;
}
new F4("flags", "4294967296");
new F4("4294967296", "256");
new F4("flags", "4294967296");
new Float64Array(14);
new Float32Array(7);
new Uint16Array(4096);
function opt() {
    let o = {};
    o.x;
}
function main() {
    for (let i26 = 0; i26 < 10000; i26++) {
        opt();
    }
    let leaked_stack_object = null;
    let object_prototype = ({}).__proto__;
    const v39 = { ..."x", h: Uint16Array };
    const v40 = %WasmStruct();
    object_prototype.__defineGetter__("x", Error.prototype.toString);
    function f46() {
        delete object_prototype.message;
        leaked_stack_object = this;
    }
    object_prototype.__defineGetter__("message", f46);
    object_prototype.name = Array.prototype;
    opt();
    console.log(leaked_stack_object);
}
main();
