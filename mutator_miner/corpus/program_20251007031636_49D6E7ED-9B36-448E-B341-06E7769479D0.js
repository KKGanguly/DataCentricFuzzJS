var x = 1;
function f2() {
    eval("var x = 20");
    console.log((x = 2) == 20);
}
f2();
console.log(x == 2);
