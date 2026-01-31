function f1() {
}
function f2() {
}
var o1 = [];
o1.a = 0;
o1.f = f1;
const v5 = %HeapObjectVerify(o1);
var o2 = [];
o2.a = 4.2;
o2.f = f2;
const v9 = %HeapObjectVerify(o2);
o1.a;
const v11 = %HeapObjectVerify(o1);
const v12 = %HeapObjectVerify(o2);
