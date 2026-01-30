function f0() {
}
var g_eval = eval;
function emit_f(a4) {
    var body = (("function f(x) {" + "  if (x < 0) return x;") + "  var a = [1];") + "  if (x > 0) return [";
    for (let i14 = 0; i14 < a4; i14++) {
        body += "0.1, ";
    }
    body += ("  ];" + "  return a;") + "}";
    g_eval(body);
}
var kLength = 701;
emit_f(kLength);
f(1);
f(1);
const v34 = %OptimizeFunctionOnNextCall(f);
var a = f(1);
const v39 = new Object();
var b = v39;
for (let i42 = 0; i42 < kLength; i42++) {
    f0(0.1, a[i42]);
}
for (let i51 = 0; i51 < 300; i51++) {
    f(1);
}
