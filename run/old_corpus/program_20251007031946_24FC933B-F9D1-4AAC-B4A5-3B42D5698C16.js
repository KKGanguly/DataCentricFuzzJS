var global;
function f() {
    var local = "abcdefghijklmnopqrst";
    local += "abcdefghijkl" + (0 + global);
    global += "abcdefghijkl";
}
f();
const v11 = %OptimizeFunctionOnNextCall(f);
f();
