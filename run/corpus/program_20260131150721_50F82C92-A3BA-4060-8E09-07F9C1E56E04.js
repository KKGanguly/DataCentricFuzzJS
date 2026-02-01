var x = 1;
function f2() {
    eval("var x = 20");
    x = 2;
    console.log(2 == 20);
}
f2();
console.log(x == 2);
