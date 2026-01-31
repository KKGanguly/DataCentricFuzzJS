function f0() {
}
function f1() {
    function f(a3, a4, a5) {
        return Array.prototype.slice.call(arguments);
    }
    let result = f(456, 789, 111112);
    f0(result[0], 456);
    f0(result[1], 789);
    f0(result[2], 111112);
    f0(result.length, 3);
}
f1();
function f29() {
    function f(a31, a32, a33) {
        return Array.prototype.slice.call(arguments);
    }
    let result = f(456, 789, 111112, 543, 654);
    f0(result[0], 456);
    f0(result[1], 789);
    f0(result[2], 111112);
    f0(result[3], 543);
    f0(result[4], 654);
    f0(result.length, 5);
}
f29();
