arr = [];
for (let i3 = 0; i3 < 100000; i3++) {
    arr[i3] = [];
}
const v12 = new Object();
function f13() {
    arr.length = 0;
}
arr.indexOf(v12, { valueOf: f13 });
