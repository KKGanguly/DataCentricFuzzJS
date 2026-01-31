function f0() {
    function f(a2) {
        arguments.length = -5;
        Array.prototype.slice.call(arguments);
    }
    f("a");
}
f0();
function f14() {
    function f(a16) {
        arguments.length = 2.3;
        print(arguments.length);
        Array.prototype.slice.call(arguments);
    }
    f("a");
}
f14();
