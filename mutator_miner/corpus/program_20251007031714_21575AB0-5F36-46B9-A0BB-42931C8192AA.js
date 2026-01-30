function f0() {
}
function opt(a2) {
    const v4 = new Set();
    let iterator = v4.values();
    iterator.x = 0;
    let arr = [iterator,iterator];
    if (a2) {
        return arr.slice();
    }
}
opt(false);
opt(false);
const v15 = %OptimizeFunctionOnNextCall(opt);
let res = opt(true);
let a = res[0];
let b = res[1];
f0(a === b);
a.x = 7;
f0(7, b.x);
