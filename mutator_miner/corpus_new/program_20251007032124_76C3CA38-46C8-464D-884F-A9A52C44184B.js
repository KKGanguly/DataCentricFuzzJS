function __f_9() {
}
__f_9();
function __f_16(a3) {
    var __v_22 = 5;
    var __v_25 = [];
    gc();
    gc();
    gc();
    for (let i13 = 0; i13 < __v_22; i13++) {
        __v_25[i13] = a3.ctor.apply();
    }
}
function f20(a21) {
    return { a: a21 };
}
function f23() {
    return [1.5 + __v_18];
}
const v28 = { ctor: f20, args: f23 };
function f29(a30) {
    var __v_21 = [];
    __v_21[1] = a30;
    __v_21[200000] = a30;
    return __v_21;
}
function f33() {
    return [1.5 + __v_18];
}
const v38 = { ctor: f29, args: f33 };
function f39() {
}
var __v_28 = [v28,v38,{ ctor: f39 }];
var __v_26 = [{}];
function f46(a47) {
    function f48(a49) {
        __f_16(a49);
    }
    __v_28.forEach(f48);
}
__v_26.forEach(f46);
