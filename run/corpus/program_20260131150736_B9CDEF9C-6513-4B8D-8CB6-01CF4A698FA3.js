arr0 = [];
var obj = {};
const t2 = Array.prototype;
t2[12] = 10;
arr0 = [];
const t4 = Array.prototype;
t4[0] = 153;
for (const v14 in arr0) {
    function f13() {
    }
    obj.length = { toString: f13 };
}
function baz() {
    obj.length;
    arr0.length;
}
const v18 = {};
const v19 = [];
var arr = [v18,v19,{}];
for (const v27 in arr) {
    baz();
    for (let i30 = 0; i30 < 100000; i30++) {
    }
}
