function f1(a2) {
    var len = 2147483648;
    arguments.length = len;
    const v8 = len - 1;
    Array.prototype.slice.call(arguments, v8, len);
}
f1("a");
function f15(a16) {
    var len = 1073741824;
    arguments.length = len;
    const v22 = len - 1;
    Array.prototype.slice.call(arguments, v22, len);
}
f15("a");
