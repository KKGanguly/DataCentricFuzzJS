function f0() {
}
function f(a2) {
    var o = { a: 0, b: 0 };
    if (a2 == 0) {
        o.a = 1;
    } else {
        if (a2 <= 1) {
            if (a2 == 2) {
                o.a = 2;
            } else {
                o.a = 1;
            }
            o.a = 2;
        } else {
            if (a2 == 2) {
                o.a = "x";
            } else {
                o.a = "x";
            }
            o.b = 22;
        }
        o.b = 22;
    }
    return o.a + 1;
}
f(0, 0);
f(1, 0);
f(2, 0);
f(3, 0);
f(0, 1);
f(1, 1);
f(2, 1);
f(3, 1);
f0(f(2), "x1");
