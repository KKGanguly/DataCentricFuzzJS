const v5 = new Array(Math.pow(2, 15));
var justSomeModule = v5;
function f7() {
}
var emptyFunction = f7;
function f9() {
}
var anotherOne = f9;
function x() {
}
function* kindaInvalid() {
    for (const v14 of 0) {
    }
}
function bleh(a16) {
    try { a16.next(); } catch (e) {}
}
bleh(kindaInvalid());
