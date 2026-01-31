var a = [];
for (let i3 = 0; i3 < 100; i3++) {
    a.push(i3 + 0.123);
}
function f13() {
    a.length = 0;
    return 10;
}
var b = a.slice(0, { valueOf: f13 });
