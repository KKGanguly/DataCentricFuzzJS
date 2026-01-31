a = [1];
b = [];
function f6() {
    b.length = 4294967295;
}
a.__defineGetter__(0, f6);
c = a.concat(b);
