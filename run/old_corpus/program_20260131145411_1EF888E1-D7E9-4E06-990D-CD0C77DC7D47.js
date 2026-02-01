function f0() {
}
function doShift(a2) {
    var x = a2.shift();
    return x;
}
function makeArray() {
    var a = [1,2,,3];
    a[0] = 2;
    return a;
}
doShift(makeArray());
doShift(makeArray());
doShift(makeArray());
f0(doShift);
function test(a21) {
    [a21,,];
}
test(0);
test(0);
test(0);
