function f() {
    function g(a2) {
        return a2;
    }
    function f3() {
        return g(42);
    }
    return f3;
}
const a = Realm.create();
const b = Realm.create();
const x = Realm.eval(a, f.toString() + " f()");
const y = Realm.eval(b, f.toString() + " f()");
x();
const v23 = %DebugToggleBlockCoverage(true);
y();
