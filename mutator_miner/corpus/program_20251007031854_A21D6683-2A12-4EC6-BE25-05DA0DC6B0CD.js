function* f() {
}
let g;
function f4() {
    g = this;
}
f.__defineGetter__("length", f4);
f.length;
g.call(4660, 22136);
