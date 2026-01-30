const PROP_NAME = "rawJSON";
const PROP_VALUE = 555819297;
let define_property_holder = {};
define_property_holder.for_deprecation = 1;
function ReturnHolder() {
    return define_property_holder;
}
this[this];
class C10 extends ReturnHolder {
    [PROP_NAME] = PROP_VALUE;
}
for (let i12 = 0; i12 < 10; ++i12) {
    new C10();
}
define_property_holder.for_deprecation = 1.1;
define_property_holder = JSON.rawJSON("1");
try {
    try { new C10(); } catch (e) {}
} catch(e24) {
}
const v25 = %OptimizeFunctionOnNextCall(C10);
try { new C10(); } catch (e) {}
JSON.stringify(define_property_holder);
