function f(a1, a2) {
    try {
        f(a1, a2 + 1);
    } catch(e6) {
    }
    a1[a2] = 43.35 + (a2 * 5.3);
}
f(Array.prototype, 0);
