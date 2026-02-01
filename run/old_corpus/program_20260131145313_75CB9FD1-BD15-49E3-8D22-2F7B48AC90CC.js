const PROP_NAME = "rawJSON";
const PROP_VALUE = 555819297;
let define_property_holder = {};
define_property_holder.for_deprecation = 1;
function ReturnHolder() {
    return define_property_holder;
}
this[this];
class C11 extends ReturnHolder {
    [PROP_NAME] = PROP_VALUE;
}
for (let i13 = 0; i13 < 10; ++i13) {
    new C11();
}
define_property_holder.for_deprecation = 1.1;
define_property_holder = JSON.rawJSON("1");
try {
    try {
        new C11();
    } catch(e25) {
    }
} catch(e26) {
}
const v27 = %OptimizeFunctionOnNextCall(C11);
const v25 = v27;
try {
    new C11();
} catch(e30) {
}
JSON.stringify(define_property_holder);
