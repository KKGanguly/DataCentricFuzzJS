function f0() {
}
const r = /x/;
let counter = 0;
const v5 = () => {
    counter++;
    return null;
};
r.exec = v5;
function f() {
    r.test("ABcd");
}
f();
f0(1, counter);
const v14 = %OptimizeFunctionOnNextCall(f);
f();
f0(2, counter);
