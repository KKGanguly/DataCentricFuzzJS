function boom(a1, a2) {
    var s = a2[0];
    var t = a1[0];
    a2[0] = 0.3;
}
const v10 = new Array(1);
var fast_elem = v10;
fast_elem[0] = "tagged";
boom(fast_elem, [1]);
const v17 = new Array(1);
var double_elem = v17;
double_elem[0] = 0.1;
boom(double_elem, double_elem);
const v22 = new Array(10);
double_elem = v22;
double_elem[0] = 0.1;
boom(double_elem, double_elem);
