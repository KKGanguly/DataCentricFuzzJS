let arr = [];
arr[1000] = 4660;
function f4() {
    delete arr[256];
    arr.unshift(1.1);
    try { arr.length = arr; } catch (e) {}
}
arr.__defineGetter__(256, f4);
Object.entries(arr).toString();
