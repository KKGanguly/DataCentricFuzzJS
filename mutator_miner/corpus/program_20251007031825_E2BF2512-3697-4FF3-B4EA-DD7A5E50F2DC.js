function f() {
    for (let i2 = 0; i2 < 100000; i2++) {
        var a = arguments[0] + 2;
        var b = arguments[1] + 2;
        var c = (a + i2) + 5;
        var d = c + 3;
    }
}
for (let i26 = 0; i26 < 3; i26++) {
    f(2, 3);
}
