var d = Object.defineProperty;
function f3() {
    return 19088743 >> 1;
}
function f7() {
}
var noobj = { get: f3, set: f7 };
function f() {
    var i = Intl;
    Intl = {};
    d(i, "Collator", noobj);
}
Object.defineProperty = f;
const t13 = Intl.NumberFormat;
const v20 = new t13(["en"]);
var q = v20;
