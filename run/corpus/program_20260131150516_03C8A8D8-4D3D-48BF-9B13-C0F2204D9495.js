let arr = [1.1];
function f3() {
    print("haha");
}
tf = f3;
const v10 = tf.__proto__.__proto__;
function f12() {
    arr[0] = {};
    return null;
}
Object.defineProperty(v10, "alias", { get: f12 });
function opt(a20, a21) {
    a20[0] = 1.1;
    a21.values;
    a20[0] = 2.3023e-320;
}
opt(arr, {});
opt(arr, [1,2,3]);
print(arr[0]);
