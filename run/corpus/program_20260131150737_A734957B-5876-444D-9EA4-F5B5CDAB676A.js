function f0() {
    return f0();
}
try { f0(); } catch (e) {}
