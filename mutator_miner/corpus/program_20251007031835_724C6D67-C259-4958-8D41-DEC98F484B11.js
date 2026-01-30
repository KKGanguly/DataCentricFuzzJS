var count = 0;
var myEval = eval;
function foo() {
    myEval("var v" + count++);
    var y;
}
for (i = 0, v0 = 0; i < 100000; i += count, v0 += 400) {
    new foo(v0);
}
