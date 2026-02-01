function opt(a1, a2) {
    a1[0] = 1.1;
    a2.x;
    a1[0] = 2.3023e-320;
}
let arr = [1.1];
for (let i10 = 0; i10 < 65536; i10++) {
    opt(arr, {});
}
let get = Map.prototype.get;
function f22(a23) {
    const t11 = Map.prototype;
    t11.get = get;
    arr[0] = {};
    return this.get(a23);
}
const t16 = Map.prototype;
t16.get = f22;
opt(arr, Intl);
console.log(arr[0]);
