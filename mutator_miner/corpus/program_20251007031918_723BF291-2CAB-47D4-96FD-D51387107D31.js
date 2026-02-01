const v2 = new Number(10);
var num = v2;
function f5() {
    return num;
}
Array.prototype.__defineGetter__(0, f5);
function f10(a11) {
}
Array.prototype.__defineSetter__(0, f10);
var str = decodeURI("%E7%9A%84");
