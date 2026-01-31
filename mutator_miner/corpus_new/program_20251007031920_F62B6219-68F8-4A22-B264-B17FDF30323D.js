function f(a1) {
    return f;
}
f(64);
function f(a5) {
    a5.x = 0;
    a5[1] = 0.1;
    return f;
}
