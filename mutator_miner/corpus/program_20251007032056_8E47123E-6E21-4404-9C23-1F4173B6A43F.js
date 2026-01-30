function assertEquals(a1, a2) {
    a2.length !== a1.length;
}
assertEquals([], []);
assertEquals("a", "a");
assertEquals([], []);
function f() {
    assertEquals(0, undefined);
}
try {
    f();
} catch(e20) {
}
const v21 = %OptimizeFunctionOnNextCall(f);
try {
    f();
} catch(e23) {
}
