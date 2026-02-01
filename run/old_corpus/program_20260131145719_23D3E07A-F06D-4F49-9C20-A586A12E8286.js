function f2() {
    try { (106).i2f(); } catch (e) {}
    return 106;
}
Int16Array.toString = f2;
class C4 extends Int16Array {
    [Int16Array](a6, a7) {
    }
}
