var valueA;
var observationA;
function f4() {
    valueA = {};
    let v7;
    try { v7 = internals.observeGC(valueA); } catch (e) {}
    observationA = v7;
}
try { f4(); } catch (e) {}
try { gc(); } catch (e) {}
try { shouldBeFalse("observationA.wasCollected"); } catch (e) {}
valueA = null;
observationA = null;
try { gc(); } catch (e) {}
