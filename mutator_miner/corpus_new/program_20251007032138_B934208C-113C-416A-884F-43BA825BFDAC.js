function f(a1) {
    var a = [a1];
    a.length = a[0];
    function f5() {
    }
    var useless = f5;
    var sz = Array.prototype.push.call(a, 42, 43);
    const v16 = new Boolean(false);
    function f17() {
    }
    f17(v16);
}
for (let i20 = 0; i20 < 25000; i20++) {
    f(1);
}
f(2);
