function f0() {
}
function NonExtensibleBetweenSetterAndGetter() {
    o = {};
    o.x = 42;
    function f7() {
    }
    o.__defineGetter__("y", f7);
    Object.preventExtensions(o);
    function f12() {
    }
    o.__defineSetter__("y", f12);
    o.x = 0.1;
}
NonExtensibleBetweenSetterAndGetter();
function InterleavedIntegrityLevel() {
    o = {};
    o.x = 42;
    function f22() {
    }
    o.__defineSetter__("y", f22);
    Object.preventExtensions(o);
    function f27() {
        return 44;
    }
    o.__defineGetter__("y", f27);
    Object.seal(o);
    o.x = 0.1;
    f0(44, o.y);
}
InterleavedIntegrityLevel();
function TryUpdateRepeatedIntegrityLevel() {
    function C() {
        this.x = 0;
        this.x = 1;
        Object.preventExtensions(this);
        Object.seal(this);
    }
    const v47 = new C();
    const o1 = v47;
    const v49 = new C();
    const o2 = v49;
    const v51 = new C();
    const o3 = v51;
    function f(a54) {
        return a54.x;
    }
    f(o1);
    f(o1);
    f(o1);
    o3.x = 0.1;
    f(o2);
    const v61 = %OptimizeFunctionOnNextCall(f);
    f(o1);
    const v63 = %HaveSameMap(o1, o2);
    f0(v63);
    const v65 = %HaveSameMap(o1, o3);
    f0(v65);
}
TryUpdateRepeatedIntegrityLevel();
