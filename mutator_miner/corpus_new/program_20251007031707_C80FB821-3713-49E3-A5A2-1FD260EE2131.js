var x = {};
function f() {
    return x.y;
}
f();
f();
x = 1;
f();
