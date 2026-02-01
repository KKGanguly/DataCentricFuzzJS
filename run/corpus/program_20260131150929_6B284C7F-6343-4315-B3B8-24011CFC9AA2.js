var valueA;
var observationA;
function f4() {
    valueA = {};
    let v7;
    try {
        v7 = internals.observeGC(valueA);
    } catch(e10) {
    }
    observationA = v7;
}
try {
    f4();
} catch(e12) {
}
try {
    gc();
} catch(e15) {
}
try {
    shouldBeFalse("observationA.wasCollected");
} catch(e19) {
}
valueA = null;
observationA = null;
try {
    gc();
} catch(e24) {
}
