function f0() {
}
function f() {
}
var large_array = Array(150 * 1024);
f0("new f(... large_array)", RangeError);
