function func(a1) {
    function f3() {
    }
    const v4 = new Promise(f3);
    var a = v4;
    const t5 = a1.__proto__;
    t5.__proto__ = a;
}
for (let i8 = 0; i8 < 2; i8++) {
    var arr = [,{}];
    const v19 = Array();
    Object.prototype.toString.call(v19);
    func(arr);
}
