function f0() {
}
function f(a2) {
    var obj1 = { [undefined]: 1, undefined: 1 };
    var obj2 = { [undefined]: a2, undefined: 1 };
    var obj3 = { undefined: 1, [undefined]: a2 };
    var obj4 = { undefined: a2, [undefined]: 1 };
    f0(obj1.undefined, 1);
    f0(obj2.undefined, 1);
    f0(obj3.undefined, a2);
    f0(obj4.undefined, 1);
}
const v31 = %PrepareFunctionForOptimization(f);
f(1);
f(1);
const v36 = %OptimizeFunctionOnNextCall(f);
f(2);
function g(a40) {
    var obj1 = { [undefined]: 1, [undefined]: 1 };
    var obj2 = { [undefined]: 1, [undefined]: a40 };
    var obj3 = { [undefined]: a40, [undefined]: 1 };
    var obj4 = { [undefined]: a40, [undefined]: a40 };
    f0(obj1.undefined, 1);
    f0(obj2.undefined, a40);
    f0(obj3.undefined, 1);
    f0(obj4.undefined, a40);
}
const v71 = %PrepareFunctionForOptimization(g);
g(1);
g(1);
const v76 = %OptimizeFunctionOnNextCall(g);
g(2);
