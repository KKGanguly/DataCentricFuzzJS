var x = [];
function foo(a3, a4) {
    a3[a4] = 5.3;
}
foo(x, 1);
foo(x, 2);
foo(x, -1);
gc();
