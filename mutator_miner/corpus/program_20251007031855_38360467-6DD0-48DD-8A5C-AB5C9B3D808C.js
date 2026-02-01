function f0() {
}
function OrigReproCase() {
    f0("var f = ([x=[a=undefined]=[]]) => {}; f();", TypeError);
}
OrigReproCase();
function SimpleReproCase() {
    f0("var f = ([x=[]=[]]) => {}; f()", TypeError);
}
SimpleReproCase();
