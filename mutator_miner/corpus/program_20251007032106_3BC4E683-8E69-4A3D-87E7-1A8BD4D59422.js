function v0(a1, a2) {
    Object.defineProperty(a1, "length", { writable: a2 });
}
function v4(a8, a9) {
    try {
        var v9 = [];
        var v11 = a8.bind();
        v11(v9, a9);
        v11.__proto__ = v9;
        var v12 = {};
        v12.__proto__ = v9;
        v9.__proto__ = 13.37;
        v12.unshift(3);
    } catch(e20) {
        v9[0] = 1.1;
        return v9[0];
    }
}
v4(v0, false);
v4(v0, false);
const v28 = %OptimizeFunctionOnNextCall(v0);
const v29 = %OptimizeFunctionOnNextCall(v4);
v4(v0, false);
