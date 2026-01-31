function f0() {
}
function testUnshift() {
    a = [1];
    function f() {
        return a;
    }
    b = Array.of.call(f);
    b.unshift(2);
    f0(b, [2]);
}
testUnshift();
function testInsertionPastEnd() {
    a = [9,9,9,9];
    function f() {
        return a;
    }
    b = Array.of.call(f, 1, 2);
    b[4] = 1;
    f0(b, [1,2,,,1]);
}
testInsertionPastEnd();
function testFrozenArrayThrows() {
    function f() {
        return Object.freeze([1,2,3]);
    }
    function f51() {
        Array.of.call(f);
    }
    f0(f51, TypeError);
}
testFrozenArrayThrows();
