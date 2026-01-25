function f0() {
}
var array = [[{}],[1.1]];
function transition() {
    for (let i9 = 0; i9 < array.length; i9++) {
        var arr = array[i9];
        arr[0] = {};
    }
}
var double_arr2 = [1.1,2.2];
var flag = 0;
function swap() {
    try {
    } catch(e25) {
    }
    if (flag == 1) {
        array[1] = double_arr2;
    }
}
var expected = 6.176516726456e-312;
function f() {
    swap();
    double_arr2[0] = 1;
    transition();
    double_arr2[1] = expected;
}
for (let i35 = 0; i35 < 65536; i35++) {
    f();
}
flag = 1;
f();
f0(expected, double_arr2[1]);
